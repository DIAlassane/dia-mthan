import { Box } from "@mui/material";
import Header from "components/Header";
import { useSelector } from "react-redux";

const Compare = () => {
  const CompareItem = useSelector((state) => state.compare);

  if (!CompareItem) {
    return <>Aucun Produit</>;
  }
  return (
    <Box sx={{ padding: "2rem 1rem" }}>
      <Header title="Compare" subtitle="Comparez vos produits" />

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {CompareItem.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: "10%",
              margin: "1rem",
            }}
          >
            <img
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Compare;
