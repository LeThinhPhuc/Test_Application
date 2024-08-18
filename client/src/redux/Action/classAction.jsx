import classService from "../../Services/ClassService";
import {
  getAllClassForTeacher,
  getClassById,
  getTestsOfClass,
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
      console.error("Failed to fetch all test of class", error);
    }
  };
};
