// server/index.js
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "telc_simulator",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ---------- helpers ----------
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function safeJSON(v) {
  try { return JSON.parse(v); } catch { return v; }
}

// Extract “correct” answers for different types
function scoreSprachbausteineTeil1(question, userPayload) {
  // question.options.content: ["text", {id, type:"cloze", correct, options:[... ]}, "text"...]
  // userPayload: { [gapId]: "chosenWord" }
  const content = question.options?.content || [];
  let points = 0, max = 0;

  content.forEach(item => {
    if (item && typeof item === "object" && item.type === "cloze") {
      max += 1;
      const u = userPayload?.[item.id];
      if (u && String(u).trim().toLowerCase() === String(item.correct).trim().toLowerCase()) {
        points += 1;
      }
    }
  });

  return { points, max };
}

function scoreSprachbausteineTeil2(question, userPayload) {
  // wordbank: options.words[], options.passage [{gap:n}, ...string]
  // correct can be in question.answer (map gap->word) OR on each gap as `correct`
  const passage = question.options?.passage || [];
  const keyMap = question.answer || {};
  let points = 0, max = 0;

  passage.forEach(item => {
    if (item && typeof item === "object" && "gap" in item) {
      max += 1;
      const gapId = String(item.gap);
      const userWord = userPayload?.[gapId];
      // prefer centralized key
      const correct = keyMap?.[gapId] ?? item.correct;
      if (correct && userWord && String(userWord).trim().toLowerCase() === String(correct).trim().toLowerCase()) {
        points += 1;
      }
    }
  });

  return { points, max };
}

// Lesen Teil 1: 5 passages, 10 titles, user sends { [passageId]: "A" | "B" | ... }
function scoreLesenTeil1(question, userPayload) {
  // answer: { [passageId]: "A"|"B"|... }
  const key = question.answer || {};
  const passages = question.options?.passages || [];
  let points = 0, max = passages.length;

  passages.forEach(p => {
    const pid = String(p.id);
    const u = userPayload?.[pid];
    const c = key?.[pid];
    if (u && c && String(u).toUpperCase() === String(c).toUpperCase()) points += 1;
  });

  return { points, max };
}

// Lesen Teil 2: 5 MCQs – user sends { [qId]: "A"|"B"|"C" }
function scoreLesenTeil2(question, userPayload) {
  // question.options.questions = [{id, text, options:["A","B","C"], correct:"B"}] OR central answer map
  const qs = question.options?.questions || [];
  const key = question.answer || {};
  let points = 0, max = qs.length;

  qs.forEach(q => {
    const qid = String(q.id);
    const correct = key?.[qid] ?? q.correct;
    const u = userPayload?.[qid];
    if (u && correct && String(u).toUpperCase() === String(correct).toUpperCase()) points += 1;
  });

  return { points, max };
}

// Lesen Teil 3: situations 1..10 -> "A".."L" or "X"
function scoreLesenTeil3(question, userPayload) {
  // key: { [situationId]: "A".."L" or "X" }
  const key = question.answer || {};
  const situations = question.options?.situations || [];
  let points = 0, max = situations.length;

  situations.forEach(s => {
    const sid = String(s.id);
    const correct = key?.[sid];
    const u = (userPayload?.[sid] ?? "").toUpperCase();
    if (correct && u && u === String(correct).toUpperCase()) points += 1;
  });

  return { points, max };
}

function scoreQuestion(question, userRaw) {
  // userRaw is whatever the frontend sent for that question
  // normalize options/answer JSON
  const q = {
    ...question,
    options: typeof question.options === "string" ? safeJSON(question.options) : question.options,
    answer: typeof question.answer === "string" ? safeJSON(question.answer) : question.answer,
  };

  switch (q.question_type) {
    case "cloze":            return scoreSprachbausteineTeil1(q, userRaw);
    case "wordbank":         return scoreSprachbausteineTeil2(q, userRaw);
    case "lesen1":           return scoreLesenTeil1(q, userRaw);
    case "lesen2":           return scoreLesenTeil2(q, userRaw);
    case "lesen3":           return scoreLesenTeil3(q, userRaw);
    default:                 return { points: 0, max: 0 };
  }
}

// Map type to your short “Teil code” for display
function partCodeFor(question) {
  switch (question.question_type) {
    case "cloze":  return "SB1";
    case "wordbank": return "SB2";
    case "lesen1": return "LT1";
    case "lesen2": return "LT2";
    case "lesen3": return "LT3";
    default: return "GEN";
  }
}

