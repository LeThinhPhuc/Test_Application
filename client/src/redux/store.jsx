import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./Reducer/classSlice";
import testSlice from "./Reducer/testSlice";
import ExamSlice from "./Reducer/ExamSlice";
const store = configureStore({
  reducer: {
    class: classSlice,
    test: testSlice,
    exams:ExamSlice
  },
});

export default store;
