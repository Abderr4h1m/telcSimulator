// src/components/Lesen/LesenTeil1.jsx
import React, { useEffect, useState } from "react";
import "./LesenTeil1.css";

const LesenTeil1 = ({ examId = 1, onSave }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState({});        // { [gapId]: 'A' | 'B' | ... }
  const [selectedGap, setSelectedGap] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  // Fetch the Lesen Teil 1 question
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}/questions`);
        const data = await res.json();
        const lesen = data.find((q) => q.question_type === "lesen1");
        setQuestion(lesen);

        if (lesen?.options?.passages) {
          // initialize answers {1:null, 2:null, ...}
          const initial = {};
          lesen.options.passages.forEach((p) => (initial[p.id] = null));
          setAnswers(initial);
        }
      } catch (err) {
        console.error("Error fetching Lesen Teil 1:", err);
      }
    };
    fetchData();
  }, [examId]);

  // Utility: is a title already used in any gap?
  const isTitleUsed = (titleId) => Object.values(answers).includes(titleId);

  // Click a gap
  const handleGapClick = (gapId) => {
    // If this gap already has a title → clear it (free the gap & make title available)
    if (answers[gapId]) {
      setAnswers((prev) => ({ ...prev, [gapId]: null }));
      setSelectedGap(null);
      return;
    }

    // If a title was preselected → place it here (also remove from any other gap)
    if (selectedTitle) {
      setAnswers((prev) => {
        const next = { ...prev };
        // Enforce uniqueness: remove selectedTitle from any other gap
        Object.keys(next).forEach((g) => {
          if (next[g] === selectedTitle) next[g] = null;
        });
        next[gapId] = selectedTitle;
        return next;
      });
      setSelectedTitle(null);
      setSelectedGap(null);
      return;
    }

    // Otherwise just select this gap (wait for a title click)
    setSelectedGap((prev) => (prev === gapId ? null : gapId));
  };

  // Click a title
  const handleTitleClick = (titleId) => {
    // If a gap is selected → assign immediately (also enforce uniqueness)
    if (selectedGap) {
      setAnswers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((g) => {
          if (next[g] === titleId) next[g] = null; // remove from any other gap
        });
        next[selectedGap] = titleId;
        return next;
      });
      setSelectedGap(null);
      setSelectedTitle(null);
      return;
    }

    // If no gap is selected:
    // - If the title is already used, keep it inert (can’t select it first)
    // - Otherwise select the title (wait for a gap click)
    if (isTitleUsed(titleId)) return;
    setSelectedTitle((prev) => (prev === titleId ? null : titleId));
  };

  const handleSubmit = () => {
    // answers looks like { "1":"B", "2":"G", ... }
    console.log("Lesen Teil 1 user answers:", answers);
    if (onSave) onSave(answers);
  };

  if (!question) return <div>Loading...</div>;

  // Helper for rendering the chosen title text inside a gap
  const titleText = (id) =>
    question.options.titles.find((t) => t.id === id)?.text || "";

  return (
    <div className="lesen-container">
      <div className="lesen-instruction">
        Lesen Sie die Überschriften a–j und die Texte 1–5 und entscheiden Sie,
        welche Überschrift am besten zu welchem Text passt.
      </div>

      <div className="lesen-grid">
        {/* LEFT: Passages */}
        <div className="lesen-left">
          {question.options.passages.map((p) => {
            const filled = answers[p.id];
            return (
              <div key={p.id} className="lesen-passage">
                <div
                  className={`lesen-gap ${
                    selectedGap === p.id ? "selected" : ""
                  } ${filled ? "filled" : ""}`}
                  onClick={() => handleGapClick(p.id)}
                  title={
                    filled
                      ? "Klicken, um die Auswahl zu entfernen"
                      : "Klicken und eine Überschrift wählen"
                  }
                >
                  {filled ? `${p.id}. ${titleText(filled)}` : `...${p.id}...`}
                </div>
                <div className="lesen-text">{p.text}</div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Titles */}
        <div className="lesen-right">
          {question.options.titles.map((t) => {
            const used = isTitleUsed(t.id);
            const isSelected = selectedTitle === t.id;
            return (
              <button
                type="button"
                key={t.id}
                className={`lesen-title ${used ? "used" : ""} ${
                  isSelected ? "title-selected" : ""
                } ${selectedGap ? "clickable" : ""}`}
                onClick={() => handleTitleClick(t.id)}
                disabled={used && !selectedGap} // can’t pick used title unless a gap is selected (we move it)
                title={
                  used && !selectedGap
                    ? "Diese Überschrift ist bereits verwendet"
                    : "Klicken, um diese Überschrift zuzuweisen"
                }
              >
                <span className="lesen-title-id">{t.id}.</span> {t.text}
              </button>
            );
          })}
        </div>
      </div>

      <button className="lesen-save" onClick={handleSubmit}>
        Antworten speichern
      </button>
    </div>
  );
};

export default LesenTeil1;
