import React, { useState, useRef } from "react";
import "./horen.css";

const HorenTeil1 = () => {
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const questions = [
    "Laut BILD AM SONNTAG können in Zukunft nur Mieter, aber nicht Vermieter bestimmte Mietverträge schneller kündigen.",
    "In bestimmten Bundesländern sollen Wohnhäuser abgerissen werden, weil sie unbewohnt sind.",
    "Sowohl die Waldbrände als auch die Hitzewelle in Griechenland sind zu Ende.",
    "In Kanada mussten die Bergungsarbeiten nach einem Tornado wegen erneuter Unwetterwarnungen eingestellt werden.",
    "Bei einem Fährunglück in der Nähe von Gibraltar gab es nur Sachschaden.",
  ];

  const handleAnswerSelect = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const togglePlayPause = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => setIsPlaying(false);

  return (
    <>
      {" "}
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
              {questions.map((q, i) => (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td style={{ textAlign: "left" }}>{q}</td>
                  <td>
                    <div
                      className={`horen-radio correct ${
                        answers[i] === true ? "selected" : ""
                      }`}
                      onClick={() => handleAnswerSelect(i, true)}
                    >
                      {answers[i] === true && "✓"}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`horen-radio incorrect ${
                        answers[i] === false ? "selected" : ""
                      }`}
                      onClick={() => handleAnswerSelect(i, false)}
                    >
                      {answers[i] === false && "✗"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}></div>

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
