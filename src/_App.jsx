// libs:
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// comps:
import ErrorPage from './_Page-Error';
import UsersPage  from './_Page-Users';
import AboutPage  from './_Page-About';
import StorePage  from './_Page-Store';
import LandingPage  from './_Page-Landing';
import AdminOrdersPage from './_Page-_Admin-Orders';
import CheckoutSuccessPage from './_Page-Checkout-Success';
import AuthLoginPage from './_Page-_Auth-Login';

// context providers:
import CartContextProvider from './context/cart-context';
import AuthContextProvider from './context/auth-context';

// context:
import { AuthContext } from './context/auth-context';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Pages = () => {

  // ============================================

  const location = useLocation();

  // ============================================

  const { user } = useContext(AuthContext);

  let admin_routes = <></>;
  let user_routes = <></>;

  // ============================================

  if ( user?.is_admin ) {
    admin_routes = <>
      {/* TODO: DEV: */}
      {/* TODO: DEV: */}
      {/* TODO: DEV: */}
      {/* TODO: DEV: */}
      {/* <Route path="/"                 element={<AdminOrdersPage  />} /> */}

      <Route path="/admin/orders"     element={<AdminOrdersPage />} />
      <Route path="/admin/users"      element={<UsersPage />} />
    </>;
  } else {
    admin_routes = <>
      <Route path="/admin/orders"     element={<Navigate to="/" />} />
      <Route path="/admin/users"      element={<Navigate to="/" />} />
    </>;
  }

  // ============================================
  
  if ( !user?.logged_in ) {
    user_routes = <>
      <Route path="/auth/login"       element={<AuthLoginPage  />} />
    </>;
  } else {
    user_routes = <>
      <Route path="/auth/login"       element={<Navigate to="/" />} />
    </>;
  }
  
  // ============================================

  return (
    <AnimatePresence 
      // exitBeforeEnter
      mode="wait"
    >
      <Routes location={location} key={location.key}>
        { admin_routes }
        { user_routes } 
        <Route path="/about"            element={<AboutPage           />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/store"            element={<StorePage           />} />
        {/* <Route path="/"                 element={<LandingPage         init_map={false} />} /> */}
        <Route path="/map"              element={<LandingPage         init_map={true} />} />
        <Route path="/*"                element={<LandingPage         init_map={false}  />} />
        {/* <Route path="/*"                element={<ErrorPage />} /> */}
      </Routes>
    </AnimatePresence>
  );
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================


export default function App() {
  return (
    <SnackbarProvider maxSnack={3}  SnackbarProps={{ 'data-cy': 'notification' }}>
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Pages />
            </LocalizationProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}