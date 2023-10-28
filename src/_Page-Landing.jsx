// libs:
import { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Backdrop from '@mui/material/Backdrop';
// import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Remove from './remove--toggle-simplified';

// comps:
import Layout from './_layout';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

// imgs:
import background_img from './assets/pizza-wiki.jpeg';

// ==============================================
// ==============================================

const container_variants = {
  hidden: { // initial
    opacity: 0, 
    x: '100vw',
    transition: {
      staggerChildren: 0.5,
    } 
  },
  visible: { // animate
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      mass: 0.4,
      damping: 8,
      staggerChildren: 0.4,
      when: "beforeChildren",
      delay: 0.5,
    }
  },
};

const child_variants = {
  hidden: { // initial
    opacity: 0,
  },
  visible: { // animate
    opacity: 1,
  }
}


// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function LandingPage () {

  // ============================================

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  const [show_map, setShowMap] = useState(false);

  // ============================================
  
  return (
    <Layout>
      <motion.div
        layout
        style={{ 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
        }}
        variants={container_variants}
        initial="hidden"
        animate="visible"
      >
        {/* ============================================= */}

        <CardMedia
          component="img"
          alt="background image"
          height="100%"
          image={ background_img }
          sx={{ position: 'absolute', top: 0, left: 0, zIndex: -1, opacity: 1 }}
        />

        {/* ============================================= */}

        <div // backdrop
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'black',
            opacity: 0.5,
          }}
        />
        
        {/* ============================================= */}

        <motion.div // title / sub-title / buttons
          layout
          style={{ 
            color: 'white',
            marginTop: '-20vh',
            width: 'fit-content',
            marginBottom: '2rem',
          }}
        >
          <motion.div variants={child_variants}>
            <Typography 
              variant="h2" 
              sx={{ fontSize: '1.3rem' }}>
                Tulsa, Oklahoma
            </Typography>
          </motion.div>
          
          <motion.div variants={child_variants}>
            <Typography 
              variant="h1" 
              sx={{ mb: 1 }}
            >
              Food Truck
            </Typography>
          </motion.div>

          <motion.div variants={child_variants}>

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
                onClick={() => setShowMap(prev => !prev)}
              >
                Map
              </Button>
            </ButtonGroup>
          </motion.div>
        </motion.div>

        {/* ============================================= */}

        <AnimatePresence>
          {
            show_map && <motion.div // map
              layout
              initial={{
                opacity: 0,
                // y: 300,
                height: 0,
              }}
              animate={{
                opacity: show_map ? 1 : 0,
              }}
              transition={{
                duration: 2,
                type: 'spring',
                // bounce: 0.5,
                // y: 0,
                height: 'auto',
              }}
              style={{
                flexGrow: 1,
                width: '100%',
                maxWidth: '800px',
                maxHeight: '500px',
                marginBottom: '2rem',
              }}
              exit={{
                opacity: 0,
                height: 0,
                // y: 300,
              }}
            >
              <Paper
                sx={{
                  height: '100%',
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
            </motion.div>
          }

          {/* ========================================= */}

          <Remove />
        </AnimatePresence>

        {/* ============================================= */}

        
        
      </motion.div>
    </Layout>
  );
};