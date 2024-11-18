import { useTheme } from "@emotion/react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, ImageListItem, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
  resetCart,
} from "../../state/index";
import NoCartItem from "./NoCartItem";
import CustomPagination from "./Pagination";

const CartItem = () => {
  const [categories, setCategories] = useState([]);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const theme = useTheme();
  const storeId = useSelector((state) => state.currentStore);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cartData.length / itemsPerPage);

  useEffect(() => {
    // Fetch sizes, categories, and colors from backend
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `http://localhost:4000/management/category/${storeId}`
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (cartData.length === 0) {
    return <NoCartItem />;
  }

  return (
    <Box>
      <Box>
        {currentItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              width: "100%",
              height: "15vh",
              justifyContent: "space-between",
              padding: "1rem 0",
              margin: "1rem 0",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              "@media(max-width: 800px)": {
                display: "block",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <CancelIcon
                onClick={() => dispatch(deleteItem(item.id))}
                sx={{
                  color: "red",
                  cursor: "pointer",
                  width: "1.5rem",
                  height: "1.5rem",
                  marginRight: ".5rem",
                }}
              />
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  marginRight: ".5rem",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "900",
                  }}
                >
                  {item.name.substring(0, 5)}
                </Typography>
                <ImageListItem key={item.image}>
                  <img
                    src={`http://localhost:4000/${item.image}`}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </ImageListItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "2px solid black",
                  height: "30px",
                  marginTop: "2.5rem",
                  backgroundColor: theme.palette.primary[100],
                }}
              >
                <Button
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        id: item.id,
                        price: item.price,
                        description: item.description,
                        supply: item.supply,
                        name: item.name,
                        category: item.category,
                        rating: item.rating,
                        quantity: 1,
                      })
                    )
                  }
                  style={{
                    border: "none",
                    color: "red",
                    fontSize: "2rem",
                    fontWeight: 900,
                  }}
                >
                  -
                </Button>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    marginLeft: ".5rem",
                    marginRight: ".5rem",
                    color: theme.palette.secondary[900],
                  }}
                >
                  <span>{item.quantity}</span>
                </Typography>
                <Button
                  onClick={() =>
                    dispatch(
                      increamentQuantity({
                        id: item.id,
                        price: item.price,
                        description: item.description,
                        supply: item.supply,
                        name: item.name,
                        category: item.category,
                        rating: item.rating,
                        quantity: 1,
                      })
                    )
                  }
                  style={{
                    border: "none",
                    color: "green",
                    fontSize: "1rem",
                    fontWeight: 900,
                  }}
                >
                  +
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "2rem",
                "@media(max-width: 800px)": {
                  display: "block",
                  justifyContent: "center",
                  textAlign: "center",
                },
              }}
            >
              <Typography>Stock: {item.supply}</Typography>
              <Typography>
                Category:{" "}
                {categories.find((category) => category.id === item.categoryId)
                  ?.name || "-"}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "800",
                }}
              >
                {item.quantity * item.price} C.F.A
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {cartData.length > 0 && (
        <CustomPagination
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
        />
      )}
      <Box>
        <Button
          onClick={() => dispatch(resetCart())}
          sx={{
            color: "white",
            backgroundColor: "red",
          }}
        >
          Reset Cart
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;
