import { Outlet } from "react-router-dom"
import Header from "../Components/Header/Header"
import LeftSideBar from "../Components/LeftSideBar/LeftSideBar"

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