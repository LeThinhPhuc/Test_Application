import Header from "../../Components/Header/Header";
import tickVetor from "../../Assets/tick_vector.png";
import { useLocation } from "react-router-dom";

const AfterExamPage = () => {
  const location = useLocation();
  const score = location.state?.score;
  const displayScore = location.state?.examData?.getScore;
  console.log("🚀 ~ AfterExamPage ~ examData:", location.state?.examData);
  console.log("🚀 ~ AfterExamPage ~ displayScore:", displayScore);
  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center h-[100vw]">
        <div className="bg-white flex mt-32 items-center">
          <div className="bg-[#A6FF8B] w-[150px] h-[150px] flex items-center justify-center rounded-full shadow-xl border-black drop-shadow-md ">
            <img src={tickVetor} alt="" />
          </div>
          <div className="h-[80%] ml-10 font-roboto ">
            <h1 className=" font-semibold text-[40px]">
              You Finished Your Exam
            </h1>

            <p className="font-light text-[25px]">
              {displayScore === true
                ? `Your score is: ${parseFloat(score?.toFixed(2))} `
                : "Your teacher will release your results shortly, All the best 😍"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterExamPage;
