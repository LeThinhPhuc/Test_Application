import examService from "../../Services/ExamService";
import { getAllExam } from "../Reducer/ExamSlice";

export const fetchAllExam = () => {
  return async (dispatch) => {
    try {
      const response = await examService.get();
      dispatch(getAllExam(response.data));
    } catch (error) {
      console.log("Fail to fetch all exams");
    }
  };
};
