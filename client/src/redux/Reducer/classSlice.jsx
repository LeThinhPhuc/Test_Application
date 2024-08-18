import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  selectedClass: null,
  testsOfClass: [],
  studentsOfClass: [],
};

const classSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {
    getAllClassForTeacher: (state, action) => {
      state.classes = action.payload;
    },
    getClassById: (state, action) => {
      state.selectedClass = action.payload;
    },
    getTestsOfClass: (state, action) => {
      state.testsOfClass = action.payload;
    },
    postClass: (state, action) => {
      state.classes.push(action.payload);
    },
  },
});

export const {
  getAllClassForTeacher,
  getClassById,
  getTestsOfClass,
  postClass,
} = classSlice.actions;
export const classes = (state) => state.class.classes;
export const selectedClass = (state) => state.class.selectedClass;
export const testsOfClass = (state) => state.class.testsOfClass;
export const studentsOfClass = (state) => state.class.studentsOfClass;
export default classSlice.reducer;
