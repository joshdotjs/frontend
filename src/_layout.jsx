import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './navbar';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function Layout({ children }) {
  return (
    <>
      <CssBaseline />

      <Navbar />

      { children }
    </>
  );
};