import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ExamManagement.css";
import { exams } from "../../redux/Reducer/ExamSlice";
import { fetchAllExam, fetchStatistic } from "../../redux/Action/ExamAction";
import StatisticComponent from "../Statistic/StatisticComponent";

const ExamManagement = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllExam());
  }, [dispatch]);
  const examsData = useSelector(exams);
  const [date, setDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleStatistic, setToggleStatistic] = useState(false);
  const [currentExam, setCurrentExam] = useState(examsData[0]);
  const [statistic, setStatistic] = useState({});

  // useEffect(() => {
  //   dispatch(fetchTests());
  // }, [dispatch]);
  // const examsData = useSelector(exams);
  console.log(examsData);
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const filteredExams = examsData?.filter((exam) => {
    const matchesType =
      selectedType === "" || exam.testName.includes(selectedType);
    const matchesSearch =
      searchTerm === "" ||
      exam.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.id.includes(searchTerm);
    const matchesDate = date === "" || exam.testDay === date;
    return matchesType && matchesSearch && matchesDate;
  });
  const handleClick = async (exam) => {
    setCurrentExam(exam);
    setStatistic(await dispatch(fetchStatistic(exam?.id)));
    setToggleStatistic(true);
  };
  return (
    <div className="flex-1">
      <div className="max-w-2xl mx-auto flex items-center">
        <form className="flex-grow items-center">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Name or ID of Exam"
              required
            />
          </div>
        </form>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="ml-4"
        />
        <select
          className="ml-4"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">All Types</option>
          <option value="GIỮA KỲ 1">GIỮA KÌ 1</option>
          <option value="GIỮA KỲ 2">GIỮA KÌ 2</option>
          <option value="CUỐI KÌ 1">CUỐI KÌ 1</option>
          <option value="CUỐI KÌ 2">CUỐI KÌ 2</option>
          <option value="GIỮA KỲ 2"> HÈ </option>

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
            {filteredExams.length > 0 ? (
              filteredExams.map((exam, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    handleClick(exam);
                  }}
                >
                  <td className="td">{exam.id}</td>
                  <td className="td">{exam.testName}</td>
                  <td className="td">{exam.testDay}</td>
                  <td className="td">{exam.timeStart}</td>
                  <td className="td">{exam.timeEnd}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="td text-center">
                  No exams found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {toggleStatistic && (
        <StatisticComponent exam={currentExam} statistic={statistic} />
      )}
    </div>
  );
};

export default ExamManagement;