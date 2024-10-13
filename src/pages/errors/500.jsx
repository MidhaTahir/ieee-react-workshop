import { Stack, Typography, styled } from "@mui/material";
import PageContainer from "../../components/layout/page-container";

function UnexpectedErrorPage() {
  return (
    <PageContainer documentTitle="Sorry... something went wrong">
      <MainContainer>
        <Stack className="main-content">
          <Typography component="h1" className="text-sorry" color="primary">
            Sorry...
          </Typography>
          <Typography component="h2" className="title">
            there was an unexpected error
          </Typography>
          <Typography component="p" className="content">
            Something went wrong at our end. We&apos;re sorry for the
            inconvenience. Try refreshing the page or contact support if the
            problem persists.
          </Typography>
        </Stack>
      </MainContainer>
    </PageContainer>
  );
}

export default UnexpectedErrorPage;

const MainContainer = styled(Stack)(({ theme }) => ({
  color: theme.palette.custom.primaryDark,
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100%",
  padding: "0 1rem",

  ".main-content": {
    gap: "0.5rem",
    maxWidth: "40rem",
  },

  ".portal-logo": {
    width: "3rem",
    height: "3rem",
    marginBottom: "1rem",

    "img, svg": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },

  ".text-sorry": {
    fontSize: "4rem",
    fontWeight: 900,
    margin: 0,
    lineHeight: 1,
  },

  ".title": {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 500,
  },

  ".content": {
    fontSize: "1rem",
    fontWeight: 500,
  },

  button: {
    textTransform: "none",
    fontWeight: 500,
    marginTop: "1rem",
  },
}));
