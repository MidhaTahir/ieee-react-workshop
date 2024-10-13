import { Outlet } from "react-router-dom";

import { Box, styled } from "@mui/material";

import Header from "./header";
import Sidebar from "./sidebar";
import { theme } from "../../config/theme";
import { SidebarWidth } from "../../constants/general-constants";

const SidebarLayout = () => {
  return (
    <Main>
      <Sidebar />
      <StyledMainContent>
        <Header />
        <Outlet />
      </StyledMainContent>
    </Main>
  );
};

const Main = styled(Box)(() => ({
  display: "flex",
  flexWrap: "nowrap",
}));
const StyledMainContent = styled(Box)(() => ({
  flexGrow: 1,
  marginLeft: SidebarWidth,
  overflow: "scroll",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));
export default SidebarLayout;
