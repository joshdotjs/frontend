import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// context:
import { CartContext } from './context/cart-context';

// hooks:
import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CartDrawer() {

  const [notify] = useNotification();

  // ============================================

  const { 
    cart, open, 
    openCart, closeCart, emptyCart
  } = React.useContext(CartContext);

  // ============================================

  const checkout = () => {
    notify({message: 'sending cart to checkout...', variant: 'info', duration: 2000})();

    console.clear();
    console.log('sending to checkout...');
    console.log('cart: ', cart);

    const to_send = {
      user_id: 1,
      order_items: cart,
    };
    console.log('to_send: ', to_send);

    setTimeout(
      notify({message: 'checkout under construction...', variant: 'error', duration: 3000}), 
      1e3
    );
  };

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
              // variant="outlined"
              color='info'
              sx={{  mb: '1rem' }}
              onClick={() => emptyCart()}
            >
              Empty Cart
            </Button>

            <Button
              id="close-cart-button"
              variant="outlined"
              color='info'
              sx={{  mb: '1rem' }}
              onClick={() => closeCart()
            }>
              Close Cart
            </Button>

            <Button
              id="checkout-cart-button"
              variant="contained"
              color='info'
              onClick={() => checkout()
            }>
              Checkout
            </Button>

          </div>
        </div>
      </Drawer>
    </>
  );
}