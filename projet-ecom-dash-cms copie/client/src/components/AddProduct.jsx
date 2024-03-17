import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AddProduct = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [supply, setSupply] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [storeId, setStoreId] = useState("");
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);

  const navigate = useNavigate();
  setStoreId("2233232");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("supply", supply);
    formData.append("storeId", storeId);

    await axios
      .post("http://localhost:4000/client/create/product", formData, {
        headers: { Authorization: `Bearer ${token}` },
        roleId: role,
      })
      .then((response) => {
        navigate("/products");
        console.log(response.data);
      })
      .catch((error) => {
        navigate("/home");
        console.log(error.data);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImage(file);
  };

  return (
    <Box
      sx={{
        marginTop: "3rem",
        padding: "1rem",
      }}
    >
      <Header title="ADD PRODUCT" subtitle="All fields are require" />

      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            marginTop: "2rem",
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
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              label="category"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              label="supply"
              onChange={(e) => setSupply(e.target.value)}
              name="supply"
              sx={{ gridColumn: "span 2" }}
            />
          </>

          <TextField
            label="description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            sx={{ gridColumn: "span 4" }}
          />

          <Box
            sx={{
              gridColumn: "span 2",
            }}
          >
            <Rating
              onChange={(e) => setRating(e.target.value)}
              name="rating"
              sx={{
                width: "102.85px",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Box>

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
            Enregistrer
          </Button>

          <Typography
            onClick={() => {
              navigate("/products");
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
            back to all products
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;
