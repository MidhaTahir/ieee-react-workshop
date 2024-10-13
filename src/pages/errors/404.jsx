import { Link } from "react-router-dom";

import { Box, Stack, Typography, styled } from "@mui/material";

import { portalName } from "../../constants/configs";
import PageContainer from "../../components/layout/page-container";
import { CButton } from "../../components/shared";
import portalLogo from "../../assets/icons/logo.svg";

function NotFoundPage() {
  return (
    <PageContainer documentTitle={`Page not Found | ${portalName}`}>
      <MainContainer>
        <Box className="portal-logo">
          {portalLogo ? (
            <img src={portalLogo} alt={portalName} />
          ) : (
          <div>Logo</div>
          )} 
        </Box>
        <Typography component="h1" className="text-404">
          404
        </Typography>
        <Typography component="h2" className="title">
          Page not found
        </Typography>
        <Typography component="p" className="content">
          The page you&#39;re looking for doesn&#39;t exist.
        </Typography>
        <Link to="/">
          <CButton width="180px">Back to Home</CButton>
        </Link>
      </MainContainer>
    </PageContainer>
  );
}

export default NotFoundPage;

const MainContainer = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  gap: "0.5rem",
  padding: "0 1rem",

  ".portal-logo": {
    marginBottom: "1rem",

    "img, svg": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },

  ".text-404": {
    textAlign: "center",
    fontSize: "8rem",
    fontWeight: 900,
    margin: 0,
    lineHeight: 1,
  },

  ".title": {
    textAlign: "center",
    margin: 0,
    fontSize: "2rem",
    fontWeight: 500,
  },

  ".content": {
    textAlign: "center",
    fontSize: "1rem",
  },

  button: {
    textTransform: "none",
    fontWeight: 500,
    marginTop: "1rem",
    backgroundColor: theme.palette.custom.black,
    color: theme.palette.common.white,

    "&:hover": {
      backgroundColor: theme.palette.custom.black,
      color: theme.palette.common.white,
    },
  },
}));
