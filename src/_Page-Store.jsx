import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

import Navbar from './navbar';
import ProductsGrid from './grid-products';

import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function HomePage () {

  const [products, setProducts] = useState([]);

  const [notify] = useNotification();

  // ============================================

  const getProducts = async () => {
    const URL = apiUrl('products');
    const promise = http({ url: URL });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting users...', variant: 'error', duration: 2000})();
      return;
    }
    console.log('data: ', data);
    setProducts(data);
  };

  // ============================================

  useEffect(() => {
    getProducts();
  }, []);

  // ============================================

  return (
    <>
      <Navbar />

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <ProductsGrid { ...{ products } } />

      </Container>
    </>
  );
};