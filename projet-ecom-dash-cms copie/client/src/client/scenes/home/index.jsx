import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import CategoryProductComponent from "client/components/CategoryProductComponent";
import CategorySection from "client/components/CategorySection";
import LogoBanner from "client/components/LogoBanner";
import ParallaxSection from "client/components/ParallaxSection";
import HomeColor from "client/widget/HomeColor";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../../widget/style/styles.css";

const AnimatedTypography = motion(Typography);

const Home = () => {
  const [isCategoryActive, setCategoryActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isNonMobile = useMediaQuery("(max-width:1050px)");
  const theme = useTheme();

  const stylegros = {
    width: "50%",
    marginLeft: "25%",
    color: theme.palette.background.font,
    padding: "1rem",
    borderRadius: "5px",
    border: "3px solid grey",
    backgroundColor: theme.palette.background.default,
    fontSize: "1.2rem",
    fontWeight: "900",
    fontFamily: "cursive",
    marginTop: "2rem",
    marginBottom: "2rem",
    ...(isNonMobile && {
      width: "80%",
      marginLeft: "10%",
    }),
  };

  const styleAnimetedCategory = {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "1.5rem",
    cursor: "pointer",
  };

  const styleBox2 = {
    marginBottom: "-2rem",
    marginTop: "-1.5rem",
    padding: "3rem 0",
    marginBottom: "1.5rem",
    background: theme.palette.background.plus,
  };

  const styleBox3 = {
    marginTop: "-8rem",
    padding: "3rem 0",
    backgroundColor: theme.palette.background.plus,
  };

  const styleTypo1 = {
    fontSize: "2rem",
    fontWeight: "700",
    color: theme.palette.background.font,
    padding: "1.5rem 2.6rem",
    fontFamily: "cursive",
  };

  const styleDivider = {
    border: `.5px solid ${theme.palette.grey[700]}`,
    width: "80%",
    marginLeft: "10%",
  };

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
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.plus,
        marginTop: "-10%",
      }}
    >
      <ParallaxSection />
      <br />
      <Box>
        <HomeColor />
      </Box>
      <Box sx={styleBox2}>
        <CategorySection isActive={isCategoryActive} />
        <div style={styleAnimetedCategory}>
          <AnimatedTypography
            style={stylegros}
            className={`vibrating-text ${isCategoryActive ? "paused" : ""}`}
            onClick={() => setCategoryActive(!isCategoryActive)}
            whileTap={{ scale: 0.95 }}
          >
            DÉCOUVRIR
          </AnimatedTypography>
        </div>
      </Box>
      <Divider sx={styleDivider} />
      <Box sx={styleBox3}>
        <Typography sx={styleTypo1}>Découvrer nos Robes </Typography>
        <CategoryProductComponent />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogoBanner />
      </Box>
      {/* <NewCatHome /> */}
    </Box>
  );
};

export default Home;
