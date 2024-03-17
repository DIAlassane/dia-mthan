import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FilterComponentColor = ({ colors, setSelectedColor }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}
    >
      {colors.map((color) => (
        <Box
          key={color.id}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: color.value,
            borderRadius: "50%",
            margin: "0 5px",
            cursor: "pointer",
            "@media(max-width: 900px)": {
              width: "20px",
              height: "20px",
              borderRadius: "30%",
            },
          }}
          onClick={() => setSelectedColor(color.id)}
        />
      ))}
    </Box>
  );
};

const ProductCard = ({ item, onAddToCart }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Ajoutez ici la logique pour afficher l'image */}
        <img
          src={`http://localhost:4000/${item.image}`}
          alt={item.name}
          style={{
            width: "100%",
            height: "270px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: ".3rem 1rem",
          cursor: "pointer",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "600" }}>
            {item.price} <br />
            C.F.A
          </Typography>
        </Box>
        <Box>
          <Button onClick={() => onAddToCart(item.id)}>Add to cart</Button>
          <Typography sx={{ fontWeight: "300" }}>
            {item.name.slice(0, 5)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const HomeColor = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const storeId = useSelector((state) => state.currentStore);
  const [colors, setColors] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // Fetch products from backend
    axios
      .get(`http://localhost:4000/management/product/${storeId}`)
      .then((result) => {
        setProducts(result.data);
        setFilteredProducts(result.data); // Initial filtered products are all products
      })
      .catch((error) => {
        console.error(error);
      });
  }, [storeId]);

  useEffect(() => {
    // Fetch sizes, categories, and colors from backend
    const fetchData = async () => {
      try {
        const colorsResponse = await axios.get(
          `http://localhost:4000/management/color/${storeId}`
        );
        setColors(colorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storeId]);

  useEffect(() => {
    // Filter products based on selected color
    if (selectedColor !== null) {
      const filtered = products.filter(
        (item) => item.colorId === selectedColor
      );
      setFilteredProducts(filtered);
    } else {
      // If no color selected, show all products
      setFilteredProducts(products);
    }
  }, [selectedColor, products]);

  const handleAddToCart = (productId) => {
    // Logic to add product to cart
  };

  const styleDivider = {
    border: `.5px solid ${theme.palette.grey[900]}`,
    width: "80%",
    marginLeft: "10%",
    marginTop: "1.5rem",
  };

  return (
    <Box>
      <FilterComponentColor
        colors={colors}
        setSelectedColor={setSelectedColor}
      />
      <Grid container spacing={2}>
        {filteredProducts.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <ProductCard item={item} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Divider sx={styleDivider} />
    </Box>
  );
};

export default HomeColor;
