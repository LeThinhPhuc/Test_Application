import { createSlice } from "@reduxjs/toolkit"; // Use createSlice for cleaner reducers

const initialState = {
  exams: [],
  selectedExam: null,
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
  },
});
export const { getAllExam, getExamById } = examSlice.actions;
export const selectedExam = (state) => state.exam.selectedExam;
export const exams = (state) => state.exam.exams;

export default examSlice.reducer;
