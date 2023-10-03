import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';
import AuthLoginForm from './form-auth-login';

import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AuthLoginPage () {

  // ============================================

  // const [orders, setOrders] = useState([]);

  const [notify] = useNotification();

  // ============================================

  const loginFn = async (user) => {
    notify({message: 'logging user in...', variant: 'info', duration: 1000})();
    const URL = apiUrl('auth/login');

    const promise = http({ url: URL, method: 'POST', body: { 
      email: user.email,
      password: user.password,
    } });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({message: 'Error logging user in...', variant: 'error', duration: 3000})();
      console.log('if(error) in loginFn()');
      console.log(error);
      return;
    } else {
      notify({message: 'successfully logged user in! 🙂', variant: 'success'})();
      console.log('data: ', data);

      // TODO: set auth context
      // TODO: set auth context
      // TODO: set auth context
      // TODO: set auth context
      // TODO: set auth context
      // TODO: set auth context
      // TODO: set auth context
      // TODO: set auth context
    }

  };

  // ============================================

  // useEffect(() => {
  //   getOrders();
  // }, []);

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h2"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          title="page-home-title"
          data-testid="page-home-title"
        >
          Log In:
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4}}>
          <AuthLoginForm { ...{ loginFn }} />
        </Paper>

      </Container>
    </Layout>
  );
};
