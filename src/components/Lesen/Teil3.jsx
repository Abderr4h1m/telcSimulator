import React, { useState } from "react";
import "./lesen.css";

export default function Teil3() {
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [matches, setMatches] = useState({});
  const [clickedSituations, setClickedSituations] = useState({});

  const handleSituationClick = (situationId) => {
    setSelectedSituation(situationId);
    // Mark this situation as clicked
    setClickedSituations({
      ...clickedSituations,
      [situationId]: true,
    });
  };

  const handleAdClick = (adId) => {
    if (selectedSituation) {
      // Check if this ad is already matched to another situation
      const adAlreadyUsed = Object.values(matches).includes(adId);

      if (adAlreadyUsed) {
        // Find which situation has this ad and remove it
        const situationId = Object.keys(matches).find(
          (key) => matches[key] === adId
        );
        const newMatches = { ...matches };
        delete newMatches[situationId];
        setMatches(newMatches);
      }

      // Set the new match
      setMatches({
        ...matches,
        [selectedSituation]: adId,
      });

      setSelectedSituation(null);
    }
  };

  const resetMatches = () => {
    setMatches({});
    setSelectedSituation(null);
    setClickedSituations({});
  };

  return (
    <>
      <div className="info-box">
        <p>Lesen Sie die zehn Situationen (1-10) und die zwölf Texte (A-L).</p>
        <p>
          Welcher Text passt zu welcher Situation? Sie können jeden Text nur
          einmal verwenden.
        </p>
        <p>
          Manchmal passt kein Text. Wählen Sie dann{" "}
          <span className="x-option">x</span>.
        </p>
      </div>
      <div className="matching-exercise">
        <div className="teil3-container">
          <div className="ads-column">
            <div className="ads-grid">
              {ads.map((ad) => {
                const isUsed = Object.values(matches).includes(ad.id);
                return (
                  <div
                    key={ad.id}
                    className={`ad-card ${isUsed ? "used" : ""} ${
                      selectedSituation ? "selectable" : ""
                    }`}
                    onClick={() => handleAdClick(ad.id)}
                  >
                    <div className="ad-header">
                      <span className="ad-id">{ad.id}</span>
                      <span className="ad-title">{ad.title}</span>
                    </div>
                    <div className="ad-text">{ad.text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="situations-column">
            {situations.map((situation) => (
              <div
                key={situation.id}
                className={`situation-card ${
                  selectedSituation === situation.id ? "selected" : ""
                } ${matches[situation.id] ? "matched" : ""}`}
                onClick={() => handleSituationClick(situation.id)}
              >
                <div className="situation-header">
                  <span className="situation-number">{situation.id}.</span>
                  <span className="match-indicator">
                    {matches[situation.id]
                      ? matches[situation.id]
                      : clickedSituations[situation.id]
                      ? "X"
                      : ""}
                  </span>
                </div>
                <div className="situation-text">{situation.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
