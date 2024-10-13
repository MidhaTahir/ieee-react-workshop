import { Stack, styled, Link, Box, useMediaQuery } from "@mui/material";

import SignupSharedContainer from "../components/shared/signup-container";
import { ColoredLinkStyled } from "../components/shared/styled";
import { theme as MUITheme, theme } from "../config/theme";
import RoutePaths from "../constants/route-paths";
import PageContainer from "../components/layout/page-container";
import { portalName } from "../constants/configs";
import portalLogo from "../assets/icons/logo.svg";

const Signup = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

          <p>
            Already have an account?{" "}
            <ColoredLinkStyled
              to={RoutePaths.LOGIN}
              color={MUITheme.palette.primary.main}
            >
              Sign In
            </ColoredLinkStyled>
          </p>
        </SignupNavbarStyled>
        <SignupStyled>
          <SignupSharedContainer />
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
    flexDirection: "Column",
    margin: "20px 10px",
  },
}));

const SignupStyled = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
}));

export default Signup;
