// libs:
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';

// ==============================================
// ==============================================

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Tax', desc: '', price: 'TODO' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

function Review() {
  return (
    <>

      <List
        disablePadding
        sx={{
          mb: '0.5rem',
        }}
      >
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>



      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Pickup
          </Typography>

          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
          
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}

      <Divider
        sx={{
          mb: '1rem',
        }}
      />


      <Box
        sx={{
          // background: 'red',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: '1rem'
          }}
        >
          Pickup
        </Typography>

        {/* <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9389.833731604926!2d-95.84684155313019!3d36.12365154657924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6f3250f2af139%3A0xa66db3dab1663301!2sTacos%20Los%20Arellano!5e0!3m2!1sen!2sus!4v1697312837747!5m2!1sen!2sus"
          // width="600" 
          // height="450" 
          style={{ 
            border: 0,
            width: '100%',
            height: '350px',
            borderRadius: '4px',
          }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe> */}

        <CardMedia
          component="iframe"
          // alt={product?.image_alt}
          // height="140"
          sx={{ 
            border: 0,
            width: '100%',
            height: '350px',
            borderRadius: '4px',
          }}
          // image={ product?.image_url ?? '/food.jpg' }
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9389.833731604926!2d-95.84684155313019!3d36.12365154657924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6f3250f2af139%3A0xa66db3dab1663301!2sTacos%20Los%20Arellano!5e0!3m2!1sen!2sus!4v1697312837747!5m2!1sen!2sus"
        />

      </Box>

    </>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const steps = ['Preparing', 'Ready', 'Picked Up'];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CheckoutSuccess() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Order Summary
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Review />

      </Paper>
    </Container>
  );
}
