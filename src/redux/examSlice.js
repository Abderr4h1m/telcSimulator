// src/features/exam/examSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { examData } from "../data";

const initialState = {
  examData: examData,
  currentSection: null,
  answers: {}, // { lesen: { teil1: { q1: "A", q2: "B" } } }
  showResults: false,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    saveAnswer: (state, action) => {
      const { section, teil, questionId, answer } = action.payload;
      if (!state.answers[section]) state.answers[section] = {};
      if (!state.answers[section][teil]) state.answers[section][teil] = {};
      state.answers[section][teil][questionId] = answer;
    },
    showResults: (state) => {
      state.showResults = true;
    },
    resetSection: (state, action) => {
      const { section, teil } = action.payload;
      if (state.answers[section] && state.answers[section][teil]) {
        delete state.answers[section][teil];
      }
      state.showResults = false;
    },
    resetAllAnswers: (state) => {
      state.answers = {};
      state.showResults = false;
    },
  },
});

// ✅ SELECTORS
export const selectTeilCompletion = (state, section, teil, totalQuestions) => {
  const teilAnswers = state.exam.answers[section]?.[teil] || {};
  const answeredCount = Object.values(teilAnswers).filter(
    (val) => val !== null && val !== ""
  ).length;
  return answeredCount === totalQuestions;
};

export const {
  setCurrentSection,
  saveAnswer,
  showResults,
  resetSection,
  resetAllAnswers,
} = examSlice.actions;

export default examSlice.reducer;
