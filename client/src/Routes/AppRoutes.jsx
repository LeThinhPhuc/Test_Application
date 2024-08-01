import { Route, Routes, Navigate } from "react-router-dom";
import StudentRoutes from "./StudentRoutes";
import TeacherRoutes from "./TeacherRoutes";
import { useAuth } from "../Contexts/AuthContext";
function AppRoutes() {
  const { role } = useAuth();
  return (
    <Routes>
      {/*<Route path="/login" element={<LoginPage />} /> */}
      {role === "student" && <Route path="/*" element={<StudentRoutes />} />}
      {role === "teacher" && <Route path="/*" element={<TeacherRoutes />} />}
      <Route
        path="*"
        element={<Navigate to={role === "student" ? "/" : "/login"} />}
      />{" "}
      {/* Điều hướng đến trang đăng nhập nếu không khớp */}
    </Routes>
  );
}

export default AppRoutes;
