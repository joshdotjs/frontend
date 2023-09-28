import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CheckoutSuccessPage () {

  // ============================================

  const [searchParams] = useSearchParams();
  // console.log(searchParams); // ▶ URLSearchParams {}

  // ============================================

  const [orders, setOrders] = useState([]);

  // ============================================

  useEffect(() => {

    const order_uuid = searchParams.get('order_uuid');
    console.log('order_uuid: ', order_uuid);

    getOrder();

    // TODO: Change this to get Oders by User-ID
    // TODO: Add authorization to ensure only logged-in users can see their own orders

  }, []);

  // ============================================

  const getOrder = async () => {
    console.log('getting order...');
  };

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          id="page-title"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Checkout Success!
        </Typography>

        <Box sx={{textAlign: 'center'}}>
          Order details go here...
        </Box>

      </Container>
    </Layout>
  );
};
