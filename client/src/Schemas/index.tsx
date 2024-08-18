import * as yup from "yup";

export const CreateClassSchema = yup.object().shape({
  ten: yup.string().required("Required"),
  hocky: yup
    .string()
    .oneOf(["1", "2", "Hè"], "Vui lòng nhập học kỳ phù hợp như: 1, 2, Hè")
    .required("Required"),
  nam: yup
    .number()
    .min(2010, "Vui lòng nhập năm hợp lệ")
    .max(2030, "Vui lòng nhập năm hợp lệ")
    .required("Required"),
});

export const CreateExamSchema = yup.object().shape({
  testName: yup.string().required("Required"),
  testDay: yup.date().required("Required"),
  testTime: yup.number().required("Required"),
  timeEnd: yup.string().required("Required"),
  timeStart: yup.string().required("Required"),
});
