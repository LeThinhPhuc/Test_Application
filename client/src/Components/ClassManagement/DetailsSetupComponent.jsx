const DetailsSetupComponent = (handleChangeDetails) => {
  return (
    <div className="flex flex-col w-[82%]">
      <p className="text-[25px] text-black/25 mb-5">Set Up Details</p>
      <div className="flex ml-6 gap-5 text-lg mb-4">
        <input
          onChange={handleChangeDetails}
          type="checkbox"
          defaultChecked
          className="w-5"
        />
        <p className="">Hiện kết quả sau kì thi</p>
      </div>
      <div className="flex ml-6 gap-5 text-lg">
        <input
          onChange={handleChangeDetails}
          type="checkbox"
          defaultChecked
          className="w-5"
        />
        <p className="">Thêm thời gian</p>
      </div>
    </div>
  );
};

export default DetailsSetupComponent;
