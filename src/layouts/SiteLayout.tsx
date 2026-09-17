import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

/**
 * Remonte en haut de page a chaque changement de route.
 * (Equivaut au comportement natif d'un site multi-pages classique.)
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------
 * SiteLayout : coquille globale du site multi-pages.
 * La Navbar et le Footer sont montes une seule fois et enveloppent
 * chaque page via <Outlet /> (react-router-dom).
 * ------------------------------------------------------------------ */

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-600">
      {/* Lien d'evitement (accessibilite clavier) */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Aller au contenu
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="contenu">
        <Outlet />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
