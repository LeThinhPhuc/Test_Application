import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const classService = {
  getAllClassrooms: () => axiosInstance.get("classrooms"),
  getClassById: (classId) => axiosInstance.get(`classrooms/${classId}`),
  getAllTestOfClass: (classId) =>
    axiosInstance.get(`classrooms/gettestsforclass/${classId}`),
};

export default classService;