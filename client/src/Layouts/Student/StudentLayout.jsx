import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
    return (
        <div className="student-layout">
            <Header />
            <div className="">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default StudentLayout;
