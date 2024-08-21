import BackComponent from "../../../Components/ClassManagement/BackComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";
import ButtonComponent from "../../../Components/ClassManagement/ButtonComponent";
import { useEffect, useState } from "react";
import ModalImport from "../../../Components/ClassManagement/ModalImport";
import Modal2Component from "../../../Components/ClassManagement/Modal2Component";
import TableComponent from "../../../Components/ClassManagement/TableComponent";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import InformationForm from "../../../Components/CreateClass/InformationForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createClass } from "../../../redux/Action/classAction";

const CreateClassPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [teacherId, setTeacherId] = useState();
  const [classInfo, setClassInfo] = useState({
    classRoomName: "",
    schoolYear: "",
    semester: "",
    teacherId: "",
  });
  const headers = ["Mã học sinh", "Họ và Tên", "Giới tính", "Số điện thoại"];
  const getStudentColumns = (fileData) => [
    fileData.id,
    fileData.name,
    fileData.gender,
    fileData.phone,
  ];

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fileData, setFileData] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const decoded = jwtDecode(token);
    const teacherId = decoded.teacher.teacherId;
    setTeacherId(teacherId);
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
    if (fileData.length !== 0) {
      setFileData([]);
    }
  };
  const handleChange = (data) => {
    if (
      data.ten !== classInfo.classRoomName ||
      `${data.nam} - ${data.nam + 1}` !== classInfo.schoolYear ||
      data.hocky !== classInfo.semester
    ) {
      setClassInfo({
        classRoomName: data.ten,
        schoolYear: `${data.nam} - ${data.nam + 1}`,
        semester: data.hocky,
        teacherId: teacherId,
      });
    }
  };
  const confirmCreate = () => {
    const classData = {
      ...classInfo,
      students: fileData,
    };
    console.log("🚀 ~ confirmCreate ~ classData:", classData);
    const response = dispatch(createClass(classData));
    if (response) {
      toast.success("Tạo lớp thành công");
    } else {
      toast.error("Tạo lớp thất bại");
    }
    navigate("/teacher/classmanagement");
  };
  const onImportData = (data) => {
    setFileData(data);
  };

  return (
    <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-3">
      <BackComponent />
      <div className="flex flex-col">
        <HeaderComponent text="New Class" />
        <InformationForm onChange={handleChange} />
        <div className="flex justify-between items-center mt-10">
          <p className="text-[25px] text-black/25  mb-5">Student</p>
          <div>
            <ButtonComponent label="Clear" onClick={() => setFileData([])} />
            <ButtonComponent label="Import" onClick={toggleModal} />
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
            isQuestion={false}
            onImportData={onImportData}
          />
        )}
        {fileData.length > 0 && (
          <TableComponent
            objects={fileData}
            headers={headers}
            getColumns={getStudentColumns}
          />
        )}
      </div>
      {fileData.length > 0 && (
        <div class="flex justify-center mt-5">
          <button
            onClick={confirmCreate}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Xác nhận
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateClassPage;
