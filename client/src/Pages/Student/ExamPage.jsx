import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";

const ExamPage = () => {
  const [modal, setModel] = useState(false);

  const toggleModal = () => {
    setModel(!modal);
  };

  const questions = [
    {
      title: "Con voi có bao nhiêu cái chân?",
      options: ["1 chân", "2 chân", "3 chân", "4 chân"],
    },
    {
      title: "Con cá có bao nhiêu cái chân?",
      options: ["1 chân", "2 chân", "3 chân", "0 chân"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai", "3 chân", "4 chân"],
    },
    {
      title: "Mendix có phải phần mềm low-code không?",
      options: ["Đúng", "Sai", "3 chân", "4 chân"],
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(Array(questions.length).fill(null));
  }, []);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };
  return (
    <div className={`w-full h-full`}>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className={`w-full h-full ${modal && "blur-sm"}`}>
        <Header />
        <div className="flex items-start mt-10 mx-[50px] mb-[100px]">
          {/* left */}
          <div className=" w-[60%] items-center flex flex-col gap-[36px]">
            {questions.map((question, i) => (
              <div
                id={i}
                key={i}
                className="bg-white border-black/5 border-2 w-full flex flex-col  p-[36px] drop-shadow-lg rounded-[10px]"
              >
                <div className="text-[24px] flex font-montserrat font-medium">
                  <p>{i + 1}. </p>
                  <p>
                    {" "}
                    {question.title}
                    {question.options.map((option, oi) => (
                      <div
                        key={oi}
                        className=" flex gap-3 font-light text-[20px]"
                      >
                        <input
                          type="radio"
                          id={`q${i}o${oi}`}
                          name={`question${i}`}
                          onChange={() => handleOptionChange(i, oi)}
                        />
                        {option}
                      </div>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* right */}
          <div className="overflow-y-auto fixed w-[30%] right-20 flex-[2] top-[90px] bottom-[10px] flex flex-col gap-[20px] justify-center items-center">
            <div className="bg-white w-full flex flex-col items-center py-5  rounded-[10px]">
              <h2 className=" font-roboto text-[20px] font-[800] ">
                FINISH BEFORE
              </h2>
              <div className="mt-3 border-8 border-[#28AE00] font-palanquin text-[25px] rounded-full w-[140px] h-[140px] flex justify-center items-center">
                00:00:10
              </div>
            </div>
            <div className="bg-white w-full px-8 flex justify-start py-5 border-black/5 border-2 rounded-[10px] flex-wrap gap-[34px]">
              {questions.map((question, i) => (
                <a
                  href={`#${i}`}
                  key={i}
                  className={`w-[60px] h-[60px] rounded-[9px] border-2 flex justify-center items-center font-montserrat 
                  ${
                    selectedOptions[i] !== null
                      ? "bg-[#EAFDE7] text-green-600"
                      : ""
                  }`}
                >
                  {i + 1}
                </a>
              ))}
            </div>
            <button
              className="mb-10 cursor-pointer font-montserrat w-[219px] h-[65px] rounded-[30px] bg-black/85 font-medium text-[26px] text-white"
              onClick={toggleModal}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-[24px] font-montserrat font-medium mb-4">
              Confirm Submit
            </h2>
            <p>Are you sure you want to submit your answers?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={toggleModal}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
