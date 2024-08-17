import { createSlice } from '@reduxjs/toolkit'; // Use createSlice for cleaner reducers


const initialState = {
  tests: [],
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: 'exams', 
  initialState,
  reducers: {
    fetchExamOfClass( state,action)  {
        state.error = null;
        state.tests = action.payload;
      }
  }, 
  
  
     
      

});
export const {
    fetchExamOfClass
}  = examSlice.actions;
export const selectTests = (state) => state.exams.tests;

export default examSlice.reducer;