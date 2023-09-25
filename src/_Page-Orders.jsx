import { Container, Typography, Paper, Box, Button  } from '@mui/material';

import Layout from './_layout';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function OrdersPage () {

  return (
    <Layout>
      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <Typography variant="h1"
          sx={{ pt: 4, mb: 4, textAlign: 'center', color: 'primary.main' }}
          >
          Orders Page
        </Typography>

        <Box sx={{textAlign: 'center'}}>
          Orders go here...
        </Box>

      </Container>
    </Layout>
  );
};
