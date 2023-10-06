import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';

// comps:
import Layout from './_layout';
import OrderProductsTable from './table-order-products';
import OrdersStatusDropdown from './dropdown-orders-status';
import OrdersTime from './time-orders';
import OrdersDate from './date-orders';

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


  // WAIT: If you initialize these with the dayjs format, then it is much easier to set the current date / time

  const [time_lo, setTimeLo] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [time_hi, setTimeHi] = useState({ hours: 23, minutes: 59, seconds: 59 });

  const [date_lo, setDateLo] = useState({ year: 2023, month: 0, day: 1 });
  const [date_hi, setDateHi] = useState({ year: 2023, month: 0, day: 1 });

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

        <OrdersDate />

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
