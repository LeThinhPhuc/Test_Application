const TimerComponent = ({ timeLeft }) => {
  const formatTime = (time) => {
    if (time > 3600) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time - hours * 3600) / 60);
      const seconds = time % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <div className="bg-white w-full flex flex-col items-center py-5  rounded-[10px]">
      <h2 className=" font-roboto text-[20px] font-[800] ">FINISH BEFORE</h2>
      <div
        className={`mt-3 border-8 ${
          timeLeft <= 10 ? "border-[#fa4242]" : "border-[#28AE00]"
        } font-palanquin text-[25px] rounded-full w-[140px] h-[140px] flex justify-center items-center`}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TimerComponent;
