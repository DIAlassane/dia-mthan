import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddColor = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:4000/management/color/${storeId}`,
        {
          name: colorName,
          value: colorValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          roleId: role,
        }
      )
      .then((response) => {
        navigate("/color");
        console.log(response.data);
      })
      .catch((error) => {
        navigate("/home");
        console.log(error);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Color" subtitle="Ajouter une couleur" />
      <Box sx={{ marginTop: "1.5rem" }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          style={{ display: "block" }}
        >
          <TextField
            type="text"
            label="Nom de la couleur"
            onChange={(e) => setColorName(e.target.value)}
            value={colorName}
          />
          <TextField
            type="text"
            label="Couleur HEX"
            onChange={(e) => setColorValue(e.target.value)}
            value={colorValue}
          />
          <Box
            sx={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: colorValue,
              marginTop: "1rem",
            }}
          ></Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                display: "block",
                backgroundColor: "green",
                color: "white",
                "&:hover": { color: "drakgreen" },
              }}
            >
              Enregistrer
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddColor;
