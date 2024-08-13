import back_vector from "../../Assets/back_vector.svg";
import { useNavigate } from "react-router-dom";

const BackComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 cursor-pointer" onClick={() => navigate(-1)}>
      <img src={back_vector} alt="back_vector" />
      <p className="text-[17.5px]">Back</p>
    </div>
  );
};

export default BackComponent;
