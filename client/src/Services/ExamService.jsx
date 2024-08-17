import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const examService = {
  getAllExam: () => axiosInstance.get("tests"),
  getExamById: (id) => axiosInstance.get(`tests/${id}`),
};

export default examService;
