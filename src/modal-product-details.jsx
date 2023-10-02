import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CartContext } from './context/cart-context';

// ==============================================

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function TransitionsModal({ open, setOpen, product }) {

  // ============================================

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ============================================

  const cart_ctx = React.useContext(CartContext);

  // ============================================

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ color: 'black'}}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {product?.title ?? 'Product Title'}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {product?.description ?? 'Product Description'}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              ${product?.price / 100 ?? 'Product Price'}
            </Typography>

            <Button size="small" variant='contained' color='info' 
              onClick={() => {
              console.log('addToCart()');
              cart_ctx.addToCart(product);
              handleClose();
            }}>Add to Cart</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}