import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddSize = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [sizeName, setSizeName] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:4000/management/size/${storeId}`,
        { name: sizeName, value: sizeValue },
        {
          headers: { Authorization: `Bearer ${token}` },
          roleId: role,
        }
      )
      .then((response) => {
        navigate("/size");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate('/home')
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Size" subtitle="Ajouter une Taille" />
      <Box sx={{ marginTop: "1.5rem" }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          style={{ display: "block" }}
        >
          <TextField
            type="text"
            label="Nom de la taille"
            onChange={(e) => setSizeName(e.target.value)}
          />
          <TextField
            type="text"
            label="value"
            onChange={(e) => setSizeValue(e.target.value)}
          />
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

export default AddSize;
