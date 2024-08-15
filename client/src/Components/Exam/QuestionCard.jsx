const QuestionCard = ({ question, questionIndex, handleOptionChange }) => {
  return (
    <div
      id={questionIndex}
      key={questionIndex}
      className="bg-white border-black/5 border-2 w-full flex flex-col  p-[36px] drop-shadow-lg rounded-[10px]"
    >
      <div className="text-[24px] flex font-montserrat font-medium">
        <p>{questionIndex + 1}. </p>
        <p>
          {" "}
          {question.title}
          {question.options.map((option, oi) => (
            <div key={oi} className=" flex gap-3 font-light text-[20px]">
              <input
                type="radio"
                id={`q${questionIndex}o${oi}`}
                name={`question${questionIndex}`}
                onChange={() => handleOptionChange(questionIndex, oi)}
              />
              {option}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
