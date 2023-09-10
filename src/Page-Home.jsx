import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

import { Container, Typography, Paper, Box } from '@mui/material';
import level_up from './assets/level-up.gif';
import UsersTable from './users-table';
import Navbar from './navbar';

import { apiUrl } from './util/url';
import { http } from './util/http';
import Notification from './notification';

export default function HomePage () {

  const [users, setUsers] = useState([]);

  // ============================================

  const getUsers = async () => {
    const URL = apiUrl('users');
    const data = await http({ url: URL });
    // console.log('data: ', data);
    setUsers(data);
  };

  // ============================================

  const deleteUser = async (id) => {
    // const resp = await fetch('https://postgresql-project-fd4ec6c9caab.herokuapp.com/api/users');
    const endpoint = `users/${id}`;
    const URL = apiUrl(endpoint);
    const data = await http({ url: URL, method: 'DELETE' });
    // console.log('data: ', data);
    getUsers();
  };

  // ============================================

  useEffect(() => {
    getUsers();
  }, []);

  // ============================================

  return (
    <>
      <Navbar />

      {/* <Notification /> */}

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
        >
          Users
        </Typography>

        <UsersTable { ...{users, deleteUser} }/>

      </Container>
    </>
  );
};

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
