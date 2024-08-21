import { Empty } from "antd";
import Pagination from "./Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableComponent = ({
  label,
  classData,
  objects,
  headers = [],
  getColumns,
}) => {
  const navigate = useNavigate();
  console.log("🚀 ~ classData:", classData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalObjects = objects?.length;
  const totalPages = Math.ceil(totalObjects / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentObjects = objects?.slice(startIndex, endIndex);
  return (
    <div className="flex flex-col">
      <div className="text-[18px] pb-5 flex justify-between">
        {label !== "" && <p className="text-[18px] pb-5 ml-6">{label}</p>}
        {label === "Danh sách kỳ thi" && (
          <button
            onClick={() =>
              navigate(`/teacher/createExam/${classData.classRoomId}`, {
                state: classData.classRoomId,
              })
            }
            className="mr-6 drop-shadow-lg bg-white rounded-xl text-[16px] text-[#01008A] px-6 py-2 hover:text-white hover:bg-[#01008A]/80"
          >
            Create Exam
          </button>
        )}
      </div>
      {currentObjects && currentObjects.length > 0 ? (
        <>
          <table className="w-full border-collapse border-1 border-black/50 text-[12px]">
            <thead className="bg-[#01008A] text-white text-center">
              <tr>
                {headers.map((header, i) => (
                  <td key={i} className="border border-white/50 p-2">
                    {header}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentObjects.map((object, index) => (
                <tr key={index}>
                  {getColumns(object).map((col, i) => (
                    <td key={i} className="border border-black/50 p-2">
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default TableComponent;
