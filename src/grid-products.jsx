import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Grid';
// import ProductCard from './card-product';
import ProductCard from './card-product';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ProductsGrid({ products, openModal }) {

  // ============================================

  return (

      
      <Grid container spacing={2} sx={{ mx: 'auto', width: 'fit-content', justifyContent: 'center', gap: '1rem', my: 4 }}>

        { products.map((product) => {
          return (
            <React.Fragment key={product.uuid}>
              <Grid>

                  <ProductCard { ...{ product, openModal } } />

              </Grid>
            </React.Fragment>
          );
        })}

      </Grid>

  );
}