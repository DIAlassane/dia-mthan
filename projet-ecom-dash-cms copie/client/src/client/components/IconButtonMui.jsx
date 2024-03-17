import React, { useRef, useState } from "react";
import { Button, Typography } from "@mui/material";

function IconButtonMui({ children, text, color, icon, iconSize, ...props }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <Button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variant="contained"
      className={`MuiButton-root MuiButton-contained ${color || "bg-gray-600"}`}
      style={{
        display: "flex",
        textAlign: "center",
        backgroundColor: color,
        position: "relative",
        transition: "background-color 0.3s ease-in-out, width 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: color || "bg-gray-700",
        },
      }}
      {...props}
    >
      {children}
      <div
        style={{
          width: hovered ? "100%" : "0",
          overflow: "hidden",
          transition: "width 0.3s ease-in-out",
        }}
      >
        <Typography
          ref={ref}
          variant="button"
          sx={{
            color: "white",
            display: "inline-block",
            textAlign: "center",
            fontSize: hovered ? (iconSize || "1.5rem") : 0,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease-in-out, font-size 0.3s ease-in-out",
          }}
        >
          {text}
        </Typography>
      </div>
      {icon && React.cloneElement(icon, { sx: { fontSize: "5rem" } })}
    </Button>
  );
}

export default IconButtonMui;
