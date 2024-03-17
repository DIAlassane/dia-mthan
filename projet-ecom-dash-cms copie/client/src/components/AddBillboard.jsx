import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBillboard = () => {
  const [image, setImage] = useState("");
  const storeId = useSelector((state) => state.currentStore);
  const [label, setLabel] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("label", label);
    formData.append("storeId", storeId);

    await axios
      .post("http://localhost:4000/management/createbillboard", formData, {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((response) => {
        navigate("/billboard");
        console.log(response.data);
      })
      .catch((error) => {
        navigate("/home");
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Créer l'URL d'objet pour la prévisualisation
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
            type="file"
            id="file-input"
            name="image"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "30%", height: "auto" }}
            />
          )}
          <label
            htmlFor="file-input"
            style={{ display: "block", marginTop: "1rem" }}
          >
            <Button
              variant="contained"
              component="span"
              sx={{
                width: "556px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CloudUploadIcon />
              {selectedFile ? selectedFile.name : "Upload File"}
            </Button>
          </label>
          {/* Affichage de la prévisualisation de l'image */}

          <TextField
            label="Label"
            onChange={(e) => setLabel(e.target.value)}
            name="label"
            sx={{ gridColumn: "span 2", display: "block", marginTop: "1rem" }}
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

export default AddBillboard;
