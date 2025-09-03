// src/components/Lesen/LesenTeil2.jsx
import React, { useEffect, useState } from "react";
import "./LesenTeil2.css";

const LesenTeil2 = ({ examId = 1, onSave }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState({}); // { [qId]: 'A'|'B'|'C' }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}/questions`);
        const data = await res.json();
        const lesen2 = data.find((q) => q.question_type === "lesen2");
        setQuestion(lesen2);

        if (lesen2?.options?.questions) {
          const initial = {};
          lesen2.options.questions.forEach((q) => (initial[q.id] = null));
          setAnswers(initial);
        }
      } catch (err) {
        console.error("Error fetching Lesen Teil 2:", err);
      }
    };
    fetchData();
  }, [examId]);

  const handleSelect = (qid, choiceId) => {
    setAnswers((prev) => ({ ...prev, [qid]: choiceId }));
  };

  const handleSubmit = () => {
    // answers like { "1":"A","2":"C",... }
    console.log("Lesen Teil 2 user answers:", answers);
    if (onSave) onSave(answers);
  };

  if (!question) return <div>Loading…</div>;

  const { passage, questions } = question.options;

  return (
    <div className="lt2-container">
      <div className="lt2-instruction">
        Lesen Sie den Text und die Aufgaben. Entscheiden Sie anhand des Textes,
        welche Lösung richtig ist.
      </div>

      <div className="lt2-grid">
        {/* LEFT: Passage */}
        <div className="lt2-left">
          <div className="lt2-card lt2-passage">
            <div className="lt2-passage-title">Freizeitbegriff</div>
            <div className="lt2-passage-body">{passage}</div>
          </div>
        </div>

        {/* RIGHT: Questions */}
        <div className="lt2-right">
          {questions.map((q, idx) => (
            <div key={q.id} className="lt2-card lt2-question">
              <div className="lt2-q-title">
                <span className="lt2-q-number">{idx + 1}.</span>{" "}
                <span>{q.text}</span>
              </div>

              <div className="lt2-choices">
                {q.choices.map((c) => (
                  <label key={c.id} className="lt2-choice">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={c.id}
                      checked={answers[q.id] === c.id}
                      onChange={() => handleSelect(q.id, c.id)}
                    />
                    <span className="lt2-choice-letter">{c.id}</span>
                    <span>{c.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="lt2-save" onClick={handleSubmit}>
        Antworten speichern
      </button>
    </div>
  );
};

export default LesenTeil2;
