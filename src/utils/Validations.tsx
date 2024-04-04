import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});
export const sentEmailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
});
export const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
});
