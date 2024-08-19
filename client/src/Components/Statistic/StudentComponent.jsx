const StudentComponent = ({ student }) => {
  return (
    <div className=" px-4 py-4 bg-yellow-100 rounded-l-full font-montserrat drop-shadow-lg">
      Học sinh xuất sắc nhất
      <div className="w-full font-medium flex justify-between">
        <div>{student?.student.name}</div>
        <div>{student?.point} điểm</div>
      </div>
    </div>
  );
};

export default StudentComponent;
