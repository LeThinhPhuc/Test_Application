const IndexCardComponent = ({ questionIndex, selectedOptions }) => {
  return (
    <a
      href={`#${questionIndex}`}
      key={questionIndex}
      className={`w-[60px] h-[60px] rounded-[9px] border-2 flex justify-center items-center font-montserrat 
  ${
    selectedOptions[questionIndex] !== null ? "bg-[#EAFDE7] text-green-600" : ""
  }`}
    >
      {questionIndex + 1}
    </a>
  );
};

export default IndexCardComponent;
