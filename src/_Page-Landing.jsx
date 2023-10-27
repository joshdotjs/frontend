// libs:
import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import level_up from './assets/pizza-wiki.jpeg';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function LandingPage () {

  // ============================================

  // ============================================
  
  return (
    <div>
      <CardMedia
        component="img"
        // alt={product?.image_alt}
        // height="140"
        // sx={{ 
        //   width: img_size, 
        //   height: img_size, 
        // }}
        image={ level_up }
      />
    </div>
  );
};