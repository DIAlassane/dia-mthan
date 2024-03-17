import { Box, useMediaQuery, useTheme } from "@mui/material";
import imageBan from "../../../assets/coquette.jpeg";
import Form from "./Form";

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      sx={{
        background: `url(${imageBan})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box width="100%" p="1rem 6%" textAlign="center"></Box>
      <Box
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        width={isNonMobileScreens ? "50%" : "93%"}
        sx={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
          backdropFilter: "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)", // Préfixe pour certains navigateurs WebKit
          borderRadius: "20px", // Correction de la faute de frappe
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default RegisterPage;