//scoring
// ----- utils: load exam questions from DB (same shape you already serve)
async function loadExamQuestions(examId) {
  const [rows] = await pool.query(
    "SELECT id, exam_id, question_text, question_type, options, answer FROM questions WHERE exam_id=? ORDER BY id",
    [examId]
  );
  return rows.map(r => ({
    id: r.id,
    exam_id: r.exam_id,
    question_text: r.question_text,
    question_type: r.question_type,
    options: typeof r.options === "string" ? JSON.parse(r.options) : r.options,
    answer: r.answer ? (typeof r.answer === "string" ? JSON.parse(r.answer) : r.answer) : null,
  }));
}

/**
 * SCORING RULES (adjust if you like):
 * - sprach1 (cloze): compare each gap's selected option with "correct"
 * - sprach2 (wordbank): compare chosen word per gap with "answer" or with a mapping you store
 * - lesen1 (titles↔passages): compare mapping {gap -> titleId} to the correct mapping
 * - lesen2 (5 MCQs): compare radio with correct
 * - lesen3 (situations↔ads with X): each situation either links to ad A..L or 'X'
 *
 * We’ll scale to TELC-like modules if you want later; for now points = correct_count.
 */
function gradeSprach1(questions, payload) {
  // payload.sprach1 = { [gapId]: selectedOption, ... }
  let correct = 0, total = 0;
  const gaps = {};

  questions
    .filter(q => q.question_type === "cloze")
    .forEach(q => {
      q.options?.content?.forEach(item => {
        if (item && item.type === "cloze") {
          total += 1;
          const user = payload?.sprach1?.[item.id];
          if (user && user === item.correct) correct += 1;
          gaps[item.id] = { user, correct: item.correct };
        }
      });
    });

  return { correct, total, details: gaps };
}

function gradeSprach2(wordbankQuestion, payload) {
  // payload.sprach2 = { [gapNumber]: "WORD" }
  if (!wordbankQuestion) return { correct: 0, total: 0, details: {} };

  const passage = wordbankQuestion.options?.passage || [];
  const correctMap = wordbankQuestion.answer || {}; // e.g. { "1":"AN", "2":"IM", "3":"IN HÖHE" }
  let correct = 0, total = 0;
  const details = {};

  passage.forEach(item => {
    if (item && typeof item === "object" && "gap" in item) {
      const id = String(item.gap);
      total += 1;
      const user = payload?.sprach2?.[id] || payload?.sprach2?.[Number(id)];
      const exp  = correctMap[id];
      if (user && exp && user === exp) correct += 1;
      details[id] = { user, correct: exp };
    }
  });

  return { correct, total, details };
}

function gradeLesen1(question, payload) {
  // payload.lesen1 = { [passageId]: "A" | "B" | ... }
  if (!question) return { correct: 0, total: 0, details: {} };

  const total = (question.options?.passages || []).length;
  let correct = 0;
  const details = {};
  const key = question.answer || {}; // e.g. { "1":"C", "2":"H", ... }

  (question.options?.passages || []).forEach(p => {
    const user = payload?.lesen1?.[String(p.id)] ?? payload?.lesen1?.[p.id];
    const exp  = key[String(p.id)];
    if (user && exp && user === exp) correct += 1;
    details[p.id] = { user, correct: exp };
  });

  return { correct, total, details };
}

function gradeLesen2(question, payload) {
  // payload.lesen2 = { [qId]: "A"|"B"|"C" } or the chosen option label
  if (!question) return { correct: 0, total: 0, details: {} };
  const qs = question.options?.questions || []; // [{id, text, options:[A,B,C], correct:"B"}]
  let correct = 0, total = qs.length;
  const details = {};
  qs.forEach(q => {
    const user = payload?.lesen2?.[String(q.id)] ?? payload?.lesen2?.[q.id];
    if (user && q.correct && user === q.correct) correct += 1;
    details[q.id] = { user, correct: q.correct };
  });
  return { correct, total, details };
}

function gradeLesen3(question, payload) {
  // payload.lesen3 = { [situationId]: "A".."L" or "X" }
  if (!question) return { correct: 0, total: 0, details: {} };
  const situations = question.options?.situations || []; // [{id,text},...]
  let correct = 0, total = situations.length;
  const details = {};
  const key = question.answer || {}; // e.g. {"1":"F","2":"X",...}

  situations.forEach(s => {
    const user = payload?.lesen3?.[String(s.id)] ?? payload?.lesen3?.[s.id];
    const exp  = key[String(s.id)];
    if (user && exp && user === exp) correct += 1;
    details[s.id] = { user, correct: exp };
  });
  return { correct, total, details };
}

