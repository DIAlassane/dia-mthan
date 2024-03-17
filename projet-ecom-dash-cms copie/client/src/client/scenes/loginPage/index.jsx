import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

// import Register from '../registerPage';
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        p="2rem"
        m="1rem auto"
        marginTop="4.5rem"
        boxShadow={`0 0 10px ${theme.palette.grey[100]}`}
        borderRadius="1.5rem"
        width={isNonMobileScreens ? "50%" : "93%"}
        sx={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
          backdropFilter: "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Connection á ENTREPRISE
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
