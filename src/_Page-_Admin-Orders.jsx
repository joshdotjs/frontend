import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

// comps:
import Layout from './_layout';
import OrderProductsTable from './table-order-products';
import OrdersStatusDropdown from './dropdown-orders-status';
import OrdersTime from './time-orders';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// hooks:
import { useNotification } from './hooks/use-notification';

// context:
import { AuthContext } from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AdminOrdersPage () {

  // ============================================

  const [orders, setOrders] = useState([]);
  const [ordersProducts, setOrdersProducts] = useState([]);

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
    const promise = http({ url: apiUrl('orders') });
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

        <OrdersStatusDropdown />

        <OrdersTime />

        {
          orders.map(({order, line_items}) => {
            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>
                <p>Order Number: {order?.uuid}</p>
                <p>Total: ${order?.total / 100}</p>
                <p>Status: {order?.status}</p>

                <OrderProductsTable { ...{ line_items, order } } />
              </Fragment>
            );
          })
        }

      </Container>
    </Layout>
  );
};
