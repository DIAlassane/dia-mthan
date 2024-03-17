import { Box, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CategoryLink = () => {
  const storeId = useSelector((state) => state.currentStore);
  const [billboards, setBillboards] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/management/billboard/${storeId}`)
      .then((result) => {
        setBillboards(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storeId]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        justifyContent: "left",
        padding: ".1rem",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
        backdropFilter: "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        border: `1px solid ${theme.palette.background.font}`,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      }}
    >
      {billboards &&
        billboards.map((item) => (
          <Typography
            key={item.id}
            sx={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
              backdropFilter: "blur(10px)",
              "-webkit-backdrop-filter": "blur(10px)",
              border: `1px solid ${theme.palette.background.font}`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              padding: ".3rem",
              cursor: "pointer",
              fontWeight: "700",
              borderRadius: "3px",
              width: "auto",
              "&:hover": {
                backgroundColor: "lightgreen",
                color: theme.palette.text.primary,
              },
            }}
          >
            {item.label}
          </Typography>
        ))}
    </Box>
  );
};

export default CategoryLink;
