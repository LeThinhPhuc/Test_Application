import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
  loading: false,
  error: null,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    fetchTestsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTestsSuccess(state, action) {
      state.loading = false;
      state.tests = action.payload;
    },
    fetchTestsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTestsStart, fetchTestsSuccess, fetchTestsFailure } =
  testSlice.actions;

export default testSlice.reducer;
