import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./Reducer/classSlice";
import ExamSlice from "./Reducer/ExamSlice";
const store = configureStore({
  reducer: {
    class: classSlice,
    exam: ExamSlice,
  },
});

export default store;
