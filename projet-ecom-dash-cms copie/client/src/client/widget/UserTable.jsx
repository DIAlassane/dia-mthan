import { Block, FileCopy } from "@mui/icons-material";
import { Checkbox, IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/management/users",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { role: role },
          }
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log(error);
        navigate("/home");
      }
    };

    fetchUsers();
  }, [role, token]);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleCopy(params.row)}>
            <FileCopy />
          </IconButton>
          <IconButton onClick={() => handleBlock(params.row)}>
            <Block />
          </IconButton>
          <Checkbox />
        </div>
      ),
    },
  ];

  const handleCopy = (user) => {
    console.log(`Copied user: ${user.name}`);
  };

  const handleBlock = (user) => {
    console.log(`Blocked user: ${user.name}`);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <TextField
        label="Rechercher"
        variant="outlined"
        onChange={handleSearchChange}
        style={{ marginBottom: "10px" }}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={2}
          rowsPerPageOptions={[2, 4, 5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default UserTable;
