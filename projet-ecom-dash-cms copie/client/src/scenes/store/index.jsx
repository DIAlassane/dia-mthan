import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import axios from "axios";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import StoreSwitcher from "components/StoreSwitcher";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const CurrentStore = useSelector((state) => state.currentStore);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/management/store",
        { name: name, userId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
          role: role,
        }
      );

      // Naviguez vers la page du tableau de bord
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        console.error(
          "Erreur lors de la configuration de la requête",
          err.response.data
        );
        setErrorMessage(err.message);
        navigate("/home");
      }
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="STORE" subtitle="Management des boutiques" />
      <FlexBetween>
        <StoreSwitcher />
        {CurrentStore}
      </FlexBetween>
      <form onSubmit={Submit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {errorMessage.msg}
          <TextField
            label="Nom de vôtre boutique"
            onChange={(e) => setName(e.target.value)}
            name="name"
            sx={{ gridColumn: "span 2" }}
          />
          {userId}
        </Box>

        {/* BUTTONS */}
        <Box>
          <Button
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: "green",
              color: "white",
            }}
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Store;
