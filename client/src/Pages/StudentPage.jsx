import { useState } from "react";
import Header from "../Components/Header/Header";
import ComingExam from "../Components/ComingExam/ComingExam";
import Footer from "../Components/Footer/Footer";
import FinishedExam from "../Components/FinishedExam/FinishedExam";

const StudentPage = () => {
    const [futuredExams, setFuturedExams] = useState([
        {
            id: "0001",
            className: "LTNC_GK1",
            date: "20-8-2023",
            duration: "90m",
            startTime: "09:00",
        },

        {
            id: "0002",
            className: "LTCB_GK1",
            date: "20-8-2023",
            duration: "90m",
            startTime: "07:00",
        },

        {
            id: "0003",
            className: "LTHDT_GK1",
            date: "20-8-2023",
            duration: "90m",
            startTime: "13:00",
        },

        {
            id: "0004",
            className: "LTDT_GK1",
            date: "20-8-2023",
            duration: "90m",
            startTime: "15:00",
        },
    ]);
    return (
        <>
            <Header />
            <div className="text-5xl flex justify-center items-center my-10">
                Futured Exams
            </div>

            <div className="flex flex-wrap -mx-2">
                {futuredExams.map((f, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
                        <ComingExam
                            id={f.id}
                            className={f.className}
                            date={f.date}
                            duration={f.duration}
                            startTime={f.startTime}
                        />
                    </div>
                ))}
            </div>

            <div className="text-5xl flex justify-center items-center  my-10">
                Copmleted Exams
            </div>

            <div className="flex flex-wrap -mx-2 my-10">
                {futuredExams.map((f, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 ">
                        <FinishedExam
                            className={f.className}
                            date={f.date}
                            duration={f.duration}
                        />
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default StudentPage;
