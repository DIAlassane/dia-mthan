import { Box, useMediaQuery, useTheme } from "@mui/material";

import ProfilView from "client/widget/ProfilView";

const ProfilPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.default}
        width={isNonMobileScreens ? "90%" : "93%"}
      >
        <ProfilView />
      </Box>
    </Box>
  );
};

export default ProfilPage;
