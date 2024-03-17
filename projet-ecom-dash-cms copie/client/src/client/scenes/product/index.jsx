import { Box } from "@mui/material";
import Filter from "client/components/Filter";
import ProductItem from "client/components/ProductItem";
import { useEffect, useState } from "react";

const Product = () => {
  const [selectedPrice, setSelectedPrice] = useState([25000, 300000]);
  const [products, setProducts] = useState([]);
  const [list, setList] = useState(products);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = [...products];

    // Search Filter
    if (searchInput) {
      console.log("Applying Search Filter");
      updatedList = updatedList.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase().trim())
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) =>
        parseFloat(item.price) >= minPrice && parseFloat(item.price) <= maxPrice
    );

    console.log("Filtered Products:", updatedList);

    setList(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [searchInput, selectedPrice]);

  const options = products.map((product) => ({
    id: product.id,
    label: {
      category: product.category,
      rating: product.rating,
    },
  }));

  return (
    <Box>
      <Box
        sx={{
          width: "60%",
          marginLeft: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Filter
          selectedPrice={selectedPrice}
          changePrice={handleChangePrice}
          options={options}
        />
      </Box>
      <Box>
        <ProductItem selectedPrice={selectedPrice} products={list} />
      </Box>
    </Box>
  );
};

export default Product;
