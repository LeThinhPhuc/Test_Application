import {
  createBrowserRouter,
  Route,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import StudentPage from "./Pages/StudentPage";
import TeacherPage from "./Pages/TeacherPage";
import ExamManagement from "./Components/ExamManagement/ExamManagement";
import Dashboard from "./Components/Dashboard/Dashboard";
import StudentManagement from "./Components/StudentManagement/StudentManagement";
import QuestionBankManagement from "./Components/QuestionBankManagement/QuestionBankManagement";
import ExamPage from "./Pages/Student/ExamPage";
import AfterExamPage from "./Pages/Student/AfterExamPage";
import CreateClassPage from "./Pages/Teacher/ClassManagementPage/CreateClassPage";
import ClassManagementPage from "./Pages/Teacher/ClassManagementPage/ClassManagementPage";
import ClassDetailPage from "./Pages/Teacher/ClassManagementPage/ClassDetailPage";
import CreateExamPage from "./Pages/Teacher/ClassManagementPage/CreateExamPage";
import Login from "./Components/Login/Login";
import ExamNotAvailablePage from "./Pages/Student/ExamNotAvailablePage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/student",
    element: <StudentPage />,
    children: [],
  },
  { path: "/student/examnotavailable", element: <ExamNotAvailablePage /> },
  { path: "/student/:id", element: <ExamPage /> },
  { path: "/student/:id/afterexam", element: <AfterExamPage /> },
  {
    path: "/teacher",
    element: <TeacherPage />,
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "classmanagement",
        element: <ClassManagementPage />,
      },
      { path: "classmanagement/createClass", element: <CreateClassPage /> },
      { path: "classmanagement/:classId", element: <ClassDetailPage /> },
      { path: "createExam/:classId", element: <CreateExamPage /> },
      { path: "exammanagement", element: <ExamManagement /> },
      { path: "studenetmanagement", element: <StudentManagement /> },
      { path: "questionbankmanagement", element: <QuestionBankManagement /> },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
