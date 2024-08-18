import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const accountService = {
  getAccountByUsername: (username) =>
    axiosInstance.get(`accounts/username/${username}`),
};

export default accountService;
