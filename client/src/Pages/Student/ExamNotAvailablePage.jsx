import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

const ExamNotAvailablePage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center h-[100vw]">
        <div className="bg-white flex mt-32 items-center">
          <div className="h-[80%] ml-10 font-roboto ">
            <h1 className=" font-semibold text-[40px]">Exam Not Started Yet</h1>
            <div className="flex font-thin text-[25px] justify-between items-center">
              <p className="">Please back soon 😍</p>
              <p
                className="hover:underline hover:font-light cursor-pointer"
                onClick={() => navigate("/")}
              >
                Back
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamNotAvailablePage;
