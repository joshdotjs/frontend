// libs:
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div
      style={{ 
        height: '100vh',
        background: 'orange'
      }}
    >
      <Button variant="contained" onClick={() => setShowMap(prev => !prev)}>Click</Button>

      <AnimatePresence>
        { 
          show_map && 
          <motion.div 
            class="box"
            exit={{ opacity: 0, height: 0 }}
          >
            1
          </motion.div> 
        }
      </AnimatePresence>

      <motion.div 
        layout 
        class="box"
      >
        2
      </motion.div>
      
    </div>
  );
};