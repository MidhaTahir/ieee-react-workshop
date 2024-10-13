import { useState, useCallback } from "react";
import { NotificationsNone } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Box,
  styled,
  Badge,
  Stack,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  Drawer,
  List,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from "@mui/material";
import { sidebarItems } from "./sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from "../../hooks/use-auth";
import { useNavigate,useLocation } from "react-router-dom";
import { portalName } from "../../constants/configs";
import { theme } from "../../config/theme";

const Header = () => {
  const { authState, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const location = useLocation();
  

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location]
  );

  const handleItemClick = useCallback(
    (path) => () => {
      navigate(path);
      setOpen(false)
    },
    [navigate]
  );


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const onLogout = () => {
    logout().then(()=>{
      navigate('/auth/login')
    })
  }

  return (
    <StyledBox>
      <StyledAppBar data-testid="header" position="static" elevation={0}>
        <Toolbar>
          <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
          }}>          
          {
            isMobile && 
            <>
            <IconButton size="small" sx={{
              marginRight:'0.5rem'
            }}
            onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{
              fontSize:'1rem'
            
          }}/>
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="top">
            <Box sx={{
              height:'500px',
              backgroundColor:'white',
              padding:'0 1rem',
            }}>
              <Box sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                padding:'1rem 2rem 1rem 1rem'
              }}>
              <Link href="/" sx={{
                display:'flex',
                alignItems:'center',
                gap:'1rem'
              }}>
                <div>{portalName}</div>
              </Link>
              <IconButton onClick={()=>setOpen(false)}>
              <CloseIcon/>
              </IconButton>
              </Box>

              <StyledList>
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
            </Box>
            </Drawer>

            </>
          }
          <Typography sx={{
            [theme.breakpoints.down("sm")]:{
              fontSize:'1rem'
            }
          }} variant="h6" color="primary.main" fontWeight={600} className="app-heading">
            Platform
          </Typography>
          </Box>
          <HeaderDetails>
            <IconButton size="small">
              <Badge
                variant="dot"
                color="primary"
                overlap="circular"
                badgeContent=""
              >
                <NotificationsNone color="primary" sx={{
            [theme.breakpoints.down("sm")]:{
              fontSize:'1rem'
            }
          }}/>
              </Badge>
            </IconButton>
            {authState.isAuth && (
              <Typography sx={{
                [theme.breakpoints.down("sm")]:{
                  fontSize:'1rem'
                }
              }} variant="h6" color="primary.main" fontWeight={600}>
                {/* {authState.user.first_name + " " + authState.user.last_name} */}
                Midha Tahir
              </Typography>
            )}
          <FormControl sx={{
            minWidth:10,
            ".MuiInputBase-root":{
              display:'flex',
              justifyContent:'center'
            },
            ".MuiSvgIcon-root":{
                right:'initial !important'
              },
            ".MuiOutlinedInput-notchedOutline":{
              display:'none'
            },
            ".MuiSelect-select":{
              padding:'0 1rem !important',
              display:'flex',
              justifyContent:'center',
              "&:hover":{
                backgroundColor:'#eae8e4'
              },
              
           
            }

          }} size="small">
            <Select
                labelId="profile-select-label"
                id="profile-select"
                value={0}
              >
              {/* <MenuItem>Update Profile</MenuItem> */}
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Select>
            </FormControl>
          </HeaderDetails>
        </Toolbar>
      </StyledAppBar>
    </StyledBox>
  );
};

export default Header;

const StyledBox = styled(Box)(() => ({
  flexGrow: 1,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.custom.borderGrey}`,
  ".MuiToolbar-root": {
    padding: theme.spacing(8, 9),
    minHeight: "unset",
  },
  
}));

const HeaderDetails = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  marginLeft: "auto",
  padding: "unset",
  flexDirection: "row",
  gap: theme.spacing(6),
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