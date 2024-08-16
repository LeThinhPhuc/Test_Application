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
const CreateClassPage = () => {
    const headers = [
        "Mã học sinh",
        "Họ và Tên",
        "Giới tính",
        "Ngày sinh",
        "Tài khoản",
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

    const toggleModal = () => {
        setModal(!modal);
    };
    const toggleModal2 = () => {
        setModal2(!modal2);
        if (fileData.length !== 0) {
            setFileData([]);
        }
    };

    const handleFile = (e) => {
        let selectedFile = e.target.files[0]
        let validFiles = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if (selectedFile && validFiles.includes(selectedFile.type)) {
            console.log(selectedFile.type)
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile)
            reader.onload = (e) => {
                e.preventDefault();
                const sheet = XLSX.read(e.target.result, { type: 'buffer' });
                const workSheetName = sheet.SheetNames[0];
                const workSheet = sheet.Sheets[workSheetName];//0
                const data = XLSX.utils.sheet_to_json(workSheet);
                setFileData(data);
            }
        }
        else {
            toast.error('Please select valid file', {
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

    }
    return (
        <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-3">
            <BackComponent />
            <div className="flex flex-col">
                <HeaderComponent text="New Class" />
                <Formik
                    initialValues={{ ten: "", hocky: "", nam: "" }}
                    onSubmit={() => navigate("/teacher/classmangement")}
                    validationSchema={CreateClassSchema}
                    validateOnChange={true}
                >
                    <Form className="w-full flex flex-col ">
                        <p className="text-[25px] text-black/25 mt-10 mb-5">Information</p>
                        <CustomInputComponent
                            label="Tên lớp"
                            name="ten"
                            type="text"
                            placeholder="Nhập tên lớp"
                        />
                        <div className="w-[75%] flex justify-between gap-2">
                            <CustomInputComponent
                                label="Năm"
                                name="nam"
                                type="number"
                                placeholder="Nhập năm"
                            />
                            <CustomInputComponent
                                label="Học kỳ"
                                name="hocky"
                                type="text"
                                placeholder="Nhập học kỳ"
                            />
                        </div>

                        <StudentManagement/>
                        {/* <div className="flex justify-between items-center mt-10">
                            <p className="text-[25px] text-black/25  mb-5">Student</p>
                            <ButtonComponent label="Import" onClick={toggleModal} />
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
                            />
                        )}
                        {fileData.length > 0 && (
                            <TableComponent
                                objects={fileData}
                                headers={headers}
                                getColumns={getStudentColumns}
                            />
                        )} */}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CreateClassPage;
