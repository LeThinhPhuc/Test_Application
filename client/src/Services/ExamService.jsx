import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const examService = {
  getAllTests: () => axiosInstance.get("tests"),
  getTestById: (id) => axiosInstance.get(`tests/${id}`),
};
