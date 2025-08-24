import React, { useState } from "react";
import "./Schreiben.css";

const Schreiben = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="schreiben-container">
      {/* Aufgabe A */}
      <div
        className={`schreiben-box ${selected === "B" ? "input-mode" : ""}`}
        onClick={() => setSelected("A")}
      >
        {selected === "B" ? (
          <textarea
            className="schreiben-input"
            placeholder="Schreiben Sie hier Ihre Antwort..."
          />
        ) : (
          <>
            <h2>Aufgabe A: Schriftlicher Ausdruck</h2>
            <p>
              In der Zeitung lesen Sie folgende Anzeige:
              <br />
              <strong>Secura Versicherungen AG</strong>
            </p>
            <p>
              Alle 4 Sekunden passiert in Deutschland ein Unfall – davon 71 % in
              der Freizeit und im Haushalt. Sollte Ihnen etwas zustoßen, bietet
              Ihnen unsere Unfallversicherung Schutz vor finanziellen Risiken...
            </p>
          </>
        )}
      </div>

      {/* Aufgabe B */}
      <div
        className={`schreiben-box ${selected === "A" ? "input-mode" : ""}`}
        onClick={() => setSelected("B")}
      >
        {selected === "A" ? (
          <textarea
            className="schreiben-input"
            placeholder="Schreiben Sie hier Ihre Antwort..."
          />
        ) : (
          <>
            <h2>Aufgabe B: Schriftlicher Ausdruck</h2>
            <p>
              Lesen Sie folgende Werbeanzeige:
              <br />
              <strong>Jugendcamp Silberstrand</strong>
            </p>
            <p>
              Urlaubsspaß mit internationalem Flair für junge Leute (17–25
              Jahre) an einem der herrlichsten deutschen Ostseestrände...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Schreiben;
