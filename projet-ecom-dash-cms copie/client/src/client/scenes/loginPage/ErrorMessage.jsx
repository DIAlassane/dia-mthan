import React from "react";
import PropTypes from "prop-types";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ErrorMessage({ message }) {
  return (
    <div
      style={{
        display: 'flex',
        color: "white",
        padding: ".5rem",
        width: "100%",
        backgroundColor: "red",
        height: "auto",
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: '5px',
        gridColumn: "span 4",
        padding: '.5rem 1.5rem',
      }}
    >
        <Box
        sx={{
            display: 'block',
            justifyContent: 'center',
            width: 'auto',
            height: 'auto',
        }}>
      <Typography 
      sx={{
        fontWeight: '600',
        fontSize: '.9rem',
        height: 'auto',
        marginTop: '.8rem'
      }}>{message}</Typography>
      </Box>

      <WarningAmberIcon 
      sx={{
        fontSize: '2.5rem',
        marginTop: '.5rem',
        height: 'auto',
      }} />
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
