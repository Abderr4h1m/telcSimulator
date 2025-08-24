import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../redux/examSlice";
import { LesenTeil1Data } from "../../data";
import "./lesen.css";

export default function Teil1() {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.exam.answers.lesen?.teil1 || {});

  const { texts, titles } = LesenTeil1Data;
  const [selectedText, setSelectedText] = useState(null);

  const handleTextClick = (id) => {
    setSelectedText(id);
  };

  const handleTitleClick = (titleId) => {
    if (!selectedText) return;
    dispatch(
      saveAnswer({
        section: "lesen",
        teil: "teil1",
        questionId: selectedText,
        answer: titleId,
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
        <div className="exam-titles">
          {titles.map((title, idx) => (
            <div
              key={title.id}
              className="exam-title"
              onClick={() => handleTitleClick(title.id)}
            >
              <strong>{String.fromCharCode(65 + idx)}.</strong> {title.text}
            </div>
          ))}
        </div>
        <div className="exam-texts-container">
          <div className="exam-texts">
            {texts.map((t, idx) => (
              <div
                key={t.id}
                className={`exam-text ${
                  selectedText === t.id ? "selected" : ""
                }`}
                onClick={() => handleTextClick(t.id)}
              >
                <strong>{idx + 1}.</strong> {t.content}
                {answers[t.id] && (
                  <div className="linked">
                    Gewählt:{" "}
                    {titles.find((title) => title.id === answers[t.id])?.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
