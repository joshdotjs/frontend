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
import { int2status, statusInt2Color } from './util/status';

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
  const [status, setStatus] = useState([0, 1, 2, 3, 4]);

  // ============================================

  // -load page with all orders from today
  // -set up polling to update orders every 30 seconds
  useEffect(() => { 
    updateAndFilter({ which: 'init' }); 

    setInterval(() => {
      // every 30 seconds update the time-hi to the current time
      updateAndFilter({ which: 'time-hi', new_date_time: dayjs() });
    }, 15e3);
  }, []);

  // ============================================


  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // BUG:
  // -It appears as when the updateAndFIlter() function is run it is using the old state values
  // -TODO: Try to just use the classical useEffect() pattern.
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect
  // -Just make sure to only use one level of useEffect




  // function to filter orders by hitting API
  //  -we want to call this function every time the time or date changes
  //  -we want to avoid any unnecessary useEffect() calls
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  //  (TODO) -K.I.S.S.: first evaluate which time is later and use that as the ending time.
  const updateAndFilter = async ({ which=null, new_date_time=null, new_status=null}) => {

    console.clear();
    console.log('updateAndFilter() - which: ', which);

    // step 1: generate the time ranges to be sent to backend
    let date_time_lo;
    let date_time_hi;
    if (which === 'time-lo') {
      date_time_lo = `${formatDate(date)} ${formatTime(new_date_time)}`;
      date_time_hi = `${formatDate(date)} ${formatTime(time_hi)}`;
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

    // step 2: send to backend / update orders UI with filtered orders
    console.warn('ABOUT TO SEND DATA TO BACKEND!!!');
    console.log('date_time_lo: ', date_time_lo);
    console.log('date_time_hi: ', date_time_hi);
    console.log('status: ', status);
    await getFilteredOrders({ 
      date_time_lo, 
      date_time_hi, 
      status: new_status ?? [...status], // if we are updating status then use the new status array, otherwise use the old status array
    });

    // step 3: update state (only for time / date UI)
    if (which === 'time-lo') setTimeLo(new_date_time);
    if (which === 'time-hi') setTimeHi(new_date_time);
    if (which === 'date')    setDate(new_date_time);
    if (which === 'status')  setStatus([...new_status]);
  };
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

  const updateStatus = async ({ id, status }) => {
    const promise = http({ 
      url: apiUrl('orders/update-status'),
      method: 'POST',
      body: { id, status }
     });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting orders...', variant: 'error', duration: 2000})();
      return;
    }

    updateAndFilter()({});
  };

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Box sx={{textAlign: 'center'}}>
          Admin Orders
        </Box>

        <OrdersStatusSelect status={status} update={updateAndFilter} />


        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <OrdersDate date={date} update={updateAndFilter} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <OrdersTime time={time_lo} update={updateAndFilter} which='time-lo' />
            <Typography sx={{ color: 'black' }}> to </Typography>
            <OrdersTime time={time_hi} update={updateAndFilter} which='time-hi' />
          </Box>
        </Box>

        {
          orders.map(({order, line_items}) => {

            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>
                
                <Box>
                  <Typography sx={{ color: 'black' }}>Status: </Typography>
                  <Chip label={int2status(order?.status)} color={statusInt2Color(order?.status)} />
                </Box>
                
                <Typography sx={{ color: 'black' }}>Order Number: {order?.uuid}</Typography>
                <Typography sx={{ color: 'black' }}>Total: ${order?.total / 100}</Typography>
                <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography>

                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" color="warning" onClick={() => updateStatus({ id: order.id, status: 2 })}>Preparing</Button>
                  <Button variant="outlined" color="info"    onClick={() => updateStatus({ id: order.id, status: 3 })}>Ready</Button>
                  <Button variant="outlined" color="success" onClick={() => updateStatus({ id: order.id, status: 4 })}>Done</Button>
                </Stack>

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
