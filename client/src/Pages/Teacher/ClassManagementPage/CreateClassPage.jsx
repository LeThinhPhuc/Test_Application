import BackComponent from "../../../Components/ClassManagement/BackComponent";
import HeaderComponent from "../../../Components/ClassManagement/HeaderComponent";

const CreateClassPage = () => {
  return (
    <div className="flex flex-col w-full mx-20 mt-10 font-roboto mb-3">
      <BackComponent />
      <div className="flex flex-col">
        <HeaderComponent text="New Class" />
      </div>
    </div>
  );
};

export default CreateClassPage;
