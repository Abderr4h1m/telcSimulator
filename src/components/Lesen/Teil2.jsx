import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../redux/examSlice.js";
import { LesenTeil2 } from "../../data.js";
import "./lesen.css";
import { Link } from "react-router-dom";

const Exam = () => {
  const dispatch = useDispatch();
  const { answers } = useSelector((state) => state.exam);

  const section = "lesen";
  const teil = 2;

  // Filter items where teil=2 and text exists
  const teilItems = LesenTeil2.filter(
    (item) => item.teil === teil && item.text?.trim() !== ""
  );

  // State for current item to display
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (teilItems.length === 0) return;
    // Choose random item ONCE
    const randomIndex = Math.floor(Math.random() * teilItems.length);
    setCurrentItem(teilItems[randomIndex]);
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    if (!currentItem) return;
    dispatch(
      saveAnswer({
        section,
        teil: currentItem.id,
        questionId,
        answer,
      })
    );
  };

  const handleSubmit = () => {
    console.log(
      "User answers for this item:",
      answers[section]?.[currentItem?.id] || {}
    );
    alert("Answers saved!");
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
          {/* Text Section (60% width, scrollable) */}
          <div className="lesenteil2-text-section">
            <h3 className="lesenteil2-title">{currentItem.title}</h3>
            <div className="lesenteil2-text-content">
              <p>{currentItem.text}</p>
            </div>
          </div>

          {/* Questions Section (40% width) */}
          <div className="lesenteil2-questions-section">
            {currentItem.questions.map((question) => (
              <div key={question.id} className="lesenteil2-question">
                <p className="lesenteil2-question-text">
                  {question.question_text}
                </p>
                <div className="lesenteil2-options">
                  {["A", "B", "C"].map((option) => (
                    <div
                      key={option}
                      className={`lesenteil2-option ${
                        answers?.[section]?.[currentItem.id]?.[question.id] ===
                        option
                          ? "lesenteil2-selected"
                          : ""
                      }`}
                      onClick={() => handleAnswerSelect(question.id, option)}
                    >
                      <input
                        type="radio"
                        id={`q${currentItem.id}_${question.id}_${option}`}
                        name={`q${currentItem.id}_${question.id}`}
                        checked={
                          answers?.[section]?.[currentItem.id]?.[
                            question.id
                          ] === option
                        }
                        readOnly
                      />
                      <label
                        htmlFor={`q${currentItem.id}_${question.id}_${option}`}
                      >
                        {option}: {question[`option_${option.toLowerCase()}`]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Link to="/lesen/teil3">
              <button className="lesenteil2-submit-btn">Anschlisend</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exam;
