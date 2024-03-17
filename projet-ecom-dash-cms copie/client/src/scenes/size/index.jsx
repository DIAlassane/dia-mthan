import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Header from "components/Header";
import UpdateSize from "components/UpdateSize";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Size = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [size, setSize] = useState([]);
  const [activeId, setActiveId] = useState(null); // État pour stocker l'identifiant de l'élément actif
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/size/${storeId}`)
      .then((result) => {
        setSize(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storeId]);

  const handleEdit = (id) => {
    setActiveId(id); // Mettre à jour l'état avec l'identifiant de l'élément à éditer
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/management/size/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        roleId: role,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        navigate("/home");
        console.log(err);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Size" subtitle="Liste Tailles" />
      <Box>
        <Link
          to="/addsize"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: ".5rem",
            color: "white",
            borderRadius: "3px",
            backgroundColor: "lightgreen",
            fontWeight: "900",
            width: "30%",
            marginTop: ".5rem",
          }}
        >
          <AddIcon />
          Add Size
        </Link>
        <Box
          sx={{
            marginTop: "1.5rem",
          }}
        >
          Size's
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {size.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{row.updatedAt}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(row.id)}>
                        {" "}
                        {/* Appeler handleEdit avec l'identifiant de l'élément */}
                        <ModeEditIcon
                          sx={{
                            color: "orange",
                            marginRight: "1rem",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        {" "}
                        {/* Utiliser une fonction handleDelete similaire pour supprimer */}
                        <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {activeId && <UpdateSize id={activeId} />}
      </Box>
    </Box>
  );
};

export default Size;
