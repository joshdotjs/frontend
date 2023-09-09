import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

import './App.css';
import { Container, Typography, Paper, Box } from '@mui/material';
import level_up from './assets/level-up.gif'

// ==============================================

const Header = () => {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </header>
  );
};

// ==============================================

const HomePage = () => {

  const [] = useState();

  useEffect(() => {
    (async function() { 
      const resp = await fetch('https://postgresql-project-fd4ec6c9caab.herokuapp.com/api/users');
      const data = await resp.json();
      console.log('data: ', data);
    })();
  }, []);

  return (
    <>
      <Header />

      <Container sx={{ bgcolor: 'deepskyblue'}}>
        
        <Typography variant="h1"
          sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Level Up
        </Typography>

        <Link to="/">About</Link>

        <Box>
          <img src={level_up} alt="level up" />
        </Box>

      </Container>
    </>
  );
};

// ==============================================

const AboutPage = () => {
  return (
    <>
      <Header />

      <Container sx={{ bgcolor: 'deepskyblue'}}>
        
        <Typography variant="h1"
          sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
          >
          About Page
        </Typography>

      </Container>
    </>
  );
};

// ==============================================

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}