import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import Header from "components/Header";
import ValidationProduct from "protection/ValidationProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProductAdmin = () => {
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
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);
  const navigate = useNavigate();

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

    const newErrors = ValidationProduct({ name, price, description, supply });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Si il n'y a pas d'erreurs, envoyez la requête
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

      await axios
        .post(`http://localhost:4000/management/product/${storeId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
          roleId: role,
        })
        .then((response) => {
          navigate("/productadmin");
          console.log(response.data);
        })
        .catch((error) => {
          navigate("/home");
          console.log(error);
        });
    } else {
      // Sinon, affichez les erreurs
      console.log(errors);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Créer l'URL d'objet pour la prévisualisation
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Product" subtitle="Ajouter un Produit" />
      <Box sx={{ marginTop: "1.5rem" }}>
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
                  error={errors.name ? true : false}
                  helperText={errors.name}
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
                  error={errors.price ? true : false}
                  helperText={errors.price}
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
                  error={errors.description ? true : false}
                  helperText={errors.description}
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
                  error={errors.supply ? true : false}
                  helperText={errors.supply}
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
                    <MenuItem
                      key={color.id}
                      value={color.id}
                      sx={{ justifyContent: "space-between" }}
                    >
                      {color.name}{" "}
                      <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: color.value,
                        }}
                      />
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
    </Box>
  );
};

export default AddProductAdmin;