/** Optional: module weights -> points. Adjust as you like */
const MODULE_POINTS = {
  sprach1: 20,
  sprach2: 20,
  lesen1: 20,
  lesen2: 20,
  lesen3: 20,
};

// scale points = correct/total * moduleMax
function toPoints(correct, total, moduleKey) {
  if (!total) return 0;
  const max = MODULE_POINTS[moduleKey] || total;
  return Math.round((correct / total) * max * 100) / 100;
}



// ---------- ROUTES ----------

// Submit: receive answers per question and compute + store results
// BODY shape:
// {
//   userId: 123 (optional),
//   answers: {
//     "7": { "1":"an", "2":"es", ... },         // for cloze (gap map)
//     "11": { "1":"AN","2":"IM","3":"IN HÖHE"}, // for wordbank
//     "QID_LE1": {"1":"B","2":"H",...},         // lesen1 map
//     ...
//   }
// }


// app.post("/api/exams/:examId/submit", async (req, res) => {
//   const examId = Number(req.params.examId);
//   const { userId = null, answers = {} } = req.body || {};

//   const conn = await pool.getConnection();
//   try {
//     await conn.beginTransaction();

//     // create attempt
//     const [attRes] = await conn.execute(
//       "INSERT INTO attempts (user_id, exam_id, submitted_at) VALUES (?, ?, NOW())",
//       [userId, examId]
//     );
//     const attemptId = attRes.insertId;

//     // load all questions for that exam
//     const [rows] = await conn.execute(
//       "SELECT id, exam_id, question_text, question_type, options, answer FROM questions WHERE exam_id = ?",
//       [examId]
//     );

//     let scoreTotal = 0;
//     let maxTotal = 0;

//     // score each answered question; ignore unknown ids safely
//     for (const row of rows) {
//       const qid = String(row.id);
//       const userRaw = answers[qid] ?? null;

//       // compute score (0 if userRaw null; max still counted)
//       const { points, max } = scoreQuestion(row, userRaw);
//       scoreTotal += points;
//       maxTotal += max;

//       const partCode = partCodeFor(row);

//       await conn.execute(
//         "INSERT INTO attempt_answers (attempt_id, question_id, part_code, raw_answer, score, max_score) VALUES (?, ?, ?, ?, ?, ?)",
//         [attemptId, row.id, partCode, JSON.stringify(userRaw), points, max]
//       );
//     }

//     await conn.execute(
//       "UPDATE attempts SET score_total = ?, max_total = ? WHERE id = ?",
//       [scoreTotal, maxTotal, attemptId]
//     );

//     await conn.commit();

//     res.json({
//       attemptId,
//       score_total: scoreTotal,
//       max_total: maxTotal,
//     });
//   } catch (e) {
//     await conn.rollback();
//     console.error(e);
//     res.status(500).json({ error: "submit_failed" });
//   } finally {
//     conn.release();
//   }
// });

