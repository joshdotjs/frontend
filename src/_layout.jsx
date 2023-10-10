import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './navbar';
import StickyFooter from './footer-sticky';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />

      <Navbar />

      <main>
        { children }
      </main>

      <StickyFooter />
    </Box>
  );
};