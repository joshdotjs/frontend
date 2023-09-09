import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

import './App.css';
import { Container, Typography, Paper, Box } from '@mui/material';
import level_up from './assets/level-up.gif';
import UsersTable from './Basic-Table2';

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function() { 
      const resp = await fetch('https://postgresql-project-fd4ec6c9caab.herokuapp.com/api/users');
      const data = await resp.json();
      console.log('data: ', data);
      setUsers(data);
    })();
  }, []);

  return (
    <>
      <Header />

      <Container sx={{ bgcolor: 'deepskyblue'}}>
        
        <Link to="/">About</Link>

        <Typography variant="h1"
          sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Level Up
        </Typography>

        <UsersTable { ...{users} }/>

      </Container>
    </>
  );
};

// ==============================================

const AboutPage = () => {

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
        
        <Link to="/">Home</Link>

        <Typography variant="h1"
          sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Level Up
        </Typography>

        <Box>
          <img src={level_up} alt="level up" />
        </Box>

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