// ----- POST /api/exams/:id/submit
app.post("/api/exams/:examId/submit", async (req, res) => {
  const examId = Number(req.params.examId);
  const payload = req.body || {}; // { sprach1:{}, sprach2:{}, lesen1:{}, lesen2:{}, lesen3:{} }
  const userId = null; // replace when you have auth

  try {
    const questions = await loadExamQuestions(examId);

    const sprach1Qs = questions.filter(q => q.question_type === "cloze");
    const sprach2Q  = questions.find(q => q.question_type === "wordbank");
    const lesen1Q   = questions.find(q => q.question_type === "lesen1");
    const lesen2Q   = questions.find(q => q.question_type === "lesen2");
    const lesen3Q   = questions.find(q => q.question_type === "lesen3");

    const r1 = gradeSprach1(sprach1Qs, payload);
    const r2 = gradeSprach2(sprach2Q, payload);
    const r3 = gradeLesen1(lesen1Q, payload);
    const r4 = gradeLesen2(lesen2Q, payload);
    const r5 = gradeLesen3(lesen3Q, payload);

    // create attempt
    const [ins] = await pool.query(
      "INSERT INTO exam_attempts (user_id, exam_id, submitted_at) VALUES (?, ?, NOW())",
      [userId, examId]
    );
    const attemptId = ins.insertId;

    // store raw answers (compact + predictable paths)
    const bulk = [];
    const pushMap = (teilKey, obj, prefix) => {
      if (!obj) return;
      Object.entries(obj).forEach(([k, v]) => {
        bulk.push([attemptId, examId, teilKey, `${prefix}${k}`, v ?? null]);
      });
    };
    pushMap("sprach1", payload.sprach1, "gap.");
    pushMap("sprach2", payload.sprach2, "gap.");
    pushMap("lesen1",  payload.lesen1,  "passage.");
    pushMap("lesen2",  payload.lesen2,  "q.");
    pushMap("lesen3",  payload.lesen3,  "s.");

    if (bulk.length) {
      await pool.query(
        "INSERT INTO attempt_answers (attempt_id, exam_id, teil, key_path, user_value) VALUES ?",
        [bulk]
      );
    }

    // store per-teil scores
    const scores = [
      ["sprach1", r1],
      ["sprach2", r2],
      ["lesen1",  r3],
      ["lesen2",  r4],
      ["lesen3",  r5],
    ].map(([teil, rr]) => [attemptId, examId, teil, rr.correct, rr.total, toPoints(rr.correct, rr.total, teil)]);

    await pool.query(
      "INSERT INTO attempt_scores (attempt_id, exam_id, teil, correct_count, total_count, points) VALUES ?",
      [scores]
    );

    // respond with a full result payload for the certificate
    res.json({
      attemptId,
      examId,
      modules: {
        sprach1: { ...r1, points: toPoints(r1.correct, r1.total, "sprach1") },
        sprach2: { ...r2, points: toPoints(r2.correct, r2.total, "sprach2") },
        lesen1:  { ...r3, points: toPoints(r3.correct, r3.total, "lesen1")  },
        lesen2:  { ...r4, points: toPoints(r4.correct, r4.total, "lesen2")  },
        lesen3:  { ...r5, points: toPoints(r5.correct, r5.total, "lesen3")  },
      },
      totalPoints: [r1,r2,r3,r4,r5].reduce((acc, m, i) => {
        const key = ["sprach1","sprach2","lesen1","lesen2","lesen3"][i];
        return acc + toPoints(m.correct, m.total, key);
      }, 0)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "grading_failed" });
  }
});

// Optional: GET /api/results/:attemptId (to re-open certificate later)
app.get("/api/results/:attemptId", async (req, res) => {
  const attemptId = Number(req.params.attemptId);
  try {
    const [[attempt]] = await pool.query("SELECT * FROM exam_attempts WHERE id=?", [attemptId]);
    if (!attempt) return res.status(404).json({ error: "not_found" });

    const [scores] = await pool.query("SELECT teil, correct_count, total_count, points FROM attempt_scores WHERE attempt_id=?", [attemptId]);
    const [answers] = await pool.query("SELECT teil, key_path, user_value FROM attempt_answers WHERE attempt_id=?", [attemptId]);

    res.json({ attempt, scores, answers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "load_failed" });
  }
});
// Fetch a summary (for the results view or dialog)
app.get("/api/attempts/:attemptId", async (req, res) => {
  const attemptId = Number(req.params.attemptId);
  try {
    const [[attempt]] = await pool.query(
      "SELECT id, user_id, exam_id, started_at, submitted_at, score_total, max_total FROM attempts WHERE id = ?",
      [attemptId]
    );
    if (!attempt) return res.status(404).json({ error: "not_found" });

    const [answers] = await pool.query(
      "SELECT question_id, part_code, raw_answer, score, max_score FROM attempt_answers WHERE attempt_id = ? ORDER BY part_code, question_id",
      [attemptId]
    );

    res.json({ attempt, answers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "fetch_failed" });
  }
});


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Example: Get all exams
app.get("/api/exams", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM exams");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching exams" });
  }
});

// Safe JSON.parse helper
const safeParse = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return null;
  }
};

app.get("/api/exams/:id/questions", async (req, res) => {
  try {
    const examId = req.params.id;
    const [rows] = await pool.query("SELECT * FROM questions WHERE exam_id = ?", [examId]);

    const parsed = rows.map(q => ({
      ...q,
      options: q.options,   // MySQL already returns JSON → no need to parse
      answer: q.answer
    }));

    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching questions" });
  }
});



// Add question (flexible JSON storage)
app.post("/api/exams/:id/questions", async (req, res) => {
  try {
    const examId = req.params.id;
    const { question_text, question_type, options, answer } = req.body;

    await pool.query(
      "INSERT INTO questions (exam_id, question_text, question_type, options, answer) VALUES (?, ?, ?, ?, ?)",
      [
        examId,
        question_text,
        question_type,
        JSON.stringify(options || null),
        JSON.stringify(answer || null),
      ]
    );

    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding question" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


