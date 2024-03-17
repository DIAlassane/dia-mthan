import { Box, Button } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [name, setNames] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:4000/management/category/${storeId}`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
          roleId: role,
        }
      )
      .then((response) => {
        navigate("/category");
        console.log(response.data);
      })
      .catch((error) => {
        navigate("/home");
        console.log(error);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add BillBoard" subtitle="Ajouter un Headers" />
      <Box sx={{ marginTop: "1.5rem" }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
          style={{ display: "block" }}
        >
          <input
            type="text"
            label="name"
            onChange={(e) => setNames(e.target.value)}
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

export default AddCategory;
