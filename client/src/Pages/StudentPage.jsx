import { useEffect } from "react";
import Header from "../Components/Header/Header";
import ComingExam from "../Components/ComingExam/ComingExam";
import FinishedExam from "../Components/FinishedExam/FinishedExam";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExamsForStudent } from "../redux/Action/studentAction";
import { exams } from "../redux/Reducer/studentSlice";

const StudentPage = () => {
  const studentId = localStorage.getItem("studentId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllExamsForStudent(studentId));
  }, []);
  const examsData = useSelector(exams) || [];
  const futuredExams = Array.isArray(examsData)
    ? examsData?.filter((exam) => !exam.finished)
    : [];
  const completeExams = Array.isArray(examsData)
    ? examsData?.filter((exam) => exam.finished)
    : [];

  return (
    <>
      <Header />
      <div className="text-5xl flex justify-center items-center my-10">
        Futured Exams
      </div>

      <div className="flex flex-wrap -mx-2">
        {futuredExams.map((e, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <ComingExam exam={e} />
          </div>
        ))}
      </div>

      <div className="text-5xl flex justify-center items-center  my-10">
        Completed Exams
      </div>

      <div className="flex flex-wrap -mx-2 my-10">
        {completeExams.map((e, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 ">
            <FinishedExam exam={e} />
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentPage;
