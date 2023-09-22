import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import HomePage from './_Page-Home';
import AboutPage from './_Page-About';
import StorePage from './_Page-Store';

// ==============================================
// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/"      element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}