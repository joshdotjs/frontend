import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import UsersTable from './table-users';
import Navbar from './navbar';

import { apiUrl } from './util/url';
import { http } from './util/http';

import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

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
    notify({message: `deleting user ${id}...`, variant: 'warning', duration: 2000})();
    const endpoint = `users/${id}`;
    const URL = apiUrl(endpoint);
    const data = await http({ url: URL, method: 'DELETE' });
    notify({message: `successfully deleted user ${id}! 🙂`, variant: 'success'})();
    console.log('data: ', data);
    getUsers();
  };

  // ============================================

  const editUser = async ({ id, updated_user }) => {
    notify({message: `updating user ${id}...`, variant: 'info'})();
    const endpoint = `users/${id}`;
    const URL = apiUrl(endpoint);
    const data = await http({ url: URL, method: 'PUT', body: { 
      id: +id,
      email: updated_user.email,
      password: updated_user.password,
      is_admin: updated_user.is_admin,
    } });
    notify({message: `successfully updated user ${id}! 🙂`, variant: 'success'})();
    console.log('data: ', data);
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
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
        >
          Users
        </Typography>

        <UsersTable { ...{users, editUser, deleteUser} }/>

      </Container>
    </>
  );
};