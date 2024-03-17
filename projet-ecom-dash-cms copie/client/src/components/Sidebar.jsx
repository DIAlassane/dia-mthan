import {
  AdminPanelSettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  ReceiptLongOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Crop32Icon from "@mui/icons-material/Crop32";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogout } from "state";
import imageLogo from "../assets/Dia-mThan.png";
import FlexBetween from "./FlexBetween";

// -------------------------------------------
const generateNavItems = (isAdmin) => {
  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: `Billboard`,
      icon: <Crop32Icon />,
    },
    {
      text: "Productadmin",
      icon: <ShoppingCartOutlined />,
      subMenu: [
        {
          text: "Size",
          icon: <FullscreenExitIcon />,
          path: "/size",
        },
        {
          text: "Color",
          icon: <ColorLensIcon />,
          path: "/color",
        },
        {
          text: "Category",
          icon: <CategoryIcon />,
          path: "/category",
        },
      ],
    },
    {
      text: "Customers",
      icon: <Groups2Outlined />,
    },
    {
      text: "Orders",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Profil",
      icon: <AccountBoxIcon />,
    },
  ];

  if (isAdmin === process.env.REACT_APP_ROLE_ONE) {
    navItems.push(
      {
        text: "Management",
        icon: null,
      },
      {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
      },
      {
        text: "Store",
        icon: <StoreIcon />,
      }
    );
  }

  return navItems;
};

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  isAdmin,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const navItems = generateNavItems(isAdmin);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleLogout = () => {
    // Dispatch l'action de déconnexion
    dispatch(setLogout());
    // Redirige vers la page de connexion
    navigate("/login");
  };

  return (
    <Box component={"nav"}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.default,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap=".5rem">
                  <img
                    src={imageLogo}
                    alt="Logo"
                    style={{
                      width: "150px",
                      height: "auto",
                      marginTop: "-4rem",
                      marginBottom: "-4rem",
                    }}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, subMenu }) => {
                const lcText = text.toLowerCase();

                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <React.Fragment key={text}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>

                    {/* Sub Menu Items */}
                    {active === lcText && subMenu && (
                      <List>
                        {subMenu.map(
                          ({ text: subText, icon: subIcon, path }) => (
                            <ListItem key={subText} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  navigate(path);
                                  setActive(path.substring(1));
                                }}
                                sx={{
                                  backgroundColor:
                                    active === path.substring(1)
                                      ? theme.palette.secondary[300]
                                      : "transparent",
                                  color:
                                    active === path.substring(1)
                                      ? theme.palette.primary[600]
                                      : theme.palette.secondary[100],
                                }}
                                paddingLeft="3rem"
                              >
                                <ListItemIcon
                                  sx={{
                                    ml: "2rem",
                                    color:
                                      active === path.substring(1)
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[200],
                                  }}
                                >
                                  {subIcon}
                                </ListItemIcon>
                                <ListItemText primary={subText} />
                              </ListItemButton>
                            </ListItem>
                          )
                        )}
                      </List>
                    )}
                  </React.Fragment>
                );
              })}
            </List>
          </Box>

          {/*  */}
          <Box position="relative" bottom="2rem">
            <Divider sx={{ marginTop: "1.5rem" }} />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Avatar alt={user?.name} src={user?.url} />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize=".9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name ?? ""}
                </Typography>
                <Typography
                  fontSize=".8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.role ?? ""}
                </Typography>
              </Box>

              {isAdmin && (
                <LogoutIcon
                  onClick={handleLogout}
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              )}
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
