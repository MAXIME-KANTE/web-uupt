import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import BrandLogo from './BrandLogo'
import { CONTACT_EMAIL } from '../constants'

/**
 * Icônes de réseaux sociaux en SVG inline (les marques ont été retirées de
 * lucide-react) — tracés officiels simplifiés, style plein cohérent entre eux.
 */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.3-1.4 1.5-1.4h1.4V5.3c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9V11H7.9v2.8h2.4V21h3.2Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M6.9 8.6H4V20h2.9V8.6ZM5.4 7.3c1 0 1.7-.7 1.7-1.7C7.1 4.7 6.4 4 5.4 4S3.7 4.7 3.7 5.6c0 1 .7 1.7 1.7 1.7ZM10 20h2.9v-6c0-1.6.8-2.6 2.1-2.6 1.2 0 1.9.8 1.9 2.6v6H20v-6.6c0-2.9-1.6-4.3-3.8-4.3-1.5 0-2.6.8-3.3 1.9V8.6H10V20Z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M16.8 2.5c.5 2.4 2 3.9 4.4 4.2v3c-1.7 0-3.2-.5-4.4-1.4v6.4c0 4.4-3.3 7-6.9 7A6.4 6.4 0 0 1 3.5 15.6c0-3.9 3.2-6.6 7.2-6.2v3.1c-2.1-.5-4.1.9-4.1 3 0 1.9 1.5 3.3 3.3 3.3 2 0 3.5-1.5 3.5-3.7V2.5h3.4Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M12 4.4c2.5 0 2.8 0 3.8.1 2.5.1 3.7 1.3 3.8 3.8 0 1 .1 1.3.1 3.7 0 2.5 0 2.8-.1 3.8-.1 2.5-1.3 3.7-3.8 3.8-1 0-1.3.1-3.8.1-2.5 0-2.8 0-3.7-.1-2.5-.1-3.7-1.3-3.8-3.8 0-1-.1-1.3-.1-3.8 0-2.4 0-2.7.1-3.7.1-2.5 1.3-3.7 3.8-3.8 1-.1 1.3-.1 3.7-.1ZM12 2.5c-2.5 0-2.8 0-3.8.1-3.4.2-5.4 2.1-5.6 5.6-.1 1-.1 1.3-.1 3.8s0 2.8.1 3.8c.2 3.4 2.1 5.4 5.6 5.6 1 .1 1.3.1 3.8.1s2.8 0 3.8-.1c3.4-.2 5.4-2.1 5.6-5.6.1-1 .1-1.3.1-3.8s0-2.8-.1-3.8c-.2-3.4-2.1-5.4-5.6-5.6-1-.1-1.3-.1-3.8-.1Zm0 4.6a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.1-9.4a1.1 1.1 0 1 0 0 2.3 1.1 1.1 0 0 0 0-2.3Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.77.6-3.36-1.32-3.36-1.32-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.52 9.52 0 0 1 12 6.8c.85 0 1.71.11 2.52.33 1.9-1.29 2.74-1.02 2.74-1.02.54 1.39.2 2.42.1 2.67.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.59.69.49A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

/**
 * Réseaux sociaux officiels (liens externes — ouverture dans un nouvel
 * onglet sur chaque <a> du rendu). Exportés : le tiroir mobile réutilise
 * les mêmes pastilles (voir MobileDrawer).
 */
export const SOCIALS: readonly { label: string; href: string; icon: () => ReactElement }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1Axhu3WNhB/', icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maxime-kante-3b7560381/', icon: LinkedInIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@saleel.groupe?_r=1&_t=ZS-99fiyyzt0IX', icon: TikTokIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/saleelgroupe?stkn=OTNpY3ZiM3I2Znpn', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com/MAXIME-KANTE', icon: GitHubIcon },
]

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {/* Taille ramenée à l'échelle du header (voir .brand-logo--footer) :
                  le grand logo écrasait la hiérarchie visuelle. */}
              <BrandLogo variant="footer" />
            </div>
            <p data-lang="fr">Ensemble, construisons l'avenir ! Thiès, Sénégal.</p>
            <p data-lang="en">Together, let's build the future! Thiès, Senegal.</p>
            <div className="footer-social">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 data-lang="fr">Nos pôles</h4>
            <h4 data-lang="en">Our divisions</h4>
            <Link to="/genie-civil" data-lang="fr">Génie Civil & BTP</Link>
            <Link to="/genie-civil" data-lang="en">Civil Engineering</Link>
            <Link to="/immobilier" data-lang="fr">Immobilier</Link>
            <Link to="/immobilier" data-lang="en">Real Estate</Link>
            <Link to="/comptabilite" data-lang="fr">Comptabilité</Link>
            <Link to="/comptabilite" data-lang="en">Accounting</Link>
            <Link to="/numerique" data-lang="fr">Numérique</Link>
            <Link to="/numerique" data-lang="en">Digital</Link>
          </div>
          <div>
            <h4 data-lang="fr">Navigation</h4>
            <h4 data-lang="en">Navigation</h4>
            <Link to="/" data-lang="fr">Accueil</Link>
            <Link to="/" data-lang="en">Home</Link>
            <Link to="/realisations" data-lang="fr">Réalisations</Link>
            <Link to="/realisations" data-lang="en">Achievements</Link>
            <Link to="/a-propos" data-lang="fr">À propos</Link>
            <Link to="/a-propos" data-lang="en">About</Link>
            <Link to="/contact" data-lang="fr">Contact</Link>
            <Link to="/contact" data-lang="en">Contact</Link>
          </div>
          <div>
            <h4 data-lang="fr">Contact</h4>
            <h4 data-lang="en">Contact</h4>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href="tel:+221786879314">+221 78 687 93 14</a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Thiès,Sénégal"
              target="_blank"
              rel="noopener"
              data-lang="fr"
            >
              Thiès, Sénégal
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Thiès,Sénégal"
              target="_blank"
              rel="noopener"
              data-lang="en"
            >
              Thiès, Senegal
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            {/* forme juridique déjà publiée sur /mentions-legales — signal de confiance B2B */}
            <span data-lang="fr">© 2026 SALEEL GROUPE · NINEA : 013368049 · RCCM : SH.THS.2026.A.5726</span>
            <span data-lang="en">© 2026 SALEEL GROUPE · NINEA : 013368049 · RCCM : SH.THS.2026.A.5726</span>
          </div>
          <div className="footer-legal-links">
            <Link to="/mentions-legales" data-lang="fr">Mentions légales</Link>
            <Link to="/mentions-legales" data-lang="en">Legal notice</Link>
            <Link to="/politique-de-confidentialite" data-lang="fr">Politique de confidentialité</Link>
            <Link to="/politique-de-confidentialite" data-lang="en">Privacy policy</Link>
          </div>
        </div>
      </div>

      {/* Signature typographique — « SALEEL » géant, encre blanche dégradée
          sur le fond nuit (palette du site, pas de couleur importée). */}
      <Reveal as="div" className="footer-watermark" aria-hidden="true">
        SALEEL
      </Reveal>
    </footer>
  )
}
