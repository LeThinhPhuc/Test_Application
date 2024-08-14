import Header from "../../Components/Header/Header";
import tickVetor from "../../Assets/tick_vector.png";

const AfterExamPage = () => {
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
            <p className="font-thin text-[25px]">
              Your teacher will release your results shortly, All the best 😍
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterExamPage;
