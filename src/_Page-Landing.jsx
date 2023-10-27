// libs:
import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// imgs:
import background_img from './assets/pizza-wiki.jpeg';
import { Typography } from '@mui/material';

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
        image={ background_img }
      />

      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
        open={true}
        // onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}

        <Box>        
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontSize: '1.3rem',
            }}>
            Tulsa, Oklahoma
          </Typography>

          <Typography 
            variant="h1" 
            sx={{
              color: 'white',
              mb: 1,
            }}>
            Food Truck
          </Typography>

          <ButtonGroup 
            variant="contained" 
            aria-label="outlined primary button group" 
            sx={{ 
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button>Order Online</Button>
            <Button 
              // variant="outlined" 
              color='primary'
              sx={{ flexGrow: 1 }}
            >
              Map
            </Button>
          </ButtonGroup>
        </Box>

      </Backdrop>
    </div>
  );
};