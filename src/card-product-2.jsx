// libs:
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// comps:
import Clamp from './text-clamp';

// context:
import { CartContext } from './context/cart-context';


// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ProductCard({ product, openModal }) {

  // ============================================

  const cart_ctx = React.useContext(CartContext);

  // ============================================

  return (
    <Card sx={{ maxWidth: 345 }} id={ `product-card-${product.id}` }>
      <CardMedia
        component="img"
        alt={product?.image_alt}
        height="140"
        // image="/static/images/cards/contemplative-reptile.jpg"
        image={ product?.image_url ?? '/food.jpg' }
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          { product.title }
        </Typography>

        <Clamp lines={3}>
          { product.description }
        </Clamp>

      </CardContent>
      <CardActions>
        <Button size="small" variant='outlined' color='info'
          onClick={() => {
          console.log('learnMore()');
          openModal(product.id);
        }}
        >Learn More</Button>
        <Button size="small" variant='contained' color='info' 
          onClick={() => {
          console.log('addToCart()');
          cart_ctx.addToCart(product);
        }}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}