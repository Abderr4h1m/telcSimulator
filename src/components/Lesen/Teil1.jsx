// src/components/Lesen/Teil1.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../redux/examSlice";
import { LesenData } from "../../data";
import "./lesen.css";

export default function Teil1() {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.exam.answers.lesen?.teil1 || {});

  const { texts, titles } = LesenData.teil1;
  const [selectedText, setSelectedText] = useState(null);

  // ✅ Select text
  const handleTextClick = (id) => setSelectedText(id);

  // ✅ Link selected title to selected text
  const handleTitleClick = (titleId) => {
    if (!selectedText) return;
    dispatch(
      saveAnswer({
        section: "lesen",
        teil: "teil1",
        questionId: selectedText,
        answer: titleId, // store just A,B,C... as given in titles
      })
    );
    setSelectedText(null);
  };

  return (
    <>
      <div className="info-box">
        Lesen Sie die Überschriften a–j und die Texte 1–5 und entscheiden Sie,
        welche Überschrift am besten zu welchem Text passt.
      </div>

      <div className="exam-container">
        {/* --- Titles (A–J) --- */}
        <div className="exam-titles">
          {titles.map((title, idx) => (
            <div
              key={title.id}
              className={`exam-title ${selectedText ? "active-title" : ""}`}
              onClick={() => handleTitleClick(title.id)}
            >
              <strong>{String.fromCharCode(65 + idx)}.</strong> {title.text}
            </div>
          ))}
        </div>

        {/* --- Texts (1–5) --- */}
        <div className="exam-texts-container">
          <div className="exam-texts">
            {texts.map((t, idx) => {
              const userAnswer = answers[t.id];

              return (
                <div
                  key={t.id}
                  className={`exam-text ${
                    selectedText === t.id ? "selected" : ""
                  }`}
                  onClick={() => handleTextClick(t.id)}
                >
                  <strong>{idx + 1}.</strong> {t.content}
                  {userAnswer && (
                    <div className="linked">
                      Gewählt:{" "}
                      {titles.find((title) => title.id === userAnswer)?.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
