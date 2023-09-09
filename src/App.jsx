import { useState } from 'react'
import './App.css'
import { Container, Typography, Paper, Box } from '@mui/material';
import level_up from './assets/level-up.gif'

// ==============================================

export default function App() {

  return (
    <Container sx={{ bgcolor: 'deepskyblue'}}>
     
      <Typography variant="h1"
        sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
      >
        Level Up
      </Typography>

      <Box>
        <img src={level_up} alt="level up" />
      </Box>

    </Container>
  )
}