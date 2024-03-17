import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const NewsLetter = () => {
    
  return <Box sx={{
    display: 'block',
    width: '500px',
    marginTop: '30px',
  }}>
    <Box sx={{ justifyContent: 'center', textAlign: 'center', }}>
        <Typography sx={{ 
            fontSize: '1.5rem', 
            fontWeight: '900', 
            marginBottom: '1rem', 
            padding: '.5rem 0' 
            }}>
            NEWS-LETTERS
        </Typography>
    </Box>
    <form style={{
        display: 'block',
        width: '100%',
    }}>
        <TextField 
        label='Email'
        name="email"
        sx={{ gridColumn: "span 4", width: '100%', }}
        />
        <Button sx={{ 
            display: 'block', 
            width: '500px',
            margin: '1rem 0',
            padding: '.5rem 0',
            }}>
            Follow
        </Button>
    </form>
  </Box>
}

export default NewsLetter