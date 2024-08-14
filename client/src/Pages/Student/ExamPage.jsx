import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import ModalComponent from "../../Components/Exam/ModalComponent";
import TimerComponent from "../../Components/Exam/TimerComponent";
import QuestionCard from "../../Components/Exam/QuestionCard";
import IndexCardComponent from "../../Components/Exam/IndexCardComponent";

const ExamPage = () => {
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
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai", "3 chân", "4 chân"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai", "3 chân", "4 chân"],
    },
  ];

  const [modal, setModel] = useState(false);
  const [modal2, setModel2] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      if (modal === true) {
        setModel(false);
      }
      setModel2(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setSelectedOptions(Array(questions.length).fill(null));
  }, [questions.length]);

  const toggleModal = () => {
    setModel(!modal);
  };
  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className={`w-full h-full`}>
      <div className={`w-full h-full ${modal || (modal2 && "blur-sm")}`}>
        <Header />
        <div className="flex items-start mt-10 mx-[50px] mb-[100px]">
          {/* left */}
          <div className=" w-[60%] items-center flex flex-col gap-[36px]">
            {questions.map((question, i) => (
              <QuestionCard
                question={question}
                key={i}
                questionIndex={i}
                handleOptionChange={handleOptionChange}
              />
            ))}
          </div>
          {/* right */}
          <div className="overflow-y-auto fixed w-[30%] right-20 flex-[2] top-[90px] bottom-[10px] flex flex-col gap-[20px] justify-center items-center">
            <TimerComponent timeLeft={timeLeft} />
            <div className="bg-white w-full px-8 flex justify-start py-5 border-black/5 border-2 rounded-[10px] flex-wrap gap-[34px]">
              {questions.map((question, i) => (
                <IndexCardComponent
                  key={i}
                  questionIndex={i}
                  selectedOptions={selectedOptions}
                />
              ))}
            </div>
            <button
              className="mb-10 cursor-pointer font-montserrat w-[219px] h-[65px] rounded-[30px] bg-black/85 font-medium text-[26px] text-white"
              onClick={toggleModal}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <ModalComponent
          toggleModal={toggleModal}
          header="Confirm Submit"
          content="Are you sure you want to submit your answers?"
        />
      )}
      {modal2 && (
        <ModalComponent
          toggleModal={toggleModal}
          header="Time Up"
          content="Time is up. Please confirm"
        />
      )}
    </div>
  );
};

export default ExamPage;
