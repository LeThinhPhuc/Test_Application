import { examService } from "../../Services/ExamService";
import { getExamOfClass, getExams } from "../Reducer/ExamSlice";

export const fetchTests = () => {
  return async (dispatch) => {
    try {
      const response = await examService.getAllTests();
      dispatch(getExams(response.data));
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };
};

export const fetchTestOfClass = (id) => {
  return async (dispatch) => {
    try {
      const response = await examService.getTestById(id);
      dispatch(getExamOfClass(response.data));
    } catch (error) {
      console.error("Failed to fetch exam:", error);
    }
  };
};
