import examService from "../../Services/ExamService";
import {
  addQuestionsToExam,
  createExamStart,
  createExamSuccess,
  getAllExam,
} from "../Reducer/ExamSlice";

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

export const CreateExam = ({ classId, examData }) => {
  return async (dispatch) => {
    dispatch(createExamStart());
    try {
      const response = await examService.createExam(classId, examData);
      dispatch(createExamSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log("Fail to create exam", error);
    }
  };
};

export const AddQuestionsToExam = ({ examId, questions }) => {
  return async (dispatch) => {
    try {
      const response = await examService.addQuestionToExam(examId, questions);
      dispatch(addQuestionsToExam(response.data));
    } catch (error) {
      console.error(
        "Error adding questions to exam:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
