import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer, showResults } from "../../redux/examSlice.js";
import { LesenData } from "../../data.js";
import "./lesen.css";

const LesenTeil2Component = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.exam.answers.lesen?.teil2 || {});
  const showResult = useSelector((state) => state.exam.showResults);

  const teilItems = LesenData.teil2;

  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (teilItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * teilItems.length);
      setCurrentItem(teilItems[randomIndex]);
    }
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    if (!currentItem) return;
    dispatch(
      saveAnswer({
        section: "lesen",
        teil: "teil2",
        questionId,
        answer,
      })
    );
  };

  const handleSubmit = () => {
    dispatch(showResults());
  };

  if (!currentItem) return <p>Loading...</p>;

  return (
    <>
      <div className="info-box">
        Lesen Sie den Text und die Aufgaben. Entscheiden Sie anhand des Textes,
        welche Lösung richtig ist.
      </div>
      <div className="lesenteil2-container">
        <div className="lesenteil2-content">
          <div className="lesenteil2-text-section">
            <h3>{currentItem.title}</h3>
            <p>{currentItem.text}</p>
          </div>

          <div className="lesenteil2-questions-section">
            {currentItem.questions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={q.id} className="lesenteil2-question">
                  <p>{q.question_text}</p>
                  <div className="lesenteil2-options">
                    {["A", "B", "C"].map((option) => (
                      <div
                        key={option}
                        className={`lesenteil2-option ${
                          userAnswer === option ? "lesenteil2-selected" : ""
                        } ${
                          showResult
                            ? isCorrect
                              ? "correct"
                              : userAnswer === option
                              ? "wrong"
                              : ""
                            : ""
                        }`}
                        onClick={() => handleAnswerSelect(q.id, option)}
                      >
                        <input
                          type="radio"
                          checked={userAnswer === option}
                          readOnly
                        />
                        {option}: {q[`option_${option.toLowerCase()}`]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className="submit-btn">
        Antworten abschicken
      </button>
    </>
  );
};

export default LesenTeil2Component;
