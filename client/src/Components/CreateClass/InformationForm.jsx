import { Form, Formik } from "formik";
import { CreateClassSchema } from "../../Schemas";
import CustomInputComponent from "../ClassManagement/CustomInputComponent";

const InformationForm = ({ onChange }) => {
  return (
    <Formik
      initialValues={{ ten: "", hocky: "", nam: "" }}
      validationSchema={CreateClassSchema}
      validateOnChange={true}
    >
      {({ values }) => {
        onChange(values);
        return (
          <Form className="w-full flex flex-col ">
            <p className="text-[25px] text-black/25 mt-10 mb-5">Information</p>
            <CustomInputComponent
              label="Tên lớp"
              name="ten"
              type="text"
              placeholder="Nhập tên lớp"
              // onChange={handleChange}
            />
            <div className="w-[75%] flex justify-between gap-2">
              <CustomInputComponent
                label="Năm"
                name="nam"
                type="number"
                placeholder="Nhập năm"
                // onChange={handleChange}
              />
              <CustomInputComponent
                label="Học kỳ"
                name="hocky"
                type="text"
                placeholder="Nhập học kỳ"
                // onChange={handleChange}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InformationForm;
