// libs:
import { useState, useEffect, useContext, Fragment } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

// comps:
import OrderProductsTable from './table-order-products';

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

export default function OrderCard ({ order, line_items, updateStatus }) {

  // ============================================

  return (
    <>
      <OrderProductsTable { ...{ line_items, order } } />
    </>
  );
};
