import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateColor = ({ id }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `http://localhost:4000/management/color/${id}`,
        { name, value },
        {
          headers: { Authorization: `Bearer ${token}` },
          roleId: role,
        }
      )
      .then((result) => {
        console.log(result.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        width: "40%",
        height: "250px",
        marginLeft: "30%",
        marginTop: "2rem",
        backgroundColor: "grey",
        border: `3px solid ${value}`,
        borderRadius: "5px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        style={{ display: "block" }}
      >
        <TextField
          type="text"
          label="Nom de la couleur"
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={{
            display: "block",
            marginLeft: "8rem",
            marginTop: "1rem",
          }}
        />
        <TextField
          type="text"
          label="Couleur HEX"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          sx={{
            display: "block",
            marginLeft: "8rem",
            marginTop: "1rem",
          }}
        />
        <Box
          sx={{
            width: "15%",
            height: "10%",
            borderRadius: "5px",
            display: "block",
            marginLeft: "42.5%",
            backgroundColor: value,
            marginTop: "1rem",
          }}
        ></Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            display: "block",
            backgroundColor: "green",
            color: "white",
            "&:hover": { backgroundColor: value },
          }}
        >
          Enregistrer
        </Button>
      </form>
    </Box>
  );
};

export default UpdateColor;
