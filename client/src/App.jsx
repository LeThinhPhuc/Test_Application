import { createBrowserRouter, Route, BrowserRouter as Router, RouterProvider } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import StudentLayout from "./Layouts/Student/StudentLayout";
import LoginPage from "./Pages/Student/LoginPage";
import StudentPage from "./Pages/StudentPage";
import TeacherPage from "./Pages/TeacherPage";
import ClassManagement from "./Components/ClassManagement/ClassManagement";
import ExamManagement from "./Components/ExamManagement/ExamManagement";
import Dashboard from "./Components/Dashboard/Dashboard";
import StudentManagement from "./Components/StudentManagement/StudentManagement";
import QuestionBankManagement from "./Components/QuestionBankManagement/QuestionBankManagement";


const router = createBrowserRouter([
    { path: '/', element: <StudentPage /> },
    { path: '/student', element: <StudentPage /> },
    {
        path: '/teacher', element: <TeacherPage />, children: [
            { path: '',element: <Dashboard/>},
            { path: 'classmanagement', element: <ClassManagement /> },
            { path: 'exammanagement', element: <ExamManagement /> },
            { path: 'studenetmanagement', element: <StudentManagement/> },
            { path: 'questionbankmanagement', element: <QuestionBankManagement/> },
        ]
    }
])
function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
