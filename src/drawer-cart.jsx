import * as React from 'react';
import { styled  } from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

// comps:
import Clamp from './text-clamp';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { money } from './util/money';

// context:
import { CartContext } from './context/cart-context';

// hooks:
// import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';
import { Typography } from '@mui/material';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const margin = 0;
const padding = '1rem';
const img_size = '70px';

// ==============================================
// ==============================================

const Container = styled('div')(({ theme }) => ({
  minWidth: '150px', 
  paddingTop: '3rem',
  paddingBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  // background: 'red',
  height: '100%',
  // width: '400px'
}));

// ==============================================
// ==============================================

const LineItem = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  // backgroundColor: theme.palette.primary.main,
  // padding: theme.spacing(1),
  // borderRadius: theme.shape.borderRadius,
  borderBottom: 'solid #E5E7EB 1px',
  padding,
  display: 'grid',
  // gap: '1rem',
  columnGap: '1rem',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: `${img_size} 1fr 1fr`,
}));

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
    closeCart, emptyCart,
    addToCart, subtractFromCart,
    getTotal,
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

  return (
    <>
      <Drawer
        id="cart-drawer"
        data-testid="cart-drawer"
        anchor={'right'}
        open={open}
        onClose={() => closeCart()}
      >
        <Container
          sx={{
            position: 'relative',
            width: {
              xs: '90vw',
              sm: '400px',
            },
          }}
        >

          {/* =============================== */}

          <CloseIcon 
            sx={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => closeCart()}
          />

          {/* =============================== */}

          {/* Line Items */}
          <div>
            { cart.map(({ product, qty }) => {
              return (
                <LineItem key={product.uuid}>
                  <CardMedia
                    component="img"
                    alt={product?.image_alt}
                    // height="140"
                    // width="140"
                    // image="/static/images/cards/contemplative-reptile.jpg"
                    image={ product?.image_url ?? '/food.jpg' }
                    sx={{ 
                      gridColumn: '1 / 2', 
                      gridRow: '1 / 3', 
                      border: 'solid #E5E7EB 1px', 
                      borderRadius: '4px', 
                      height: img_size, 
                      width: img_size
                    }}
                  />

                  <Typography 
                    variant="h6"
                    color="text.primary" 
                    sx={{ 
                      fontWeight: 'bold',
                      background: 'limegreen',
                    }}
                  >
                    { product.title }
                  </Typography>

                  <Clamp 
                    lines={1}
                    variant='h5'
                    color="text.primary"
                    sx={{ 
                      background: 'deepskyblue',
                      textAlign: 'right'
                    }}
                  >
                    { money(product.price )}
                  </Clamp>
                  
                  <Clamp 
                    lines={2}
                    variant='body1'
                    color="text.secondary"
                    sx={{ 
                      background: 'darkorange',
                      
                    }}
                  >
                    { product.description }
                  </Clamp>
                
                  <Box
                    sx={{ 
                      background: 'deeppink',
                      textAlign: 'right'
                    }}
                  >
                    <ButtonGroup 
                      variant="text" 
                      aria-label="text button group" 
                      color='black' 
                      sx={{ 
                        background: 'deeppink',
                      }}>
                      <Button>
                        { qty === 1 && <DeleteOutlineIcon onClick={() => subtractFromCart(product)} /> }
                        { qty > 1 && <RemoveIcon onClick={() => subtractFromCart(product)} /> }
                      </Button>
                      <Button>{qty}</Button>
                      <Button><AddOutlinedIcon onClick={() => addToCart(product)} /></Button>
                    </ButtonGroup>
                  </Box>

                  <ButtonGroup />
                </LineItem>
              );
            })}
          </div>

          {/* =============================== */}

          {/* Cart Total / Checkout Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              width: '100%',
              p: 2 // padding: '1rem',
            }}
          >

            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              { money(getTotal()) }
            </Typography> */}
            
            {/* <Button
              id="empty-cart-button"
              // variant="outlined"
              color='info'
              sx={{  mb: '1rem' }}
              onClick={() => emptyCart()}
            >
              Empty Cart
            </Button> */}

            {/* <Button
              id="close-cart-button"
              data-testid="close-cart-button"
              variant="outlined"
              color='info'
              sx={{  mb: '1rem' }}
              onClick={() => closeCart()
            }>
              Close
            </Button> */}

            <Button
              id="checkout-cart-button"
              variant="contained"
              color='info'
              onClick={() => checkout()}
              sx={{
                // width: '500px'
                display: 'flex',
                justifyContent: 'space-between',
              }}
              fullWidth
            >
              <Typography>Checkout</Typography>  
              <Typography>{ money(getTotal()) }</Typography>
            </Button>

          </Box>
             
          {/* =============================== */}
              
        </Container>
      </Drawer>
    </>
  );
}