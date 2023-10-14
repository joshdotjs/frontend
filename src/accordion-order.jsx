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
import OrderCard from './card-order';
import AccurateOrderTimer from './orders-timer-accurate';

// utils:
import { int2status, statusInt2Color } from './util/status';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicAccordion({ order, line_items, updateStatus }) {
  
  // ============================================
  
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >


        {/* <Typography>Accordion 1</Typography> */}
        <Chip label={int2status(order?.status)} color={statusInt2Color(order?.status)} />

        <Typography sx={{ color: 'black' }}>Order Number: {order?.uuid}</Typography>
        <Typography sx={{ color: 'black' }}>Total: ${order?.total / 100}</Typography>
        <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography>


        <AccurateOrderTimer created_at={order.created_at} />

    
        <Box>
          <Typography variant='span' sx={{ color: 'black', mr: '1rem', fontWeight: '700' }}>{dayjs(order.created_at).format('h:mm A')}</Typography>
          <Typography variant='span' sx={{ color: 'black' }}>({dayjs(order.created_at).format('ss[s.]')})</Typography>
        </Box>

      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>

        <OrderCard { ...{ order, line_items, updateStatus } } />

      </AccordionDetails>
    </Accordion>
  );
}