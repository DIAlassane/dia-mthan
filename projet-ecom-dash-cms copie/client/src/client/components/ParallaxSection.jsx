import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ParallaxSection = () => {
  const theme = useTheme();
  const [image, setImage] = useState("");
  const [label, setLabel] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const isNonMobile = useMediaQuery("(max-width:1045px)");
  const id = useSelector((state) => state.billboard);

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
      })
      .catch((err) => console.log(err));
  }, [id]);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.5}px)`,
    transition: "transform 0.3s ease-in-out",
    zIndex: 1,
    position: "relative",
  };

  const textContainerStyle = {
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "900",
    fontSize: isNonMobile ? "255%" : "3rem",
    marginBottom: "-50px",
    marginTop: "0",
    zIndex: 1,
    ...parallaxStyle,
    opacity: 1 - Math.min(scrollPosition / 300, 1),
    transition: "opacity 0.3s ease-in-out",
    // Ajouter les styles @media ici
    "@media(max-width: 835px)": {
      display: "none",
    },
  };

  const imageContainerStyle = {
    position: "relative",
    overflow: "hidden",
    height: "75vh",
    zIndex: "10",
    marginTop: "1.8rem",

    "@media(max-width: 835px)": {
      marginTop: "0px",
      zIndex: "1",
    },
  };

  const imageStyle = {
    backgroundImage: `url(http://localhost:4000/${image}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: 0,
  };

  return (
    <div>
      <Box
        sx={{
          ...textContainerStyle,
          "@media(maxWidth: 835px)": {
            display: "none",
          },
        }}
      >
        <h1 style={{ color: theme.palette.background.font }}>
          BIENVENUE SUR <br /> DIA-MTHAN
        </h1>
      </Box>
      <div style={imageContainerStyle}>
        <div style={imageStyle} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFFFFF88",
            width: "55%",
            padding: ".5rem",
            zIndex: "9",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            {label}
          </Typography>
          <Button
            sx={{
              marginTop: ".5rem",
              fontWeight: "900",
              color: theme.palette.background.alt,
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.background.alt}`,
            }}
          >
            JE DÉCOUVRE
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ParallaxSection;
