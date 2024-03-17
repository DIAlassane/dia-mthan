import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Checkbox, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Header from "components/Header";
import UpdateBillboard from "components/UpdateBillboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCatBill, setBillboard, setCatBill, setNoBillboard } from "state";

const Billboard = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [billboards, setBillboards] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/billboard/${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((result) => {
        setBillboards(result.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/home");
      });
  }, [storeId]);

  const handleEdit = (id) => {
    setActiveId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/management/billboard/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        navigate("/home");
      });
  };

  const handleBillboard = (isChecked, billboardId) => {
    if (isChecked) {
      dispatch(setBillboard({ billboard: billboardId })); // Utilisez l'ID du billboard ici
      console.log(billboardId);
    } else {
      dispatch(setNoBillboard());
    }
  };

  const handleNew = (isChecked, billboardIdCat) => {
    if (isChecked) {
      dispatch(setCatBill({ catHome: billboardIdCat })); // Utilisez l'ID du billboard ici
      console.log(billboardIdCat);
    } else {
      dispatch(deleteCatBill());
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BillBoard" subtitle="Liste Headers" />
      <Box>
        <Link
          to="/addbillboard"
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
          Add Billboard
        </Link>
        <Box
          sx={{
            marginTop: "1.5rem",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>isSelected</TableCell>
                  <TableCell>New</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billboards.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.label}
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        onClick={(e) =>
                          handleBillboard(e.target.checked, row.id)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        onClick={(e) => handleNew(e.target.checked, row.id)}
                      />
                    </TableCell>
                    <TableCell align="right">{row.updatedAt}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <ModeEditIcon
                          sx={{
                            color: "orange",
                            marginRight: "1rem",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {activeId && <UpdateBillboard id={activeId} />}
      </Box>
    </Box>
  );
};

export default Billboard;
