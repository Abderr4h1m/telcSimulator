// src/pages/ExamPage.jsx
import React, { useState } from "react";
import SprachbausteineTeil1 from "../components/Sprachbausteine/SprachbausteineTeil1";
import SprachbausteineTeil2 from "../components/Sprachbausteine/SprachbausteineTeil2";
import LesenTeil1 from "../components/Lesen/LesenTeil1";
import LesenTeil2 from "../components/Lesen/LesenTeil2";
import LesenTeil3 from "../components/Lesen/LesenTeil3";

export default function ExamPage({ examId = 1, onResultsReady }) {
  // accumulated per-question answers
  // shape: { [questionId]: <payload> }
  const [answersMap, setAnswersMap] = useState({});

  const mergeAnswers = (partial) => {
    // partial should be: { [questionId]: payload }
    setAnswersMap(prev => ({ ...prev, ...partial }));
  };

  const handleAbgabe = async () => {
    try {
      const res = await fetch(`/api/exams/${examId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answersMap }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "submit_failed");
      // inform parent / open results
      onResultsReady?.(data.attemptId, data);
      alert(`Gesamt: ${data.score_total} / ${data.max_total}`);
    } catch (e) {
      console.error(e);
      alert("Abgabe fehlgeschlagen.");
    }
  };

  return (
    <div>
      {/* pass per-part onSave that returns a map keyed by question_id */}
      <SprachbausteineTeil1 examId={examId} onSave={(mapByQuestionId) => mergeAnswers(mapByQuestionId)} />
      <SprachbausteineTeil2 examId={examId} onSave={(mapByQuestionId) => mergeAnswers(mapByQuestionId)} />
      <LesenTeil1 examId={examId} onSave={(mapByQuestionId) => mergeAnswers(mapByQuestionId)} />
      <LesenTeil2 examId={examId} onSave={(mapByQuestionId) => mergeAnswers(mapByQuestionId)} />
      <LesenTeil3 examId={examId} onSave={(mapByQuestionId) => mergeAnswers(mapByQuestionId)} />

      <button className="primary" onClick={handleAbgabe}>Abgabe</button>
    </div>
  );
}
