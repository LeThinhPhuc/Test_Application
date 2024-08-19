import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import ModalComponent from "../../Components/Exam/ModalComponent";
import TimerComponent from "../../Components/Exam/TimerComponent";
import QuestionCard from "../../Components/Exam/QuestionCard";
import IndexCardComponent from "../../Components/Exam/IndexCardComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToFinish, fetchExamById } from "../../redux/Action/ExamAction";

const ExamPage = () => {
  const dispatch = useDispatch();
  const examId = "3eda9b72-ed04-4250-8128-c9270ad1fc83";

  const id = useParams();
  const navigate = useNavigate();
  const [modal, setModel] = useState(false);
  const [modal2, setModel2] = useState(false);
  const currentTime = new Date(); //"2024-08-15 08:15:00"
  const [examData, setExamData] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetchExamData = async () => {
      const res = await dispatch(fetchExamById(examId));
      setExamData(res);
    };
    fetchExamData();
    if (examData?.finished === true) {
      navigate("afterexam", { state: examData });
    }
  }, []);

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
    const parseTimeString = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      const now = new Date();
      now.setHours(hours, minutes, seconds, 0);
      return now;
    };
    if (examData) {
      setSelectedOptions(Array(examData.questions.length).fill(null));
      const timeStart = parseTimeString(examData.timeStart);
      const timeEnd = parseTimeString(examData.timeEnd);

      if (currentTime < timeStart.getTime()) {
        navigate("/student/examnotavailable");
        setTimeLeft(
          Math.floor((timeEnd.getTime() - timeStart.getTime()) / 1000)
        );
      } else {
        setTimeLeft(Math.floor((timeEnd.getTime() - currentTime) / 1000));
      }
    }
  }, [examData]);

  useEffect(() => {
    if (timeLeft === 0 || modal2) {
      navigate("afterexam", { state: { examData } });
    }
  }, [timeLeft, modal2, navigate]);

  useEffect(() => {
    calculateScore();
    console.log("🚀 ~  score:", score);
  }, [selectedOptions]);

  const toggleModal = () => {
    setModel(!modal);
  };
  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  const calculateScore = () => {
    let totalScore = 0;
    examData?.questions.forEach((question, index) => {
      if (
        selectedOptions[index] !== null &&
        question.answers[selectedOptions[index]]?.isCorrect
      ) {
        totalScore += 1;
      }
      //totalScore = (totalScore / examData?.questions.length) * 10;
    });
    setScore(totalScore);
  };

  const handleSubmit = () => {
    calculateScore();
    setTimeLeft(0);
    setIsSubmit(true);
    toggleModal();
    dispatch(changeToFinish(examId));
    navigate("afterexam", { state: { examData, score } });
  };
  return (
    <div className={`w-full h-full`}>
      <div
        className={`w-full h-full relative${modal || (modal2 && "blur-sm")}`}
      >
        <Header />
        {examData && (
          <div className="flex items-start mt-10 mx-[50px] mb-[100px]">
            {/* left */}
            <div className=" w-[60%] items-center flex flex-col gap-[36px]">
              {examData.questions.map((question, i) => (
                <QuestionCard
                  question={question}
                  key={i}
                  index={i}
                  handleOptionChange={handleOptionChange}
                />
              ))}
            </div>
            {/* right */}
            <div className="overflow-y-auto fixed h-screen py-10 w-[30%] right-20 flex-[2] top-[50px] bottom-[10px] flex flex-col gap-[20px] justify-center items-center">
              <TimerComponent timeLeft={timeLeft} />
              <div className="bg-white overflow-y-auto w-full px-8 flex justify-start py-5 border-black/5 border-2 rounded-[10px] flex-wrap gap-8">
                {examData.questions.map((question, i) => (
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
        )}
      </div>
      {modal && (
        <ModalComponent
          handleSubmit={handleSubmit}
          toggleModal={toggleModal}
          header="Confirm Submit"
          content="Are you sure you want to submit your answers?"
        />
      )}
      {modal2 && (
        <ModalComponent
          handleSubmit={handleSubmit}
          header="Time Up"
          content="Time is up. Please confirm"
        />
      )}
    </div>
  );
};

export default ExamPage;
