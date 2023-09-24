import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

import Navbar from './navbar';
import Navbar2 from './navbar-2';
import ProductsGrid from './grid-products';
import CartDrawer from './drawer-cart';

import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Navbar2 />

      { children }
    </>
  );
};

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
    <Layout>

      <Container sx={{ border: 'solid white 1px', borderTop: 'none', minHeight: '94vh'}}>
        
        <CartDrawer />

        <ProductsGrid { ...{ products } } />

      </Container>
    </Layout>
  );
};