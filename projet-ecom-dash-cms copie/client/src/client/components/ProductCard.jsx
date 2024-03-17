import { Box, useTheme } from "@mui/material";
import "../widget/style/styles.css";

export default function ProductCard(props) {
  const theme = useTheme();
  return (
    <Box
      className="card"
      style={{
        backgroundColor: theme.palette.background.default,
        border: `2px solid ${theme.palette.background.alt}`,
      }}
    >
      <img
        className="product--image"
        src={`http://localhost:4000/${props.image}`}
        alt="product image"
      />
      <h2 style={{ marginBottom: ".1rem" }}>{props.name.slice(0, 12)}</h2>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <p className="price">
          {props.price}
          <br />
          C.F.A
        </p>
        <p className="price">Stock: {props.supply}</p>
      </Box>
    </Box>
  );
}
