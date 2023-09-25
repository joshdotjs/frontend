import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function OrdersPage () {

  const [orders, setOrders] = useState([]);

  // ============================================

  useEffect(() => {
    getOrders();

    // TODO: Change this to get Oders by User-ID
    // TODO: Add authorization to ensure only logged-in users can see their own orders

  });

  // ============================================

  const getOrders = async () => {
    console.log('getting orders...');
  };

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Order History
        </Typography>

        <Box sx={{textAlign: 'center'}}>
          Orders go here...
        </Box>

      </Container>
    </Layout>
  );
};
