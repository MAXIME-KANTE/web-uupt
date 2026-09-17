import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import BrandLogo from './BrandLogo'
import { SOCIALS } from './Footer'
import { getLenis } from '../lib/smoothScroll'

interface DrawerLink {
  to: string
  fr: string
  en: string
}

const AXE_ITEMS: readonly DrawerLink[] = [
  { to: '/axe-academique-culturel', fr: 'Académique & Culturel', en: 'Academic & Cultural' },
  { to: '/axe-innovation', fr: 'Innovation', en: 'Innovation' },
  { to: '/axe-sportif', fr: 'Sportif', en: 'Sports' },
]

const MAIN_ITEMS: readonly DrawerLink[] = [
  { to: '/', fr: 'Accueil', en: 'Home' },
  { to: '/a-propos', fr: 'À propos', en: 'About' },
  { to: '/historique', fr: 'Historique', en: 'History' },
  { to: '/partenaires', fr: 'BDE Partenaires', en: 'Partner BDEs' },
  { to: '/contact', fr: 'Contact', en: 'Contact' },
]

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

/**
 * Tiroir de navigation mobile — feuille latérale droite en trois zones :
 * tête (logo = retour Accueil + fermeture), corps défilant (liens groupés
 * « Nos Axes » — sous-liens indentés — / « Navigation »), pied épinglé
 * (CTA, langue FR|EN, réseaux).
 * Comportements préservés : ouverture/fermeture, touche Échap, blocage du
 * scroll (body + instance Lenis), focus initial sur le bouton de fermeture
 * et piège de focus dans le dialog.
 */
export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { lang, setLang } = useLanguage()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)

  // Échap ferme le tiroir.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      // Piège de focus dans le dialog : Tab / Shift+Tab sur les extrémités
      // de la liste des focusables rebouclent à l'intérieur du tiroir. On
      // énumère depuis la RACINE du tiroir (et pas du seul panneau) : le
      // bouton backdrop précède le panneau dans le DOM et doit faire partie
      // du cycle, sinon Shift+Tab s'échappe vers la page masquée.
      if (event.key !== 'Tab') return
      const drawer = drawerRef.current
      if (!drawer) return
      const focusables = Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Bloque le scroll du body (et de Lenis) et place le focus sur le bouton
  // de fermeture.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [open])

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'drawer-item active' : 'drawer-item'

  // Sous-liens d'axes : même item que la navigation, indenté (drawer-sublink).
  const sublinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'drawer-item drawer-sublink active' : 'drawer-item drawer-sublink'

  return (
    <div
      ref={drawerRef}
      className={`mobile-drawer${open ? ' is-open' : ''}`}
      id="mobileDrawer"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'fr' ? 'Menu de navigation' : 'Navigation menu'}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="drawer-backdrop"
        aria-label={lang === 'fr' ? 'Fermer le menu' : 'Close menu'}
        onClick={onClose}
      />
      <div className="drawer-panel">
        <div className="drawer-head">
          <Link to="/" aria-label="UUPT — Accueil" onClick={onClose}>
            <BrandLogo variant="drawer" />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="drawer-close"
            aria-label={lang === 'fr' ? 'Fermer le menu' : 'Close menu'}
            onClick={onClose}
          >
            <span className="hamburger-icon is-open" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav
          className="drawer-scroll"
          data-lenis-prevent
          aria-label={lang === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}
        >
          <p className="drawer-group-label">
            <span data-lang="fr">Nos Axes</span>
            <span data-lang="en">Our Axes</span>
          </p>
          <div className="drawer-group">
            {AXE_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={sublinkClassName} onClick={onClose}>
                <span data-lang="fr">{item.fr}</span>
                <span data-lang="en">{item.en}</span>
              </NavLink>
            ))}
          </div>
          <p className="drawer-group-label">
            <span data-lang="fr">Navigation</span>
            <span data-lang="en">Navigation</span>
          </p>
          <div className="drawer-group">
            {MAIN_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={linkClassName}
                onClick={onClose}
              >
                <span data-lang="fr">{item.fr}</span>
                <span data-lang="en">{item.en}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="drawer-foot">
          <Link to="/contact" className="button button--primary drawer-cta" onClick={onClose}>
            <span data-lang="fr">Discuter de votre projet</span>
            <span data-lang="en">Discuss your project</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <div
            className="drawer-lang"
            role="group"
            aria-label={lang === 'fr' ? 'Langue' : 'Language'}
          >
            <button type="button" aria-pressed={lang === 'fr'} onClick={() => setLang('fr')}>
              FR
            </button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
              EN
            </button>
          </div>
          <div className="drawer-social">
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
      </div>
    </div>
  )
}
