import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";

const JoinUs = () => {
  const theme = useTheme();
  const styleBox = {
    width: "35px",
    height: "35px",
    color: theme.palette.background.font,
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "50%",
        marginLeft: "25%",
        justifyContent: "space-between",
      }}
    >
      <Twitter sx={styleBox} />
      <Instagram sx={styleBox} />
      <Facebook sx={styleBox} />
      <LinkedIn sx={styleBox} />
    </Box>
  );
};

export default JoinUs;
