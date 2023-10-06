// libs:
import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';
import dayjs from 'dayjs';

// comps:
import Layout from './_layout';
import OrderProductsTable from './table-order-products';
import OrdersStatusSelect from './select-orders-status';
import OrdersTime from './time-orders';
import OrdersDate from './date-orders';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// hooks:
import { useNotification } from './hooks/use-notification';

// context:
// import { AuthContext } from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AdminOrdersPage () {

  // ============================================

  const [orders, setOrders] = useState([]);
  const [ordersProducts, setOrdersProducts] = useState([]);

  const [notify] = useNotification();

  // Step 1: Iniitalize date/time's with dayJS format (allows for easy initalization)
  // Step 2: Update in time / date comps with dayJS format
  // Step 3: Send to server in SQL format

  const formatDate = (date_time) => date_time.format('YYYY-MM-DD');
  const formatTime = (date_time) => date_time.format('HH:mm:ssZ');
  
  const [time_lo, setTimeLo] = useState(dayjs().startOf('day'));  
  const [time_hi, setTimeHi] = useState(dayjs());
  const [date, setDate] = useState(dayjs());
  const [status, setStatus] = useState([1, 2]);

  // ============================================

  // function to filter orders by hitting API
  //  -we want to call this function every time the time or date changes
  //  -we want to avoid any unnecessary useEffect() calls
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  const updateOrders = (which) => async (new_date_time) => {
    console.clear();
    console.log('updateOrders() - which: ', which);

    // step 1: update state (only for time / date UI)
    if (which === 'time-lo') setTimeLo(new_date_time);
    if (which === 'time-hi') setTimeHi(new_date_time);
    if (which === 'date')    setDate(new_date_time);

    // step 2: generate the time ranges to be sent to backend
    let date_time_lo;
    let date_time_hi;
    if (which === 'time-lo') {
      date_time_lo = `${formatDate(date)} ${formatTime(new_date_time)}`;
      date_time_hi = `${formatDate(date)} ${formatTime(time_lo)}`;
    };
    if (which === 'time-hi') {
      date_time_lo = `${formatDate(date)} ${formatTime(time_lo)}`;
      date_time_hi = `${formatDate(date)} ${formatTime(new_date_time)}`;
    };
    if (which === 'date') {
      date_time_lo = `${formatDate(new_date_time)} ${formatTime(time_lo)}`;
      date_time_hi = `${formatDate(new_date_time)} ${formatTime(time_hi)}`;
    };
    if (which === 'init') {
      date_time_lo = `${formatDate(date)} ${formatTime(time_lo)}`;
      date_time_hi = `${formatDate(date)} ${formatTime(time_hi)}`;
    }

    // step 3: send to backend / update orders UI with filtered orders
    console.warn('ABOUT TO SEND DATA TO BACKEND!!!');
    console.log('date_time_lo: ', date_time_lo);
    console.log('date_time_hi: ', date_time_hi);
    await getFilteredOrders({ date_time_lo, date_time_hi });
  };

  // ============================================

  const getFilteredOrders = async ({ date_time_lo, date_time_hi }) => {
    const promise = http({ 
      url: apiUrl('orders/get-filtered'),
      method: 'POST',
      body: { date_time_lo, date_time_hi }
     });
    const [orders, error] = await asynch( promise );
    console.log('orders: ', orders);

    if (error) {
      console.error(error);
      notify({message: 'Error getting orders...', variant: 'error', duration: 2000})();
      return;
    }
    // console.log('orders: ', orders);
    setOrders(orders);
  };

  // ============================================

  // load page with all orders from today:
  useEffect(() => { updateOrders('init')(); }, []);

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Box sx={{textAlign: 'center'}}>
          Admin Orders
        </Box>

        <OrdersStatusSelect />

        <OrdersTime />

        <OrdersDate date={date} update={updateOrders('date')} />

        {
          orders.map(({order, line_items}) => {

            console.log(JSON.stringify(order));

            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>
                <Typography sx={{ color: 'black' }}>Order Number: {order?.uuid}</Typography>
                <Typography sx={{ color: 'black' }}>Total: ${order?.total / 100}</Typography>
                <Typography sx={{ color: 'black' }}>Status: {order?.status}</Typography>
                <Typography sx={{ color: 'black' }}>Time: TODO</Typography>
                <Typography sx={{ color: 'black' }}>Date: TODO</Typography>

                <OrderProductsTable { ...{ line_items, order } } />
              </Fragment>
            );
          })
        }

      </Container>
    </Layout>
  );
};
