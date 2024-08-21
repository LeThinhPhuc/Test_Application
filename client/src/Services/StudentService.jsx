import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const studentService = {
  getExamsForStudent: (studentId) =>
    axiosInstance.get(`students/tests/${studentId}`),
  updateScore: (examId, studentId, score) =>
    axiosInstance.put(`tests/${examId}/studentscore/${studentId}`, score),
};

export default studentService;
