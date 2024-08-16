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
    ten: yup.string().required("Required"),
    ngaythi: yup.date().required("Required"),
    thoigian: yup.number().required("Required"),
    giobatdau: yup.string().required("Required"),
});
