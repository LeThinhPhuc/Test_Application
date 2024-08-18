import ButtonComponent from "../../../Components/ClassManagement/ButtonComponent";
import SearchBarComponent from "../../../Components/ClassManagement/SearchBarComponent";
import ClassCardComponent from "../../../Components/ClassManagement/ClassCardComponent";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClassForTeacher } from "../../../redux/Action/classAction";
import { classes } from "../../../redux/Reducer/classSlice";
const ClassManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("teacherId");
  useEffect(() => {
    dispatch(fetchAllClassForTeacher(teacherId));
  }, [dispatch]);
  const classesData = useSelector(classes);
  const [filteredClasses, setFilteredClasses] = useState(classesData);
  useEffect(() => {
    setFilteredClasses(classesData);
  }, [classesData]);

  const handleSearch = (query) => {
    const filtered = classesData.filter(
      (c) =>
        c.classRoomName.toLowerCase().includes(query.toLowerCase()) ||
        c.classRoomId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClasses(filtered);
  };
  return (
    <>
      <div className="flex flex-col w-full mx-20 mt-10 font-roboto gap-14">
        {/* Searchbar */}
        <div className="flex justify-between">
          <SearchBarComponent onSearch={handleSearch} />
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
