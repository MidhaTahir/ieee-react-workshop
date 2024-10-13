import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSnackbar } from "notistack";
// import { handleError } from "../utils";
// import { ENDPOINTS } from "../constants/endpoints";
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

import {
  ColoredLinkStyled,
  NoLinkStyled,
  StyledButton,
  StyledForm,
  StyledInputContainer,
  StyledInputLabel,
  StyledTextField,
} from "../components/shared/styled";

import RoutePaths from "../constants/route-paths";
import { useAuthContext } from "../context";
import PageContainer from "../components/layout/page-container";
import { portalName } from "../constants/configs";
import portalLogo from "../assets/icons/logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuthContext();
  const [tempLoading, setTempLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setTempLoading(true);
      const dataToSend = { email, password };
      console.log(email, password)
      login(dataToSend);
      navigate(`${RoutePaths.DASHBOARD}`);
      // try {
      //   const response = await axios.post(
      //     ENDPOINTS.LOGIN(backendAPI),
      //     dataToSend
      //   );

      //   if (response && response.status === 200) {
      //     const token = response.data.access_token;

      //     localStorage.setItem("token", token);

      //     const userResponse = await axios.get(ENDPOINTS.GET_USER(backendAPI), {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     });

      //     const user = userResponse.data;

      //     login(user);
      //     navigate(`${RoutePaths.DASHBOARD}`);
      //   }
      // } catch (error) {
      //   if (error && error.response) {
      //     handleError(error, enqueueSnackbar);
      //   }
      // } finally {
      //   setTempLoading(false);
      // }
    }

  return (
    <PageContainer documentTitle={portalName}>
      <PageLayout>
        <SignupStyled>
            <div>
                <img src={portalLogo} alt={portalName} />
            </div>
            <Stack spacing={18} width="100%">
              <Stack alignItems="center" width="100%">
                <Typography
                  fontSize={"25px"}
                  fontWeight={"700"}
                  color="primary.main"
                >
                  Log in to your account
                </Typography>
                <Typography
                  fontSize={"12px"}
                  fontWeight={"400"}
                  color="custom.lightGrey"
                >
                  Enter your email address and password to log in.
                </Typography>
              </Stack>
              <StyledForm onSubmit={handleSubmit}>
                <Stack width="100%" spacing={7.5}>
                  <StyledInputContainer>
                    <StyledInputLabel required>Email</StyledInputLabel>
                    <StyledTextField
                      placeholder="Enter your email"
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      <NoLinkStyled to="/auth/forgot-password" >
                      <Typography
                        variant="body-xsmall"
                        color="common.black"
                      >
                        Forgot Password?
                      </Typography>
                      </NoLinkStyled>
                    </Stack>

                    <StyledTextField
                      placeholder="**************"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </StyledInputContainer>
                </Stack>

                <StyledButton
                  type="submit"
                  disabled={
                    tempLoading || !email || !password
                  }
                >
                  {tempLoading && (
                    <CircularProgress size="1.25rem" color="inherit" />
                  )}
                  <Typography
                    textTransform="none"
                    variant="body-medium"
                    color="white"
                  >
                    Log In
                  </Typography>
                </StyledButton>
              </StyledForm>
            </Stack>
          <Typography variant="body-xsmall" color="custom.black" mt={"50px"}>
            New to Platform?{" "}
            <ColoredLinkStyled
              to={RoutePaths.SIGNUP}
            >
              Create a free account
            </ColoredLinkStyled>
          </Typography>
        </SignupStyled>
      </PageLayout>
    </PageContainer>
  );
};

const PageLayout = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.custom.primaryGrey,
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // Full viewport height
  margin: "0 auto", // Centers the layout horizontally
}));

const SignupStyled = styled(Stack)(() => ({
  width: "400px", // Limit the width to keep it compact
  textAlign: "center",
}));

export default Login;
