import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setCurStore } from "state";

const StoreSwitcher = () => {
  const [currentStore, setCurrentStore] = useState("");
  const [selectedStore, setSelectedStore] = useState(currentStore);
  const [stores, setStores] = useState([]);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer la liste de toutes les boutiques
  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/store`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setStores(result.data);
        setCurrentStore(result.data[0]?.name);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // Gérer le changement de boutique sélectionnée
  const handleStore = (newStoreId) => {
    setCurrentStore(newStoreId);
    dispatch(setCurStore({ currentStore: newStoreId }));
  };

  const handleChange = (event) => {
    const newStoreId = event.target.value;
    setSelectedStore(newStoreId); // Met à jour l'état local avec l'ID du nouveau magasin sélectionné
    handleStore(newStoreId); // Appellez la fonction de rappel onChange avec le nouvel ID du magasin sélectionné
    navigate("/store");
  };

  return (
    <Select
      value={selectedStore}
      onChange={handleChange}
      sx={{
        width: "20%",
        marginTop: ".5rem",
        marginBottom: "1.2rem",
      }}
    >
      {stores.map((store) => (
        <MenuItem key={store.id} value={store.id}>
          Current Store: {store.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default StoreSwitcher;
