// libs:
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// comps:
import ErrorPage from './_Page-Error';
import UsersPage  from './_Page-Users';
import AboutPage  from './_Page-About';
import StorePage  from './_Page-Store';
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

  const { logged_in, is_admin } = useContext(AuthContext);

  let admin_routes = <></>;
  let user_routes = <></>;

  // ============================================

  if ( is_admin ) {
    admin_routes = <>
      {/* <Route path="/admin/orders"     element={<AdminOrdersPage  />} /> */}
      <Route path="/"     element={<AdminOrdersPage  />} />
      <Route path="/users"            element={<UsersPage  />} />
    </>;
  } else {
    admin_routes = <>
      <Route path="/admin/orders"     element={<Navigate to="/" />} />
      <Route path="/users"            element={<Navigate to="/" />} />
    </>;
  }

  // ============================================
  
  if ( !logged_in ) {
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
    <Routes>
      {/* <Route path="/"                 element={<StorePage  />} /> */}
      <Route path="/store"                 element={<StorePage  />} />
      { user_routes }      
      { admin_routes }
      <Route path="/about"            element={<AboutPage  />} />
      <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
      <Route path="/*"                element={<ErrorPage />} />
    </Routes>
  );
};

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              
              <Pages />
              
            </LocalizationProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}