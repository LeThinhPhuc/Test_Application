import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackComponent from "../../../Components/ClassManagement/BackComponent";
import InformationForm from "../../../Components/ClassManagement/InformationFormComponent";
import QuestionComponent from "../../../Components/ClassManagement/QuestionComponent";
import DetailsSetupComponent from "../../../Components/ClassManagement/DetailsSetupComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";
import ModalImport from "../../../Components/ClassManagement/ModalImport";
import Modal2Component from "../../../Components/ClassManagement/Modal2Component";

const CreateExamPage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fileData, setFileData] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };
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
    setFileData([]);
  };
  const handleImport = (data) => {
    setFileData(data);
  };
  const handleChangeDetails = (e) => {
    setDetails({ details, [e.target.name]: e.target.checked });
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
          fileData={fileData}
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
