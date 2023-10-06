// libs:
import { useState, useEffect, useContext, Fragment } from 'react';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
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
import { int2status } from './util/status';

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
  const updateDateTime = (which) => async (new_date_time) => {
    console.clear();
    console.log('updateDateTime() - which: ', which);

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
    } else if (which === 'time-hi') {
      date_time_lo = `${formatDate(date)} ${formatTime(time_lo)}`;
      date_time_hi = `${formatDate(date)} ${formatTime(new_date_time)}`;
    } else if (which === 'date') {
      date_time_lo = `${formatDate(new_date_time)} ${formatTime(time_lo)}`;
      date_time_hi = `${formatDate(new_date_time)} ${formatTime(time_hi)}`;
    } else {
      date_time_lo = `${formatDate(date)} ${formatTime(time_lo)}`;
      date_time_hi = `${formatDate(date)} ${formatTime(time_hi)}`;
    }

    // step 3: send to backend / update orders UI with filtered orders
    console.warn('ABOUT TO SEND DATA TO BACKEND!!!');
    console.log('date_time_lo: ', date_time_lo);
    console.log('date_time_hi: ', date_time_hi);
    await getFilteredOrders({ date_time_lo, date_time_hi, status });
  };

  // ============================================

  // const updateStatus = async (new_status) => {
  //   console.clear();
    
  //    // step 1: update status (only for statys sekect UI)
  //   setStatus([...status]);

  //   // step 2: generate the time ranges to be sent to backend
  //   const date_time_lo = `${formatDate(date)} ${formatTime(time_lo)}`;
  //   const date_time_hi = `${formatDate(date)} ${formatTime(time_hi)}`;

  //   // step 3: send to backend / update orders UI with filtered orders
  //   console.warn('ABOUT TO SEND DATA TO BACKEND!!!');
  //   await getFilteredOrders({ date_time_lo, date_time_hi, status: new_status });
  // };

  // ============================================

  const getFilteredOrders = async ({ date_time_lo, date_time_hi, status }) => {

    const promise = http({ 
      url: apiUrl('orders/get-filtered'),
      method: 'POST',
      body: { date_time_lo, date_time_hi, status }
      // body: { date_time_lo, date_time_hi }
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
  useEffect(() => { updateDateTime('init')(); }, []);

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Box sx={{textAlign: 'center'}}>
          Admin Orders
        </Box>

        <OrdersStatusSelect />


        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <OrdersDate date={date} update={updateDateTime('date')} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <OrdersTime time={time_lo} update={updateDateTime('time-lo')} />
            <Typography sx={{ color: 'black' }}> to </Typography>
            <OrdersTime time={time_hi} update={updateDateTime('time-hi')} />
          </Box>
        </Box>

        <Stack spacing={1} alignItems="center">
          <Stack direction="row" spacing={1}>
            <Chip label="primary" color="primary" />
            <Chip label="success" color="success" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label="primary" color="primary" variant="outlined" />
            <Chip label="success" color="success" variant="outlined" />
          </Stack>
        </Stack>


        

        {
          orders.map(({order, line_items}) => {

            console.log(JSON.stringify(order));

            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>
                

                  <Box>

                    <Typography sx={{ color: 'black' }}>Status: </Typography>
                    <Chip label={int2status(order?.status)} color="primary" />
                  </Box>
                
                <Typography sx={{ color: 'black' }}>Order Number: {order?.uuid}</Typography>
                <Typography sx={{ color: 'black' }}>Total: ${order?.total / 100}</Typography>
                <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography>
                <Box>
                  <Typography variant='span' sx={{ color: 'black', mr: '1rem', fontWeight: '700' }}>{dayjs(order.created_at).format('h:mm A')}</Typography>
                  <Typography variant='span' sx={{ color: 'black' }}>({dayjs(order.created_at).format('ss[s.]')})</Typography>
                </Box>

                <OrderProductsTable { ...{ line_items, order } } />
              </Fragment>
            );
          })
        }

      </Container>
    </Layout>
  );
};
