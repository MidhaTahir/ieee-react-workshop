import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import {
  Box,
  CircularProgress,
  Link,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

import {
  StyledButton,
  StyledForm,
  StyledInputContainer,
  StyledInputLabel,
  StyledTextField,
} from "../components/shared/styled";
import { forgotPasswordValidationSchema } from "../config/password-validation-schema";
import { ENDPOINTS } from "../constants/endpoints";
import RoutePaths from "../constants/route-paths";
import PageContainer from "../components/layout/page-container";
import { portalName } from "../constants/configs";
import { theme } from "../config/theme";
import { handleError } from "../utils";
import portalLogo from "../assets/icons/logo.svg";

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [tempLoading, setTempLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const formik = useFormik({
    initialValues: {
      // email: "midha1234@yopmail.com",
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      setTempLoading(true);
      console.log(values);

      const dataToSend = {
        email: values.email,
      };

      try {
        const response = await axios.post(
          `${ENDPOINTS.PASSWORD_RESET()}`,
          dataToSend
        );

        console.log(response);

        setTimeout(() => {
          setTempLoading(false);
          navigate(
            `${RoutePaths.PASSWORD_VERIFICATION_LINK_SENT}?email=${values.email}`
          );
        }, 3000);
      } catch (error) {
        if (error && error.response) {
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
                    fontSize={isMobile ? "24px" : "26px"}
                  >
                    Forgot Your Password?
                  </Typography>
                </Stack>
                <StyledForm onSubmit={formik.handleSubmit}>
                  <Stack width="100%" spacing={7.5}>
                    <StyledInputContainer>
                      <StyledInputLabel required>
                        Email Address
                      </StyledInputLabel>
                      <StyledTextField
                        placeholder="Enter your registered email address"
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </StyledInputContainer>
                  </Stack>
                  <StyledButton
                    type="submit"
                    disabled={
                      tempLoading ||
                      !formik.values.email ||
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
                      Get Verification Link
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
    alignItems: "center",
  },
}));

const SignupStyled = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
}));

export const SignupContainer = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  // margin: "72px auto 0px auto",
  margin: "0 auto",
  backgroundColor: theme.palette.common.white,
  width: "540px",
  padding: "30px 81px",
  borderRadius: "12px",

  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    backgroundColor: theme.palette.custom.primaryGrey,
  },
}));

export default ForgotPassword;
