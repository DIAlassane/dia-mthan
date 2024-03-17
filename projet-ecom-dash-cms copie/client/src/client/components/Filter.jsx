import React from 'react';
import { Box,Typography } from '@mui/material';
import SliderPrice from './SliderPrice';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// ...
const Filter = ({
    selectedPrice,
    changePrice,
  }) => {
    return (
      <Box>
        <Box
        sx={{
            width: '100%',
        }}>
          <Typography
          sx={{
            margin: '1rem',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            fontWeight: '900',
          }}>Price <AttachMoneyIcon /></Typography>
          <SliderPrice 
          value={selectedPrice} 
          changePrice={changePrice} 
          sx={{
            width: '100%',
        }}/>
        </Box>
      </Box>
    );
  };
  // ...
  export default Filter