import React, { useEffect, useMemo, useState } from "react";
import "./LesenTeil3.css";

/**
 * Expected server payload shape (question_type: 'lesen3'):
 * {
 *   id, question_text, question_type: 'lesen3',
 *   options: {
 *     ads: [{ id: 'A', title: '...', text: '...' }, ... up to L],
 *     situations: [{ id: 1, text: '...' }, ... up to 10]
 *   }
 * }
 */

const FALLBACK = {
  ads: Array.from({ length: 12 }, (_, i) => ({
    id: String.fromCharCode(65 + i), // A..L
    title: `Anzeige ${String.fromCharCode(65 + i)}`,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius massa ut arcu varius, id gravida sapien vehicula."
  })),
  situations: [
    { id: 1, text: "Ein Bekannter möchte Schweden per Schiff kennenlernen." },
    { id: 2, text: "Ein Freund möchte sich im Inline-Skaten perfektionieren." },
    { id: 3, text: "Ein Kollege möchte sich über Gesundheitsrisiken in Ägypten informieren." },
    { id: 4, text: "Eine Bekannte möchte einen Kurs über Naturkosmetik besuchen." },
    { id: 5, text: "Eine 17-jährige Freundin will in anderen Ländern Menschen helfen." },
    { id: 6, text: "Ihr Nachbar möchte sich im Sommerurlaub sportlich betätigen." },
    { id: 7, text: "Ihre Freundin möchte gern bei der Organisation einer Veranstaltung mitwirken." },
    { id: 8, text: "Sie möchten Inline-Skaten erlernen und suchen Informationen." },
    { id: 9, text: "Sie möchten herausfinden, wo es Veranstaltungen gibt." },
    { id: 10, text: "Sie müssen kurzfristig Reisedokumente besorgen." }
  ]
};
// normalize ad body regardless of server key shape
function getAdBody(ad) {
  const raw =
    ad?.text ??
    ad?.body ??
    ad?.description ??
    ad?.content ??
    "";

  // if server sent an array (e.g., split paragraphs), join them nicely
  if (Array.isArray(raw)) return raw.join("\n\n");
  return String(raw);
}

function truncate(text, n = 60) {
  if (!text) return "";
  return text.length > n ? text.slice(0, n - 1) + "…" : text;
}

