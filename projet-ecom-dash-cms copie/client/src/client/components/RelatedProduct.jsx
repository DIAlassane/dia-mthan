import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RelatedProduct = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const storeId = useSelector((state) => state.currentStore);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/management/rltproduct/${categoryId}`,
          {
            params: {
              storeId: storeId,
            },
          }
        );
        setProducts(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categoryId, storeId]);

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "cursive",
          fontWeight: "100",
          margin: "1rem 0",
        }}
      >
        Produits similaires
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((product) => (
          <Card key={product.id} style={{ maxWidth: 155 }}>
            <Box
              sx={{
                backgroundImage: `url(http://localhost:4000/${product.image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "155px",
                height: "155px",
                border: `2px solid ${theme.palette.background.font}`,
              }}
            />
            <Link
              to={`/productdetail/${product.id}`}
              style={{
                color: theme.palette.background.font,
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {product.name.slice(0, 11)}
                </Typography>
                <Typography variant="body1">
                  Prix: {product.price} C.F.A
                </Typography>
                {/* Ajoutez d'autres informations du produit si nécessaire */}
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedProduct;
