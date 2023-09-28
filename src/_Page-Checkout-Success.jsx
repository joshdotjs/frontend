import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
// import { sortDataById } from './util/sort';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CheckoutSuccessPage () {

  // ============================================

  const [searchParams] = useSearchParams();
  // console.log(searchParams); // ▶ URLSearchParams {}

  // ============================================

  const [order, setOrder] = useState({});
  const [line_items, setLineItems] = useState([]);

  // ============================================

  useEffect(() => {
    const uuid = searchParams.get('order_uuid');
    // console.log('order_uuid: ', order_uuid);
    getOrder(uuid);
  }, []);

  // ============================================

  const getOrder = async (uuid) => {
    console.log('getting order...');

    const endpoint = `orders/${uuid}`;
    const URL = apiUrl(endpoint);
    const promise = http({ url: URL });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting order by UUID...', variant: 'error', duration: 3000})();
      return;
    }

    console.log('data: ', data);
    setLineItems(data?.line_items);
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
          <ul>
            { line_items.map((item, index) => {
              return <li key={`line-item-${item.order_id}-${item.product_id}`}>
                <Typography variant="h4" sx={{ color: 'primary.main' }}>
                  { item.product_name }
                </Typography>
                <Typography variant="h5" sx={{ color: 'primary.main' }}>
                  { item.quantity } x ${ item.product_price }
                </Typography>
              </li>
            }) }
          </ul>
        </Box>

      </Container>
    </Layout>
  );
};
