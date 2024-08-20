import studentService from "../../Services/StudentService";
import { getExamsForStudent, updateScore } from "../Reducer/studentSlice";

export const fetchAllExamsForStudent = (studentId) => {
  return async (dispatch) => {
    try {
      const response = await studentService.getExamsForStudent(studentId);
      dispatch(getExamsForStudent(response.data));
    } catch (error) {
      console.log(`Fail to fetch exams for student ${studentId}`);
    }
  };
};

export const updateScoreOfExam = ({ examId, studentId, score }) => {
  return async (dispatch) => {
    try {
      const response = await studentService.updateScore(
        examId,
        studentId,
        score
      );
      dispatch(updateScore(response.data));
    } catch (error) {
      console.error(
        "Error update score:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
