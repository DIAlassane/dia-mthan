import { useTheme } from "@emotion/react";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoCartItem = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        padding: "2rem 1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary[100],
            fontSize: "1.3rem",
            fontWeight: "900",
            marginBottom: "1rem",
          }}
        >
          Vôtre panier est vide
        </Typography>
        <ProductionQuantityLimitsIcon
          sx={{
            width: "10rem",
            height: "10rem",
            marginBottom: "2rem",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography
          onClick={() => {
            navigate("/product");
          }}
          sx={{
            color: theme.palette.primary[100],
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Voir les produits
        </Typography>
      </Box>
    </Box>
  );
};

export default NoCartItem;
