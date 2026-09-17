import { Fragment } from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import BrandLogo from './BrandLogo'
import { organization, socialLinks } from '../data/uuptData'

/**
 * Réseaux sociaux de l'Union — pilotés par `socialLinks` (uuptData).
 * lucide-react ne fournissant plus d'icônes de marque, les pictogrammes
 * génériques portés par la donnée servent d'équivalents aux SVG inline
 * du gabarit, rendus au même gabarit de 17 px.
 * Exportés : le tiroir mobile réutilise les mêmes pastilles (voir
 * MobileDrawer). TODO(UUPT) : les `href` de socialLinks sont des
 * espaces réservés — renseigner les URL officielles dans uuptData.
 */
export const SOCIALS: readonly { label: string; href: string; icon: () => ReactElement }[] =
  socialLinks.map((social) => ({
    label: social.label,
    href: social.href,
    icon: () => <social.icon size={17} aria-hidden="true" />,
  }))

/** Colonne « Nos Axes » — les trois pages d'axe, mêmes entrées que le
    dropdown de la Navbar (l'entrée `axes` de navLinks n'a pas de route
    dédiée : le footer renvoie sur les pages réelles des axes). */
const AXES_MENU: readonly { to: string; fr: string; en: string }[] = [
  { to: '/axe-academique-culturel', fr: 'Académique & Culturel', en: 'Academic & Cultural' },
  { to: '/axe-innovation', fr: 'Innovation', en: 'Innovation' },
  { to: '/axe-sportif', fr: 'Sportif', en: 'Sports' },
]

/** Colonne « Navigation » — reprend les destinations de `navLinks`
    (uuptData), hors entrée Axes portée par la colonne précédente. */
const NAV_ITEMS: readonly { to: string; fr: string; en: string }[] = [
  { to: '/', fr: 'Accueil', en: 'Home' },
  { to: '/a-propos', fr: 'À propos', en: 'About' },
  { to: '/historique', fr: 'Historique', en: 'History' },
  { to: '/partenaires', fr: 'BDE Partenaires', en: 'Partner BDEs' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {/* Taille ramenée à l'échelle du header (voir .brand-logo--footer) :
                  le grand logo écrasait la hiérarchie visuelle. */}
              <BrandLogo variant="footer" />
              {/* Mot-symbole « UUPT » sous l'emblème — blanc posé par la
                  règle gabarit `.footer-brand .brand-copy`. */}
              <p className="brand-copy">
                <strong>{organization.acronym}</strong>
              </p>
            </div>
            <p data-lang="fr">
              {organization.tagline} ! {organization.address}.
            </p>
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
            <h4 data-lang="fr">Nos Axes</h4>
            <h4 data-lang="en">Our Axes</h4>
            {AXES_MENU.map((axe) => (
              <Fragment key={axe.to}>
                <Link to={axe.to} data-lang="fr">{axe.fr}</Link>
                <Link to={axe.to} data-lang="en">{axe.en}</Link>
              </Fragment>
            ))}
          </div>
          <div>
            <h4 data-lang="fr">Navigation</h4>
            <h4 data-lang="en">Navigation</h4>
            {NAV_ITEMS.map((item) => (
              <Fragment key={item.to}>
                <Link to={item.to} data-lang="fr">{item.fr}</Link>
                <Link to={item.to} data-lang="en">{item.en}</Link>
              </Fragment>
            ))}
          </div>
          <div>
            <h4 data-lang="fr">Contact</h4>
            <h4 data-lang="en">Contact</h4>
            <a href={`mailto:${organization.email}`}>{organization.email}</a>
            {/* TODO(UUPT) : numéro provisoire — renseigner organization.phone
                dans uuptData une fois la ligne officielle connue. */}
            <a href={`tel:${organization.phone.replace(/\s+/g, '')}`}>{organization.phone}</a>
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
            <span data-lang="fr">
              © {year} {organization.acronym} — {organization.name}. Tous droits réservés.
            </span>
            <span data-lang="en">
              © {year} {organization.acronym} — {organization.name}. All rights reserved.
            </span>
          </div>
          <div className="footer-legal-links">
            <Link to="/mentions-legales" data-lang="fr">Mentions légales</Link>
            <Link to="/mentions-legales" data-lang="en">Legal notice</Link>
            <Link to="/politique-de-confidentialite" data-lang="fr">Politique de confidentialité</Link>
            <Link to="/politique-de-confidentialite" data-lang="en">Privacy policy</Link>
          </div>
        </div>
      </div>

      {/* Signature typographique — « UUPT » géant, encre blanche dégradée
          sur le fond nuit (palette du site, pas de couleur importée). */}
      <Reveal as="div" className="footer-watermark" aria-hidden="true">
        {organization.acronym}
      </Reveal>
    </footer>
  )
}
