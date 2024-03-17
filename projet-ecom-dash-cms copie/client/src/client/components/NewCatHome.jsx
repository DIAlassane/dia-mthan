import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NewCatHome = () => {
  const theme = useTheme();
  const [image, setImage] = useState("");
  const [label, setLabel] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const isNonMobile = useMediaQuery("(max-width:1045px)");
  const id = useSelector((state) => state.catHome);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/billboardone/${id}`)
      .then((result) => {
        setImage(result.data.image);
        setLabel(result.data.label);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Box
      sx={{
        width: "80%",
        marginLeft: "10%",
        marginBottom: "5vh",
        marginTop: "5vh",
        borderRadius: "15px",
        height: "auto",
        padding: "3.5rem 2.5rem",
        // backgroundColor: theme.palette.background.alt,
        display: "flex",
        justifyContent: "space-around",
        "@media(max-width: 400px)": {
          display: "block",
          width: "90%",
          marginLeft: "5%",
          paddingBottom: ".3rem",
        },
        "@media(max-width: 900px)": {
          width: "100%",
          height: "auto",
          marginLeft: "0",
          marginBottom: "0",
          display: "block",
          paddingBottom: ".3rem",
        },
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "auto",
          "@media(max-width: 400px)": {
            width: "100%",
            marginLeft: "0",
          },
          "@media(max-width: 980px)": {
            width: "90%",
            height: "auto",
            marginLeft: "5%",
          },
        }}
      >
        <img
          src={`http://localhost:4000/${image}`}
          alt=""
          style={{
            objectFit: "cover",
            width: "50%",
            height: "auto",
            marginLeft: "2rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "15px",
            "@media(max-width: 980px)": {
              width: "100%",
              height: "auto",
              marginLeft: "0",
            },
            "@media(max-width: 400px)": {
              width: "100%",
              height: "auto",
              marginLeft: "0",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "55%",
          padding: ".5rem",
          alignItems: "center",
          textAlign: "center",
          marginTop: "3.5rem",
          justifyContent: "center",
          "@media(max-width: 400px)": {
            display: "block",
            width: "90%",
            marginLeft: "5%",
          },
          "@media(max-width: 900px)": {
            width: "100%",
            height: "auto",
            marginLeft: "0",
            display: "block",
          },
        }}
      >
        <Divider
          sx={{
            border: `.5px solid ${theme.palette.grey[700]}`,
          }}
        />
        <Typography
          sx={{
            fontSize: "1.9rem",
            color: "white",
            color: "black",
            marginLeft: "2rem",
            marginTop: ".5rem",
            fontFamily: "cursive",
          }}
        >
          {label}
        </Typography>
        <Button
          sx={{
            fontWeight: "900",
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary[100],
            marginTop: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          JE DÉCOUVRE
        </Button>
        <Divider
          sx={{
            border: `.5px solid ${theme.palette.grey[700]}`,
            "@media(max-width: 400px)": {
              display: "none",
            },
            "@media(max-width: 900px)": {
              display: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default NewCatHome;
