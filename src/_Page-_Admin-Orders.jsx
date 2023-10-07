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
import RealTimeCheckbox from './checkbox-orders-real-time';

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

let interval_id = null;

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

  const formatDate     = (date_time) => date_time.format('YYYY-MM-DD');
  const formatTime     = (date_time) => date_time.format('HH:mm:ssZ');
  const formatDateTime = (date, time) => `${formatDate(date)} ${formatTime(time)}`;
  
  const [time_lo, setTimeLo] = useState(dayjs().startOf('day'));  
  const [time_hi, setTimeHi] = useState(dayjs());
  const [date, setDate] = useState(dayjs());
  const [status, setStatus] = useState([1, 2, 3, 4]);
  const [polling, setPolling] = useState(true);

  // ============================================

  // -load page with all orders from today
  // -set up polling to update orders every 30 seconds
  useEffect(() => { 
    getFilteredOrders({ date, time_lo, time_hi, status }); 
  }, [date, time_lo, time_hi, status]);

  useEffect(() => { enablePolling(); }, []);

  // ============================================

  const enablePolling = () => {
    disablePolling(); // clear any existing polling

    interval_id = setInterval(() => {
      console.clear();
      console.log('polling for orders... ', dayjs().format('h:mm:ss A'));
      setTimeLo(dayjs().startOf('day'));  
      setTimeHi(dayjs());
      setDate(dayjs());
    }, 60e3);
    // console.log('enablePolling() -- interval_id:  ', interval_id);
  };

  // ============================================

  const disablePolling = () => {
    if (interval_id) {
      clearInterval(interval_id);
      // console.log('DISABLE -- disablePolling() -- interval_id:  ', interval_id);
      interval_id = null;
    }
  };

  // ============================================

  const getFilteredOrders = async ({ date, time_lo, time_hi, status }) => {

    const date_time_lo = formatDateTime(date, time_lo);
    const date_time_hi = formatDateTime(date, time_hi);

    const promise = http({ 
      url: apiUrl('orders/get-filtered'),
      method: 'POST',
      body: { date_time_lo, date_time_hi, status }
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
    getFilteredOrders({ date, time_lo, time_hi, status });
  };

  // ============================================

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Box sx={{textAlign: 'center'}}>
          Admin Orders
        </Box>

        <OrdersStatusSelect status={status} update={setStatus} />


        <RealTimeCheckbox checked={polling} setChecked={setPolling} { ...{ enablePolling, disablePolling } } />


        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <OrdersDate date={date} update={setDate} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <OrdersTime time={time_lo} update={setTimeLo} />
            <Typography sx={{ color: 'black' }}> to </Typography>
            <OrdersTime time={time_hi} update={setTimeHi} />
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
