import { Box, Button } from "@mui/material";
import BentoGrid from "components/BentoGrid";
import Header from "components/Header";
import Cookies from "js-cookie";

function Dashboard() {
  return (
    <Box sx={{ padding: "2rem" }}>
      <Header title="Dashboard" subtitle="Gérer votre boutique" />
      <Button onClick={() => Cookies.remove("jwt")}>Click</Button>
      <BentoGrid />
    </Box>
  );
}

export default Dashboard;
