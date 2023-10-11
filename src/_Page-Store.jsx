import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

import Layout from './_layout';
import ProductsGrid from './grid-products';
import ProductDetailsModal from './modal-product-details';

import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

import { useNotification } from './hooks/use-notification';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function StorePage () {

  // ============================================

  const [products, setProducts] = useState([]);

  const [notify] = useNotification();

  // ============================================

  const [product, setProduct] = useState({
    uuid: '',
    title: '',
    description: '',
    category: '',
    status: '',
    published: false,
    price: 0,
    units_in_stock: 0,
    image_url: '',
    image_alt: '',
    details_route: '',
  });

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = (id) => {

    const product = products.find(product => product.id === id);
    console.log('product: ', product);

    setProduct(product);
    setOpen(true);
  }

  // ============================================

  const getProducts = async () => {
    const URL = apiUrl('products');
    const promise = http({ url: URL });
    const [products, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting users...', variant: 'error', duration: 2000})();
      return;
    }
    console.log('products: ', products);
    setProducts(products);
  };

  // ============================================

  useEffect(() => {
    getProducts();
  }, []);

  // ============================================
  

  return (
    <Layout>

      <Container sx={{ border: 'solid white 1px', borderTop: 'none' }}> 
        <ProductsGrid { ...{ products, openModal } } />
      </Container>

      <ProductDetailsModal {... { open, setOpen, product } } />
    </Layout>
  );
};