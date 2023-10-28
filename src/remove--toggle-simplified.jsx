// import "./remove.css";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ==============================================
// ==============================================

const box = {
  background: 'red',
  display: 'grid',
  placeItems: 'center',
  height: '100px',
  width: '100px',
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function SmoothShow({ top, bottom }) {

  const [show, setShow] = useState(true);

  return (
    <div
      style={{ 
        // background: 'green',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AnimatePresence mode="popLayout">
          {
            show && <motion.li
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              key='item-1'
              style={box}
            /> // show
          }

          <motion.li
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            key='item-0'
            onClick={() => {
              setShow(prev => !prev);
            }}
            style={box}
          >
            CLICK
          </motion.li>

      </AnimatePresence>
    </div>
  );
}
