import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------
 * Footer — pied de page sombre partage par toutes les pages.
 * - identite UUPT + baseline
 * - liens rapides (React Router)
 * - coordonnees (Thies, Senegal)
 * - copyright dynamique
 * ------------------------------------------------------------------ */

/** Colonnes de liens rapides. */
const QUICK_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/axes', label: 'Nos Axes' },
  { to: '/historique', label: 'Historique' },
  { to: '/partenaires', label: 'BDE Partenaires' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Identite */}
          <div className="lg:col-span-2">
            <div className="inline-flex rounded-xl bg-white p-2 shadow-md">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 font-display text-sm font-extrabold text-white">
                U
              </span>
            </div>
            <p className="mt-4 font-display text-lg font-bold text-white">
              Union des Universités Privées de Thiès
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
              Fédérer, innover et construire l'avenir : le mouvement estudiantin inter-établissements
              de Thiès, créé le 26 avril 2026, en synergie avec les Bureaux Des Étudiants (BDE).
            </p>
          </div>

          {/* Liens rapides */}
          <nav aria-label="Liens rapides du pied de page">
            <p className="eyebrow text-blue-400">Navigation</p>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 py-1 text-sm transition-colors duration-300 hover:text-blue-400"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coordonnees */}
          <div>
            <p className="eyebrow text-blue-400">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Thiès, Sénégal</li>
              <li>
                <a
                  href="mailto:contact@uupt.sn"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  contact@uupt.sn
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-600/10 px-4 py-2 text-xs font-semibold text-blue-300 transition-all duration-300 hover:bg-blue-600 hover:text-white"
                >
                  Rejoindre l'UUPT
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inferieure */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {year} UUPT — Union des Universités Privées de Thiès. Tous droits réservés.</p>
          <p className="text-slate-500">Mouvement estudiantin inter-établissements • Thiès, Sénégal</p>
        </div>
      </div>
    </footer>
  );
}
