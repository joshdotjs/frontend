// libs:
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CardMedia from '@mui/material/CardMedia';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

// imgs:
import background_img from './assets/pizza-wiki.jpeg';
import { Typography } from '@mui/material';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function LandingPage () {

  // ============================================

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

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
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
          paddingTop: 24,
        }}
        open={true}
        // onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}

          <Box
            sx={{
              // marginTop: '-25vh',
              marginTop: '10vh',
              width: 'fit-content',
              margin: '0 auto',
              mb: 4,
            }}
          >        
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

              <Link to='/store'>
                <Button>
                  Order Online
                </Button>
              </Link>

              <Button 
                // variant="outlined" 
                color='primary'
                sx={{ flexGrow: 1 }}
              >
                Map
              </Button>
            </ButtonGroup>
          </Box>

          {/* <motion.div 
            id="motion-box"
            initial={{
              opacity: 0,
              y: -300,
            }}
            animate={{
              opacity: 1,
              x: -200,
              y: 0,
              rotation: rotate,
            }}
            transition={{
              // duration: 0.5,
              type: 'spring',
              // bounce: 0.5,
            }}
          >
            motion div
          </motion.div> */}


          <Paper
            sx={{
              flexGrow: 1,
              width: '100%',
              maxWidth: '800px',
              maxHeight: '500px',
            }}
          >
            <CardMedia
              component="iframe"
              // alt={product?.image_alt}
              // height="140"
              sx={{ 
                border: 0,
                height: '100%',
                borderRadius: '4px',
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12886.374945019179!2d-96.00138906621952!3d36.15210398515654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6eb797eb36201%3A0x7a71b03ff10a53aa!2sDowntown%2C%20Tulsa%2C%20OK!5e0!3m2!1sen!2sus!4v1697320424728!5m2!1sen!2sus"
            />
          </Paper>


      </Backdrop>
    </div>
  );
};