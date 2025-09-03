import React, { createContext, useContext, useState } from "react";

const ExamAnswersContext = createContext(null);

export function ExamAnswersProvider({ children }) {
  // each teil writes into its bucket via onSave
  const [answers, setAnswers] = useState({
    sprach1: {},   // { [gapId]: "option" }
    sprach2: {},   // { [gapNum]: "WORD" }
    lesen1: {},    // { [passageId]: "A".."J" }
    lesen2: {},    // { [qId]: "A"|"B"|"C" } or option text
    lesen3: {},    // { [situationId]: "A".."L" or "X" }
  });

  const updateTeil = (teil, data) => {
    setAnswers(prev => ({ ...prev, [teil]: { ...prev[teil], ...data } }));
  };

  const resetAll = () => setAnswers({
    sprach1:{}, sprach2:{}, lesen1:{}, lesen2:{}, lesen3:{}
  });

  return (
    <ExamAnswersContext.Provider value={{ answers, updateTeil, resetAll }}>
      {children}
    </ExamAnswersContext.Provider>
  );
}

export function useExamAnswers() {
  const ctx = useContext(ExamAnswersContext);
  if (!ctx) throw new Error("useExamAnswers must be used within ExamAnswersProvider");
  return ctx;
}
