import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { CartContext } from './context/cart-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CartDrawer() {

  // ============================================

  const { 
    cart, open, 
    openCart, closeCart, emptyCart 
  } = React.useContext(CartContext);

  // ============================================

  return (
    <>
      <Drawer
        id="cart-drawer"
        anchor={'right'}
        open={open}
        onClose={() => closeCart()}
      >
        <div style={{ 
          minWidth: '150px', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          // background: 'red',
          height: '100%',
        }}>

          <div>
            { cart.map(({ product, qty }) => {
              return (
                <div key={product.uuid}>
                  {qty}
                  {' '}
                  {product.title}
                </div>
              );
            })}
          </div>


          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Button
              id="empty-cart-button"
              variant="outlined"
              color='info'
              onClick={() => emptyCart()}
              sx={{  mb: '1rem' }}
            >
              Empty Cart
            </Button>
            <Button
              id="close-cart-button"
              variant="contained"
              color='info'
              onClick={() => closeCart()
            }>
              Close Cart
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}