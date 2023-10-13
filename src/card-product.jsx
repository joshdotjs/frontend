// libs:
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// comps:
import Clamp from './text-clamp';

// context:
import { CartContext } from './context/cart-context';


// ==============================================
// ==============================================

const img_size = '160px';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ProductCard({ product, openModal }) {

  // ============================================

  const cart_ctx = React.useContext(CartContext);

  // ============================================

  return (
    <Card sx={{ display: 'flex', width: '500px' }} id={ `product-card-${product.id}` }>

      <Box>
        <CardContent sx={{ textAlign: 'left' }}>
          
          <Typography gutterBottom variant="h5" component="div">
            { product.title }
          </Typography>

          <Clamp lines={2}>
            { product.description }
          </Clamp>

        </CardContent>

        <CardActions>
          <Button size="small" variant='outlined' color='info'
            onClick={() => {
            console.log('learnMore()');
            openModal(product.id);
          }}
          >Details</Button>
          <Button size="small" variant='contained' color='info' 
            onClick={() => {
            console.log('addToCart()');
            cart_ctx.addToCart(product);
          }}>Add</Button>
        </CardActions>
      </Box>

      <CardMedia
        component="img"
        alt={product?.image_alt}
        // height="140"
        sx={{ 
          width: img_size, 
          height: img_size, 
        }}
        image={ product?.image_url ?? '/food.jpg' }
      />

    </Card>
  );
}