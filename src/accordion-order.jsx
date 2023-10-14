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

const display = {
  xs: 'none',
  md: 'flex',
};

const gridTemplateColumns = {
  xs: '1fr 1fr 1fr',
  md: '1fr 1fr 1fr 1fr',
};

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
        <Box
          sx={{
            display: 'grid',
            flexGrow: 1,
            gridTemplateColumns,
            justifyContent: 'space-between',
            alignItems: 'center',
            // outline: 'solid red 2px',
            pr: 4
          }}
        >  

            <Chip 
              label={int2status(order?.status)}
              color={statusInt2Color(order?.status)}
              sx={{
                mr: '1rem',
              }}
            />

            <Box
              sx={{
                display: 'flex'
              }}
            >
              <Typography 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'black',
                  mr: '8px',
                  display,
                }}
              >
                Order:
              </Typography>

              <Typography 
                sx={{ 
                  color: 'black',
                  // mr: '1rem',
                }}
              >
                { truncateFront({ str: order?.uuid, len: 4 })}
              </Typography>
            </Box>

            <Typography 
              variant='span' 
              sx={{ 
                color: 'black', 
                mr: '1rem',
                display
              }}
            >
              { dayjs(order.created_at).format('h:mm:ss a') }
            </Typography>
            {/* <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography> */}

            <AccurateOrderTimer created_at={order.created_at} />


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