import * as yup from "yup";

export const signupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(3, "First Name must be at least 3 characters")
    .max(25, "First Name must be at most 25 characters")
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:['-.][a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+(?:['-.][a-zA-ZÀ-ÖØ-öø-ÿ]+)*){0,2}$/,
      "First Name can contain alphabetic characters, full stops, apostrophes, & spaces."
    ),
  lastName: yup
    .string()
    .trim()
    .min(3, "Last Name must be at least 3 characters")
    .max(25, "Last Name must be at most 25 characters")
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:['-.][a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+(?:['-.][a-zA-ZÀ-ÖØ-öø-ÿ]+)*){0,2}$/,
      "Last Name can contain alphabetic characters, full stops, apostrophes, & spaces."
    ),
  email: yup.string().trim().email("Invalid Email Address"),
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
