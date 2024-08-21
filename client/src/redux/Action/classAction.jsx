import classService from "../../Services/ClassService";
import {
  getAllClassForTeacher,
  getClassById,
  getTestsOfClass,
  postClass,
} from "../Reducer/classSlice";

export const fetchAllClassForTeacher = (teacherId) => {
  return async (dispatch) => {
    try {
      const response = await classService.getAllClassforTeacher(teacherId);
      dispatch(getAllClassForTeacher(response.data));
    } catch (error) {
      console.error("Failed to fetch classrooms:", error);
    }
  };
};

export const fetchClassById = (classId) => {
  return async (dispatch) => {
    try {
      const response = await classService.getClassById(classId);
      dispatch(getClassById(response.data));
    } catch (error) {
      console.error("Failed to fetch class", error);
    }
  };
};

export const fetchTestsOfClass = (classId) => {
  return async (dispatch) => {
    try {
      const response = await classService.getAllTestOfClass(classId);
      dispatch(getTestsOfClass(response.data));
    } catch (error) {
      console.error(
        "Error get class by Id:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const createClass = (data) => {
  return async (dispatch) => {
    try {
      const response = await classService.createClassAsync(data);
      dispatch(postClass(response.data));
      return response.data;
    } catch (error) {
      console.error(
        "Error create class:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
