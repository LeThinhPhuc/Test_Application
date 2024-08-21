import examService from "../../Services/ExamService";
import {
  addQuestionsToExam,
  createExamStart,
  createExamSuccess,
  getAllExam,
  getExamById,
  getQuestionsForExam,
  changeExamToFinish,
  getStaticticById,
  changeGetScoreMode,
  changeFixedMode,
} from "../Reducer/ExamSlice";

export const fetchAllExam = () => {
  return async (dispatch) => {
    try {
      const response = await examService.getAllExam();
      dispatch(getAllExam(response.data));
    } catch (error) {
      console.log("Fail to fetch all exams");
    }
  };
};

export const fetchExamById = (examId) => {
  return async (dispatch) => {
    try {
      const response = await examService.getExamById(examId);
      dispatch(getExamById(response.data));
      return response.data;
    } catch (error) {
      console.log("Fail to fetch exam by id");
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

export const fetchQuestionsForExam = ({ examId }) => {
  return async (dispatch) => {
    try {
      const response = await examService.getQuestionsForExam(examId);
      dispatch(getQuestionsForExam(response.data));
    } catch (error) {
      console.error(
        "Error fetch questions for exam:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const changeToFinish = (examId) => {
  return async (dispatch) => {
    try {
      const response = await examService.changeToFinish(examId);
      dispatch(changeExamToFinish(response.data));
    } catch (error) {
      console.error(
        "Error change exam finished:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const setDisplayScoreMode = (examId) => {
  return async (dispatch) => {
    try {
      const response = await examService.changeGetScoreMode(examId);
      dispatch(changeGetScoreMode(response.data));
    } catch (error) {
      console.error(
        "Error change get score mode:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const setMixUpMode = (examId) => {
  return async (dispatch) => {
    try {
      const response = await examService.changeMixUpMode(examId);
      dispatch(changeFixedMode(response.data));
    } catch (error) {
      console.error(
        "Error change mix up question mode:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const fetchStatistic = (examId) => {
  return async (dispatch) => {
    try {
      const response = await examService.getStatisticOfExam(examId);
      dispatch(getStaticticById(response.data));
      return response.data;
    } catch (error) {
      console.error(
        "Error fetch statistic of exam:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
