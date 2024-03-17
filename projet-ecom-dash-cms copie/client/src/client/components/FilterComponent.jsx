import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Divider,
} from "@mui/material";

const FilterComponent = ({
  sizes,
  categories,
  colors,
  selectedSize,
  setSelectedSize,
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
}) => {
  
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: "space-around",
        marginBottom: "1rem",
        gap: '10px'
      }}
    >
      <FormControl sx={{ minWidth: 120, flexGrow: 1, flexBasis: 120 }}>
        <InputLabel>Catégorie</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">Tous</MenuItem>
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Divider orientation="vertical" flexItem />

      <FormControl sx={{ minWidth: 120, flexGrow: 1, flexBasis: 120 }}>
        <InputLabel>Taille</InputLabel>
        <Select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <MenuItem value="">Tous</MenuItem>
          {sizes &&
            sizes.map((size) => (
              <MenuItem key={size.id} value={size.id}>
                {size.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Divider orientation="vertical" flexItem />

      <FormControl sx={{ minWidth: 130, flexGrow: 1, flexBasis: 130 }}>
        <InputLabel>Couleur</InputLabel>
        <Select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <MenuItem value="">Tous</MenuItem>
          {colors &&
            colors.map((color) => (
              <MenuItem
                key={color.id}
                value={color.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {color.name}
                <Box
                  sx={{
                    backgroundColor: color.value,
                    width: "25px",
                    height: "25px",
                  }}
                ></Box>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;
