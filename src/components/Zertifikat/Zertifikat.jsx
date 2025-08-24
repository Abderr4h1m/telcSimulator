import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Zertifikat.css";

const Zertifikat = () => {
  const certRef = useRef();

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

        <div className="zer-section">
          <h2>telc Deutsch B2</h2>
          <p className="zer-subtitle">
            <strong>Eingewisslich B2</strong>
          </p>
          <p className="zer-italic">Obwohl er Eingewisslich B2</p>
        </div>

        <div className="zer-table-section">
          <table className="zer-info-table">
            <tbody>
              <tr>
                <td className="zer-label">Transzgebiet</td>
                <td className="zer-value">Alters</td>
              </tr>
              <tr>
                <td className="zer-label">Name</td>
                <td className="zer-value">Vorname</td>
              </tr>
              <tr>
                <td className="zer-label">16.04.1986</td>
                <td className="zer-value">Tennis</td>
              </tr>
              <tr>
                <td className="zer-label">Diskontakt im</td>
                <td className="zer-value">Diskontakt</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="zer-score-section">
          <div className="zer-score-row">
            <div className="zer-score-label">Sportliche Pickup</div>
            <div className="zer-score-value">17.5 / 28.15 Punkte</div>
          </div>
          <div className="zer-score-details">
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Unterstützen</span>
              <span className="zer-detail-value">70.0 / 75 Punkte</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Sprachbauweise</span>
              <span className="zer-detail-value">16.5 / 30 Punkte</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Hörversteher</span>
              <span className="zer-detail-value">50.0 / 75 Punkte</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Sportlicher Ausdruck</span>
              <span className="zer-detail-value">39.0 / 45 Punkte</span>
            </div>
          </div>
        </div>

        <div className="zer-score-section">
          <div className="zer-score-row">
            <div className="zer-score-label">Mixedlose Pickups</div>
            <div className="zer-score-value">67.0 / 78 Punkte</div>
          </div>
          <div className="zer-score-details">
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Flüsselaston</span>
              <span className="zer-detail-value">23.0 / 25 Punkte</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Dekoration</span>
              <span className="zer-detail-value">20.0 / 25 Punkte</span>
            </div>
            <div className="zer-score-detail">
              <span className="zer-detail-label">○ Treibsleitung</span>
              <span className="zer-detail-value">21.0 / 25 Punkte</span>
            </div>
          </div>
        </div>

        <div className="zer-summary-section">
          <div className="zer-summary-row">
            <div className="zer-summary-label">Summe</div>
            <div className="zer-summary-value">242.5 / 260 Punkte</div>
          </div>
        </div>

        <div className="zer-details-section">
          <table className="zer-details-table">
            <tbody>
              <tr>
                <td className="zer-label">Prädukt</td>
                <td className="zer-value">Gut</td>
              </tr>
              <tr>
                <td className="zer-label">Daten der Pickup</td>
                <td className="zer-value">23.03.2015</td>
              </tr>
              <tr>
                <td className="zer-label">Stadensnummer</td>
                <td className="zer-value">01/11/22</td>
              </tr>
              <tr>
                <td className="zer-label">Daten der Ausstellung</td>
                <td className="zer-value">21.04.2015</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="zer-signature-section">
          <hr className="zer-signature-line" />
          <p className="zer-signature-label">Geschäftsführer</p>
        </div>
      </div>

      <button className="zer-download-btn" onClick={downloadPDF}>
        📥 Zertifikat herunterladen
      </button>
    </div>
  );
};

export default Zertifikat;
