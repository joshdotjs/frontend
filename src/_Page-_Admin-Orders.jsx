// libs:
import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';
import dayjs from 'dayjs';

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

  const [notify] = useNotification();

  // Step 1: Iniitalize here with dayJS format (allows for easy initalization)
  // Step 2: Update in time / date comps with dayJS format
  // Step 3: Send to server in format desired for the util function
  // NOTE: Cleaner way would be to use dayJS to format() before sending to server
  //       into desired form by SQL (since this will be standard form
  //    -That will allow us to remove the backend util time/date formating function entirely!)

  // const date = dayjs();
  // // console.log('dayjs(): ', date);
  // console.log('dayjs().format(): ', date.format());
  // console.log('dayjs().subtract(1, "hour").format(): ', date.subtract(1, 'hour').format());

  const formatDate = (date_time) => date_time.format('YYYY-MM-DD');
  const formatTime = (date_time) => date_time.format('HH:mm:ssZ');
  
  const [time_lo, setTimeLo] = useState(dayjs().startOf('day'));
  // useEffect(() => {
  //   // console.log("time_lo.format(): ", time_lo.format());
  //   console.log("time_lo.format('HH:mm:ssZ'): ", formatTime(time_lo));  // 19:39:27-05:00
  // }, [time_lo]);
   
  const [time_hi, setTimeHi] = useState(dayjs());
  // useEffect(() => {
  //   // console.log("time_hi.format(): ", time_hi.format());
  //   console.log("time_hi.format('HH:mm:ssZ'): ", formatTime(time_hi));  // 19:39:27-05:00
  // }, [time_hi]);

  const [date, setDate] = useState(dayjs());
  // useEffect(() => {
  //   // console.log("date.format(): ", date.format());
  //   console.log("date.format('YYYY-MM-DD'): ", formatDate(date));  // 2023-10-04
  // }, [date]);  

  


  // function to filter orders by hitting API
  //  -we want to call this function every time that the time or date changes
  //  -we want to avoid any unnecessary useEffect() calls
  //  -KISS: first evaluate which time is later and use that as the ending time.
  const updateOrders = (which) => (new_date_time) => {
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


    // step 3: send to backend
    console.warn('ABOUT TO SEND DATA TO BACKEND!!!');
    console.log('date_time_lo: ', date_time_lo);
    console.log('date_time_hi: ', date_time_hi);

    // step 4: update orders UI
  };

  // NOTE: We want to initalize these to today and time from midnight last night to right nows time (so all orders for today)
  //       -And initialize to open orders

  // 2023-10-04 19:39:27.707315-05
  //  -> ISO 8601 date-time format with timezone offset and fractional seconds
  //  -> https://www.postgresql.org/docs/current/datatype-datetime.html


  // const [time_lo, setTimeLo] = useState({ hour: 0, minute: 0, second: 0 });
  // const [time_hi, setTimeHi] = useState({ hour: 23, minute: 59, second: 59 });

  // const [date, setDate] = useState({ year: 2023, month: 0, day: 1 });

  // useEffect(() => { console.log('time_lo: ', time_lo); }, [time_lo]);
  // useEffect(() => { console.log('time_hi: ', time_hi); }, [time_hi]);
  // useEffect(() => { console.log('date_lo: ', date_lo); }, [date_lo]);
  // useEffect(() => { console.log('date_hi: ', date_hi); }, [date_hi]);

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
    // console.log('orders: ', orders);
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

        <OrdersDate date={date} update={updateOrders('date')} />

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
