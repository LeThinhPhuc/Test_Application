import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackComponent from "../../../Components/ClassManagement/BackComponent";
import InformationForm from "../../../Components/ClassManagement/InformationFormComponent";
import QuestionComponent from "../../../Components/ClassManagement/QuestionComponent";
import DetailsSetupComponent from "../../../Components/ClassManagement/DetailsSetupComponent";
import ModalComponent from "../../../Components/ClassManagement/ModalComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";

const CreateExamPage = () => {
  const subjects = [
    "Chương 1",
    "Chương 2",
    "Chương 3",
    "Chương 4",
    "Chương 5",
    "Chương 6",
  ];
  const navigate = useNavigate();
  const [modal, setModel] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [examInfo, setExamInfo] = useState({
    ten: "",
    ngaythi: "",
    thoigian: "",
    giobatdau: "",
  });
  const [details, setDetails] = useState({
    displayResult: true,
    extraTime: true,
  });

  const handleExamInfoChange = (e) => {
    setExamInfo({ ...examInfo, [e.target.name]: e.target.value });
    console.log(examInfo);
  };
  const handleDeleteAll = () => {
    setSelectedQuestions([]);
  };
  const handleDeleteSelectedQuestion = (question) => {
    setSelectedQuestions((prevSelected) => {
      return prevSelected.filter((q) => q.ma !== question.ma);
    });
  };
  const handleChangeDetails = (e) => {
    setDetails({ details, [e.target.name]: e.target.checked });
  };
  const toggleModal = () => {
    setModel(!modal);
  };

  const handleCheckboxChange = (question) => {
    setSelectedQuestions((prevSelected) => {
      const isSelected = prevSelected.some((q) => q.ma === question.ma);
      if (isSelected) {
        return prevSelected.filter((q) => q.ma !== question.ma);
      } else {
        return [...prevSelected, question];
      }
    });
  };
  return (
    <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-24">
      <BackComponent />
      <div className="flex flex-col gap-10">
        <HeaderComponent text="new exam" />
        {/* Information */}
        <InformationForm onChange={handleExamInfoChange} examInfo={examInfo} />
        {/* Question */}
        <QuestionComponent
          toggleModal={toggleModal}
          selectedQuestions={selectedQuestions}
          handleDeleteSelectedQuestion={handleDeleteSelectedQuestion}
          handleDeleteAll={handleDeleteAll}
        />
        {/* Details  */}
        <DetailsSetupComponent
          onChange={handleChangeDetails}
          details={details}
        />
        {/* Button Create  */}
        <div className="flex justify-end w-[82%]">
          <button
            onClick={() => navigate(-1)}
            className="flex justify-center ml-4 border-[1px] border-black/25  rounded-[3px] text-xl hover:text-[#01008A] px-10 py-3 text-white bg-[#01008A] hover:bg-[#01008A]/5"
          >
            Create
          </button>
        </div>
      </div>
      {modal && (
        <ModalComponent
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
          handleCheckboxChange={handleCheckboxChange}
          setModel={setModel}
        />
      )}
    </div>
  );
};

export default CreateExamPage;
