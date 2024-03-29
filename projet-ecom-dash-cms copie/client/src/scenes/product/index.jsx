import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Header from "components/Header";
import UpdateProductAdmin from "components/UpdateProductAdmin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToHomeCat, deleteItemToHomeCat, resetHomeCat } from "state";

const ProductAdmin = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [product, setProduct] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch sizes, categories, and colors from backend
    const fetchData = async () => {
      try {
        const sizesResponse = await axios.get(
          `http://localhost:4000/management/size/${storeId}`
        );
        const categoriesResponse = await axios.get(
          `http://localhost:4000/management/category/${storeId}`
        );
        const colorsResponse = await axios.get(
          `http://localhost:4000/management/color/${storeId}`
        );
        setSizes(sizesResponse.data);
        setCategories(categoriesResponse.data);
        setColors(colorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storeId]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/product/${storeId}`)
      .then((result) => {
        setProduct(result.data);
        // console.log(result.data);
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
      .delete(`http://localhost:4000/management/product/${id}`, {
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

  const handleAddToCart = (row) => {
    if (row.isHome) {
      // Si la case à cocher "Acceuil" est décochée, supprimez le produit de la catégorie de produit dans le state Redux
      dispatch(deleteItemToHomeCat(row.id));
      alert("product deleted form home cat");
    } else {
      // Si la case à cocher "Acceuil" est cochée, ajoutez le produit à la catégorie de produit dans le state Redux
      dispatch(
        addToHomeCat({
          id: row.id,
          image: row.image,
          price: row.price,
          supply: row.supply,
          name: row.name,
          rating: row.rating,
          review: row.review,
          categoryId: row.categoryId,
        })
      );
      alert("product added to home cat");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Product" subtitle="Liste des Produits" />
      <Box>
        <Link
          to="/addproduct"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: ".5rem",
            color: "white",
            borderRadius: "3px",
            backgroundColor: "lightgreen",
            fontWeight: "600",
            width: "40%",
            marginTop: ".5rem",
            fontSize: ".6rem",
          }}
        >
          <AddIcon />
          Add Product
        </Link>
        <Button onClick={() => dispatch(resetHomeCat())}>reset Home Cat</Button>
        <Box
          sx={{
            marginTop: "1.5rem",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell align="right">Prix</TableCell>
                  <TableCell align="right">isFeatured</TableCell>
                  <TableCell align="right">isArchived</TableCell>
                  <TableCell align="right">Acceuil</TableCell>
                  <TableCell align="right">supply</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                        {row.isFeatured ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">
                        {row.isArchived ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          size="small"
                          onChange={() => handleAddToCart(row)} // Appeler handleAddToCart avec les informations sur le produit
                        />
                      </TableCell>
                      <TableCell align="right">{row.supply}</TableCell>
                      <TableCell align="right">
                        {sizes.find((size) => size.id === row.sizeId)?.name ||
                          "-"}
                      </TableCell>
                      <TableCell align="right">
                        {categories.find(
                          (category) => category.id === row.categoryId
                        )?.name || "-"}
                      </TableCell>
                      <TableCell align="right">
                        {colors.find((color) => color.id === row.colorId)
                          ?.name || "-"}
                      </TableCell>
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
                          <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={product.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
        {activeId && <UpdateProductAdmin id={activeId} />}{" "}
        {/* Afficher UpdateColor si activeId est défini */}
      </Box>
    </Box>
  );
};

export default ProductAdmin;