const LesenTeil3 = ({ examId = 1 }) => {
  const [ads, setAds] = useState([]);
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(true);

  // selection state
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState(null);

  // mappings
  const [adToSituation, setAdToSituation] = useState({});       // { A: 3, ... }
  const [situationToAd, setSituationToAd] = useState({});       // { 3: 'F', ... }
  const [xSet, setXSet] = useState(new Set());                  // Set<number>

  // --------- fetch data ----------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/exams/${examId}/questions`);
        if (!res.ok) throw new Error("Not OK");
        const data = await res.json();

        // find lesen3 question
        const q = (data || []).find((it) => it.question_type === "lesen3");
        if (q?.options?.ads && q?.options?.situations) {
          setAds(q.options.ads);
          setSituations(q.options.situations);
        } else {
          setAds(FALLBACK.ads);
          setSituations(FALLBACK.situations);
        }
      } catch (e) {
        // fall back to sample so the UI always renders
        setAds(FALLBACK.ads);
        setSituations(FALLBACK.situations);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [examId]);

  // convenience: used if there is a link OR x
  const usedSituationIds = useMemo(() => {
    const ids = new Set(Object.keys(situationToAd).map((k) => Number(k)));
    xSet.forEach((id) => ids.add(id));
    return ids;
  }, [situationToAd, xSet]);

  // --------- handlers ----------
  const clearAdLink = (adId) => {
    setAdToSituation((prev) => {
      const copy = { ...prev };
      const linked = copy[adId];
      if (linked != null) {
        setSituationToAd((prev2) => {
          const c2 = { ...prev2 };
          delete c2[linked];
          return c2;
        });
        delete copy[adId];
      }
      return copy;
    });
  };

  const linkAdAndSituation = (adId, situationId) => {
    // turn off X for that situation
    setXSet((prev) => {
      if (!prev.has(situationId)) return prev;
      const n = new Set(prev);
      n.delete(situationId);
      return n;
    });

    setAdToSituation((prev) => {
      const next = { ...prev };

      // free old situation from this ad (if any)
      if (next[adId] != null && next[adId] !== situationId) {
        setSituationToAd((p2) => {
          const copy2 = { ...p2 };
          delete copy2[next[adId]];
          return copy2;
        });
      }

      // if situation already used by another ad, free that ad
      setSituationToAd((p2) => {
        const copy2 = { ...p2 };
        const prevAd = copy2[situationId];
        if (prevAd && prevAd !== adId) {
          setAdToSituation((p3) => {
            const cp = { ...p3 };
            delete cp[prevAd];
            return cp;
          });
        }
        copy2[situationId] = adId;
        return copy2;
      });

      next[adId] = situationId;
      return next;
    });
  };

  const handleClickAd = (adId) => {
    // if selectedSituation present -> link immediately
    if (selectedSituation != null) {
      linkAdAndSituation(adId, selectedSituation);
      setSelectedAd(null);
      setSelectedSituation(null);
      return;
    }
    // if this ad is already linked and no situation selected -> clicking it clears
    if (adToSituation[adId] != null) {
      clearAdLink(adId);
      setSelectedAd(null);
      return;
    }
    // otherwise toggle selection
    setSelectedAd((prev) => (prev === adId ? null : adId));
  };

  const handleClickSituation = (sid) => {
    // selecting a situation while an ad is selected -> link
    if (selectedAd != null) {
      linkAdAndSituation(selectedAd, sid);
      setSelectedAd(null);
      setSelectedSituation(null);
      return;
    }
    // toggle selection of situation (only for linking)
    setSelectedSituation((prev) => (prev === sid ? null : sid));
  };

  const handleToggleX = (sid) => {
    setXSet((prev) => {
      const n = new Set(prev);
      const willActivate = !n.has(sid);

      // If activating X, unlink from any ad
      if (willActivate) {
        const ad = situationToAd[sid];
        if (ad) clearAdLink(ad);
        n.add(sid);
        // no situation stays selected when X-ing it
        if (selectedSituation === sid) setSelectedSituation(null);
      } else {
        n.delete(sid);
      }
      return n;
    });
  };

  const getSituationBadge = (sid) => {
    const adId = situationToAd[sid];
    if (!adId) return sid; // just the number
    return sid;
  };

  if (loading) return <div className="lt3">Loading…</div>;

  return (
    <div className="lt3">
      <div className="lt3-instruction">
        Lesen Sie die Anzeigen (A–L) und die Situationen (1–10). Ordnen Sie zu. Jede Situation passt zu
        höchstens einer Anzeige. Wählen Sie „x“, wenn keine Anzeige passt.
      </div>

      <div className="lt3-grid">
        {/* LEFT: Anzeigen (A–L) */}
        <div className="lt3-ads">
          {ads.map((ad) => {
            const linkedSituation = adToSituation[ad.id];
            const isSelected = selectedAd === ad.id;

            return (
              <div
                key={ad.id}
                className={`lt3-ad-card ${isSelected ? "is-selected" : ""}`}
                onClick={() => handleClickAd(ad.id)}
                role="button"
                tabIndex={0}
              >
                <div className="lt3-ad-header">
                  {/* Gap view: show either a small empty badge or a chip with number + text */}
                  {linkedSituation ? (
                    <span className="lt3-chip">
                      <span className="lt3-chip-num">{linkedSituation}</span>
                      <span className="lt3-chip-text">
                        {truncate(situations.find((s) => s.id === linkedSituation)?.text || "", 48)}
                      </span>
                    </span>
                  ) : (
                    <span className="lt3-badge">{ad.id}</span>
                  )}
                </div>

                <div className="lt3-ad-title">{ad.title}</div>
                <div className="lt3-ad-body">{getAdBody(ad)}</div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Situationen 1–10 */}
        <div className="lt3-situations">
          {situations.map((s) => {
            const selected = selectedSituation === s.id;
            const markedX = xSet.has(s.id);
            const linkedAd = situationToAd[s.id];
            const isUsed = Boolean(linkedAd) || markedX; // used => white

            return (
              <div
                key={s.id}
                className={`lt3-sit-card ${selected ? "is-selected" : ""} ${isUsed ? "is-used" : ""}`}
              >
                <div className="lt3-sit-row">
                  <span className="situation-number">{s.id}</span>

                  <div className="lt3-x-block">
                    <div
                      className={`lt3-x-circle ${markedX ? "active" : ""}`}
                      onClick={() => handleToggleX(s.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`X für Situation ${s.id}`}
                      title="Kein passender Text (X)"
                    >
                      {markedX ? "X" : ""}
                    </div>
                    <span className="lt3-x-label">x</span>
                  </div>

                  <div
                    className={`situation-text ${isUsed ? "used" : ""}`}
                    onClick={() => handleClickSituation(s.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {s.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* (Optional) Debug save */}
      {/* <button className="lt3-save" onClick={() => console.log({ adToSituation, x: Array.from(xSet) })}>
        Antworten speichern
      </button> */}
    </div>
  );
};

export default LesenTeil3;
