import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import ErrorMessage from "client/scenes/loginPage/ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { palette } = useTheme();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Submit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setIsError("Adresse e-mail invalide");
      return;
    }
    axios
      .post("http://localhost:4000/auth/forgot-password", { email })
      .then((response) => {
        if (response.data.status) {
          // Afficher le message de succès
          setSuccessMessage(
            "Votre demande de réinitialisation de mot de passe a été envoyée avec succès. Verifiez vôtre mail."
          );
          // Rediriger vers la page de connexion après un court délai
          setTimeout(() => {
            navigate("/login");
          }, 3000); // Redirection après 3 secondes
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3rem",
        height: "auto",
        padding: "1rem",
      }}
    >
      <form onSubmit={Submit}>
        <Box
          display="block"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          boxShadow={`0 0 10px ${palette.grey[400]}`}
          sx={{
            width: "auto",
            padding: "1rem",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
            backdropFilter: "blur(10px)",
            "-webkit-backdrop-filter": "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <Typography
            sx={{
              textDecoration: "underline",
              margin: "1rem 0",
              color: palette.background.font,
            }}
          >
            Vous avez oubliez vôtre mot-de-passe ? Réinitialisez-le ici . <br />
            Rentrez vôtre mail :
          </Typography>
          {isError && <ErrorMessage message={isError.msg || isError} />}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            sx={{ width: "100%", marginBottom: ".5rem", marginTop: "1rem" }}
          />
          <Button
            fullWidth
            type="submit"
            sx={{
              m: ".5rem 0",
              p: "1rem",
              backgroundColor: "green",
              color: "white",
            }}
          >
            Envoyer
          </Button>
          <Typography
            sx={{
              textDecoration: "underline",
              margin: "1rem 0",
              color: palette.background.font,
            }}
          >
            Si aprés soumission vous n'avez rien recu, <br />
            verifiez l'ortograph de vôtre email.
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPassword;
