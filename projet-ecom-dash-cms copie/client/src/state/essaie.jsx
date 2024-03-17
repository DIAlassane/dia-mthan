import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";

function Register() {
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const [role, setRole] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [city, setCity] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [occupation, setOccupation] = useState()
    const [country, setCountry] = useState()
    const [state, setState] = useState()

    const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/auth/register", {
        name,
        email,
        password,
        state,
        country,
        city,
        phoneNumber,
        occupation,
        role,
    })
    .then(result => {
      console.log(result)
      navigate('/products')
    })
    .catch(err => console.log(err))
  }

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
              <>
                <TextField
                  label="name"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="role"
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="state"
                  onChange={(e) => setState(e.target.value)}
                  name="state"
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="country"
                  onChange={(e) => setCountry(e.target.value)}
                  name="country"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="city"
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phoneNumber"
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onChange={(e) => setOccupation(e.target.value)}
                  name="occupation"
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                </Box>
              </>
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              sx={{ gridColumn: "span 4" }}
            />
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
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Login
            </Button>
            <Typography
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              rien
            </Typography>
          </Box>
        </form>
    </div>
  )
}

export default Register

  // const [page, setPage] = useState(1);
  // const itemsPerPage = 8; // Nombre d'éléments par page


// const totalItems = filteredProducts.length;
// const startIndex = (page - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

  // const visibleProducts = filteredProducts;
  // .slice(startIndex, endIndex);

        {/* {showPagination && totalItems > itemsPerPage &&  (
        <Pagination
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        />
      )} */}
