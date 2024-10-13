import React from "react";
import { useNavigate } from "react-router-dom";

import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import { signupValidationSchema } from "../../config/signup-validation-schema";
import { backendAPI } from "../../constants/configs";
import { ENDPOINTS } from "../../constants/endpoints";
import RoutePaths from "../../constants/route-paths";
import { useAuthContext } from "../../context";
import { handleError } from "../../utils";

import {
  StyledButton,
  StyledForm,
  StyledInputContainer,
  StyledInputLabel,
  StyledTextField,
} from "./styled";

const SignupSharedContainer = ({
  from = "",
  handlePreviousModalClose = () => {},
  handleSuccessModalOpen = () => {},
}) => {
  // const searchParams = new URLSearchParams(location.search);
  // const fromPage = searchParams.get("from");
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [tempLoading, setTempLoading] = React.useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      setTempLoading(true);

      const dataToSend = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      };
      try {
        const response = await axios.post(
          `${ENDPOINTS.SIGNUP(backendAPI)}`,
          JSON.stringify(dataToSend),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response && response.status === 200) {
          const token = response.data.access_token;
          localStorage.setItem("token", token);
          const userResponse = await axios.get(
            `${ENDPOINTS.GET_USER(backendAPI)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const user = userResponse.data;

          if (from === "pre-launch") {
            handlePreviousModalClose();
            handleSuccessModalOpen(true);
          } else {
            login(user);

            navigate(`${RoutePaths.DASHBOARD}`);
          }
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          handleError(error, enqueueSnackbar);
        }
      } finally {
        setTempLoading(false);
      }
    },
  });
  return (
    <SignupContainer>
      <Stack spacing={8} width="100%" alignItems="center">
        <Stack spacing={18} width="100%">
          <Stack spacing={12} alignItems="center" width="100%">
            <Typography
              color="primary.main"
              fontWeight={"700"}
              fontSize={"26px"}
            >
              Create your Account
            </Typography>
          </Stack>
          <StyledForm onSubmit={formik.handleSubmit}>
            <Stack width="100%" spacing={10}>
              <StyledInputContainer>
                <StyledInputLabel required>First Name</StyledInputLabel>
                <StyledTextField
                  required
                  id="outlined-required"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledInputLabel required>Last Name</StyledInputLabel>
                <StyledTextField
                  required
                  id="outlined-required"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledInputLabel required>Email Address</StyledInputLabel>
                <StyledTextField
                  placeholder="Enter your email"
                  fullWidth
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <Stack
                  width="100%"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <StyledInputLabel required>Password</StyledInputLabel>
                </Stack>
                <StyledTextField
                  placeholder="**************"
                  type={showPassword1 ? "text" : "password"}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPassword1((password) => !password)
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword1 ? (
                            <VisibilityOutlinedIcon
                              color="primary"
                              fontSize="small"
                            />
                          ) : (
                            <VisibilityOffOutlinedIcon
                              color="primary"
                              fontSize="small"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="standard-adornment-password password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </StyledInputContainer>

              <StyledInputContainer>
                <Stack
                  width="100%"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <StyledInputLabel required>Confirm Password</StyledInputLabel>
                </Stack>

                <StyledTextField
                  placeholder="**************"
                  type={showPassword2 ? "text" : "password"}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowPassword2((password) => !password)
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword2 ? (
                            <VisibilityOutlinedIcon
                              color="primary"
                              fontSize="small"
                            />
                          ) : (
                            <VisibilityOffOutlinedIcon
                              color="primary"
                              fontSize="small"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="standard-adornment-password password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </StyledInputContainer>
            </Stack>
            <StyledButton
              type="submit"
              disabled={
                tempLoading ||
                !formik.values.email ||
                !formik.values.password ||
                Object.keys(formik.errors).length > 0
              }
            >
              {tempLoading && (
                <CircularProgress size="1.25rem" color="inherit" />
              )}
              <Typography
                textTransform="none"
                fontSize={"12px"}
                color="white"
                fontWeight={700}
                line-height={"normal"}
              >
                Create Account
              </Typography>
            </StyledButton>
          </StyledForm>
        </Stack>
      </Stack>
    </SignupContainer>
  );
};

export const SignupContainer = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  // margin: "72px auto 0px auto",
  margin: "0 auto",
  backgroundColor: theme.palette.common.white,
  width: "700px",
  padding: "30px 81px",
  borderRadius: "12px",
  [theme.breakpoints.down("sm")]: {
    backgroundColor: theme.palette.custom.primaryGrey,
    padding: "20px",
    width: "100%",
  },
}));

export default SignupSharedContainer;
