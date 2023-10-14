// libs:
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import { Container, Paper, Box, Button  } from '@mui/material';
import dayjs from 'dayjs';

// comps:
import OrderProductsTable from './table-order-products';
import AccurateOrderTimer from './orders-timer-accurate';

// utils:
import { int2status, statusInt2Color } from './util/status';
import { truncateFront } from './util/string';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicAccordion({ order, line_items, updateStatus }) {
  
  // ============================================
  
  return (
    <Accordion>

      {/* =================================== */}

      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {/* <Typography>Accordion 1</Typography> */}
        <Chip label={int2status(order?.status)} color={statusInt2Color(order?.status)} />

        <Typography sx={{ color: 'black' }}>Order: { truncateFront({ str: order?.uuid, len: 4 })}</Typography>
        {/* <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography> */}

        <AccurateOrderTimer created_at={order.created_at} />

        <Box>
          <Typography variant='span' sx={{ color: 'black', mr: '1rem', fontWeight: '700' }}>{dayjs(order.created_at).format('h:mm:ss a')}</Typography>
        </Box>
      </AccordionSummary>

      {/* =================================== */}

      <AccordionDetails>
        <OrderProductsTable { ...{ line_items, order } } />
      </AccordionDetails>

      {/* =================================== */}

    </Accordion>
  );
}