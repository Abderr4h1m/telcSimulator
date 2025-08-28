import React, { useState } from "react";
import "./Sprachbausteine.css";

const SprachbausteineTeil1 = () => {
  // Sample data - in a real app, this would come from props or external file
  const data = {
    id: "1",
    title: "Deutschkurs Anmeldung",
    content: [
      "Sehr geehrte Frau Szabo, vielen Dank für Ihr Interesse",
      { type: "dropdown", id: 1, options: ["an", "bei", "in"], correct: "an" },
      "unseren Deutschkursen. Anbei erhalten Sie das angeforderte Anmeldeformular, das Sie bitte ausgefüllt an uns zurückschicken. Mit der Anmeldung überweisen Sie bitte eine Anzahlung",
      {
        type: "dropdown",
        id: 2,
        options: ["in Betrag", "in Höhe", "in Summe"],
        correct: "in Höhe",
      },
      "von € 200,- auf unser Konto. Die Kontoverbindung finden Sie unten auf dem Anmeldeformular.",
      {
        type: "dropdown",
        id: 3,
        options: ["für", "zur", "Zwecks"],
        correct: "Zwecks",
      },
      "besserer Einschätzung Ihrer Vorkenntnisse haben wir einen Einstufungstest beigelegt. Wenn Sie die Tetsbögen ausfüllen und mit der Anmeldung an uns zurücksenden, helfen Sie uns bei der Kursplanung. Ein mündlicher Test wird sich am ersten Unterrichtstag in unserer Schule",
      {
        type: "dropdown",
        id: 4,
        options: ["angeschlossen", "anschließen", "anschließen an"],
        correct: "anschließen",
      },
      ". Damit sind wir in der Lage, den für Sie angemessenen Kurs auszuwählen. Außerdem finden Sie in den Unterlagen einen Fragenbogen",
      {
        type: "dropdown",
        id: 5,
        options: ["anlässlich", "bezüglich", "mittels"],
        correct: "bezüglich",
      },
      "Ihrer Freizeitinteressen. Wir werden uns bemühen, Ihnen den Aufenthalt in Leipzig so angenehm",
      {
        type: "dropdown",
        id: 6,
        options: ["als", "wenn", "wie"],
        correct: "wie",
      },
      "möglich zu gestalten. Schließlich füllen Sie bitte das grüne Unterkunftblatt aus. Sie können wählen zwischen einem 3-Sterne-Hotel,",
      {
        type: "dropdown",
        id: 7,
        options: ["ein", "einem", "einer"],
        correct: "einer",
      },
      "Privatunterkunft in einer deutschen Gastfamilie oder der Unterkunft in einem Studentenwohnheim. Letzteres ist nur in den Semesterferien der Universität - in der Regel vom 15.2. bis 15.4. und vom 15.7. bis 15.10. - möglich. Geben Sie bitte auch Ihre Verpflegungswünsche - Frühstück oder Halbpension - an. Beachten Sie aber, dass im Studentenwohnheim nur Selbstverpflegung möglich ist.",
      {
        type: "dropdown",
        id: 8,
        options: ["Sobald", "Sofort", "Sooft"],
        correct: "Sobald",
      },
      "Ihre Anmeldung bei uns eingegangen ist, erhalten Sie eine Anmeldebestätigung und einen Stadtplan mit Wegbeschreibung,",
      {
        type: "dropdown",
        id: 9,
        options: ["dafür", "damit", "dazu"],
        correct: "damit",
      },
      "Sie den Weg zu uns ohne Umstände finden. Die Adresse Ihrer Unterkunft erhalten Sie ca. 2 Wochen vor Kursbeginn.",
      {
        type: "dropdown",
        id: 10,
        options: ["bei", "Für", "Zu"],
        correct: "Für",
      },
      "weitere Fragen steht Ihnen unser Sekretariat gerne montags bis freitags von 8 bis 18 Uhr zur Verfügung. Mit freundlichen Grüßen Gerhard Dietz Direktor",
    ],
  };

  const dropdowns = data.content.filter((c) => c.type === "dropdown");

  const [answers, setAnswers] = useState(Array(dropdowns.length).fill(""));
  const [selectedGap, setSelectedGap] = useState(null);

  const handleGapClick = (index) => setSelectedGap(index);

  const handleOptionClick = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Create a gap index mapping
  let gapIndex = 0;

  return (
    <div className="sp1-container">
      <h2 className="sp1-title">{data.title}</h2>
      <div className="sp1-wrapper">
        {/* LEFT: Options for each blank */}
        <div className="sp1-left">
          <h3>Options</h3>
          {dropdowns.map((drop, i) => (
            <div key={i} className="sp1-options">
              <p className="sp1-option-title">{i + 1}.</p>
              <div className="sp1-option-list">
                {drop.options.map((opt, j) => (
                  <label key={j} className="sp1-option-label">
                    <input
                      type="radio"
                      name={`gap-${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => handleOptionClick(opt, i)}
                    />
                    <span className="sp1-option-text">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Text with clickable blanks */}
        <div className="sp1-right">
          <h3>Text with Gaps</h3>
          <div className="sp1-text">
            {data.content.map((part, idx) => {
              if (typeof part === "string") {
                return <span key={idx}>{part} </span>;
              } else {
                // This is a dropdown gap
                const currentGapIndex = gapIndex;
                gapIndex++;

                return (
                  <span
                    key={part.id}
                    className={`sp1-blank ${
                      selectedGap === currentGapIndex
                        ? "sp1-blank-selected"
                        : ""
                    } ${
                      answers[currentGapIndex]
                        ? "sp1-blank-filled"
                        : "sp1-blank-empty"
                    }`}
                    onClick={() => handleGapClick(currentGapIndex)}
                  >
                    {answers[currentGapIndex] || `[${currentGapIndex + 1}]`}
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprachbausteineTeil1;
