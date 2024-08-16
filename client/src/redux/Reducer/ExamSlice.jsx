import { createSlice } from "@reduxjs/toolkit"; // Use createSlice for cleaner reducers

const initialState = {
  exams: [],
  exam: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    getExams(state, action) {
      state.exams = action.payload;
    },
    getExamOfClass(state, action) {
      state.exam = action.payload;
    },
  },
});
export const { getExams, getExamOfClass } = examSlice.actions;
export const exam = (state) => state.exam.exam;
export const exams = (state) => state.exam.exams;

export default examSlice.reducer;
