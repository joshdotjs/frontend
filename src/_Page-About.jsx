import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';
import level_up from './assets/level-up.gif';

// import Album from './temp/album/Album';
// import SignInSide from './temp/sign-in-side/SignInSide';
// import Dashboard from './temp/dashboard/Dashboard';
// import Checkout from './temp/checkout/Checkout';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AboutPage () {

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Level Up
        </Typography>

        <Box sx={{textAlign: 'center'}}>
          <img src={level_up} alt="level up" style={{ maxWidth: '100%', height: 'auto'}} />
        </Box>

      </Container>


      {/* <Album /> */}
      {/* <SignInSide /> */}
      {/* <Dashboard /> */}
      {/* <Checkout /> */}
    </Layout>
  );
};
