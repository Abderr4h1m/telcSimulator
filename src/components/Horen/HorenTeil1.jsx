// HorenTeil1.jsx
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../redux/examSlice";
import { HorenData } from "../../data";
import "./horen.css";

const HorenTeil1 = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // jib jawabat mn Redux
  const answers = useSelector(
    (state) => state.exam.answers?.horen?.teil1 || {}
  );

  const questions = HorenData.teil1; // dynamic questions

  const togglePlayPause = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => setIsPlaying(false);

  const handleAnswerSelect = (id, value) => {
    dispatch(
      saveAnswer({
        section: "horen",
        teil: "teil1",
        questionId: id,
        answer: value,
      })
    );
    console.log("Current answers:", {
      ...answers,
      [id]: value,
    });
  };

  return (
    <>
      <div className="info-box">
        Sie hören die Nachrichten. Entscheiden Sie beim Hören, ob die Aussagen
        richtig oder falsch sind. Sie hören die Nachrichten nur einmal. Sie
        haben jetzt 30 Sekunden, um die Aussagen zu lesen.
      </div>

      <div className="horen-wrapper">
        <div className="horen-audio-container">
          <audio
            ref={audioRef}
            onEnded={handleAudioEnd}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            <source src="/beatM9awed.mp3" type="audio/mpeg" />
            Ihr Browser unterstützt das Audio-Element nicht.
          </audio>

          <button
            className="horen-play-btn"
            style={{
              backgroundColor: isPlaying
                ? "rgb(199, 68, 12)"
                : "rgb(1, 124, 145)",
            }}
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <>
                <span style={{ marginRight: "8px" }}>❚❚</span> Pause
              </>
            ) : (
              <>
                <span style={{ marginRight: "8px" }}>▶</span> Abspielen
              </>
            )}
          </button>
        </div>

        <div className="horen-table-container">
          <table className="horen-table">
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Aussage</th>
                <th>RICHTIG</th>
                <th>FALSCH</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.id}.</td>
                  <td style={{ textAlign: "left" }}>{q.text}</td>
                  <td>
                    <div
                      className={`horen-radio correct ${
                        answers[q.id] === true ? "selected" : ""
                      }`}
                      onClick={() => handleAnswerSelect(q.id, true)}
                    >
                      {answers[q.id] === true && "✓"}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`horen-radio incorrect ${
                        answers[q.id] === false ? "selected" : ""
                      }`}
                      onClick={() => handleAnswerSelect(q.id, false)}
                    >
                      {answers[q.id] === false && "✗"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="horen-instructions">
          <h4>Hinweise:</h4>
          <ul>
            <li>Klicken Sie auf "Abspielen", um die Nachrichten zu hören</li>
            <li>Wählen Sie für jede Aussage "Richtig" oder "Falsch"</li>
            <li>Sie können die Aufnahme nur einmal abspielen</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HorenTeil1;
