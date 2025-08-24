import React, { useState } from "react";
import "./Sprachbausteine.css";

const SprachbausteineTeil2 = ({ onSave }) => {
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [selectedGap, setSelectedGap] = useState(null);

  const words = [
    "AN",
    "AUF",
    "AUFGRUND",
    "BEHEBEN",
    "BESCHEIDEN",
    "DRASTISCH",
    "ERHÖHEN",
    "FÜR",
    "IM",
    "NACH",
    "RECHNEN",
    "STATT",
    "STEIGEN",
    "ÜBERHEBLICH",
    "UNSCHWER",
  ].sort(); // ✅ sorted alphabetically

  const handleGapClick = (index) => setSelectedGap(index);

  const handleWordClick = (word) => {
    if (selectedGap !== null) {
      const newAnswers = [...answers];
      newAnswers[selectedGap] = word;
      setAnswers(newAnswers);
      setSelectedGap(null);
    }
  };

  return (
    <>
      <div className="info-box">
        Lesen Sie den Text und entscheiden Sie, welches Wort in welche Lücke
        passt. Sie können jedes Wort nur einmal verwenden. Nicht alle Wörter
        passen in den Text.
      </div>
      <div className="sp2-wrapper">
        {/* LEFT: Text with gaps */}
        <div className="sp2-left">
          <p>
            <strong>Sehr geehrte Frau Szabo,</strong>
          </p>
          <p>vielen Dank für Ihr Interesse an unseren Deutschkursen.</p>
          <p>
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 0 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[0] ? "600" : "400",
                color: answers[0] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(0)}
            >
              {answers[0] || "1"}
            </span>{" "}
            erhalten Sie das angeforderte Anmeldeformular, das Sie bitte
            ausgefüllt an uns zurückschicken. Mit der Anmeldung überweisen Sie
            bitte eine Anzahlung{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 1 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[1] ? "600" : "400",
                color: answers[1] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(1)}
            >
              {answers[1] || "2"}
            </span>{" "}
            von € 200,- auf unser Konto. Die Kontoverbindung finden Sie unten
            auf dem Anmeldeformular{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 2 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[2] ? "600" : "400",
                color: answers[2] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(2)}
            >
              {answers[2] || "3"}
            </span>{" "}
            genaueren Einschätzung Ihrer Vorkenntnisse haben wir einen
            Einstufungstest beigelegt.
          </p>

          <p>
            Wenn Sie die Testbögen ausfüllen und mit der Anmeldung an uns
            zurücksenden, helfen Sie uns bei der Kursplanung. Am ersten
            Unterrichtstag in unserer Schule wird sich{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 3 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[3] ? "600" : "400",
                color: answers[3] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(3)}
            >
              {answers[3] || "4"}
            </span>{" "}
            ein mündlicher Test anschließen. Damit sind wir in der Lage, den für
            Sie angemessenen Kurs auszuwählen.
          </p>

          <p>
            Außerdem finden Sie in den Unterlagen einen Fragebogen{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 4 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[4] ? "600" : "400",
                color: answers[4] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(4)}
            >
              {answers[4] || "5"}
            </span>{" "}
            Ihrer Freizeitinteressen, denn wir werden uns bemühen, Ihren
            Aufenthalt in Leipzig{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 5 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[5] ? "600" : "400",
                color: answers[5] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(5)}
            >
              {answers[5] || "6"}
            </span>{" "}
            angenehm zu gestalten.
          </p>

          <p>
            Schließlich füllen Sie bitte das grüne Unterkunftblatt aus. Sie
            können wählen zwischen einem 3-Sterne-Hotel,{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 6 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[6] ? "600" : "400",
                color: answers[6] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(6)}
            >
              {answers[6] || "7"}
            </span>{" "}
            Privatunterkunft in einer deutschen Gastfamilie oder der Unterkunft
            in einem Studentenwohnheim. Letzteres ist nur in den Semesterferien
            der Universität - in der Regel vom 15.2. bis 15.4. und vom 15.7. bis
            15.10. - möglich.
          </p>

          <p>
            Geben Sie bitte auch Ihre Verpflegungswünsche - Frühstück oder
            Halbpension - an. Beachten Sie aber, dass im Studentenwohnheim nur
            Selbstverpflegung möglich ist.{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 7 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[7] ? "600" : "400",
                color: answers[7] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(7)}
            >
              {answers[7] || "8"}
            </span>{" "}
            Ihre Anmeldung bei uns eingegangen ist, erhalten Sie eine
            Anmeldebestätigung und einen Stadtplan mit Wegbeschreibung.{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 8 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[8] ? "600" : "400",
                color: answers[8] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(8)}
            >
              {answers[8] || "9"}
            </span>{" "}
            Sie den Weg zu uns ohne Umstände finden.
          </p>

          <p>
            Die Adresse Ihrer Unterkunft erhalten Sie ca. 2 Wochen vor
            Kursbeginn{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "100px",
                margin: "0 5px",
                padding: "6px 10px",
                borderBottom: "2px dashed #4c6ef5",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedGap === 9 ? "#e3f2fd" : "#f8f9fa",
                borderRadius: "4px",
                fontWeight: answers[9] ? "600" : "400",
                color: answers[9] ? "#2c3e50" : "#6c757d",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onClick={() => handleGapClick(9)}
            >
              {answers[9] || "10"}
            </span>{" "}
            weitere Fragen steht Ihnen unser Sekretariat gerne montags bis
            freitags von 8 bis 18 Uhr zur Verfügung.
          </p>

          <p
            style={{
              textAlign: "right",
              fontStyle: "italic",
              marginTop: "30px",
            }}
          >
            Mit freundlichen Grüßen
            <br />
            Gerhard Dietz
            <br />
            Direktor
          </p>
        </div>

        {/* RIGHT: Word list */}
        <div className="sp2-right">
          <div className="sp2-words">
            {words.map((word, i) => (
              <button
                key={i}
                className="sp2-word"
                onClick={() => handleWordClick(word)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SprachbausteineTeil2;
