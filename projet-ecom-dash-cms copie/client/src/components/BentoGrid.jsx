import { Grid, Paper, Typography } from "@mui/material";
import UserTable from "client/widget/UserTable";
import { useState } from "react";
import Employee from "widget/Employee";
import CommentSlider from "./CommentSlider";

const GlassmorphismPaper = ({ children }) => {
  const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 });

  const handleMouseMove = (e) => {
    setOffset({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "auto",
        borderRadius: "12px",
        background: `rgba(255, 255, 255, 0.15)`,
        boxShadow: `20px 20px 50px rgba(0, 0, 0, 0.5), -20px -20px 50px rgba(255, 255, 255, 0.15), inset 20px 20px 50px rgba(0, 0, 0, 0.2), inset -20px -20px 50px rgba(255, 255, 255, 0.1)`,
        backdropFilter: `blur(20px)`,
        position: "relative",
        overflow: "hidden",
        transition: "0.3s ease-in-out",
        transform: `perspective(1000px) rotateX(${
          offset.offsetY / 10
        }deg) rotateY(${-offset.offsetX / 10}deg) translateZ(30px)`,
      }}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Paper>
  );
};

const BentoGrid = () => {
  return (
    <Grid container spacing={2}>
      {/* Case 1 : Hauteur plus grande */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, minHeight: "291.4px" }}>
          <Typography variant="h6" marginBottom=".5rem">
            Employés :
          </Typography>
          <Employee />
        </Paper>
      </Grid>

      {/* Case 2 : Hauteur moyenne */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: "auto" }}>
          <Typography variant="h6" marginBottom=".5rem">
            Commentaires :
          </Typography>
          <CommentSlider />
        </Paper>
      </Grid>

      {/* Cases suivantes avec hauteur par défaut */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, height: "auto" }}>
          <Typography variant="h6" marginBottom=".5rem">
            Utilisateurs :
          </Typography>
          <UserTable />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BentoGrid;
