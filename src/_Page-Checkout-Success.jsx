import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';
import OrderProductsTable from './table-order-products';

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
    setLineItems(data?.line_items ?? []);
    setOrder(data?.order ?? {});
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


        {/* <p>{JSON.stringify(order)}</p> */}
        {/* <p>ID: {order?.id}</p> */}
        <p>Order Number: {order?.uuid}</p>
        <p>Total: ${order?.total / 100}</p>
        <p>Status: {order?.status}</p>
        {/* <p>User ID: {order?.user_id}</p> */}

        <OrderProductsTable { ...{ line_items, order } } />

      </Container>
    </Layout>
  );
};
