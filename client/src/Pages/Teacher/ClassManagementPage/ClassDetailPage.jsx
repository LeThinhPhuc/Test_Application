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
        "Ngày thi",
        "Giờ bắt đầu",
        "Giờ kết thúc",
        "Thời gian thi(phút)",
    ];
    const students = [
        { ma: "HS001", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS002", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS003", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS004", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS005", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS006", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS007", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "0932478347" },
        { ma: "HS008", ten: "Vo Thi Thu Hoa", gioi: "Nữ", sdt: "    " },
    ];
    const exams = [
        {
            ma: "63248",
            ten: "Thi Giua ky I Mon Lap Trinh Nang Cao",
            ngaythi: "08/08/2024",
            giobatdau: "08:00:00",
            gioketthuc: "10:00:00",
            thoigianthi: "120",
        },
        {
            ma: "63248",
            ten: "Thi Giua ky I Mon Lap Trinh Nang Cao",
            ngaythi: "08/08/2024",
            giobatdau: "08:00:00",
            gioketthuc: "10:00:00",
            thoigianthi: "120",
        },
        {
            ma: "63248",
            ten: "Thi Giua ky I Mon Lap Trinh Nang Cao",
            ngaythi: "08/08/2024",
            giobatdau: "08:00:00",
            gioketthuc: "10:00:00",
            thoigianthi: "120",
        },
    ];

    const getStudentColumns = (student) => [
        student.ma,
        student.ten,
        student.gioi,
        student.sdt,
    ];

    const getExamColumns = (exam) => [
        exam.ma,
        exam.ten,
        exam.ngaythi,
        exam.giobatdau,
        exam.gioketthuc,
        exam.thoigianthi,
    ];
    return (
        <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-3">
            <BackComponent />
            <div className="flex flex-col">
                <HeaderComponent text={`${classData?.ma} - ${classData?.ten}`} />
                <div className="flex flex-col border-[0.5px] rounded-[10px] px-3 py-5 border-black/50 gap-14 my-10">
                    {/* Thông tin chi tiết  */}
                    <div className="flex flex-col ">
                        <p className="text-[18px] pb-5 ml-6">Thông tin chi tiết</p>
                        <table className="w-full border-collapse border-1 border-black/50 text-[12px]">
                            <tr>
                                <td className="border border-black/50 p-2">Mã lớp</td>
                                <td className="border border-black/50 p-2">{classData?.ma}</td>
                            </tr>
                            <tr>
                                <td className="border border-black/50 p-2">Tên lớp</td>
                                <td className="border border-black/50 p-2">{classData?.ten}</td>
                            </tr>
                            <tr>
                                <td className="border border-black/50 p-2">Học kỳ</td>
                                <td className="border border-black/50 p-2">
                                    {classData?.hocky}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black/50 p-2">Năm học</td>
                                <td className="border border-black/50 p-2">{classData?.nam}</td>
                            </tr>
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
