import { v7 as uuidv7 } from "uuid";
import { useState } from "react";
import BackComponent from "../../../Components/ClassManagement/BackComponent";
import InformationForm from "../../../Components/ClassManagement/InformationFormComponent";
import QuestionComponent from "../../../Components/ClassManagement/QuestionComponent";
import DetailsSetupComponent from "../../../Components/ClassManagement/DetailsSetupComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";
import ModalImport from "../../../Components/ClassManagement/ModalImport";
import Modal2Component from "../../../Components/ClassManagement/Modal2Component";
import { useDispatch } from "react-redux";
import {
  AddQuestionsToExam,
  CreateExam,
  setDisplayScoreMode,
} from "../../../redux/Action/ExamAction";
import { useLocation, useNavigate } from "react-router-dom";

const CreateExamPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const classId = location.state;
  const navigate = useNavigate();
  const [examId, setExamId] = useState();
  const [createExam, setCreateExam] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fileData, setFileData] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
  const [details, setDetails] = useState({
    displayResult: false,
    extraTime: false,
  });

  const [transformedData, setTransformedData] = useState();

  const handleSubmit = async (values) => {
    const examInfo = await dispatch(
      CreateExam({ classId: classId, examData: values })
    );
    if (examInfo) {
      setExamId(examInfo.id);
      setCreateExam(true);
    }
  };
  const handleDeleteAll = () => {
    setFileData([]);
  };
  const handleImport = (data) => {
    setFileData(data);
    setTransformedData(
      fileData.map((item) => ({
        id: uuidv7(),
        content: item.question,
        answers: [
          {
            content: item.answers[0].A,
            isCorrect: item.answers[0].isCorrect,
          },
          {
            content: item.answers[1].B,
            isCorrect: item.answers[1].isCorrect,
          },
          {
            content: item.answers[2].C,
            isCorrect: item.answers[2].isCorrect,
          },
          {
            content: item.answers[3].D,
            isCorrect: item.answers[3].isCorrect,
          },
        ],
      }))
    );
  };
  const handleChangeDetails = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleCreate = () => {
    if (transformedData) {
      console.log("🚀 ~ handleCreate ~ transformedData:", transformedData);
      dispatch(
        AddQuestionsToExam({ examId: examId, questions: transformedData })
      );
      if (details.displayResult === true) {
        dispatch(setDisplayScoreMode(examId));
      }
      navigate(-1);
    }
  };
  return (
    <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-24">
      <BackComponent />
      <div className="flex flex-col gap-10">
        <HeaderComponent text="new exam" />
        {/* Information */}
        <InformationForm onSubmit={handleSubmit} classId={classId} />
        {/* Question */}
        {createExam && (
          <>
            <QuestionComponent
              toggleModal={toggleModal}
              fileData={fileData}
              setFileData={setFileData}
              handleDeleteAll={handleDeleteAll}
            />
            {/* Details  */}
            <DetailsSetupComponent onChange={handleChangeDetails} />
            {/* Button Create  */}
            <div className="flex justify-end w-[82%]">
              <button
                onClick={handleCreate}
                className="flex justify-center ml-4 border-[1px] border-black/25  rounded-[3px] text-xl hover:text-[#01008A] px-10 py-3 text-white bg-[#01008A] hover:bg-[#01008A]/5"
              >
                Create
              </button>
            </div>
          </>
        )}
      </div>
      {modal && (
        <ModalImport toggleModal={toggleModal} toggleModal2={toggleModal2} />
      )}
      {modal2 && (
        <Modal2Component
          toggleModal={toggleModal}
          toggleModal2={toggleModal2}
          fileData={fileData}
          setFileData={setFileData}
          modal2={modal2}
          isQuestion={true}
          onImportData={handleImport}
        />
      )}
    </div>
  );
};
export default CreateExamPage;
