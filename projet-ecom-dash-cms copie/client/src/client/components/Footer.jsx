import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import imageLogo from "../../assets/Dia-mThan.png";
import JoinUs from "./JoinUs";

const Footer = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [categories, setCategories] = useState([]);
  const theme = useTheme();

  const styleBox1 = {
    width: "100%",
    height: "80vh",
    backgroundColor: theme.palette.background.default,
    padding: "2rem",
    "@media(max-width: 900px)": {
      paddingTop: "0",
    },
  };

  const styleBox2 = {
    width: "80%",
    marginLeft: "10%",
    borderTop: `1px solid ${theme.palette.grey[700]}`,
    // borderBottom: `1px solid ${theme.palette.grey[700]}`,
    height: "15vh",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    "@media(max-width: 600px)": {
      display: "block",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      height: "auto",
      paddingBottom: "1rem",
    },
  };

  const styleBox3 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const styleBox4 = {
    width: "50%",
    height: "60vh",
    "@media(max-width: 600px)": {
      display: "none",
    },
  };

  const styleBox5 = {
    width: "100%",
    height: "25vh",
    backgroundColor: theme.palette.background.alt,
    color: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    "@media(max-width: 600px)": {
      width: "90%",
      marginLeft: "10%",
    },
  };

  const styleBox6 = {
    display: "block",
    width: "50%",
    height: "50vh",
    backgroundColor: theme.palette.background.alt,
    color: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    "@media(max-width: 600px)": {
      width: "90%",
      marginLeft: "10%",
    },
  };

  const styleTypo1 = {
    fontSize: "1.5rem",
    fontWeight: "100",
    "@media(max-width: 600px)": {
      fontSize: "1rem",
    },
  };

  const styleLink = {
    display: "block",
    gap: "10px",
    color: theme.palette.background.font,
  };

  const styleTypo2 = {
    fontSize: "1.1rem",
    fontWeight: "900",
    color: theme.palette.background.font,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `http://localhost:4000/management/category/${storeId}`
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storeId]);

  return (
    <Box sx={styleBox1}>
      <Box sx={styleBox2}>
        <MailOutlineIcon sx={{ width: "45px", height: "45px" }} />
        <Typography sx={styleTypo1}>Rejoindre nôtre News-letter :</Typography>
        <TextField id="standard-basic" label="Email" variant="standard" />
        <Button
          sx={{
            color: "white",
            backgroundColor: "lightgreen",
          }}
        >
          Rejoindre
        </Button>
      </Box>
      <Divider sx={{ border: `1px solid ${theme.palette.background.font}` }} />
      <Box sx={styleBox3}>
        <Box sx={styleBox4}>
          <img
            src={imageLogo}
            alt="Logo Dia-mthan"
            style={{
              width: "100%",
              height: "auto",
              marginTop: "-6rem",
            }}
          />
        </Box>

        <Box sx={styleBox6}>
          <Box sx={styleBox5}>
            <Box
              sx={{ paddingRight: "1.5rem", borderRight: ".2px solid black" }}
            >
              <Typography sx={styleTypo2}>Nos Produits :</Typography>
              {categories.map((value) => (
                <Box key={value.id}>
                  <Typography
                    sx={{
                      fontSize: ".8rem",
                      fontWeight: "200",
                      textDecoration: "underline",
                      color: theme.palette.background.font,
                    }}
                  >
                    {value.name}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "block", gap: "10px", paddingLeft: "1.5rem" }}>
              <Typography sx={styleTypo2}>Nos Pages :</Typography>
              <Link style={styleLink} to="/home">
                /Home
              </Link>
              <Link style={styleLink} to="/product">
                /Product
              </Link>
              <Link style={styleLink} to="/profile">
                /Profile
              </Link>
            </Box>
          </Box>
          <JoinUs />
          <Box
            sx={{
              justifyContent: "left",
              textAlign: "left",
              padding: "1rem 5rem",
              color: theme.palette.background.font,
            }}
          >
            <Typography>07 49 84 04 65</Typography>
            <Typography>alassdia0909@gmail.com</Typography>
            <Typography>45 boulevard Chilpéric</Typography>
            <Typography>77450, Chelles-Gournay</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: ".5rem",
          justifyContent: "space-around",
        }}
      >
        <Typography>Copyrights</Typography>
        <Typography>&copy; 2024 Dia-mthan group</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
