import classService from "../../Services/ClassService";
import {
  getClassById,
  getClasses,
  getTestsOfClass,
} from "../Reducer/classSlice";

export const fetchClasses = () => {
  return async (dispatch) => {
    try {
      const response = await classService.getAllClassrooms();
      dispatch(getClasses(response.data));
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
