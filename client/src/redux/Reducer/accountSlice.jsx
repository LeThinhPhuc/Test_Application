import { createSlice } from "@reduxjs/toolkit";

const initialState = { accounts: [], selectedAccount: null };

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    getAccountByUsername: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const { getAccountByUsername } = accountSlice.actions;
export const accounts = (state) => state.account.accounts;
export const selectedAccount = (state) => state.account.selectedAccount;
export default accountSlice.reducer;
