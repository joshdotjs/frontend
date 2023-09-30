import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ line_items }) {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Cost (price x qty)</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
  );
}