import { Box, CircularProgress, styled } from "@mui/material";

const CLoader = () => {
  return (
    <LoaderPageStyled>
      <CircularProgress />
    </LoaderPageStyled>
  );
};

const LoaderPageStyled = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default CLoader;
