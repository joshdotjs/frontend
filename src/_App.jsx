import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import UsersPage  from './_Page-Users';
import AboutPage  from './_Page-About';
import StorePage  from './_Page-Store';
import AdminOrdersPage from './_Page-_Admin-Orders';
import CheckoutSuccessPage from './_Page-Checkout-Success';
import AuthLoginPage from './_Page-_Auth-Login';

import CartContextProvider from './context/cart-context';
import AuthContextProvider from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>
              <Routes>
                <Route path="/"                 element={<StorePage  />} />
                <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
                <Route path="/about"            element={<AboutPage  />} />
                <Route path="/users"            element={<UsersPage  />} />
                <Route path="/auth/login"       element={<AuthLoginPage  />} />

                {/* TODO: Protected Route */}
                <Route path="/admin/orders"     element={<AdminOrdersPage  />} />
              </Routes>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}