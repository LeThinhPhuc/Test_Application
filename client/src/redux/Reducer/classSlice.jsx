import { createSlice } from "@reduxjs/toolkit";

const initialState = { classes: [], selectedClass: null, testsOfClass: [] };

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
  },
});

export const { getAllClassForTeacher, getClassById, getTestsOfClass } =
  classSlice.actions;
export const classes = (state) => state.class.classes;
export const selectedClass = (state) => state.class.selectedClass;
export const testsOfClass = (state) => state.class.testsOfClass;
export default classSlice.reducer;
