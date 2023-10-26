// libs:
import { useState, useEffect, Fragment } from 'react';
import { Container, Typography, Box  } from '@mui/material';
import Divider from '@mui/material/Divider';

import dayjs from 'dayjs';

// comps:
import Layout from './_layout';
import OrdersStatusSelect from './select-orders-status';
import OrdersTime from './time-orders';
import OrdersDate from './date-orders';
import RealTimeCheckbox from './checkbox-orders-real-time';
import OrderAccordion from './accordion-order';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { sortDataById } from './util/sort';

// hooks:
import { useNotification } from './hooks/use-notification';

// context:
// import { AuthContext } from './context/auth-context';

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
  // -set up polling to update orders every N-seconds
  useEffect(() => { 
    getFilteredOrders({ date, time_lo, time_hi, status }); 
  }, [date, time_lo, time_hi, status]);

  useEffect(() => { enablePolling(); }, []);

  // ============================================

  const enablePolling = () => {
    disablePolling(); // clear any existing polling

    const resetDateTimeToNow = () => {
      setTimeLo(dayjs().startOf('day'));  
      setTimeHi(dayjs());
      setDate(dayjs());
    };
    resetDateTimeToNow();

    interval_id = setInterval(() => {
      // console.clear();
      console.log('polling for orders... ', dayjs().format('h:mm:ss A'));
      resetDateTimeToNow();
    }, 30e3);
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

    const body = { date_time_lo, date_time_hi, status };
    console.log('getFilteredOrders()  --  body: ', body);

    const promise = http({ 
      url: apiUrl('orders/get-filtered'),
      method: 'POST',
      body,
     });
    const [orders, error] = await asynch( promise );
    // console.log('orders: ', orders);
    if (error) {
      console.error(error);
      notify({message: 'Error getting orders...', variant: 'error', duration: 2000})();
      return;
    }

    // const sorted_orders = sortDataById(orders);

    // console.log('orders: ', orders);
    setOrders(orders);
  };

  // ============================================

  const updateStatus = async ({ id, status_int }) => {
    const promise = http({ 
      url: apiUrl('orders/update-status'),
      method: 'POST',
      body: { id, status: status_int }
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
      <Container 
        data-cy="admin-orders"
        sx={{ border: 'solid white 1px', borderTop: 'none', p: 4 }}
      >
        
        <OrdersStatusSelect status={status} update={setStatus} />

        <RealTimeCheckbox 
          dataCY="admin-orders-real-time-checkbox"
          checked={polling} 
          setChecked={setPolling} 
          { ...{ enablePolling, disablePolling } } 
        />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1rem',
            mb: '2rem',
          }}>
          <OrdersDate 
            dataCY="admin-orders-calendar"
            date={date} 
            update={setDate} 
            disabled={polling}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <OrdersTime 
              dataCY="admin-orders-time-lo"
              time={time_lo} 
              update={setTimeLo} 
              disabled={polling}
            />

            <Typography sx={{ color: 'black' }}> to </Typography>

            <OrdersTime 
              dataCY="admin-orders-time-hi"
              time={time_hi} 
              update={setTimeHi} 
              disabled={polling}
            />
          </Box>
        </Box>

        {
          orders.map(({order, line_items}, idx) => {

            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>
                <OrderAccordion { ...{ order, line_items, updateStatus } }  />
                <Divider />
              </Fragment>
            );
          })
        }

      </Container>
    </Layout>
  );
};
