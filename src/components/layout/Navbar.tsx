import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { BrandLogo } from '@/components/ui/BrandLogo';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
 * Navbar (Layout global multi-pages)
 * - barre fixe, fond semi-transparent flouté (backdrop-blur)
 * - logo officiel dans un encadré blanc arrondi (à gauche)
 * - liens React Router (NavLink) avec indicateur actif bleu
 * - bouton pillule bleu vif « Rejoindre l'UUPT » vers /contact
 * - menu mobile animé (AnimatePresence) + verrouillage du scroll
 * ------------------------------------------------------------------ */

/** Navigation principale — routes React Router (multi-pages). */
const NAV_ITEMS = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/axes', label: 'Nos Axes' },
  { to: '/historique', label: 'Historique' },
  { to: '/partenaires', label: 'BDE Partenaires' },
] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Fond plus opaque après un léger défilement.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Verrouille le défilement quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Ferme le menu mobile à chaque changement de page ou via Échap.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isScrolled
          ? 'border-b border-white/10 bg-slate-950/80 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md'
          : 'bg-slate-950/40 backdrop-blur-md',
      )}
    >
      <div className="container-page flex items-center justify-between gap-4 py-3">
        {/* Logo UUPT (badge blanc arrondi) — retour accueil */}
        <Link
          to="/"
          aria-label="UUPT — retour à l'accueil"
          className="rounded-xl transition-transform duration-300 hover:scale-[1.03]"
        >
          <BrandLogo />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative py-1 text-sm font-medium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {/* Indicateur actif : barre bleue sous le lien */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-blue-500 transition-all duration-300',
                      isActive ? 'w-full' : 'w-0',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA principal — bleu vif, pillule */}
          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 sm:inline-flex"
          >
            Rejoindre l'UUPT
          </Link>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>


      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="container-page pb-4 lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.25 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                          isActive
                            ? 'bg-blue-600/15 text-blue-300'
                            : 'text-slate-200 hover:bg-white/5',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-3 border-t border-white/10 p-2 pt-4">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors duration-300 hover:bg-blue-700"
                >
                  Rejoindre l'UUPT
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
