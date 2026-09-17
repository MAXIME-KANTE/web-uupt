import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import App from './App';
import './index.css';

/* Remonte en haut de page a chaque changement de route. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Element racine #root introuvable dans index.html');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
