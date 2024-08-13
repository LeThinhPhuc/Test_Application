import { useNavigate } from "react-router-dom";

const CreateButtonComponent = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/teacher/classmanagement/createClass")}
      className="px-8 text-[16px] border-black/10 border-2 rounded-2xl hover:scale-105 hover:border-black"
    >
      + Create Class
    </button>
  );
};

export default CreateButtonComponent;
