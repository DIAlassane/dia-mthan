import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gifLoader from "../../assets/Diamthan-group.png";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.grey[100],
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          marginLeft: "35%",
          paddingTop: "15rem",
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
        <Typography variant="body1" color={theme.palette.primary[300]}>
          Désolé, la page que vous recherchez n'a pas été trouvée.
        </Typography>
        <Typography
          onClick={() => navigate("/home")}
          sx={{
            textDecoration: "underline",
            color: theme.palette.primary[300],
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
