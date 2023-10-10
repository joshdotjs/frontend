import {useState, useEffect } from 'react';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function OrdersTime() {
  
  // ============================================

  const [timer, setTimer] = useState();

  // ============================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(prev_timer => prev_timer + 1);
    }, 1e3);
    return () => clearTimeout(timeout);
  }, [timer]);

  // ============================================

  return (
    <h1>{Math.floor(timers[idx] / (60))}:{timers[idx] % 60}</h1>
  );
}