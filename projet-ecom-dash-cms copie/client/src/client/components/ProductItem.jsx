import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Grid,
  ImageListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToCart, setProductData } from "state";
import FilterComponent from "./FilterComponent";
import SearchInput from "./SearchInput";

const ProductItem = ({ selectedPrice }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role);
  const [searchInput, setSearchInput] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const storeId = useSelector((state) => state.currentStore);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const location = useLocation();
  const selectedCategoryNav = location.state?.categoryId ?? null;
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/product/${storeId}`)
      .then((result) => {
        setProducts(result.data);
        dispatch(setProductData(result.data));
        setIsLoading(true);
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [role, token, dispatch]);

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

  useEffect(() => {
    const filterProducts = () => {
      if (!Array.isArray(products)) {
        return;
      }

      let updatedList = [...products];

      // Apply size filter
      if (selectedSize) {
        updatedList = updatedList.filter(
          (item) => item.sizeId && item.sizeId === selectedSize
        );
      }

      // Apply category filter
      if (selectedCategory || selectedCategoryNav) {
        updatedList = updatedList.filter(
          (item) =>
            (item.categoryId && item.categoryId === selectedCategory) ||
            selectedCategoryNav
        );
      }

      // Apply color filter
      if (selectedColor) {
        updatedList = updatedList.filter(
          (item) => item.colorId && item.colorId === selectedColor
        );
      }

      // Apply search input filter
      if (searchInput.trim()) {
        // Ignorer les espaces vides
        updatedList = updatedList.filter(
          (item) =>
            item.name &&
            item.name.toLowerCase().includes(searchInput.trim().toLowerCase())
        );
      }

      // Apply price filter
      const filtered = updatedList.filter((item) => {
        const minPrice = selectedPrice[0];
        const maxPrice = selectedPrice[1];

        const priceFilter =
          (!minPrice || parseFloat(item.price) >= minPrice) &&
          (!maxPrice || parseFloat(item.price) <= maxPrice);

        return priceFilter;
      });

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [
    selectedPrice,
    searchInput,
    products,
    selectedSize,
    selectedCategory,
    selectedColor,
  ]);

  return (
    <Box>
      <Box
        sx={{
          display: "block",
          backgroundColor: theme.palette.background.default,
          width: "50%",
          marginLeft: "25%",
          padding: ".5rem",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "2px",
          padding: ".5rem",
        }}
      >
        <SearchInput
          value={searchInput}
          changeInput={(e) => setSearchInput(e.target.value)}
        />

        <FilterComponent
          sizes={sizes}
          categories={categories}
          colors={colors}
          setSelectedSize={setSelectedSize}
          setSelectedCategory={setSelectedCategory}
          setSelectedColor={setSelectedColor}
        />
      </Box>

      <Box sx={{ padding: "1rem" }}>
        <Grid
          container
          spacing={2}
          sx={{ gap: "1rem", justifyContent: "center", alignItems: "center" }}
        >
          {filteredProducts.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  {item.image ? (
                    <Link to={`/productdetail/${item.id}`}>
                      <ImageListItem
                        key={item.image}
                        sx={{
                          width: "100%",
                          height: "150px",
                          transition: "transform 0.2s ease-out",
                          transform: isHovered ? "scale(1.05)" : "scale(1)",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <img
                          src={`http://localhost:4000/${item.image}`}
                          alt={item.name}
                          sx={{
                            width: "100%",
                            height: "150px",
                          }}
                        />
                      </ImageListItem>
                    </Link>
                  ) : (
                    <Skeleton
                      variant="rectangle"
                      animation="wave"
                      width="278px"
                      height="249.72px"
                    />
                  )}
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
                      {item.price} <br /> C.F.A
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      sx={{
                        color: theme.palette.background.font,
                        backgroundColor: "transparent",
                        border: `1px solid ${theme.palette.background.font}`,
                        fontSize: ".5rem",
                      }}
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            image: item.image,
                            price: item.price,
                            description: item.description,
                            supply: item.supply,
                            name: item.name,
                            categoryId: item.categoryId,
                            rating: item.rating,
                            sizeId: item.sizeId,
                            colorId: item.colorId,
                          })
                        )
                      }
                    >
                      Ajouter
                    </Button>
                    <Typography sx={{ fontWeight: "300" }}>
                      {item.name.slice(0, 5)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductItem;
