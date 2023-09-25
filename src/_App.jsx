import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import UsersPage  from './_Page-Users';
import OrdersPage from './_Page-Orders';
import AboutPage  from './_Page-About';
import StorePage  from './_Page-Store';

import CartContextProvider from './context/cart-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"       element={<StorePage  />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/about"  element={<AboutPage  />} />
            <Route path="/users"  element={<UsersPage  />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </SnackbarProvider>
  );
}