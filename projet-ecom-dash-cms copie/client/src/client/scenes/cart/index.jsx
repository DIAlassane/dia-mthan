import { Box } from "@mui/material";
import CartItem from "client/components/CartItem";
import CartTotal from "client/components/CartTotal";
import Header from "components/Header";

const Cart = () => {
  return (
    <Box
      sx={{
        padding: "2rem 1rem",
      }}
    >
      <Header title="PANIER" subtitle="Vôtre sélèction" />
      <Box
        sx={{
          padding: "1rem 0",
          display: "flex",
          "@media(max-width: 1100px)": {
            display: "block",
          },
        }}
      >
        <Box
          sx={{
            width: "60%",
            "@media(max-width: 1100px)": {
              width: "100%",
            },
          }}
        >
          <CartItem />
        </Box>
        <Box
          sx={{
            width: "40%",
            "@media(max-width: 1100px)": {
              width: "100%",
            },
          }}
        >
          <CartTotal />
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
