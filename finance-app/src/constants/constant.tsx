import * as yup from "yup";

export const SignUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const SignUpValidationSchema = yup.object({
  firstName: yup
    .string()
    .max(20, "first name must be at most 20 characters")
    .required("first name is required"),
  lastName: yup
    .string()
    .max(20, "last name must be at most 20 characters")
    .required("last name is required"),
  email: yup.string().email("Enter a valid email").required("email is required"),
  password: yup.string()
    .required("password is required")
    .min(5,"password must be at least 5 characters")
    .max(15,"password must be at most 15 characters")
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{5,}$/,"Password must contain 1 uppercase,1 lowercase,1 digit,1 special character"),
});

export const SignIninitialValues = {
  email: "",
  password: "",
};

export const SignInvalidationSchema = yup.object({
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
});