import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdateProductAdmin = ({ id }) => {
  const storeId = useSelector((state) => state.currentStore);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  useEffect(() => {
    // Fetch sizes, categories, and colors from backend
    const fetchData = async () => {
      try {
        const sizesResponse = await axios.get(
          `http://localhost:4000/management/size/${storeId}`
        );
        const categoriesResponse = await axios.get(
          `http://localhost:4000/management/category/${storeId}`
        );
        const colorsResponse = await axios.get(
          `http://localhost:4000/management/color/${storeId}`
        );
        setSizes(sizesResponse.data);
        setCategories(categoriesResponse.data);
        setColors(colorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("supply", supply);
    formData.append("isFeatured", isFeatured);
    formData.append("isArchived", isArchived);
    formData.append("sizeId", selectedSize);
    formData.append("categoryId", selectedCategory);
    formData.append("colorId", selectedColor);
    formData.append("storeId", storeId);

    await axios
      .put(`http://localhost:4000/management/product/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        roleId: role,
      })
      .then((result) => {
        console.log(result.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Créer l'URL d'objet pour la prévisualisation
  };

  return (
    <Box
      sx={{
        width: "90%",
        height: "auto",
        marginLeft: "5%",
        marginTop: "2rem",
        backgroundColor: "grey",
        border: `3px solid white`,
        borderRadius: "5px",
      }}
    >
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ maxWidth: "40%", height: "35vh", marginBottom: "1rem" }}
        />
      )}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        style={{ display: "block" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Nom du produit</InputLabel>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Prix</InputLabel>
              <TextField
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Description</InputLabel>
              <TextField
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Stock</InputLabel>
              <TextField
                type="text"
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Taille</InputLabel>
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizes.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Couleur</InputLabel>
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {colors.map((color) => (
                  <MenuItem key={color.id} value={color.id}>
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
              }
              label="Produit en vedette"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isArchived}
                  onChange={(e) => setIsArchived(e.target.checked)}
                />
              }
              label="Archivé"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              id="file-input"
              name="image"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ width: "100%" }}
              >
                {selectedFile ? selectedFile.name : "Télécharger l'image"}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", marginBottom: "5rem" }}
            >
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProductAdmin;
