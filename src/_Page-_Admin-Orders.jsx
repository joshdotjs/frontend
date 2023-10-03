import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';
// import level_up from './assets/level-up.gif';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AdminPage () {

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Box sx={{textAlign: 'center'}}>
          Admin Orders
        </Box>

      </Container>
    </Layout>
  );
};
