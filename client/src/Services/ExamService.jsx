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
  createExam: (classId, testData) =>
    axiosInstance.post(`tests/${classId}`, testData),
  addQuestionToExam: (testId, questions) =>
    axiosInstance.post(`tests/${testId}/questions`, JSON.stringify(questions)),
};

export default examService;
