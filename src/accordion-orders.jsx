import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicAccordion({ orders }) {

  // ============================================

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* =================================== */}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* =================================== */}

      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>

      {
          orders.map(({order, line_items}, idx) => {

            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>

                {/* <OrderTimer created_at={order.created_at} /> */}
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

              </Fragment>
            );
          })
        }

        {/* =================================== */}
    </div>
  );
}