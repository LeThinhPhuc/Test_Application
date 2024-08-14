import { Form, Formik } from "formik";
import { CreateExamSchema } from "../../Schemas";
import CustomInputComponent from "./CustomInputComponent";

const InformationForm = (onChange, examInfo) => {
  return (
    <div className="flex flex-col">
      <p className="text-[25px] text-black/25 mb-5">Information</p>
      <Formik
        initialValues={{ ten: "", ngaythi: "", thoigian: "", giobatdau: "" }}
        validationSchema={CreateExamSchema}
      >
        <Form className="w-[80%] flex flex-col ml-6 ">
          <CustomInputComponent
            label="Tên kỳ thi"
            name="ten"
            type="text"
            placeholder="Enter exam name"
            onChange={onChange}
            value={examInfo.ten}
          />

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
              type="number"
              onChange={onChange}
              value={examInfo.thoigian}
            />
          </div>
          <div className="w-[50%] flex justify-between">
            <CustomInputComponent
              label="Giờ bắt đầu"
              name="giobatdau"
              type="time"
              onChange={onChange}
              value={examInfo.giobatdau}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InformationForm;
