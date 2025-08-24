import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showResults } from "../../redux/examSlice";
import { FaCheckCircle } from "react-icons/fa";
import "./navbar.css";
import ConfirmationModal from "../ConfirmationModal";

export default function ExamNavbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const horenPaths = ["/horen/teil1", "/horen/teil2", "/horen/teil3"];
  const schreibenPaths = ["/schreiben/teil1", "/schreiben/teil2"];
  const isHoren = horenPaths.includes(location.pathname);
  const isSchreiben = schreibenPaths.includes(location.pathname);
  const isHome = location.pathname === "/";

  // Get answers + submitted flag from Redux
  const { answers, submitted } = useSelector((state) => state.exam);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSaveExam = () => {
    dispatch(showResults());
  };

  const handleSubmitExam = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    // Logic to submit the exam
    console.log("Exam submitted");
    setShowConfirmation(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  // Function to check if a teil is fully answered
  const isTeilValid = (teilKey, totalQuestions) => {
    const teilAnswers = answers[teilKey] || {};
    const answeredCount = Object.values(teilAnswers).filter(
      (val) => val !== null && val !== ""
    ).length;
    return answeredCount === totalQuestions;
  };

  const horenTabs = [
    {
      path: "/horen/teil1",
      label: "Hören",
      sub: "Teil 1 (25 Punkte)",
      key: "horen_teil1",
      totalQuestions: 5,
    },
    {
      path: "/horen/teil2",
      label: "Hören",
      sub: "Teil 2 (25 Punkte)",
      key: "horen_teil2",
      totalQuestions: 10,
    },
    {
      path: "/horen/teil3",
      label: "Hören",
      sub: "Teil 3 (25 Punkte)",
      key: "horen_teil3",
      totalQuestions: 5,
    },
  ];

  const tabs = [
    {
      path: "/lesen/teil1",
      label: "Leseverstehen",
      sub: "Teil 1 (25 Punkte)",
      key: "lesen_teil1",
      totalQuestions: 5,
    },
    {
      path: "/lesen/teil2",
      label: "Leseverstehen",
      sub: "Teil 2 (25 Punkte)",
      key: "lesen_teil2",
      totalQuestions: 5,
    },
    {
      path: "/lesen/teil3",
      label: "Leseverstehen",
      sub: "Teil 3 (25 Punkte)",
      key: "lesen_teil3",
      totalQuestions: 5,
    },
    {
      path: "/sprachbausteine/teil1",
      label: "Sprachbausteine",
      sub: "Teil 1 (15 Punkte)",
      key: "sprachbausteine_teil1",
      totalQuestions: 10,
    },
    {
      path: "/sprachbausteine/teil2",
      label: "Sprachbausteine",
      sub: "Teil 2 (15 Punkte)",
      key: "sprachbausteine_teil2",
      totalQuestions: 10,
    },
  ];

  // Schreiben tabs (if you want to show them in some cases)
  const schreibenTabs = [
    {
      path: "/schreiben/teil1",
      label: "Schreiben",
      sub: "Teil 1 (25 Punkte)",
      key: "schreiben_teil1",
      totalQuestions: 1, // Adjust based on your actual structure
    },
    {
      path: "/schreiben/teil2",
      label: "Schreiben",
      sub: "Teil 2 (25 Punkte)",
      key: "schreiben_teil2",
      totalQuestions: 1, // Adjust based on your actual structure
    },
  ];

  return (
    <div className="exam-navbar">
      <div className="examnavbar">
        {/* Left Logo */}
        <div className="exam-left">
          <Link style={{ textDecoration: "none" }} to="/">
            <img src="/LogoSimulators.png" alt="telc logo" className="logo" />
          </Link>
        </div>

        {isHome ? (
          <div className="home-start">
            <Link to="/lesen/teil1">
              <img className="shuriken" src="./logo.png" alt="" />
            </Link>
          </div>
        ) : (
          <>
            {/* Conditionally render tabs - don't show for Schreiben pages */}
            {!isSchreiben && (
              <div className="tabs">
                {(isHoren ? horenTabs : tabs).map((item) => {
                  const valid = isTeilValid(item.key, item.totalQuestions);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className={`tab ${
                          location.pathname === item.path ? "active" : ""
                        }`}
                      >
                        {item.label} <br />
                        <span>{item.sub}</span>
                        <div className="status-icon">
                          {submitted && valid && (
                            <FaCheckCircle color="green" size={18} />
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="exam-right">
              <div className="info">
                <p>Deutsch - B2</p>
                <p>Verbleibende Zeit: 90 Min</p>
                <p>Restzeit:</p>
              </div>
              <div className="buttons">
                <button className="submit" onClick={handleSubmitExam}>
                  🏁 ABGABE
                </button>
                <button className="save" onClick={handleSaveExam}>
                  💾 SPEICHERN
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
    </div>
  );
}
