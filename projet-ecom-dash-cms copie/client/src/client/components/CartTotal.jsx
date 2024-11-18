import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import imgButtonSN from "../../assets/ButtonSN.png";

const CartTotal = () => {
  const cart = useSelector((state) => state.cart);
  const [totalAmt, setTotalAmt] = useState("");
  const theme = useTheme();

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.price * item.quantity;
    });

    setTotalAmt(price.toFixed(2));
  }, [cart]);

  return (
    <Box
      sx={{
        margin: "1rem .5rem",
        padding: "1rem",
        borderLeft: "3px solid black",
        borderRight: "3px solid black",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.25rem",
          fontWeight: "900",
          marginBottom: ".5rem",
        }}
      >
        Total du panier
      </Typography>
      <Typography
        sx={{ fontSize: "1.05rem", fontWeight: "900", marginTop: ".5rem" }}
      >
        Subtotal: {totalAmt} C.F.A
      </Typography>
      <Typography
        sx={{ fontSize: "1.25rem", fontWeight: "900", marginTop: ".5rem" }}
      >
        Total: {totalAmt} C.F.A
      </Typography>
      <Box
        sx={{
          display: "block",
        }}
      >
        <form
          action=""
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <TextField
            id="phone"
            label="phone"
            variant="standard"
            sx={{
              display: "block",
              width: "100%",
            }}
          />
          <TextField
            id="address"
            label="adress"
            variant="standard"
            sx={{
              display: "block",
              width: "100%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img
              src={imgButtonSN}
              alt="buttonSN"
              style={{
                width: "100px",
                height: "auto",
              }}
            />
            <Button
              sx={{
                color: theme.palette.grey[900],
                backgroundColor: theme.palette.grey[100],
                height: "1.5rem",
                marginTop: ".5rem",
              }}
              onClick={() => {}}
            >
              commander
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CartTotal;
