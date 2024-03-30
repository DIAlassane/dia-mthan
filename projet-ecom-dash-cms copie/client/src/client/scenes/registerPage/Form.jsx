import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Validation from "protection/Validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const roleId = process.env.REACT_APP_ROLE_ID;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    occupation: "",
    roleId,
  });
  const [errors, setErrors] = useState({});
  const [exists, setExists] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleInput(event) {
    const { name, value } = event.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const Submit = (e) => {
    e.preventDefault();

    // Validez les champs
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Si aucune erreur de validation, soumettez les données
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:4000/auth/register", values)
        .then((result) => {
          console.log(result);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response) {
            // Le serveur a répondu avec un statut d'erreur
            console.error("Erreur de réponse du serveur:", err.response.data);
            setExists(err.response.data);
          } else if (err.request) {
            // La requête a été faite, mais aucune réponse n'a été reçue
            console.error("Aucune réponse du serveur");
          } else {
            // Une erreur s'est produite lors de la configuration de la requête
            console.error(
              "Erreur lors de la configuration de la requête",
              err.message
            );
          }
        });
    }
  };

  return (
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
          <p
            style={{
              color: "red",
              gridColumn: "span 4",
              margin: "0",
              padding: "0",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            {exists.error}
          </p>
          <>
            <TextField
              label="Nom"
              onChange={handleInput}
              name="name"
              sx={{ gridColumn: "span 2" }}
              error={!!errors.name}
              helperText={
                errors.name && (
                  <p style={{ color: "red", gridColumn: "span 4" }}>
                    {errors.name}
                  </p>
                )
              }
            />

            <TextField
              label="Role"
              value={roleId} // Utilisez la valeur de `roleId`
              onChange={handleInput} // Assurez-vous d'avoir une fonction handleInput définie pour gérer les changements
              sx={{ display: "none", gridColumn: "span 2" }}
            />

            <TextField
              label="Pay"
              onChange={handleInput}
              name="country"
              sx={{ gridColumn: "span 2" }}
              error={!!errors.country}
              helperText={
                errors.country && (
                  <p style={{ color: "red", gridColumn: "span 4" }}>
                    {errors.country}
                  </p>
                )
              }
            />

            <TextField
              label="Numéro de télèphone"
              onChange={handleInput}
              name="phoneNumber"
              sx={{ gridColumn: "span 2" }}
              error={!!errors.phoneNumber}
              helperText={
                errors.phoneNumber && (
                  <p style={{ color: "red", gridColumn: "span 4" }}>
                    {errors.phoneNumber}
                  </p>
                )
              }
            />

            <TextField
              label="Occupation"
              onChange={handleInput}
              name="occupation"
              sx={{ gridColumn: "span 2" }}
              error={!!errors.occupation}
              helperText={
                errors.occupation && (
                  <p style={{ color: "red", gridColumn: "span 4" }}>
                    {errors.occupation}
                  </p>
                )
              }
            />
          </>

          <TextField
            label="Email"
            onChange={handleInput}
            name="email"
            sx={{ gridColumn: "span 4" }}
            error={!!errors.email}
            helperText={
              errors.email && (
                <p style={{ color: "red", gridColumn: "span 4" }}>
                  {errors.email}
                </p>
              )
            }
          />

          <TextField
            label="Mot-de-passe"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleInput}
            name="password"
            sx={{ gridColumn: "span 4" }}
            error={!!errors.password}
            helperText={
              errors.password && (
                <p style={{ color: "red", gridColumn: "span 4" }}>
                  {errors.password}
                </p>
              )
            }
          />
        </Box>

        {/* BUTTONS */}
        <Box>
          <Button
            fullWidth
            type="submit"
            disabled={errors.length > 0}
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: "transparent",
              border: `1px solid ${palette.background.default}`,
              color: palette.primary.dark,
              "&:hover": { color: palette.background.default },
            }}
          >
            S'enregistrer
          </Button>
          <Typography
            onClick={() => {
              navigate("/login");
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
            Vous avez déjà un compte? Connectez-vous ici.
          </Typography>
        </Box>
      </form>
    </div>
  );
}

export default Register;
