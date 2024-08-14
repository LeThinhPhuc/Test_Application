const InformationForm = (onChange, examInfo) => {
  return (
    <div className="flex flex-col">
      <p className="text-[25px] text-black/25 mb-5">Information</p>
      <div className="flex flex-col ml-6 w-[80%] gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-[18px]">Tên kỳ thi</p>
          <input
            name="ten"
            value={examInfo.ten}
            type="text"
            onChange={onChange}
            placeholder="Enter exam name"
            onChange={onChange}
            value={examInfo.ten}
          />
        </div>

          <div className="w-[75%] flex justify-between gap-2">
            <CustomInputComponent
              label="Ngày thi"
              name="ngaythi"
              type="date"
              onChange={onChange}
              value={examInfo.ngaythi}
            />
            <CustomInputComponent
              label="Thời gian"
              name="thoigian"
              value={examInfo.thoigian}
              onChange={onChange}
              type="number"
              onChange={onChange}
              value={examInfo.thoigian}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Giờ bắt đầu</p>
            <input
              name="giobatdau"
              value={examInfo.giobatdau}
              onChange={onChange}
              type="time"
              onChange={onChange}
              value={examInfo.giobatdau}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationForm;
