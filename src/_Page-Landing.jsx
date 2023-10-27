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
    <div style={{ height: '100vh' }}>
      <CardMedia
        component="img"
        alt="background image"
        height="100%"
        // sx={{ 
        //   width: img_size, 
        //   height: img_size, 
        // }}
        image={ level_up }
      />
    </div>
  );
};