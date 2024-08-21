const QuestionCard = ({ question, index, handleOptionChange }) => {
  return (
    <div
      id={index}
      className="bg-white border-black/5 border-2 w-full flex flex-col  p-[36px] drop-shadow-lg rounded-[10px]"
    >
      <div className="text-[24px] flex font-montserrat font-medium">
        <p>{index + 1}. </p>
        <p>
          {question.content}
          {question.answers.map((option, oi) => (
            <div key={oi} className=" flex gap-3 font-light text-[20px]">
              <input
                type="radio"
                id={`q${index}o${oi}`}
                name={`question${index}`}
                onChange={() => handleOptionChange(index, oi)}
              />
              {option.content}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;
