import { Outlet } from "react-router-dom"
import Header from "../Components/Header/Header"
import LeftSizeBar from "../Components/LeftSideBar/LeftSizeBar"

const TeacherPage = () => {
    return (
        <>
            <Header />
            <div className="flex" >
                <LeftSizeBar />
                <Outlet />
            </div>
        </>
    )
}

export default TeacherPage