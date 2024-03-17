import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const CustomButton = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(true);
  const theme = useTheme();

  const handleMouseEnter = () => {
    setIsHovered(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(true);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered
          ? "12px 12px 2px 1px rgba(128, 128, 128, 0.2)"
          : "none",
        transition: "transform 0.3s ease-in-out",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        color: theme.palette.primary[100],
        backgroundColor: theme.palette.background.alt,
        border: `2px solid ${theme.palette.primary[100]}`,
        padding: "1rem",
        width: "98%",
        margin: "2%",
      }}
    >
      <div>
        <Typography
          sx={{
            fontWeight: "900",
            fontSize: "2rem",
            fontFamily: "cursive",
            "@media(max-width: 400px)": {
              fontWeight: "600",
              fontSize: "1rem",
            },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            "@media(max-width: 400px)": {
              fontWeight: "200",
              fontSize: ".6rem",
            },
          }}
        >
          {description}
        </Typography>
      </div>
    </Button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CustomButton;
