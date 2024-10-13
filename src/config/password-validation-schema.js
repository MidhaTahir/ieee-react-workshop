import * as yup from "yup";

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().trim().email("Invalid Email Address"),
});

export const setPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,64}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
