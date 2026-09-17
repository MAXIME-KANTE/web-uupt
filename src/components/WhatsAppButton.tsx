import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import WhatsAppIcon from './icons/WhatsAppIcon'

/**
 * Bouton WhatsApp flottant — rendu hors de .page-wrapper pour rester fixe
 * à l'écran (page-wrapper porte une animation CSS avec transform, ce qui
 * créerait un nouveau contexte de positionnement).
 *
 * Mobile : tant qu'un hero (accueil ou pages intérieures) occupe le viewport,
 * le bouton se replie (`.is-parked`, masquage CSS limité à ≤640 px) — sinon
 * il recouvre les CTA du hero, le paragraphe ou la bande de chiffres.
 * Même mécanique que la Navbar : IntersectionObserver + MutationObserver,
 * car les pages lazy montent leur hero APRÈS ce composant.
 */
export default function WhatsAppButton() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()
  const [parked, setParked] = useState(false)

  useEffect(() => {
    let io: IntersectionObserver | undefined
    const attach = () => {
      const hero = document.querySelector('.hero, .page-hero')
      if (!hero) return false
      io = new IntersectionObserver(([entry]) => setParked(entry.isIntersecting))
      io.observe(hero)
      return true
    }
    if (attach()) return () => io?.disconnect()
    // Page sans hero encore montée (lazy) : on attend qu'il apparaisse.
    const mo = new MutationObserver(() => {
      if (attach()) mo.disconnect()
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io?.disconnect()
    }
  }, [pathname])

  return (
    <a
      href="https://wa.me/221786879314?text=Bonjour%20SALEEL%20GROUPE%2C%20j%27aimerais%20discuter%20d%27un%20projet"
      className={`whatsapp-float${parked ? ' is-parked' : ''}`}
      target="_blank"
      rel="noopener"
      aria-hidden={parked || undefined}
      tabIndex={parked ? -1 : undefined}
      aria-label={lang === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}
    >
      <WhatsAppIcon />
    </a>
  )
}
