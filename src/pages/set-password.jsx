import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Typography,
  Stack,
  CircularProgress,
  IconButton,
  InputAdornment,
  styled,
  Link,
  Box,
  useMediaQuery,
} from "@mui/material";

import {
  StyledButton,
  StyledForm,
  StyledInputContainer,
  StyledInputLabel,
  StyledTextField,
} from "../components/shared/styled";
import { setPasswordValidationSchema } from "../config/password-validation-schema";
import { ENDPOINTS } from "../constants/endpoints";
import RoutePaths from "../constants/route-paths";
import { backendAPI, portalName } from "../constants/configs";
import PageContainer from "../components/layout/page-container";
import { theme } from "../config/theme";
import portalLogo from "../assets/icons/logo.svg";

const SetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [tempLoading, setTempLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: setPasswordValidationSchema,
    onSubmit: async (values) => {
      setTempLoading(true);
      console.log(values);

      const dataToSend = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      try {
        const response = await axios.post(
          `${ENDPOINTS.SET_PASSWORD(backendAPI)}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.data.statusCode) {
          navigate(RoutePaths.PASSWORD_VERIFICATION);
        } else {
          // Handle error response and show a Snackbar message
          enqueueSnackbar("Password change failed. Please try again.", {
            variant: "error",
          });
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          handleError(error, enqueueSnackbar);
        }
      }
      setTempLoading(false);
    },
  });
  return (
    <PageContainer documentTitle={portalName}>
      <PageLayout>
        <SignupNavbarStyled>
          <div>
            {portalLogo ? (
              <img
                src={portalLogo}
                alt={portalName}
                width={isMobile ? "100%" : "60%"}
              />
            ) : (
              <div>Logo</div>
            )}
          </div>
        </SignupNavbarStyled>
        <SignupStyled>
          <SignupContainer>
            <Stack spacing={8} width="100%" alignItems="center">
              <Stack spacing={18} width="100%">
                <Stack spacing={12} alignItems="center" width="100%">
                  <Typography
                    color="primary.main"
                    fontWeight={"700"}
                    fontSize={"26px"}
                  >
                    Set Password
                  </Typography>
                </Stack>
                <StyledForm onSubmit={formik.handleSubmit}>
                  <Stack width="100%" spacing={10}>
                    <StyledInputContainer>
                      <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <StyledInputLabel required>
                          New Password
                        </StyledInputLabel>
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
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </StyledInputContainer>

                    <StyledInputContainer>
                      <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <StyledInputLabel required>
                          Confirm Password
                        </StyledInputLabel>
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
                    disabled={Object.keys(formik.errors).length > 0}
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
                      Save
                    </Typography>
                  </StyledButton>
                </StyledForm>
              </Stack>
            </Stack>
          </SignupContainer>
        </SignupStyled>
      </PageLayout>
    </PageContainer>
  );
};

const PageLayout = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.custom.primaryGrey,
  minHeight: "100vh",
  paddingBottom: "100px",

  ".teal-color": {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const SignupNavbarStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "70px",
  justifyContent: "space-between",
  marginTop: "20px",
  marginBottom: "30px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const SignupStyled = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
}));

export const SignupContainer = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  // margin: "72px auto 0px auto",
  margin: "0 auto",
  backgroundColor: theme.palette.common.white,
  width: "540px",
  padding: "30px 81px",
  borderRadius: "12px",

  [theme.breakpoints.down("sm")]: {
    padding: "10px 20px",
    width: "100%",
    backgroundColor: theme.palette.custom.primaryGrey,
  },
}));

export default SetPassword;
