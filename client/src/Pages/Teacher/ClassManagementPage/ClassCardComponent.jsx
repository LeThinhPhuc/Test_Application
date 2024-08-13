import { useNavigate } from "react-router-dom";

const ClassCardComponent = ({ c, i }) => {
  const navigate = useNavigate();

  return (
    <div
      key={i}
      className="w-[171px] rounded-xl bg-white flex flex-col items-center shadow-lg border-[1px] border-black/5"
    >
      <div
        className={`bg-[#ADFC96] w-[42px] h-[42px] my-4 rounded-full flex justify-center items-center text-[#28AE00] text-[16px]`}
      >
        {c.ten[0]}
      </div>
      <div className="w-full h-[150px] flex flex-col py-4 font-light text-[14px] uppercase bg-[#F3F3F4]">
        <p className="flex justify-center text-center">{c.ma}</p>
        <p className="flex justify-center text-center h-[50px] overflow-hidden text-ellipsis">
          {c.ten}
        </p>
        <p className="w-full flex flex-col items-center font-light pt-4 text-[12px]">{`Học kỳ ${c.hocky} - Năm ${c.nam}`}</p>
      </div>
      <button
        onClick={() =>
          navigate(`/teacher/classmanagement/${c.ma}`, { state: c })
        }
        className="flex font-palanquin py-1 text-sm underline hover:no-underline"
      >
        Edit
      </button>
    </div>
  );
};

export default ClassCardComponent;
