// libs:
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { money } from './util/money';
import { Typography } from '@mui/material';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicTable({ line_items, order }) {
  return (
    <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Cost (price x qty)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {line_items.map((item) => (
              <TableRow
                key={`line-item-${item.order_id}-${item.product_id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.product_name}
                </TableCell>
                <TableCell align="right">${item.product_price / 100}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.product_price * item.quantity / 100}</TableCell>
              </TableRow>
            ))}

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <Typography
                  component={'span'}
                  sx={{
                    mr: 1
                  }}
                >
                  Total: 
                </Typography>
                <Typography
                  component={'span'}
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {money(order?.total)}
                </Typography>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
  );
}
