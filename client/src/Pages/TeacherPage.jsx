import { Outlet } from "react-router-dom"
import Header from "../Components/Header/Header"
import LeftSideBar from "../Components/LeftSideBar/LeftSizeBar"

const TeacherPage = () => {
    return (
        <>
            <Header />
            <div className="flex" >
                <LeftSideBar />
                <Outlet/>
            </div>
        </>
    )
}

export default TeacherPage