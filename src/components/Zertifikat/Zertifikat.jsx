// src/components/Zertifikat/Zertifikat.jsx
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { HorenData, LesenData } from "../../data";
import "./Zertifikat.css";

const Zertifikat = () => {
  const certRef = useRef();
  const answers = useSelector((state) => state.exam.answers);

  // --- Hören Punkte ---
  // --- Hören Punkte ---
  const calcHorenScore = () => {
    let teil1 = 0,
      teil2 = 0,
      teil3 = 0;

    // Teil 1
    HorenData.teil1.forEach((q) => {
      const userAnswer = answers?.horen?.teil1?.[q.id] || null;
      if (
        userAnswer &&
        (q.correctAnswer || "").toUpperCase() === userAnswer.toUpperCase()
      ) {
        teil1 += 5;
      }
    });

    // Teil 2
    HorenData.teil2.forEach((q) => {
      const userAnswer = answers?.horen?.teil2?.[q.id] || null;
      if (
        userAnswer &&
        (q.correctAnswer || "").toUpperCase() === userAnswer.toUpperCase()
      ) {
        teil2 += 2.5;
      }
    });

    // Teil 3
    HorenData.teil3.forEach((q) => {
      const userAnswer = answers?.horen?.teil3?.[q.id] || null;
      if (
        userAnswer &&
        (q.correctAnswer || "").toUpperCase() === userAnswer.toUpperCase()
      ) {
        teil3 += 5;
      }
    });

    return { teil1, teil2, teil3, total: teil1 + teil2 + teil3 };
  };

  // --- Lesen Punkte ---
  const calcLesenScore = () => {
    let teil1 = 0,
      teil2 = 0,
      teil3 = 0;

    // Teil 1
    Object.entries(LesenData.teil1.correctAnswers || {}).forEach(
      ([id, correct]) => {
        const stringId = id.toString();
        const userAnswer = answers?.lesen?.teil1?.[stringId];
        if (
          (userAnswer || "").toString().toUpperCase() ===
          (correct || "").toString().toUpperCase()
        ) {
          teil1 += 5;
        }
      }
    );

    // Teil 2
    LesenData.teil2.forEach((item) => {
      item.questions.forEach((q) => {
        const userAnswer = answers?.lesen?.teil2?.[item.id]?.[q.id];
        if (
          (userAnswer || "").toString().toUpperCase() ===
          (q.correct_option || "").toString().toUpperCase()
        ) {
          teil2 += 5;
        }
      });
    });

    // Teil 3
    Object.entries(LesenData.teil3.correctMatches || {}).forEach(
      ([id, correct]) => {
        const stringId = id.toString();
        const userAnswer = answers?.lesen?.teil3?.[stringId];
        if (
          (userAnswer || "").toString().toUpperCase() ===
          (correct || "").toString().toUpperCase()
        ) {
          teil3 += 2.5;
        }
      }
    );

    return { teil1, teil2, teil3, total: teil1 + teil2 + teil3 };
  };

  const horenScore = calcHorenScore();
  const lesenScore = calcLesenScore();

  console.log("Hören answers:", answers?.horen);
  console.log("Lesen answers:", answers?.lesen);
  console.log("Hören score:", horenScore);
  console.log("Lesen score:", lesenScore);

  const downloadPDF = () => {
    const input = certRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Zertifikat.pdf");
    });
  };

  return (
    <div>
      <div className="zertifikat" ref={certRef}>
        <h1>Zertifikat</h1>

        {/* Hörverstehen */}
        <div className="zer-score-section">
          <div className="zer-score-row">
            <div className="zer-score-label">Hörverstehen</div>
            <div className="zer-score-value">
              {horenScore.total} / 75 Punkte
            </div>
          </div>
          <div className="zer-score-details">
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Teil 1</span>
              <span className="zer-detail-value">{horenScore.teil1} / 25</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Teil 2</span>
              <span className="zer-detail-value">{horenScore.teil2} / 25</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Teil 3</span>
              <span className="zer-detail-value">{horenScore.teil3} / 25</span>
            </div>
          </div>
        </div>

        {/* Leseverstehen */}
        <div className="zer-score-section">
          <div className="zer-score-row">
            <div className="zer-score-label">Leseverstehen</div>
            <div className="zer-score-value">
              {lesenScore.total} / 75 Punkte
            </div>
          </div>
          <div className="zer-score-details">
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Teil 1</span>
              <span className="zer-detail-value">{lesenScore.teil1} / 25</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Teil 2</span>
              <span className="zer-detail-value">{lesenScore.teil2} / 25</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Teil 3</span>
              <span className="zer-detail-value">{lesenScore.teil3} / 25</span>
            </div>
          </div>
        </div>
      </div>

      <button className="zer-download-btn" onClick={downloadPDF}>
        📥 Zertifikat herunterladen
      </button>
    </div>
  );
};

export default Zertifikat;
