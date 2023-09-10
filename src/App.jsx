import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

import { Container, Typography, Paper, Box } from '@mui/material';
import level_up from './assets/level-up.gif';
import UsersTable from './users-table';
import Navbar from './navbar';


// ==============================================

const HomePage = () => {

  const [users, setUsers] = useState([]);

  

  const apiUrl = (str) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const endpoint = `${API_URL}/api/${str}`;
    console.log('endpoint: ', endpoint, '\ttypeof endpoint: ', typeof endpoint);
    return endpoint;
  };

  useEffect(() => {
    (async function() { 
      // const resp = await fetch('https://postgresql-project-fd4ec6c9caab.herokuapp.com/api/users');
      const resp = await fetch(apiUrl('users'));
      const data = await resp.json();
      console.log('data: ', data);
      setUsers(data);
    })();
  }, []);

  return (
    <>
      <Navbar />

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
        >
          Users
        </Typography>

        <UsersTable { ...{users} }/>

      </Container>
    </>
  );
};

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