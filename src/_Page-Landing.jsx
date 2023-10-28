// libs:
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';

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

  const main_ref = useRef(null);

  useEffect(() => {
    const { current } = main_ref;
    gsap.to( current, {
      opacity: 1,
      delay: 0.5,
    });
  }, []);

  // ============================================
  
  return (
    // <motion.div 
    //   style={{ 
    //     height: '100vh', 
    //     background: 'black', 
    //     // opacity: 0,
    //   }}
    //   // initial={{ opacity: 0 }}
    //   // animate={{ opacity: 1 }}
    //   // transition={{ duration: 0.5, delay: 0.2 }}
    //   variants={container_variants}
    //   initial="hidden"
    //   animate="visible"
    //   // ref={main_ref}
    // >
    //   <CardMedia
    //     component="img"
    //     alt="background image"
    //     height="100%"
    //     image={ background_img }
    //     sx={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
    //   />


    //     {/* <CircularProgress color="inherit" /> */}

    //       {/* <motion.div */}
    //       <motion.div
    //         style={{
    //           marginTop: '10vh',
    //           width: 'fit-content',
    //           margin: '0 auto',
    //           marginBottom: '2rem',
    //         }}
    //         // initial={{
    //         //   opacity: 0,
    //         //   y: -300,
    //         // }}
    //         // animate={{
    //         //   opacity: 1,
    //         //   y: 0,
    //         // }}
    //         // transition={{ 
    //         //   delay: 0.35,
    //         //   type: "spring",
    //         //   bounce: 0.5,
    //         //   stiffness: 100,
    //         // }}
    //         variants={child_variants}
    //         initial="hidden"
    //         animate="visible"
    //       >

    //         <Typography 
    //           variant="h2" 
    //           sx={{ 
    //             color: 'white', 
    //             fontSize: '1.3rem',
    //           }}>
    //           Tulsa, Oklahoma
    //         </Typography>

    //         <Typography 
    //           variant="h1" 
    //           sx={{
    //             color: 'white',
    //             mb: 1,
    //           }}>
    //           Food Truck
    //         </Typography>

    //         <ButtonGroup 
    //           variant="contained" 
    //           aria-label="outlined primary button group" 
    //           sx={{ 
    //             display: 'flex',
    //             gap: 1,
    //             alignItems: 'center',
    //           }}
    //         >

    //           <Link to='/store'>
    //             <Button>
    //               Order Online
    //             </Button>
    //           </Link>

    //           <Button 
    //             // variant="outlined" 
    //             color='primary'
    //             sx={{ flexGrow: 1 }}
    //             onClick={() => setShowMap(prev => !prev)}
    //           >
    //             Map
    //           </Button>
    //         </ButtonGroup>

    //       </motion.div>

    //       {/* <motion.div 
    //         id="motion-box"
    //         initial={{
    //           opacity: 0,
    //           // y: -300,
    //         }}
    //         animate={{
    //           opacity: show_map ? 1 : 0,
    //           // x: -200,
    //           // y: 0,
    //           // rotation: rotate,
    //         }}
    //         transition={{
    //           // duration: 0.5,
    //           type: 'spring',
    //           // bounce: 0.5,
    //         }}
    //         style={{
    //           flexGrow: 1,
    //           width: '100%',
    //           maxWidth: '800px',
    //           maxHeight: '500px',
    //         }}
    //       >
    //         <Paper
    //           sx={{
    //             height: '100%',
    //           }}
    //         >
    //           <CardMedia
    //             component="iframe"
    //             // alt={product?.image_alt}
    //             // height="140"
    //             sx={{ 
    //               border: 0,
    //               height: '100%',
    //               borderRadius: '4px',
    //             }}
    //             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12886.374945019179!2d-96.00138906621952!3d36.15210398515654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6eb797eb36201%3A0x7a71b03ff10a53aa!2sDowntown%2C%20Tulsa%2C%20OK!5e0!3m2!1sen!2sus!4v1697320424728!5m2!1sen!2sus"
    //           />
    //         </Paper>
    //       </motion.div> */}


    // </motion.div>



    <motion.div
      style={{ 
        height: '100vh', 
        background: 'white', 
      }}
      variants={container_variants}
      initial="hidden"
      animate="visible"
    >
      <CardMedia
        component="img"
        alt="background image"
        height="100%"
        image={ background_img }
        sx={{ position: 'absolute', top: 0, left: 0, zIndex: -1, opacity: 0.1 }}
      />

      <div>
        <motion.p variants={child_variants}>One</motion.p>
        <motion.p variants={child_variants}>Two</motion.p>
        <motion.div variants={child_variants}>Three</motion.div>
      </div>
    </motion.div>
  );
};