import { Box, useMediaQuery } from "@mui/material";
import Footer from "client/components/Footer";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Layout = ({ currentUser }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const applyFilters = (input) => {
    setSearchInput(input);
  };

  useEffect(() => {
    // Vous pouvez ajouter d'autres filtres ici si nécessaire
    // Mis à jour pour passer la fonction de filtrage à ProductItem
    applyFilters();
  }, []);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isLoggedIn={currentUser}
      />
      <Box flexGrow={1}>
        <Navbar
          value={searchInput}
          changeInput={(e) => applyFilters(e.target.value)}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
