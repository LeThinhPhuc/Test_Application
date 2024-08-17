import ExamManagementService from "../../Components/ExamManagement/ExamManagementService";
import { fetchExamOfClass } from "../Reducer/ExamSlice";


export const fetchTestOfClass = (classId) => {
    return async (dispatch) => {
      try {
        console.log(classId)
        // Gọi API để lấy danh sách drinks
        const response = await ExamManagementService.getAll(classId);
        // const data = await response.json();
        console.log(response);
        // Dispatch action fetchDrinksSuccess với dữ liệu drinks
        dispatch(fetchExamOfClass(response.data));
      } catch (error) {
        // Nếu gặp lỗi, dispatch action fetchDrinksFailure với thông điệp lỗi
        dispatch(fetchDrinksFailure(error.message));
      }
    };
  };