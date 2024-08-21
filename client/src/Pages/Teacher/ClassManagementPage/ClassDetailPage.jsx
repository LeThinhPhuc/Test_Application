import { useLocation } from "react-router-dom";
import BackComponent from "../../../Components/ClassManagement/BackComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";
import TableComponent from "../../../Components/ClassManagement/TableComponent";
const ClassDetailPage = () => {
  const location = useLocation();
  const classData = location.state;

  const thStudent = ["Mã học sinh", "Họ và Tên", "Giới tính", "Sô điện thoại"];
  const thExam = [
    "Mã kỳ thi",
    "Tên kỳ thi",
    "Thời gian thi(phút)",
    "Ngày thi",
    "Giờ bắt đầu",
    "Giờ kết thúc",
  ];

  const students = classData?.students;
  console.log("🚀 ~ ClassDetailPage ~ students:", students);
  const exams = classData?.tests;

  const renderRow = (label, value) => (
    <tr>
      <td className="border border-black/50 p-2">{label}</td>
      <td className="border border-black/50 p-2">{value}</td>
    </tr>
  );
  const getStudentColumns = (student) => [
    student.id,
    student.name,
    student.phone,
    student.gender,
  ];

  const getExamColumns = (exam) => [
    exam.id,
    exam.testName,
    exam.testTime,
    exam.testDay,
    exam.timeStart,
    exam.timeEnd,
  ];
  return (
    <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-3">
      <BackComponent />
      <div className="flex flex-col">
        <HeaderComponent text={`LỚP ${classData?.classRoomName}`} />
        <div className="flex flex-col border-[0.5px] rounded-[10px] px-3 py-5 border-black/50 gap-14 my-10">
          {/* Thông tin chi tiết  */}
          <div className="flex flex-col ">
            <p className="text-[18px] pb-5 ml-6">Thông tin chi tiết</p>
            <table className="w-full border-collapse border-1 border-black/50 text-[12px]">
              {renderRow("Mã lớp", classData?.classRoomId)}
              {renderRow("Tên lớp", classData?.classRoomName)}
              {renderRow("Học kỳ", classData?.semester)}
              {renderRow("Năm học", classData?.schoolYear)}
            </table>
          </div>

          {/* Danh sách học viên  */}
          <TableComponent
            label="Danh sách học sinh"
            objects={students}
            headers={thStudent}
            getColumns={getStudentColumns}
          />
          {/* Danh sách kỳ thi  */}
          <TableComponent
            label="Danh sách kỳ thi"
            classData={classData}
            objects={exams}
            headers={thExam}
            getColumns={getExamColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
