import { Form, Formik } from "formik";
import BackComponent from "../../../Components/ClassManagement/BackComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";
import CustomInputComponent from "../../../Components/ClassManagement/CustomInputComponent";
import { CreateClassSchema } from "../../../Schemas";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonComponent from "../../../Components/ClassManagement/ButtonComponent";
import { useState } from "react";
import ModalImport from "../../../Components/ClassManagement/ModalImport";
import Modal2Component from "../../../Components/ClassManagement/Modal2Component";
import TableComponent from "../../../Components/ClassManagement/TableComponent";
import StudentManagement from "../../../Components/StudentManagement/StudentManagement";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import classService from "../../../Services/ClassService";

const CreateClassPage = () => {
  const headers = [
    "Mã học sinh",
    "Họ và Tên",
    "Giới tính",
    "Ngày sinh",
    "Tài khoản",
    "Số điện thoại",
  ];
  const getStudentColumns = (fileData) => [
    fileData.ID,
    fileData.FullName,
    fileData.Gender,
    fileData.DateOfBirth,
    fileData.Account,
  ];

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [fileData, setFileData] = useState([]);

  const [classroomName, setClassroomName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [semester, setSemester] = useState("");

  const handleClassroomNameChange = (value) => {
    setClassroomName(value);
  };

  const hanleSchoolYearChange = (value) => {
    setSchoolYear(value);
  };

  const hanleSemesterChange = (value) => {
    setSemester(value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
    if (fileData.length !== 0) {
      setFileData([]);
    }
  };

  const onImportData = (data) => {
    setFileData(data);
  };

  const confirmCreate = () => {
    if (
      classroomName === "" ||
      schoolYear === "" ||
      semester === "" ||
      fileData.length <= 0
    ) {
      toast.error("Vui lòng nhập đủ thông tin", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      createClassroom();
      importStudentstoDatabase();
    }
  };

  const createClassroom = async () => {
    const classroomInfo = {
      classRoomName: classroomName,
      schoolYear: schoolYear,
      semester: semester,
    };

    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const decoded = jwtDecode(token);
    const teacherId = decoded.teacher.teacherId;
    classroomInfo.teacherId = teacherId;
    // const response = await classService.createClassAsync(classroomInfo)
    const response = 201;
    if (response === "201") {
      importStudentstoDatabase();
      toast.success("Tạo lớp thành công");
    } else {
      toast.error("Tạo lớp thất bại");
    }
  };

  const importStudentstoDatabase = () => {
    console.log(fileData);
  };

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    let validFiles = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (selectedFile && validFiles.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        e.preventDefault();
        const sheet = XLSX.read(e.target.result, { type: "buffer" });
        const workSheetName = sheet.SheetNames[0];
        const workSheet = sheet.Sheets[workSheetName]; //0
        const data = XLSX.utils.sheet_to_json(workSheet);
        setFileData(data);
      };
    } else {
      toast.error("Please select valid file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-3">
      <BackComponent />
      <div className="flex flex-col">
        <HeaderComponent text="New Class" />
        <Formik
          initialValues={{ ten: "", hocky: "", nam: "" }}
          onSubmit={() => navigate("/teacher/classmangement")}
          // validationSchema={CreateClassSchema}
          //   validateOnChange={true}
        >
          <Form className="w-full flex flex-col ">
            <p className="text-[25px] text-black/25 mt-10 mb-5">Information</p>
            <CustomInputComponent
              label="Tên lớp"
              name="ten"
              type="text"
              placeholder="Nhập tên lớp"
              onChange={handleClassroomNameChange}
            />
            <div className="w-[75%] flex justify-between gap-2">
              <CustomInputComponent
                label="Năm"
                name="nam"
                type="number"
                placeholder="Nhập năm"
                onChange={hanleSchoolYearChange}
              />
              <CustomInputComponent
                label="Học kỳ"
                name="hocky"
                type="text"
                placeholder="Nhập học kỳ"
                onChange={hanleSemesterChange}
              />
            </div>

            <div className="flex justify-between items-center mt-10">
              <p className="text-[25px] text-black/25  mb-5">Student</p>
              <div>
                <ButtonComponent
                  label="Clear"
                  onClick={() => setFileData([])}
                />
                <ButtonComponent label="Import" onClick={toggleModal} />
              </div>
            </div>
            {modal && (
              <ModalImport
                toggleModal={toggleModal}
                toggleModal2={toggleModal2}
              />
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
          </Form>
        </Formik>
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
