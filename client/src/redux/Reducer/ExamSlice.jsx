import { createSlice } from "@reduxjs/toolkit"; // Use createSlice for cleaner reducers

const initialState = {
  loading: false,
  exams: [],
  selectedExam: null,
  questions: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    getExamById(state, action) {
      state.selectedExam = action.payload;
    },
    getAllExam(state, action) {
      state.exams = action.payload;
    },
    createExamStart(state) {
      state.loading = true;
    },
    createExamSuccess(state, action) {
      state.loading = false;
      state.exams.push(action.payload);
      state.selectedExam = action.payload;
      state.selectedExam = action.payload;
    },
    addQuestionsToExam(state, action) {
      if (state.selectedExam) {
        state.selectedExam.questions = state.selectedExam.questions.concat(
          action.payload
        );
      }
    },
    getQuestionsForExam(state, action) {
      state.questions = action.payload;
    },
    changeExamToFinish(state, action) {
      state.selectedExam = action.payload;
    },
  },
});
export const {
  getAllExam,
  getExamById,
  createExamStart,
  createExamSuccess,
  addQuestionsToExam,
  getQuestionsForExam,
  changeExamToFinish,
} = examSlice.actions;
export const selectedExam = (state) => state.exam.selectedExam;
export const exams = (state) => state.exam.exams;
export const questions = (state) => state.exam.questions;

export default examSlice.reducer;
