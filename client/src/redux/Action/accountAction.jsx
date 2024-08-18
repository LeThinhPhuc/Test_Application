import accountService from "../../Services/AccountService";
import { getAccountByUsername } from "../Reducer/accountSlice";

export const fetchAccountByUsername = (username) => {
  return async (dispatch) => {
    try {
      const response = await accountService.getAccountByUsername(username);
      dispatch(getAccountByUsername(response.data));
    } catch (error) {
      console.error("Failed to get account by username", error);
    }
  };
};
