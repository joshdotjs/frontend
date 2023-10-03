import { useState, useEffect, useContext } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

// comps:
import Layout from './_layout';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// hooks:
import { useNotification } from './hooks/use-notification';

// context:
import AuthContext from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AdminOrdersPage () {

  // ============================================

  const [orders, setOrders] = useState([]);

  const [notify] = useNotification();

  // ============================================

  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth
  // TODO: Send token in header for auth

  const getOrders = async () => {
    const URL = apiUrl('orders');
    const promise = http({ url: URL });
    const [orders, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting orders...', variant: 'error', duration: 2000})();
      return;
    }
    console.log('orders: ', orders);
    setOrders(orders);
  };

  // ============================================

  useEffect(() => {
    getOrders();
  }, []);

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Box sx={{textAlign: 'center'}}>
          Admin Orders
        </Box>

      </Container>
    </Layout>
  );
};
