import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import HomePage from './_Page-Home';
import AboutPage from './_Page-About';

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
            <Route path="/"      element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}