// libs:
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Container, Typography, Paper, Box, Button  } from '@mui/material';
import dayjs from 'dayjs';

// comps:
import OrderCard from './card-order';

// utils:
// import { http } from './util/http';
// import { apiUrl } from './util/url';
// import { asynch } from './util/async';
import { int2status, statusInt2Color } from './util/status';

// hooks:
// import { useNotification } from './hooks/use-notification';

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

        <Box>
          <Chip label={int2status(order?.status)} color={statusInt2Color(order?.status)} />
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