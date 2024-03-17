import { useTheme } from "@emotion/react";
import { Box, InputBase } from "@mui/material";

const SearchInput = ({ value, changeInput }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: ".5rem",
      }}
    >
      <InputBase
        type="text"
        placeholder="Recherchez vôtre produit..."
        value={value}
        onChange={changeInput}
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "1px",
          border: "none",
          padding: ".3rem .3rem",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default SearchInput;
