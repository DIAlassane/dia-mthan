import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";

function Login({ currentUser }) {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");

  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      const user = response.data;
      dispatch(setLogin(user));
      console.log(response.data);
      navigate("/profil");
    } catch (error) {
      console.log(error.message);
      setLoginErrors(
        "Erreur lors de la connexion. Veuillez réessayer.",
        error.message
      );
    }
  };

  return (
    <>
      {!currentUser ? (
        <div>
          <form onSubmit={Submit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {loginErrors && (
                <Alert severity="error" sx={{ gridColumn: "span 4" }}>
                  {loginErrors.msg || loginErrors}
                </Alert>
              )}
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Mot-de-passe"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Typography
              onClick={() => {
                navigate("/forgot-password");
              }}
              sx={{
                textDecoration: "underline",
                margin: "1rem 0",
                color: palette.background.font,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.grey[600],
                },
              }}
            >
              Vous avez ounliez vôtre mot-de-passe ? Réinitialisez-le.
            </Typography>
            {/* BUTTONS */}
            <Box>
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
                Login
              </Button>
              <Typography
                onClick={() => {
                  navigate("/register");
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.background.font,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.grey[600],
                  },
                }}
              >
                Vous n'avez pas de compte? Enregistrez-vous ici.
              </Typography>
            </Box>
          </form>
        </div>
      ) : (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Vous êtes dêjà connecter
        </Alert>
      )}
    </>
  );
}

export default Login;
