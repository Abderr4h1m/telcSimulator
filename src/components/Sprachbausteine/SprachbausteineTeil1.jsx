// src/components/Sprachbausteine/SprachbausteineTeil1.jsx
import React, { useEffect, useState } from "react";
import "./Sprachbausteine.css";

const SprachbausteineTeil1 = ({ examId = 1, onSave }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}/questions`);
        const data = await res.json();

        const cloze = data.filter((q) => q.question_type === "cloze");
        setQuestions(cloze);

        // init empty answers
        const initial = {};
        cloze.forEach((q) => {
          q.options?.content?.forEach((item) => {
            if (item.type === "cloze") initial[item.gap] = "";
          });
        });
        setAnswers(initial);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, [examId]);

  const handleChange = (gapId, value) => {
    setAnswers((prev) => ({ ...prev, [gapId]: value }));
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    if (onSave) onSave(answers);
  };

  return (
    <div className="telc-container">
      {questions.map((q) => (
        <div key={q.id} className="telc-grid">
        {/* LEFT: Passage */}
        <div className="telc-left">
          {q.options.content.map((item, idx) =>
            typeof item === "string" ? (
              <span key={`text-${idx}`}>{item}</span>
            ) : item.type === "cloze" ? (
              <span key={`gap-${item.gap}`} className="gap-placeholder">
                {answers[item.gap] ? (
                  <span className="gap-filled">
                    <span className="gap-number-inline">{item.gap}</span> {answers[item.gap]}
                  </span>
                ) : (
                  <span className="gap-empty">{item.gap}</span>
                )}
              </span>
            ) : null
          )}
        </div>

          {/* RIGHT: Options */}
          <div className="telc-right">
            {q.options.content
              .filter((item) => item.type === "cloze")
              .map((gap) => (
                <div key={gap.gap} className="telc-gap-options">
                  <span className="gap-number">{gap.gap}</span>
                  {gap.options.map((opt, i) => (
                    <label key={`${gap.gap}-${i}`} className="option-label">
                      <input
                        type="radio"
                        name={`gap-${gap.gap}`}
                        value={opt}
                        checked={answers[gap.gap] === opt}
                        onChange={() => handleChange(gap.gap, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ))}

      <button className="save-btn" onClick={handleSubmit}>
        Antworten speichern
      </button>
    </div>
  );
};

export default SprachbausteineTeil1;
