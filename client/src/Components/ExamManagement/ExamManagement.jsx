import { useState } from "react";
import "./ExamManagement.css";
import StatisticComponent from "../Statistic/StatisticComponent";

const ExamManagement = () => {
  const examData = [
    {
      code: "00080423",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "08/08/2024",
      startTime: "08:00",
      endTime: "08:00",
    },
    {
      code: "00081023",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    {
      code: "00087823",
      name: "LẬP TRÌNH NÂNG CAO - GIỮA KỲ 1",
      date: "",
      startTime: "",
      endTime: "",
    },
    // Add more exam data here
  ];
  const [date, setDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const handleChange = (event) => {
    const inputDate = new Date(event.target.value);
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const year = inputDate.getFullYear();
    setDate(event.target.value);
  };
  const [statistic, setStatistic] = useState(false);
  const [currentExam, setCurrentExam] = useState();
  const handleClick = (exam) => {
    setStatistic(true);
    setCurrentExam(exam);
  };

  return (
    <div className="flex-1">
      <div class="max-w-2xl mx-auto flex items-center">
        <form class="flex-grow items-center">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
                <select className="ml-4" value={selectedType} onChange={handleTypeChange}>
                    <option value="">All Types</option>
                    <option value="GIỮA KỲ 1">GIỮA KÌ 1</option>
                    <option value="GIỮA KỲ 2">GIỮA KÌ 2</option>
                    <option value="CUỐI KÌ 1">CUỐI KÌ 1</option>
                    <option value="CUỐI KÌ 2">CUỐI KÌ 2</option>
                </select>
            </div>

        <select className="ml-4">
          <option value="">Value</option>
          <option value="">Value1</option>
          <option value="">Value2</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="th">Mã kỳ thi</th>
              <th className="th">Tên kỳ thi</th>
              <th className="th">Ngày thi</th>
              <th className="th">Giờ bắt đầu</th>
              <th className="th">Giờ kết thúc</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {examData.map((exam, index) => (
              <tr key={index} onClick={() => handleClick(exam)}>
                <td className="td">{exam.code}</td>
                <td className="td">{exam.name}</td>
                <td className="td">{exam.date}</td>
                <td className="td">{exam.startTime}</td>
                <td className="td">{exam.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {statistic && <StatisticComponent examData={currentExam} />}
      <input type="datetime"></input>
    </div>
  );
};

export default ExamManagement;
