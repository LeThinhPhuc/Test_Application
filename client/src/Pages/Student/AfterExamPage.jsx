import Header from "../../Components/Header/Header";
import tickVetor from "../../Assets/tick_vector.png";

const AfterExamPage = () => {
  const questions = [
    {
      title: "Con voi có bao nhiêu cái chân?",
      options: ["1 chân", "2 chân", "3 chân", "4 chân"],
    },
    {
      title: "Con cá có bao nhiêu cái chân?",
      options: ["1 chân", "2 chân", "3 chân", "0 chân"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai", "3 chân", "4 chân"],
    },
  ];
  return (
    <div className="w-full h-full overflow-">
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
