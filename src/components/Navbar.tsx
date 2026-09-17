import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import MobileDrawer from './MobileDrawer'
import BrandLogo from './BrandLogo'

interface NavItem {
  to: string
  fr: string
  en: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', fr: 'Accueil', en: 'Home' },
  { to: '/a-propos', fr: 'À propos', en: 'About' },
  { to: '/historique', fr: 'Historique', en: 'History' },
  { to: '/partenaires', fr: 'BDE Partenaires', en: 'Partner BDEs' },
]

const AXES_MENU: readonly { to: string; fr: string; en: string }[] = [
  { to: '/axe-academique-culturel', fr: 'Académique & Culturel', en: 'Academic & Cultural' },
  { to: '/axe-innovation', fr: 'Innovation', en: 'Innovation' },
  { to: '/axe-sportif', fr: 'Sportif', en: 'Sports' },
]

export default function Navbar() {
  const { lang, toggleLang } = useLanguage()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [axesOpen, setAxesOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()

  // Le header (et son logo) se masque au défilement descendant et se révèle
  // au défilement ascendant — voir .site-header.is-hidden. L'état est piloté
  // en classes impératives (pas en état React) : React ne doit JAMAIS
  // réécrire l'attribut className du header, sinon il efface les classes
  // posées par les effets (is-scrolled, --onhero, is-anim-done) à chaque
  // re-render.
  const lastScrollY = useRef(0)

  // Header « sticky » + « sur hero » : chaque page rend une sentinelle
  // (.scroll-sentinel) juste sous son héros. Quand la sentinelle existe, le
  // header est transparent à texte blanc (.site-header--onhero, superposé au
  // hero) ; quand elle sort du viewport, il se compacte (.is-scrolled).
  // Les pages sans hero (merci, 404) conservent le verre clair.
  //
  // Tout le bloc est resynchronisé via MutationObserver (pas seulement sur
  // [pathname]) : les pages intérieures sont montées en <Suspense> lazy,
  // leur sentinelle apparaît APRÈS le rendu de la Navbar au changement de
  // route — un simple effet [pathname] les manquerait (nav opaque sur un
  // hero plein cadre, compaction inopérante).
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let io: IntersectionObserver | null = null
    let onScroll: (() => void) | null = null

    const teardown = () => {
      io?.disconnect()
      io = null
      if (onScroll) {
        window.removeEventListener('scroll', onScroll)
        onScroll = null
      }
    }

    const sync = () => {
      teardown()
      const sentinel = document.querySelector('.scroll-sentinel')
      header.classList.toggle('site-header--onhero', Boolean(sentinel))

      if (!sentinel || typeof IntersectionObserver === 'undefined') {
        onScroll = () => {
          header.classList.toggle('is-scrolled', window.scrollY > 20)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return
      }

      // Inset racine = hauteur de la nav (+2 px de tolérance) : le mode
      // « sur hero » ne tient que tant que le bas du hero reste SOUS la
      // bande du header. Sans cet inset, la sentinelle ré-entrait dans le
      // viewport dès qu'on remontait vers le hero et la nav repassait
      // transparente/absolute en plein milieu d'une section claire.
      const navInset = `${Math.round(header.offsetHeight || 88) + 2}px 0px 0px 0px`
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              header.classList.remove('is-scrolled')
            } else if (window.scrollY > 0) {
              header.classList.add('is-scrolled')
            }
          }
        },
        { rootMargin: `-${navInset}`, threshold: 0 },
      )
      io.observe(sentinel)
    }

    sync()

    const observer = new MutationObserver(sync)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      teardown()
      observer.disconnect()
    }
  }, [location.pathname])

  // Ferme le drawer et le menu déroulant « Nos Axes » après chaque
  // navigation : le rideau de transition intercepte les clics en capture
  // (les onClick de fermeture des liens ne tournent plus), la fermeture a
  // lieu sous couverture, invisible.
  useEffect(() => {
    setDrawerOpen(false)
    setAxesOpen(false)
  }, [location.pathname])

  // « Hide on scroll down / show on scroll up » : dès que l'utilisateur scrolle
  // vers le bas au-delà d'un seuil, le header (logo compris) sort de l'écran ;
  // dès qu'il remonte (même un peu) ou revient en haut de page, il réapparaît.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    lastScrollY.current = window.scrollY
    header.classList.remove('is-hidden')
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y
      if (y <= 64) {
        header.classList.remove('is-hidden')
      } else if (delta > 8) {
        header.classList.add('is-hidden')
      } else if (delta < -8) {
        header.classList.remove('is-hidden')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // L'animation d'entrée du header (headerSlideDown) garde le contrôle de son
  // `transform` tant qu'elle vit (fill both) : on la neutralise une fois jouée
  // pour que la classe is-hidden puisse glisser le header hors de l'écran.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const onAnimEnd = () => header.classList.add('is-anim-done')
    header.addEventListener('animationend', onAnimEnd)
    return () => header.removeEventListener('animationend', onAnimEnd)
  }, [])

  const openDrawer = () => setDrawerOpen(true)

  const closeDrawer = () => {
    setDrawerOpen(false)
    openButtonRef.current?.focus()
  }

  const contactActive = location.pathname === '/contact' ? ' active' : ''

  return (
    <>
      <header ref={headerRef} className="site-header site-header--overlay" id="siteHeader">
        <div className="site-header__inner">
          {/* Marque */}
          <Link to="/" className="brand" aria-label="UUPT — Accueil">
            <BrandLogo variant="header" priority />
          </Link>

          {/* Navigation bureau */}
          <nav className="desktop-nav" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <Fragment key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  data-lang="fr"
                >
                  {item.fr}
                </NavLink>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  data-lang="en"
                >
                  {item.en}
                </NavLink>
              </Fragment>
            ))}
            <div className="nav-dropdown">
              <button
                type="button"
                className={`nav-dropdown__trigger${location.pathname.startsWith('/axe-') ? ' active' : ''}`}
                aria-haspopup="true"
                aria-expanded={axesOpen}
                onClick={() => setAxesOpen((v) => !v)}
                onBlur={(e) => {
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setAxesOpen(false)
                }}
              >
                <span data-lang="fr">Nos Axes</span>
                <span data-lang="en">Our Axes</span>
              </button>
              <div className={`nav-dropdown__panel${axesOpen ? ' is-open' : ''}`} role="menu">
                {AXES_MENU.map((axe) => (
                  <Fragment key={axe.to}>
                    <NavLink
                      to={axe.to}
                      className={({ isActive }) => `nav-dropdown__link${isActive ? ' active' : ''}`}
                      data-lang="fr"
                      onClick={() => setAxesOpen(false)}
                    >
                      {axe.fr}
                    </NavLink>
                    <NavLink
                      to={axe.to}
                      className={({ isActive }) => `nav-dropdown__link${isActive ? ' active' : ''}`}
                      data-lang="en"
                      onClick={() => setAxesOpen(false)}
                    >
                      {axe.en}
                    </NavLink>
                  </Fragment>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="language-toggle"
              aria-label={lang === 'fr' ? 'Changer la langue' : 'Switch language'}
              onClick={toggleLang}
            >
              <Globe size={19} aria-hidden="true" />
              <span data-lang-current>{lang.toUpperCase()}</span>
            </button>
            <Link to="/contact" className={`header-contact${contactActive}`} data-lang="fr">
              Contact
            </Link>
            <Link to="/contact" className={`header-contact${contactActive}`} data-lang="en">
              Contact
            </Link>
            <button
              ref={openButtonRef}
              type="button"
              className={`mobile-menu-button${drawerOpen ? ' is-open' : ''}`}
              aria-label={
                drawerOpen
                  ? lang === 'fr' ? 'Fermer le menu' : 'Close menu'
                  : lang === 'fr' ? 'Ouvrir le menu' : 'Open menu'
              }
              aria-expanded={drawerOpen}
              aria-controls="mobileDrawer"
              onClick={openDrawer}
            >
              <span className="hamburger-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  )
}
