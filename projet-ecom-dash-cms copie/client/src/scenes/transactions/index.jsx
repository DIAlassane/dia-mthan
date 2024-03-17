import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import axios from "axios";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const Transactions = () => {
    const theme = useTheme();
     // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const token = useSelector((state) => state.token);
    const role = useSelector((state) => state.user.role);
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");

    const [transactions, setTransactions] = useState({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
        transactions: [],
        total: 0,
    });

    useEffect(() => {
        axios.get("http://localhost:4000/client/transactions", {
          headers: { Authorization: `Bearer ${token}` },
          role: role,
        })
        .then((result) => {
            setTransactions(result.data);
            console.log(result.data)
        })
        .catch((err) => console.log(err));
      }, [role, token]);


    const columns = [
        {
          field: "id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "userId",
          headerName: "User ID",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "CreatedAt",
          flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (params.value ?? []).length,
        },
        {
          field: "transactions",
          headerName: "Cost",
          flex: 1,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
        {
          field: "options",
          headerName: "Options",
          flex: 0.5,
          renderCell: (params) => (
              <Box sx={{ display: 'flex',gap: '10px', }}>
                  <ModeEditIcon 
                  sx={{ color: 'orange', cursor: 'pointer' }}
                  onClick={() => navigate('/products')} />
                  <DeleteIcon 
                  sx={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => navigate('/customers')} />
              </Box>
          ),
      }
      ];

  return <Box m="1.5rem 2.5rem">
    <Header title="TRANSACTIONS" subtitle="Liste des transactions" />
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
            rows={ transactions && transactions.transactions ? transactions.transactions : []}
            getRowId={(row) => row.id}
            columns={columns}
            rowCount={transactions && transactions.total ? transactions.total : 0}
            pagination
            rowPerPageOptions={[20, 50, 100]}
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(newSortModel)}
            slots={{ Toolbar: DataGridCustomToolbar }}
            slotsProps={{
                Toolbar: { searchInput, setSearchInput, setSearch },
            }}
        />
    </Box>
  </Box>
}

export default Transactions