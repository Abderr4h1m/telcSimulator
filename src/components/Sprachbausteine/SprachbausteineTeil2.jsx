// src/components/Sprachbausteine/SprachbausteineTeil2.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./SprachbausteineTeil2.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function SprachbausteineTeil2({ examId = 1, onSave }) {
  const [question, setQuestion] = useState(null);

  // selections
  const [selectedGap, setSelectedGap] = useState(null);     // number/id of gap
  const [selectedWordIdx, setSelectedWordIdx] = useState(null); // index in words[]

  // answers and usage maps
  const [gapToWordIdx, setGapToWordIdx] = useState({});     // gapId -> wordIndex
  const [wordIdxToGap, setWordIdxToGap] = useState({});     // wordIndex -> gapId

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}/questions`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const all = await res.json();

        // pick the wordbank item
        const wb = all.find((q) => q.question_type === "wordbank");
        if (!wb) throw new Error("No wordbank question.");
        setQuestion(wb);

        // init gaps -> null
        const init = {};
        wb.options?.passage?.forEach((item) => {
          if (item && typeof item === "object" && "gap" in item) {
            init[item.gap] = null;
          }
        });
        setGapToWordIdx(init);
        setWordIdxToGap({});
      } catch (e) {
        console.error("Error fetching wordbank:", e);
      }
    };
    fetchQuestion();
  }, [examId]);

  const words = useMemo(() => question?.options?.words ?? [], [question]);

  // ----- helpers
  const assignWordToGap = (gapId, wordIndex) => {
    // compute next maps in one go (no nested setState)
    setGapToWordIdx((prevGap) => {
      const prevWord = { ...wordIdxToGap };      // use latest snapshot
      const nextGap   = { ...prevGap };

      // 1) If this word is already used in some gap, free that gap
      const fromGap = prevWord[wordIndex];
      if (fromGap != null) {
        nextGap[fromGap] = null;
      }

      // 2) If this target gap already had a word, free that word
      const oldIdx = nextGap[gapId];
      if (oldIdx != null) {
        prevWord[oldIdx] = null;
      }

      // 3) Place the word in target gap
      nextGap[gapId] = wordIndex;
      prevWord[wordIndex] = gapId;

      // sync the reverse map once
      setWordIdxToGap(prevWord);

      // clear selections
      setSelectedGap(null);
      setSelectedWordIdx(null);

      return nextGap;
    });
  };

  const clearGap = (gapId) => {
    setGapToWordIdx((prevGap) => {
      const nextGap = { ...prevGap };
      const curIdx = nextGap[gapId];
      if (curIdx != null) {
        nextGap[gapId] = null;
        setWordIdxToGap((prevWord) => ({ ...prevWord, [curIdx]: null }));
      }
      setSelectedGap(null);
      setSelectedWordIdx(null);
      return nextGap;
    });
  };
  // ----- clicks
  const handleGapClick = (gapId) => {
    // if a word is already selected, drop it here
    if (selectedWordIdx != null) {
      assignWordToGap(gapId, selectedWordIdx);
      return;
    }

    // toggle gap selection; clicking a filled gap with nothing selected clears it
    if (selectedGap === gapId) {
      // second click: if filled -> clear, else unselect
      const hadWord = gapToWordIdx[gapId] != null;
      if (hadWord) clearGap(gapId);
      setSelectedGap(null);
    } else {
      setSelectedGap(gapId);
    }
  };

  const handleWordClick = (index) => {
    // if a gap is selected, assign immediately
    if (selectedGap != null) {
      assignWordToGap(selectedGap, index);
      return;
    }
    // otherwise select the word (toggle)
    setSelectedWordIdx((cur) => (cur === index ? null : index));
  };

  const handleSubmit = () => {
    // produce gapId -> word string
    const payload = {};
    Object.entries(gapToWordIdx).forEach(([gapId, idx]) => {
      payload[gapId] = idx != null ? words[idx] : null;
    });
    if (onSave) onSave(payload);
    console.log("Teil 2 user answers:", payload);
  };

  if (!question) return <div>Loading…</div>;

  // ----- render
  return (
    <div className="lesen-container">
      <div className="lesen-instruction">
        Lesen Sie die Überschriften a–j und die Texte 1–5 und entscheiden Sie,
        welche Überschrift am besten zu welchem Text passt.
      </div>

    <div className="wb2">
      {/* LEFT: Passage with numbered gaps */}
      <div className="wb2-left">
        <div className="wb2-passage">
          {question.options.passage.map((item, i) => {
            if (typeof item === "string") {
              return <span key={`t-${i}`}>{item}</span>;
            }
            if (item && typeof item === "object" && "gap" in item) {
              const gapId = item.gap;
              const idx = gapToWordIdx[gapId];
              const filledWord = idx != null ? words[idx] : null;
              const isSel = selectedGap === gapId;

              return (
                <button
                  key={`g-${gapId}`}
                  className={`wb2-gap ${isSel ? "is-selected" : ""} ${
                    filledWord ? "is-filled" : ""
                  }`}
                  onClick={() => handleGapClick(gapId)}
                  type="button"
                >
                  <span className="wb2-gap-num">{gapId}</span>
                  <span className="wb2-gap-text">
                    {filledWord ?? "\u00A0"}{/* keep height */}
                  </span>
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* RIGHT: Wordbank (A… letter + word). Words stay visible; used ones turn “white”. */}
      <div className="wb2-right">
        {words.map((w, i) => {
          const isUsed = wordIdxToGap[i] != null;
          const isSelected = selectedWordIdx === i;
          return (
            <button
              key={`w-${i}`}
              className={`wb2-word ${isUsed ? "is-used" : ""} ${
                isSelected ? "is-selected" : ""
              }`}
              onClick={() => handleWordClick(i)}
              type="button"
              title={isUsed ? `Bereits verwendet in Lücke ${wordIdxToGap[i]}` : "Wort wählen"}
            >
              <span className="wb2-letter">{letters[i] ?? "?"}</span>
              <span className="wb2-word-text">{w}</span>
            </button>
          );
        })}
      </div>

      <div className="wb2-actions">
        <button className="save-btn" onClick={handleSubmit}>Antworten speichern</button>
      </div>
    </div></div>
  );
}
