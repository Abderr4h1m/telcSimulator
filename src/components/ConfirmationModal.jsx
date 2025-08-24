import React from "react";
import "./ConfirmationModal.css";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleConfirm = () => {
    onConfirm(); // call parent handler
    if (location.pathname.startsWith("/horen")) {
      navigate("/schreiben"); // go to schreiben if inside horen
    } else if (location.pathname.startsWith("/schreiben")) {
      navigate("/zertifikat"); // go to zertifikat if inside schreiben
    } else {
      navigate("/horen"); // default fallback
    }
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-content">
        <p className="confirm-text">
          SIND SIE SICHER, DASS SIE DIE PRÜFUNG VERSENDEN WOLLEN?
        </p>
        <div className="confirm-buttons">
          <button className="confirm-submit" onClick={handleConfirm}>
            PRÜFUNG VERSENDEN
          </button>
          <button className="confirm-cancel" onClick={onCancel}>
            ABBRECHEN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
