import React, { useState } from "react";
import "./lesen.css";

export default function Teil3() {
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [matches, setMatches] = useState({});
  const [clickedSituations, setClickedSituations] = useState({});

  const situations = [
    { id: 1, text: "Ein Bekannter möchte Schweden per Schiff kennenlernen." },
    { id: 2, text: "Ein Freund möchte sich im Inline-Skaten perfektionieren." },
    {
      id: 3,
      text: "Ein Kollege möchte sich über Gesundheitsrisiken in Ägypten informieren.",
    },
    {
      id: 4,
      text: "Eine Bekannte möchte einen Kurs über Naturkosmetik besuchen.",
    },
    {
      id: 5,
      text: "Eine 17-jährige Freundin würde gerne armen Menschen in anderen Ländern helfen.",
    },
    {
      id: 6,
      text: "Ihr Nachbar möchte sich im Sommerurlaub sportlich betätigen.",
    },
    {
      id: 7,
      text: "Ihre Freundin möchte gerne bei der Organisation einer Inline-Skate-Veranstaltung mitwirken.",
    },
    {
      id: 8,
      text: "Sie möchten das Inline-Skaten erlernen und suchen Informationen.",
    },
    {
      id: 9,
      text: "Sie möchten herausfinden, wo es in Deutschland Skate-Veranstaltungen gibt.",
    },
    {
      id: 10,
      text: "Sie möchten herausfinden, wo es in Deutschland Skate-Veranstaltungen gibt.",
    },
  ];

  const ads = [
    {
      id: "A",
      title: "Schweden-Kreuzfahrt",
      text: "Entdecken Sie die schönsten Schären Schwedens auf einer luxuriösen Kreuzfahrt.",
    },
    {
      id: "B",
      title: "Inline-Skating Workshop",
      text: "Professionelle Anleitung für Fortgeschrittene. Verbessern Sie Ihre Technik!",
    },
    {
      id: "C",
      title: "Gesundheitsrisiken im Ausland",
      text: "Umfassende Informationen zu Gesundheitsgefahren in Ägypten und anderen Ländern.",
    },
    {
      id: "D",
      title: "Naturkosmetik-Seminar",
      text: "Lernen Sie, Ihre eigenen Kosmetikprodukte aus natürlichen Zutaten herzustellen.",
    },
    {
      id: "E",
      title: "Jugend-Freiwilligenarbeit",
      text: "Hilfsprojekte für Jugendliche ab 16 Jahren in Entwicklungsländern.",
    },
    {
      id: "F",
      title: "Aktiver Sommerurlaub",
      text: "Sport- und Aktivreisen für jeden Fitnesslevel. Jetzt buchen!",
    },
    {
      id: "G",
      title: "Veranstaltungshelfer gesucht",
      text: "Unterstützung bei der Organisation des Inline-Skate-Marathons gesucht.",
    },
    {
      id: "H",
      title: "Inline-Skating für Anfänger",
      text: "Kurse für Einsteiger aller Altersgruppen. Leihausrüstung verfügbar.",
    },
    {
      id: "I",
      title: "Skate-Event-Kalender",
      text: "Übersicht aller Skate-Veranstaltungen in Deutschland. Immer aktuell.",
    },
    {
      id: "J",
      title: "Veranstaltungshelfer gesucht",
      text: "Unterstützung bei der Organisation des Inline-Skate-Marathons gesucht.",
    },
    {
      id: "K",
      title: "Inline-Skating für Anfänger",
      text: "Kurse für Einsteiger aller Altersgruppen. Leihausrüstung verfügbar.",
    },
    {
      id: "L",
      title: "Skate-Event-Kalender",
      text: "Übersicht aller Skate-Veranstaltungen in Deutschland. Immer aktuell.",
    },
  ];

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
