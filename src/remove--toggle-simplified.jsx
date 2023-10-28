// import "./remove.css";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ==============================================
// ==============================================

const box = {
  border: 'solid red 10px',
  display: 'grid',
  placeItems: 'center',
  height: 'fit-content',
  width: '100px',
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function SmoothShow({ always_visible, hidden }) {

  const [show, setShow] = useState(false);

  return (
    <div
      style={{ 
        // background: 'green',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring" }}
          key='item-0'
          onClick={() => {
            setShow(prev => !prev);
          }}
          style={{
            // border: 'solid green 5px',
          }}
        >
          { always_visible }
        </motion.div>

        {
          show && <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            key='item-1'
            
          >
            { hidden }
          </motion.div>
        }

      </AnimatePresence>
    </div>
  );
}
