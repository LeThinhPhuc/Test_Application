import ButtonComponent from "../../../Components/ClassManagement/ButtonComponent";
import SearchBarComponent from "../../../Components/ClassManagement/SearchBarComponent";
import ClassCardComponent from "../../../Components/ClassManagement/ClassCardComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ClassManagementPage = () => {
  const classes = [
    { ma: "COMP1432", ten: "Lập trình cơ bản", nam: "2024", hocky: 1 },
    { ma: "COMP2432", ten: "Xác suất thống kê", nam: "2024", hocky: 1 },
    { ma: "COMP3432", ten: "Lý thuyết đồ thị", nam: "2024", hocky: 1 },
    { ma: "COMP4432", ten: "Cấu trúc dữ liệu", nam: "2024", hocky: 1 },
  ];
  const navigate = useNavigate();
  const [filteredClasses, setFilteredClasses] = useState(classes);

  const handleSearch = (query) => {
    const filtered = classes.filter(
      (c) =>
        c.ten.toLowerCase().includes(query.toLowerCase()) ||
        c.ma.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClasses(filtered);
  };
  return (
    <>
      <div className="flex flex-col w-full mx-20 mt-10 font-roboto gap-14">
        {/* searchbar */}
        <div className="flex justify-between">
          <SearchBarComponent onSearch={handleSearch} />{" "}
          <ButtonComponent
            label="+ Create Class"
            onClick={() => navigate("/teacher/classmanagement/createClass")}
          />
        </div>
        {/* Class Cards  */}
        <div className="flex flex-wrap gap-16 justify-start ">
          {filteredClasses.map((c, i) => (
            <ClassCardComponent c={c} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassManagementPage;
