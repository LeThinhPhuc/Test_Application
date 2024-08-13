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
            className="border-[1px] rounded-lg border-[#7676DC] text-[21px] px-5 py-2 "
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Ngày thi</p>
            <input
              name="ngaythi"
              value={examInfo.ngaythi}
              onChange={onChange}
              type="date"
              className="w-[300px] border-[1px] rounded-lg border-[#7676DC] text-[21px] px-5 py-2 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Thời gian ( phút )</p>
            <input
              name="thoigian"
              value={examInfo.thoigian}
              onChange={onChange}
              type="number"
              min="30"
              max="120"
              className="w-[300px] border-[1px] rounded-lg border-[#7676DC] text-[21px] px-5 py-2 "
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
              className="w-[300px] border-[1px] rounded-lg border-[#7676DC] text-[21px] px-5 py-2 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationForm;
