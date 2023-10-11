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
import OrderTimer from './orders-timer';
import AccurateOrderTimer from './orders-timer-accurate';

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

export default function OrderCard ({ order, line_items, updateStatus }) {

  // ============================================

  return (
    <>
      <AccurateOrderTimer created_at={order.created_at} />

      <Box>
        <Typography sx={{ color: 'black' }}>Status: </Typography>
        <Chip label={int2status(order?.status)} color={statusInt2Color(order?.status)} />
      </Box>
      
      <Typography sx={{ color: 'black' }}>Order Number: {order?.uuid}</Typography>
      <Typography sx={{ color: 'black' }}>Total: ${order?.total / 100}</Typography>
      <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography>

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" color="warning" onClick={() => updateStatus({ id: order.id, status_int: 2 })}>Preparing</Button>
        <Button variant="outlined" color="info"    onClick={() => updateStatus({ id: order.id, status_int: 3 })}>Ready</Button>
        <Button variant="outlined" color="success" onClick={() => updateStatus({ id: order.id, status_int: 4 })}>Done</Button>
      </Stack>

      <Box>
        <Typography variant='span' sx={{ color: 'black', mr: '1rem', fontWeight: '700' }}>{dayjs(order.created_at).format('h:mm A')}</Typography>
        <Typography variant='span' sx={{ color: 'black' }}>({dayjs(order.created_at).format('ss[s.]')})</Typography>
      </Box>

      <OrderProductsTable { ...{ line_items, order } } />
    </>
  );
};
