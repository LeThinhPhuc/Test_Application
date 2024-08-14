const QuestionComponent = ({
  toggleModal,
  selectedQuestions = [],
  handleDeleteSelectedQuestion,
  handleDeleteAll,
}) => {
  return (
    <div className="flex flex-col w-[82%]">
      <div className="flex justify-between mb-5">
        <p className="text-[25px] text-black/25 ">Question</p>
        <div className="flex gap-5">
          <button
            onClick={toggleModal}
            className="border-[1px] border-black/25 bg-white rounded-xl text-[16px] text-[#01008A] px-6 py-1 hover:text-white hover:bg-[#01008A]/80"
          >
            + Add Question
          </button>
          <button
            onClick={handleDeleteAll}
            className="border-[1px] border-black/25 bg-white rounded-xl text-[16px] text-red-600 px-6 py-1 hover:text-white hover:bg-red-600/80"
          >
            Delete All
          </button>
        </div>
      </div>
      {selectedQuestions.length ? (
        <table className="ml-6 w-full border-collapse border-1 border-black/50 text-[12px]">
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
            {selectedQuestions.map((q, i) => (
              <tr key={i}>
                <td className="border border-black/50 p-2">{q.ma}</td>
                <td className="border border-black/50 p-2 w-[300px] h-[100px]">
                  {q.noidung}
                </td>
                <td className="border border-black/50 p-2">{q.chude}</td>
                <td className="border border-black/50 p-2">{q.loai}</td>
                <td className="border border-black/50 p-2">{q.diem}</td>
                <td className="border border-black/50 p-2 text-center">
                  <button onClick={() => handleDeleteSelectedQuestion(q)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="ml-6">Chưa có câu hỏi được thêm</div>
      )}
    </div>
  );
};

export default QuestionComponent;
