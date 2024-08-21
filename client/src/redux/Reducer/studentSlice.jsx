import { createSlice } from "@reduxjs/toolkit";

const initialState = { exams: [] };

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getExamsForStudent(state, action) {
      state.exams = action.payload;
    },
    updateScore(state, action) {
      state.exams = action.payload;
    },
  },
});
export const { getExamsForStudent, updateScore } = studentSlice.actions;
export const exams = (state) => state.student.exams;

export default studentSlice.reducer;
