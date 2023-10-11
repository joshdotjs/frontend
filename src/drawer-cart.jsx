import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled  } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// context:
import { CartContext } from './context/cart-context';

// hooks:
// import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CartDrawer() {

  // const navigate = useNavigate();
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
    // console.log('sending to checkout...');
    // console.log('cart: ', cart);

    const order_items = cart.map(({ product, qty }) => {
      return { product_id: product.id, quantity: qty };
    });

    const order = { 
      user_id: 1, 
      // order_items: [
      //   { product_id: 1, quantity: 2 },
      //   { product_id: 2, quantity: 2 },
      // ] // order_items
      order_items,
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
    }

    
    console.log('data: ', data);
    if (!data?.url) {
      const message = 'Error sending to stripe - update Stripe API key!';
      notify({message, variant: 'error', duration: 4000})();
      console.log(error);
      console.log(message);
      return;
    }

    notify({message: 'created order in PENDING state 🙂', variant: 'info', duration: 2000})();
    notify({message: 'sending to checkout...', variant: 'warning', duration: 4000 });

    // wait on cart to close before navigating to orders page:
    // setTimeout(() => navigate('/orders'), 250);
    
    setTimeout(() => {
      // redirect to Stripe checkout:
      window.location.href = data.url;
    }, 1e3);
  };

  // ============================================

  const LineItem = styled('div')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    // padding: theme.spacing(1),
    // borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
  }));

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
          paddingTop: '2rem',
          paddingBottom: '2rem',
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
                <LineItem key={product.uuid}>
                  <CardMedia
                    component="img"
                    alt={product?.image_alt}
                    height="140"
                    // image="/static/images/cards/contemplative-reptile.jpg"
                    image={ product?.image_url ?? '/food.jpg' }
                  />

                  <p>{product.title}</p>
                  <span>QTY: {qty}</span>
                </LineItem>
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