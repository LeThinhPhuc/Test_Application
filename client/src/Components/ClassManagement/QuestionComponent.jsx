import { useState } from "react";
import Pagination from "./Pagination";
import { v7 as uuidv7 } from "uuid";

const QuestionComponent = ({ toggleModal, fileData = [], handleDeleteAll }) => {
  const id = uuidv7();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalObjects = fileData.length;
  const totalPages = Math.ceil(totalObjects / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentObjects = fileData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-[82%]">
      <div className="flex justify-between mb-5">
        <p className="text-[25px] text-black/25 ">Question</p>
        <div className="flex gap-5">
          <button
            onClick={toggleModal}
            className="border-[1px] border-black/25 bg-white rounded-xl text-[16px] text-[#01008A] px-6 py-1 hover:text-white hover:bg-[#01008A]/80"
          >
            + Import Question
          </button>
          <button
            onClick={handleDeleteAll}
            className="border-[1px] border-black/25 bg-white rounded-xl text-[16px] text-red-600 px-6 py-1 hover:text-white hover:bg-red-600/80"
          >
            Delete All
          </button>
        </div>
      </div>
      {fileData.length ? (
        <>
          <table className="ml-6 w-full border-collapse border-1 border-black/50 text-[12px]">
            <thead className="bg-[#01008A] text-white text-center">
              <tr>
                <td className="border border-white/50 p-2">Mã câu hỏi</td>
                <td className="border border-white/50 p-2">Nội dung</td>
                <td className="border border-white/50 p-2">Câu trả lời</td>
              </tr>
            </thead>
            <tbody>
              {currentObjects.map((q, i) => (
                <tr key={i}>
                  <td className="border border-black/50 p-2">{id}</td>
                  <td className="border border-black/50 p-2 w-[300px] h-[100px]">
                    {q.question}
                  </td>
                  <td className="border border-black/50 p-2">
                    <ul>
                      {q.answers.map((answer, i) => (
                        <li key={i}>
                          {`${String.fromCharCode(65 + i)}. `}
                          {answer.A || answer.B || answer.C || answer.D}:
                          <strong>{answer.isCorrect}</strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            fileData={fileData}
          />
        </>
      ) : (
        <div className="ml-6">Chưa có câu hỏi được thêm</div>
      )}
    </div>
  );
};

export default QuestionComponent;
