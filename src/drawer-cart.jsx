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
import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CartDrawer() {

  const navigate = useNavigate();
  const [ notify ] = useNotification();

  // ============================================

  const { 
    cart, open, 
    openCart, closeCart, emptyCart
  } = React.useContext(CartContext);

  // ============================================

  const checkout = async () => {

    closeCart();
    notify({message: 'sending cart to checkout...', variant: 'info', duration: 2000})();

    console.clear();
    console.log('sending to checkout...');
    console.log('cart: ', cart);

    const order = { 
      user_id: 1, 
      order_items: [
        { product_id: 1, quantity: 2 },
        { product_id: 2, quantity: 2 },
      ] // order_items
    };
    console.log('order: ', order);

    const URL = apiUrl('orders');
    const promise = http({ 
      url: URL, 
      method: 'POST', 
      body: order 
    });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({message: 'Error creating order...', variant: 'error', duration: 4000})();
      console.log('if(error) in checkout()');
      console.log(error);
      return;
    } else {
      notify({message: 'successfully created new order! 🙂', variant: 'success'})();
      console.log('data: ', data);

      // wait on cart to close before navigating to orders page:
      setTimeout(() => navigate('/orders'), 250);
    }


    // setTimeout(
    //   notify({message: 'checkout under construction...', variant: 'error', duration: 3000}), 
    //   1e3
    // );
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