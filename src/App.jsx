import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

import { Container, Typography, Paper, Box } from '@mui/material';
import level_up from './assets/level-up.gif';
import UsersTable from './users-table';
import Navbar from './navbar';
import { SnackbarProvider } from 'notistack';

import { apiUrl } from './util/url';
import { http } from './util/http';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

import HomePage from './Page-Home';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const AboutPage = () => {

  return (
    <>
      <Navbar />

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Level Up
        </Typography>

        <Box sx={{textAlign: 'center'}}>
          <img src={level_up} alt="level up" style={{ maxWidth: '100%', height: 'auto'}} />
        </Box>

      </Container>
    </>
  );
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}