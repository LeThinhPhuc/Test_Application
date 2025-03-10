import { useState } from "react";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import BlankFileComponent from "./Modals2/BlankFileComponent";
import CloseButtonComponent from "./Modals2/CloseButtonComponent";

const Modal2Component = ({
  toggleModal,
  toggleModal2,
  fileData,
  setFileData,
  modal2,
  isQuestion,
  onImportData,
}) => {
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
        const workSheet = sheet.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(workSheet);
        if (isQuestion) {
          // Chuyển đổi dữ liệu
          const formattedData = data.map((row) => {
            return {
              question: row["content"],
              answers: [
                {
                  A: row["A"],
                  isCorrect: row["answer"] === "A" ? "True" : "False",
                },
                {
                  B: row["B"],
                  isCorrect: row["answer"] === "B" ? "True" : "False",
                },
                {
                  C: row["C"],
                  isCorrect: row["answer"] === "C" ? "True" : "False",
                },
                {
                  D: row["D"],
                  isCorrect: row["answer"] === "D" ? "True" : "False",
                },
              ],
            };
          });
          setFileData(formattedData);
        } else {
          const formattedData = data.map((row) => {
            return {
              id: row["ID"],
              gender: row["Gender"],
              name: row["Full Name"],
              phone: row["Phone"],
            };
          });
          setFileData(formattedData);
        }
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

  const selectNewFile = () => {
    setFileData([]);
  };
  return (
    <div className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed overflow-y-auto">
      <div
        onClick={toggleModal2}
        className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed bg-black/70"
      ></div>
      <div className="relative p-4 w-full max-h-full modal-content2">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <CloseButtonComponent toggleModal2={toggleModal2} />
          <div className="p-4 md:p-5 text-center">
            {fileData.length === 0 ? (
              <BlankFileComponent handleFile={handleFile} />
            ) : (
              <div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {Object.keys(currentObjects[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isQuestion ? (
                      currentObjects.map((value, index) => (
                        <tr
                          key={index}
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td>{value.question}</td>
                          <td>
                            {value.answers.map((answer, i) => (
                              <li key={i}>
                                {`${String.fromCharCode(65 + i)}. `}
                                {answer.A || answer.B || answer.C || answer.D}:
                                <strong>{answer.isCorrect}</strong>
                              </li>
                            ))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        {currentObjects.map((value, index) => (
                          <tr
                            key={index}
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            {Object.keys(value).map((key) => (
                              <td key={key}>{value[key]}</td>
                            ))}
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isModal2={modal2}
                  selectNewFile={selectNewFile}
                  fileData={fileData}
                  toggleModal2={toggleModal2}
                  toggleModal={toggleModal}
                  onImportData={onImportData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2Component;
