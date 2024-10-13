import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  styled,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery
} from "@mui/material";

import RoutePaths from "../../constants/route-paths";
import { SidebarWidth } from "../../constants/general-constants";
import { portalName } from "../../constants/configs";
import { theme } from "../../config/theme";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const sidebarItems = [
  {
    id: "1",
    title: "Dashboard",
    path: RoutePaths.DASHBOARD,
    icon: <DashboardIcon />,
  },
];

const Sidebar = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const location = useLocation();
  const navigate = useNavigate();
  

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location]
  );

  const handleItemClick = useCallback(
    (path) => () => {
      navigate(path);
    },
    [navigate]
  );

  
  return (
    <>
    {
      !isMobile &&
    <SidebarMainContainer>
      <SidebarHeader>
        <div>{portalName}</div>
      </SidebarHeader>

      <StyledList className="middle-bar">
        {sidebarItems?.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={handleItemClick(item.path)}
          >
            <StyledListItemButton active={isActive(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={"body-small"}>{item.title}</Typography>
                }
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </SidebarMainContainer>
    }
    </>
  );
};

export default Sidebar;

const SidebarMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(20),
  width: SidebarWidth,
  minHeight: "100vh",
  maxHeight: "100vh",
  borderRight: `1px solid ${theme.palette.custom.borderGrey}`,
  background: theme.palette.custom.primaryGrey,
  position: "fixed",

  ".middle-bar": {
    flex: 1,
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(8),
  fontWeight: 600,
  padding: theme.spacing(8),
}));

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (propName) => propName !== "active",
})(({ theme, active }) => ({
  gap: theme.spacing(10),
  background: active
    ? theme.palette.custom.lightContrast
    : theme.palette.custom.primaryGrey,
  color: active
    ? theme.palette.primary.contrastText
    : theme.palette.common.primaryDark,
  fontWeight: active ? 700 : 400,

  ".MuiListItemIcon-root": {
    minWidth: "unset",
  },
}));
