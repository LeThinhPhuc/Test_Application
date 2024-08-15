import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./Reducer/classSlice";
import testSlice from "./Reducer/testSlice";

const store = configureStore({
  reducer: {
    class: classSlice,
    test: testSlice,
  },
});

export default store;
