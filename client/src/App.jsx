import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import StudentLayout from "./Layouts/Student/StudentLayout";
import LoginPage from "./Pages/Student/LoginPage";
import StudentPage from "./Pages/StudentPage";
import TeacherPage from "./Pages/TeacherPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* <AppRoutes /> */}
                <StudentPage/>
                {/* <TeacherPage /> */}
            </Router>
        </AuthProvider>
    );
}

export default App;
