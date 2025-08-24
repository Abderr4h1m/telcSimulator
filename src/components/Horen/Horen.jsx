import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Horen.css";

const Horen = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleRedirect();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleRedirect = () => {
    if (redirecting) return;

    setRedirecting(true);
    navigate("/horen/teil1");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="horen-container">
      <div className="horen-card">
        <h2 className="horen-title">Hören Prüfung</h2>
        <div className="horen-content">
          <p className="rest-message">
            Sie haben <span className="time">{formatTime(timeLeft)}</span>{" "}
            Minuten Pause, bevor der Hörtest beginnt.
          </p>
          <p className="instruction">
            Wenn Sie bereit sind, klicken Sie auf die Karte, um sofort zum Test
            zu gelangen.
          </p>
        </div>
        <div className="horen-footer">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${100 - (timeLeft / (5 * 60)) * 100}%` }}
            ></div>
          </div>
          <button className="start-now-btn" onClick={handleRedirect}>
            Jetzt starten
          </button>
        </div>
      </div>
    </div>
  );
};

export default Horen;
