import { Route, Routes } from "react-router-dom";
import StudentLayout from "../Layouts/Student/StudentLayout";
import ExamPage from "../Pages/Student/ExamPage";
import LoginPage from "../Pages/Student/LoginPage";

const StudentRoutes = () => {
  return (
    <StudentLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/exam" element={<ExamPage />} />
      </Routes>
    </StudentLayout>
  );
};

export default StudentRoutes;
