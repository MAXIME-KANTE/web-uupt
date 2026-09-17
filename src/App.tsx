import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { About } from '@/components/sections/About';
import { Axes } from '@/components/sections/Axes';
import { History } from '@/components/sections/History';
import { Partners } from '@/components/sections/Partners';
import { StatsBar } from '@/components/sections/StatsBar';
import { Accueil } from '@/pages/Accueil';
import { APropos } from '@/pages/APropos';
import { AxesPage } from '@/pages/Axes';
import { ContactPage } from '@/pages/Contact';
import { Historique } from '@/pages/Historique';
import { Partenaires } from '@/pages/Partenaires';

/* ------------------------------------------------------------------
 * App — routeur officiel du site UUPT (architecture multi-pages).
 * Layout global (Navbar + Footer) partage + transitions de pages
 * animees via AnimatePresence (fondu a chaque changement de route).
 * ------------------------------------------------------------------ */

/** Replace le scroll en haut de page a chaque navigation. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

/** Contenu route : layout partage + transition de fondu entre pages. */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <main>
      <Routes location={location}>
        <Route path="/" element={<Accueil />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/axes" element={<AxesPage />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/partenaires" element={<Partenaires />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Accueil />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white font-sans text-slate-600">
        <Navbar />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

/* Reexporte les sections pour d'eventuels usages internes aux pages. */
export { About, Axes, History, Partners, StatsBar };
