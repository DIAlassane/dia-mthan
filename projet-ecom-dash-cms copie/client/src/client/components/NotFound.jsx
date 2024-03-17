import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gifLoader from "../../assets/Dia-mThan.png";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.background.alt,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          marginLeft: "35%",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src={gifLoader}
          alt="Not Found GIF"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
        <Typography variant="h4" color="error">
          Page non trouvée
        </Typography>
        <Typography variant="body1" color={theme.palette.primary[100]}>
          Désolé, la page que vous recherchez n'a pas été trouvée.
        </Typography>
        <Typography
          onClick={() => navigate("/home")}
          sx={{
            textDecoration: "underline",
            color: theme.palette.primary[100],
            cursor: "pointer",
          }}
        >
          Retourner á l'acceuil
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
