import { Form, Formik } from "formik";
import { CreateExamSchema } from "../../Schemas";
import CustomInputComponent from "./CustomInputComponent";
import { Button } from "antd";
import { useState } from "react";

const InformationForm = ({ onSubmit, classId }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  // const calculateTestTime = (startTime, endTime) => {
  //   if (!startTime || !endTime) return 0;

  //   const start = new Date(startTime);
  //   const end = new Date(endTime);
  //   const differenceInMinutes = (end - start) / (1000 * 60);

  //   return Math.max(0, differenceInMinutes);
  // };

  const formatTime = (time) => {
    if (!time) return "00:00:00";
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  };
  return (
    <div className="flex flex-col">
      <p className="text-[25px] text-black/25 mb-5">Information</p>
      <Formik
        initialValues={{
          testDay: "",
          testName: "",
          testTime: 0,
          timeEnd: "",
          timeStart: "",
        }}
        validationSchema={CreateExamSchema}
        onSubmit={(values) => {
          const examData = { ...values, classRoomId: classId };
          const formattedValues = {
            ...examData,
            timeStart: formatTime(values.timeStart),
            timeEnd: formatTime(values.timeEnd),
          };
          if (onSubmit) {
            setIsDisabled(true);
            onSubmit(formattedValues);
          }
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className="w-[80%] flex flex-col ml-6 ">
              <CustomInputComponent
                label="Tên kỳ thi"
                name="testName"
                type="text"
                placeholder="Enter exam name"
                disabled={isDisabled}
              />

              <div className=" flex justify-between gap-2">
                <CustomInputComponent
                  label="Ngày thi"
                  name="testDay"
                  type="date"
                  disabled={isDisabled}
                />
                {/* <CustomInputComponent
                  label="Thời gian"
                  name="testTime"
                  type="number"
                  disabled={true}
                /> */}
              </div>
              <div className="w-[75%] flex justify-between gap-2">
                <CustomInputComponent
                  label="Giờ bắt đầu"
                  name="timeStart"
                  type="time"
                  disabled={isDisabled}
                />
                <CustomInputComponent
                  label="Giờ kết thúc"
                  name="timeEnd"
                  type="time"
                  disabled={isDisabled}
                />
              </div>
              <Button
                htmlType="submit"
                className="w-[75%]"
                disabled={!isValid || !dirty || isDisabled}
              >
                OK
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InformationForm;
