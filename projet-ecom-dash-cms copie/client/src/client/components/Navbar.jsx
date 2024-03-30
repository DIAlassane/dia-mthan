import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import CompareIcon from "@mui/icons-material/Compare";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "state";
import imageLogo from "../../assets/Dia-mThan.png";
import CategoryLink from "./CategoryLink";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, value, changeInput }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const [ancherElSettings, setAncherElSettings] = useState(null);
  const [ancherEl, setAncherEl] = useState(null);
  const isOpenSettings = Boolean(ancherElSettings);
  const isOpen = Boolean(ancherEl);
  const handleClickSettings = (event) =>
    setAncherElSettings(event.currentTarget);
  const handleCloseSettings = () => setAncherElSettings(null);
  const handleClick = (event) => setAncherEl(event.currentTarget);
  const handleClose = () => setAncherEl(null);
  const product = useSelector((state) => state.cart);
  const compare = useSelector((state) => state.compare);

  const handleLogout = () => {
    // Dispatch l'action de déconnexion
    dispatch(setLogout());
    // Redirige vers la page de connexion
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", display: "flex", zIndex: "100" }}
      >
        {/* GAUCHE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: theme.palette.background.font }} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p=".1rem 1.5rem"
          >
            <InputBase type="text" placeholder="Recherche..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* DROITE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => navigate("/compare")}>
            <Badge badgeContent={compare.length} color="error">
              <CompareIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={product.length} color="success">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleClickSettings}>
            <SettingsOutlined />
          </IconButton>
          <Menu
            anchorEl={ancherElSettings}
            open={isOpenSettings}
            onClose={handleCloseSettings}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <MenuItem>
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleLogout}>LOg/REg</MenuItem>
          </Menu>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                "@media(max-width: 550px)": {
                  display: "none",
                },
              }}
            >
              <Avatar alt={user?.name} src={user?.url} />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize=".9rem"
                  sx={{ color: theme.palette.background.font }}
                >
                  {user?.name ?? ""}
                </Typography>
                <Typography
                  fontSize=".8rem"
                  sx={{ color: theme.palette.grey[700] }}
                >
                  {user?.role ?? ""}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.background.font,
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={ancherEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
                display: "flex",
              }}
            >
              {user ? ( // Vérifiez si un utilisateur est connecté
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
              ) : (
                <MenuItem onClick={() => navigate("/login")}>
                  Connexion
                </MenuItem>
              )}
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        sx={{
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.7))`,
          position: "sticky",
          zIndex: "15",
        }}
      >
        <Box fontWeight="bold" marginBottom="1.5rem">
          <img
            src={imageLogo}
            alt="Logo"
            style={{
              width: "150px",
              height: "auto",
              marginTop: "-4rem",
              marginBottom: "-4rem",
              zIndex: "-199",
            }}
          />
        </Box>
        <CategoryLink />
      </Box>
    </AppBar>
  );
};

export default Navbar;
