import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Validation from 'protection/Validation';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
import Header from './Header';
import { useSelector } from 'react-redux';

const UpdateProduct = () => {
    const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user.role);  

  const [values, setValues] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    category: '',
    rating: '',
    supply: '',
  });

  function handleInput(event) {
    const {name, value} = event.target;
    setValues((prev) => {
        return { ...prev, [name]: value }
    });
}
const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:4000/client/products`, {
        headers: { Authorization: `Bearer ${token}` },
        role: role, 
    })
    .then(result => {
      console.log(result)
      setValues(result.data)
    })
    .catch(err => console.log(err))
  }, [token, role])   
  const { id } = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validez les champs
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Si aucune erreur de validation, soumettez les données
    if (Object.keys(validationErrors).length === 0) {
        // Effectuez l'appel axios.post ici
        axios.post(`http://localhost:4000/client/update/product/${id}`, values,{
            headers: { Authorization: `Bearer ${token}` },
            role: role,
        })
            .then(result => {
                alert("Vous avez bien soumis le formulaire")
                console.log(result);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }
    
}

  return (
    <div>
        <Header title="Modifier le Produit" subtitle="Vous allez modifier le produit" />
        <form 
        onSubmit={handleSubmit}
        style={{
            width: '60%',
            marginLeft: '20%',
        }}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >{errors}
              <>
                <TextField
                  label="id"
                  onChange={handleInput}
                  name="id"
                  sx={{ gridColumn: "span 2", display: 'none' }}
                />

                <TextField
                  label="Nom"
                  onChange={handleInput}
                  name="name"
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
                  label="price"
                  onChange={handleInput}
                  name="price"
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
                  label="description"
                  onChange={handleInput}
                  name="description"
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
                  label="category"
                  onChange={handleInput}
                  name="category"
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
                  label="rating"
                  onChange={handleInput}
                  name="rating"
                  sx={{ gridColumn: "span 2" }}
                />
                
                <TextField
                  label="supply"
                  onChange={handleInput}
                  name="supply"
                  sx={{ gridColumn: "span 2" }}
                />
                
              </>
            
          </Box>

          {/* BUTTONS */}
          <Box>
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
            <Typography
            onClick={() => {
                navigate('/products')
            }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Ne pas modifier ce produit
            </Typography>
          </Box>
        </form>
    </div>
  )
}

export default UpdateProduct