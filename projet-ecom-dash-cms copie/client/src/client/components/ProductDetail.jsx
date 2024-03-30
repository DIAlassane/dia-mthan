import { useTheme } from "@emotion/react";
import { Box, Button, ImageListItem, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, addToCompare } from "../../state/index";
import RelatedProduct from "./RelatedProduct";
import Review from "./Review";

const ProductDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const productDatas = useSelector((state) => state.productData);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [baseQty, setBaseQty] = useState(1);
  const getComment = item.review;
  const storeId = useSelector((state) => state.currentStore);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const userId = useSelector((state) => state.user?.id);

  const calculateAverageRating = () => {
    if (getComment && getComment.length > 0) {
      const totalReviews = getComment.length;
      const totalRating = getComment.reduce(
        (sum, review) => sum + review.note,
        0
      );
      return {
        averageRating: totalRating / totalReviews,
        totalReviews,
      };
    } else {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }
  };

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
  // console.log(item);
  const { averageRating, totalReviews } = calculateAverageRating();

  useEffect(() => {
    // Recherchez le produit correspondant à l'ID dans productData
    const selectedItem = productDatas.find((product) => product.id === id);
    setItem((prevItem) => {
      if (prevItem !== selectedItem) {
        return selectedItem;
      } else {
        return prevItem;
      }
    });
    // console.log(selectedItem);
  }, [id, productDatas]);

  if (!item) {
    return <div>Loading...</div>; // or any other fallback content
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        image: item.image,
        price: item.price,
        description: item.description,
        supply: item.supply,
        name: item.name,
        rating: item.rating,
        review: item.review,
        categoryId: item.categoryId,
        sizeId: item.sizeId,
        colorId: item.colorId,
      })
    );
  };

  const handleCompare = () => {
    dispatch(
      addToCompare({
        id: item.id,
        image: item.image,
        price: item.price,
        description: item.description,
        supply: item.supply,
        name: item.name,
        rating: item.rating,
        review: item.review,
        categoryId: item.categoryId,
        sizeId: item.sizeId,
        colorId: item.colorId,
      })
    );
  };

  // style
  const style1 = {
    padding: "2.5rem 1.5rem",
    display: "flex",
    height: "850px",
    "@media(max-width: 1100px)": {
      display: "block",
      height: "auto",
    },
  };

  const style2 = {
    width: "100%",
    height: "auto",
    marginBottom: "1rem",
    "@media(max-width: 1100px)": {
      width: "404px",
      height: "580px",
    },
  };

  const style3 = {
    width: "100%",
    height: "100%",
    "@media(max-width: 1100px)": {
      width: "404px",
      height: "580px",
    },
  };

  const style4 = {
    width: "50%",
    height: "auto",
    margin: "5% 3%",
    padding: "2rem .5rem",
    "@media(max-width: 1100px)": {
      width: "95%",
      height: "auto",
    },
  };

  const style5 = {
    display: "flex",
    border: `2px solid ${theme.palette.background.font}`,
    marginBottom: "1rem",
    padding: "1rem 1.5rem",
    justifyContent: "space-between",
  };

  const style6 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    border: `2px solid ${theme.palette.background.font}`,
    backgroundColor: theme.palette.primary[100],
  };

  const style7 = {
    border: "none",
    color: "red",
    fontSize: "1rem",
    fontWeight: 900,
    cursor: "pointer",
  };

  const style8 = {
    fontSize: "1.2rem",
    marginLeft: ".5rem",
    marginRight: ".5rem",
    color: theme.palette.secondary[900],
  };

  const style9 = {
    border: "none",
    color: "green",
    fontSize: "1rem",
    fontWeight: 900,
    cursor: "pointer",
  };

  return (
    <Box>
      {" "}
      <Box key={item.id} sx={style1}>
        <Box
          sx={{
            width: "50%",
            height: "600px",
            "@media(max-width: 1100px)": {
              width: "100%",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: "900",
              marginBottom: "1.5rem",
            }}
          >
            {item.name}
          </Typography>
          <Box
            sx={{
              width: "80%",
              height: "350px",
            }}
          >
            <ImageListItem key={item.image} sx={style2}>
              <img
                src={`http://localhost:4000/${item.image}`}
                alt={item.name}
                sx={style3}
              />
            </ImageListItem>
          </Box>
        </Box>
        {/* --------------------------------------- */}

        <Box sx={style4}>
          <Box sx={style5}>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Typography variant="body1" sx={{ display: "block" }}>
                Categorie: <br />
                {categories.find((category) => category.id === item.categoryId)
                  ?.name || "-"}
              </Typography>
              <Typography variant="body1" sx={{ display: "block" }}>
                Couleur: <br />
                {colors.find((color) => color.id === item.colorId)?.name || "-"}
              </Typography>
              <Typography variant="body1" sx={{ display: "block" }}>
                Taille: <br />
                {sizes.find((size) => size.id === item.sizeId)?.name || "-"}
              </Typography>
            </Box>
            <Box sx={{ boxSizing: "border-box" }}>
              <Typography>
                {item && item.name ? item.name.slice(0, 11) : ""}
              </Typography>
              <Typography fontWeight="900">{item.price} C.F.A</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: `2px solid ${theme.palette.background.font}`,
              padding: "1rem 1.5rem",
            }}
          >
            <Typography mb="10px">Description : {item.description}</Typography>
            <Rating value={averageRating.toFixed(1)} readOnly />
            <br />({totalReviews} commentaire)
            <Typography mt="10px" mb="20px">
              En-stock : {item.supply}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box sx={style6}>
                <Button
                  onClick={() =>
                    setBaseQty(baseQty === 1 ? (baseQty = 1) : baseQty - 1)
                  }
                  style={style7}
                >
                  -
                </Button>
                <Typography sx={style8}>
                  <span>{baseQty}</span>
                </Typography>
                <Button onClick={() => setBaseQty(baseQty + 1)} style={style9}>
                  +
                </Button>
              </Box>
              <Button
                onClick={handleAddToCart}
                sx={{
                  color: theme.palette.background.font,
                  backgroundColor: theme.palette.background.alt,
                }}
              >
                ajouter
              </Button>
              <Button
                onClick={handleCompare}
                sx={{
                  color: theme.palette.background.font,
                  backgroundColor: theme.palette.background.alt,
                }}
              >
                Compare
              </Button>
            </Box>
          </Box>
          <Box>
            <RelatedProduct storeId={storeId} categoryId={item.categoryId} />
          </Box>
        </Box>
      </Box>
      <Review productId={id} userId={userId} getComment={getComment} />
    </Box>
  );
};

export default ProductDetail;
