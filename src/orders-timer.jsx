import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const timeDiff = (time) => {
  // const created_at = dayjs(order.order.created_at);
  const then = dayjs(time);
  // console.log('created_at: ', created_at.format());
  
  const now = dayjs();
  // console.log('now: ', now.format());

  const seconds = now.diff(then, 'second');
  // console.log('seconds: ', seconds);
  return seconds;
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function OrderTimer({ created_at }) {

  // ============================================

  const [timer, setTimer] = useState( timeDiff(created_at) );

  // ============================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(prev_timer => prev_timer + 1);
    }, 1e3);
    return () => clearTimeout(timeout);
  }, [timer]);

  // ============================================

  return (
    <h1>{Math.floor(timer / (60))}:{timer % 60}</h1>
  );
}