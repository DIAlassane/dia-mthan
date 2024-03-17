import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/client/customers", {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((result) => {
        setCustomers(result.data);
        // console.log(result.data);
      })
      .catch((err) => {
        navigate("/home");
        console.log(err);
      });
  }, [role, token]);

  const columns = [
    {
      field: "avatar", // Ajoutez un champ pour le rendu de l'Avatar
      headerName: "Avatar",
      flex: 1,
      renderCell: (params) => (
        <Avatar
          alt={params.row.name}
          src={params.row.url}
          sx={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        const phoneNumber = params.value.toString(); // Convertir la valeur en chaîne de caractères
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "roleId",
      headerName: "Role",
      flex: 0.5,
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
      <Header title="CLIENT" subtitle="Liste des clients" />
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
          rows={customers || []}
          getRowId={(row) => row.id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
