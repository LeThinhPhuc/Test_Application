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
  getAllClassforTeacher: (teacherId) =>
    axiosInstance.get(`teachers/getclassesforteacher/${teacherId}`),
  getClassById: (classId) => axiosInstance.get(`classrooms/${classId}`),
  getAllTestOfClass: (classId) =>
    axiosInstance.get(`classrooms/gettestsforclass/${classId}`),
  createClassAsync: (data) =>
    axiosInstance
      .post("classrooms", data)
      .then((response) => {
        return "201";
      })
      .catch((error) => {
        return "error";
      }),
};

export default classService;
