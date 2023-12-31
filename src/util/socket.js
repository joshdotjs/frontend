import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:9000';
// export const socket = io(URL);
export const socket = io( import.meta.env.VITE_API_URL );