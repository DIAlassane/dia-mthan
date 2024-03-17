import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const theme = useTheme();
  const [admins, setAdmins] = useState();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/management/admins", {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((result) => {
        setAdmins(result.data);
        console.log(result.data);
        if (result.data.redirect === "/home") {
          // Rediriger l'utilisateur vers la page d'accueil
          window.location.reload();
          navigate("/home");
        } else {
          // Gérer la réponse normalement
          console.log(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/home");
      });
  }, [role, token]);

  if (!token) {
    return navigate("/home");
  }

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
        return params.value.replace(
          /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
          "($1)$2-$3-$4-$5"
        );
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
      <Header
        title="ADMINS"
        subtitle="Management des admins et listes des admins"
      />
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
          getRowId={(row) => row.id}
          rows={admins || []}
          columns={columns}
          slots={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
