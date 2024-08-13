import search_icon from "../../Assets/search_icon.png";

const ModalComponent = ({
  subjects = [],
  setSelectedSubject,
  selectedQuestions,
  setSelectedQuestions,
  selectedSubject,
  handleCheckboxChange,
  setModel,
}) => {
  const questions = [
    {
      ma: "CH000",
      noidung:
        "Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó? Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó? Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó?",
      chude: "Chương 3",
      loai: "Trắc nghiệm",
      diem: 2,
    },
    {
      ma: "CH001",
      noidung:
        "Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó?",
      chude: "Chương 3",
      loai: "Trắc nghiệm",
      diem: 2,
    },
    {
      ma: "CH002",
      noidung:
        "Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó?",
      chude: "Chương 3",
      loai: "Trắc nghiệm",
      diem: 2,
    },
    {
      ma: "CH003",
      noidung:
        "Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó?",
      chude: "Chương 3",
      loai: "Trắc nghiệm",
      diem: 2,
    },
    {
      ma: "CH004",
      noidung:
        "Trong C++, khi quá tải toán tử + cho một lớp, phương thức nào được gọi khi toán tử + được sử dụng giữa hai đối tượng của lớp đó?",
      chude: "Chương 3",
      loai: "Trắc nghiệm",
      diem: 2,
    },
  ];

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]); // Deselect all if already all selected
    } else {
      setSelectedQuestions(filteredQuestions); // Select all
    }
  };
  const filteredQuestions = questions.filter(
    (question) => question.chude === selectedSubject
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-md max-h-[80vh] shadow-md px-20 overflow-y-auto">
          <p className="text-[40px] text-[#01008A] uppercase font-medium text-center mb-5">
            add question
          </p>
          <div className="">
            {/* Search bar  */}
            <div className="flex justify-between mb-8">
              <div className="relative ">
                <input
                  type="text"
                  className="h-[44px] w-96 pr-8 pl-16 rounded-lg z-0 hover:shadow focus:outline-none"
                  placeholder="Search Class..."
                />
                <div className="absolute top-3 left-5 cursor-pointer">
                  <img
                    src={search_icon}
                    alt="search_icon"
                    className="hover:w-5"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  onClick={(e) => setSelectedSubject(e.target.value)}
                  name="options"
                  id="options"
                  className="w-48 border-2 border-black/10 rounded-xl px-3"
                >
                  {subjects.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSelectAll}
                  className="px-2 text-[16px] text-[#21BF07] border-black/10 border-2 rounded-xl hover:bg-[#21BF07]/50 hover:text-white"
                >
                  Select All
                </button>
              </div>
            </div>
            {selectedQuestions.length > 0 && (
              <div className="text-left text-black/50 text-sm ">
                Selected {selectedQuestions.length} / {questions.length}{" "}
              </div>
            )}
            {/* Table  */}
            <table className=" w-full border-collapse border-1 border-black/50 text-[12px]">
              <thead className="bg-[#01008A] text-white text-center">
                <tr>
                  <td className="border border-white/50 p-2">Mã câu hỏi</td>
                  <td className="border border-white/50 p-2">Nội dung</td>
                  <td className="border border-white/50 p-2">Chủ đề</td>
                  <td className="border border-white/50 p-2">Loại</td>
                  <td className="border border-white/50 p-2">Số điểm</td>
                  <td className="border border-white/50 p-2">Chọn</td>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q, i) => (
                  <tr key={i}>
                    <td className="border border-black/50 p-2">{q.ma}</td>
                    <td className="border border-black/50 p-2 w-[300px] h-[100px]">
                      {q.noidung}
                    </td>
                    <td className="border border-black/50 p-2">{q.chude}</td>
                    <td className="border border-black/50 p-2">{q.loai}</td>
                    <td className="border border-black/50 p-2">{q.diem}</td>
                    <td className="border border-black/50 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedQuestions.some(
                          (selected) => selected.ma === q.ma
                        )}
                        onChange={() => handleCheckboxChange(q.ma)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                onClick={() => setModel(false)}
                className="my-8 bg-[#01008A] text-white px-3 py-1"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
