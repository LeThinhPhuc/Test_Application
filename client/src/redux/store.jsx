import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./Reducer/classSlice";
import ExamSlice from "./Reducer/ExamSlice";
import studentSlice from "./Reducer/studentSlice";
const store = configureStore({
  reducer: {
    class: classSlice,
    exam: ExamSlice,
    student: studentSlice,
  },
});

export default store;
