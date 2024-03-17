import React, { useState } from 'react';
import axios from 'axios';
import Validation from 'protection/Validation';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
import { useSelector } from 'react-redux';

function SettingsWidget() {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      state: '',
      country: '',
      city: '',
      phoneNumber: '',
      occupation: '',
  });

  const [errors, setErrors] = useState({})

  function handleInput(event) {
    const {name, value} = event.target;
    setValues((prev) => {
        return { ...prev, [name]: value }
    });
  }

  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault();

    // Validez les champs
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Si aucune erreur de validation, soumettez les données
    if (Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:4000/update", values)
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => {
        if (err.response) {
          // Le serveur a répondu avec un statut d'erreur
          console.error("Erreur de réponse du serveur:", err.response.data);
        } else if (err.request) {
          // La requête a été faite, mais aucune réponse n'a été reçue
          console.error("Aucune réponse du serveur");
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.error("Erreur lors de la configuration de la requête", err.message);
        }
      });
    
  }
  }

  const {
    name,
    email,
    city,
    state,
    country,
    occupation,
    phoneNumber,
  } = user;

  return (
    <div>
        <form onSubmit={Submit}>
          <Box
            display="grid"
            width='550px'
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
              <>
                <TextField
                  label={name}
                  onChange={handleInput}
                  name="name"
                  sx={{ gridColumn: "span 4" }}
                  error={!!errors.name}
                  helperText={errors.name && <p style={{color: "red",gridColumn: "span 4"}}>{errors.name}</p>}
                />
                
                <TextField
                  label=''
                  onChange={handleInput}
                  name="role"
                  sx={{ display: "none", gridColumn: "span 4" }}
                />
                {/* {errors.role && <p style={{color: "red"}}>{errors.role}</p>} */}
                <TextField
                  label={state}
                  onChange={handleInput}
                  name="state"
                  sx={{ gridColumn: "span 4" }}
                  error={!!errors.state}
                  helperText={errors.state && <p style={{color: "red",gridColumn: "span 4"}}>{errors.state}</p>}
                />
                
                <TextField
                  label={country}
                  onChange={handleInput}
                  name="country"
                  sx={{ gridColumn: "span 4" }}
                  error={!!errors.country}
                  helperText={errors.country && <p style={{color: "red",gridColumn: "span 4"}}>{errors.country}</p>}
                />
                
                <TextField
                  label={city}
                  onChange={handleInput}
                  name="city"
                  sx={{ gridColumn: "span 4" }}
                  error={!!errors.city}
                  helperText={errors.city && <p style={{color: "red",gridColumn: "span 4"}}>{errors.city}</p>}
                />
                
                <TextField
                  label={phoneNumber}
                  onChange={handleInput}
                  name="phoneNumber"
                  sx={{ gridColumn: "span 4" }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber && <p style={{color: "red",gridColumn: "span 4"}}>{errors.phoneNumber}</p>}
                />
                
                <TextField
                  label={occupation}
                  onChange={handleInput}
                  name="occupation"
                  sx={{ gridColumn: "span 4" }}
                  error={!!errors.occupation}
                  helperText={errors.occupation && <p style={{color: "red",gridColumn: "span 4"}}>{errors.occupation}</p>}
                />
                
              </>

            <TextField
              label={email}
              onChange={handleInput}
              name="email"
              sx={{ gridColumn: "span 4" }}
              error={!!errors.email}
              helperText={errors.email && <p style={{color: "red",gridColumn: "span 4"}}>{errors.email}</p>}
            />
            
            <TextField
              label="Mot-de-passe"
              type="password"
              onChange={handleInput}
              name="password"
              sx={{ gridColumn: "span 4" }}
              error={!!errors.password}
              helperText={errors.password && <p style={{color: "red",gridColumn: "span 4"}}>{errors.password}</p>}
            />
            
          </Box>

          {/* BUTTONS */}
          <Box sx={{
            width: '550px',
          }}>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.primary.dark,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Modifier
            </Button>
            <Typography>
                Vos information doivent êtres réels
            </Typography>
          </Box>
        </form>
    </div>
  )
}

export default SettingsWidget;