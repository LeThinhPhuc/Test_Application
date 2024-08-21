import { useNavigate } from "react-router-dom";

const ClassCardComponent = ({ c }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[171px] rounded-xl bg-white flex flex-col items-center shadow-lg border-[1px] border-black/5">
      <div
        className={`bg-[#ADFC96] w-[42px] h-[42px] my-4 rounded-full flex justify-center items-center text-[#28AE00] text-[16px]`}
      >
        {c.classRoomName[0]}
      </div>
      <div className="w-full h-[150px] flex flex-col py-4 font-light text-[14px] uppercase bg-[#F3F3F4]">
        {/* <p className="flex justify-center text-center">{c.classRoomId}</p> */}
        <p className="flex justify-center text-center h-[50px] overflow-hidden text-ellipsis">
          {c.classRoomName}
        </p>
        <p className="w-full flex flex-col items-center font-light pt-4 text-[12px]">{`Học kỳ ${c.semester} - Năm ${c.schoolYear}`}</p>
      </div>
      <button
        onClick={() =>
          navigate(`/teacher/classmanagement/${c.classRoomId}`, { state: c })
        }
        className="flex font-palanquin py-1 text-sm underline hover:no-underline"
      >
        Edit
      </button>
    </div>
  );
};

export default ClassCardComponent;
