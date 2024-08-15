const AvgComponent = ({ avgScore }) => {
  return (
    <div className=" flex justify-between px-4 py-4 bg-slate-100 rounded-l-full font-montserrat drop-shadow-lg mb-3">
      <span>Điểm trung bình </span>
      <span className="font-medium">{avgScore} điểm</span>
    </div>
  );
};

export default AvgComponent;
