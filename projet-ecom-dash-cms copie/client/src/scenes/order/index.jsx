import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/management/orders", {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((result) => {
        setOrders(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        navigate("/home");
        console.log(err);
      });
  }, [role, token]);

  if (!orders) {
    return <div>pas encore de ventes</div>;
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.5,
      renderCell: (params) => {
        const phoneNumber = params.value.toString(); // Convertir la valeur en chaîne de caractères
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "address",
      headerName: "address",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      flex: 1,
    },
    {
      field: "cart",
      headerName: "Cart",
      flex: 1,
      renderCell: (params) => {
        const cart = params.value;
        const itemCount = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return itemCount;
      },
    },
    {
      field: "isPaid",
      headerName: "Is Paid",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.value ? "green" : "red",
          }}
        >
          {params.value ? "True" : "False"}
        </Box>
      ),
    },
    {
      field: "options",
      headerName: "Options",
      flex: 0.5,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <ModeEditIcon
            sx={{ color: "orange", cursor: "pointer" }}
            onClick={() => navigate("/products")}
          />
          <DeleteIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => navigate("/customers")}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Status des ventes" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={orders || []}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Orders;
