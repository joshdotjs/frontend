import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

import { Container, Typography, Paper, Box, Button } from '@mui/material';
import UsersTable from './users-table';
import Navbar from './navbar';

import { apiUrl } from './util/url';
import { http } from './util/http';

import { useSnackbar } from 'notistack';
import { useNotification } from './hooks/use-notification';

export default function HomePage () {

  const [users, setUsers] = useState([]);

  const [notify] = useNotification();

  // ============================================

  const getUsers = async () => {
    const URL = apiUrl('users');
    const data = await http({ url: URL });
    // console.log('data: ', data);
    setUsers(data);
  };

  // ============================================

  const deleteUser = async (id) => {
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

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Button onClick={notify({message: 'success message!', variant: 'success'})}>Show success snackbar</Button>

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