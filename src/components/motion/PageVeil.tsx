import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animate, motion, useMotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { prefetchRoute } from '../../pages/pageLoaders'

/**
 * ── RIDEAU DE TRANSITION ENTRE PAGES (Étape 15) ─────────────────────────────
 * Motif « swup » : les clics sur les liens internes sont interceptés en phase
 * de CAPTURE sur document ; la navigation est différée le temps qu'un rideau
 * nuit monte par clip-path (liseré orange en tête), le swap de route a lieu
 * caché sous couverture pleine, puis le rideau se révèle vers le haut pendant
 * que la nouvelle page se pose (translateY 18px → 0).
 *
 *  - Seulement transform / clip-path / opacity → compositing 60 fps.
 *  - prefers-reduced-motion → aucune interception, navigation instantanée.
 *  - popstate (retour / avancer) → révélation rapide sans phase de couverture.
 *  - Clics modifiés (ctrl/cmd/shift/alt), target ≠ _self, download, ancres
 *    internes (#) et liens externes → comportement navigateur normal.
 *
 * Le Link de react-router v7 n'ignore PAS les clics déjà preventDefault :
 * on stoppe donc aussi la propagation pour neutraliser son gestionnaire.
 * Conséquence : les onClick posés sur les liens (fermeture du drawer) ne
 * tournent plus → la Navbar ferme son drawer via un effet sur le pathname.
 */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]
const COVER_S = 0.42 // montée du rideau
const HOLD_MS = 170 // couverture pleine (wordmark)
const UNCOVER_S = 0.46 // révélation + pose de la page

const HIDDEN = 'inset(100% 0% 0% 0%)'
const COVERED = 'inset(0% 0% 0% 0%)'
const OPEN = 'inset(0% 0% 100% 0%)'

export default function PageVeil() {
  const navigate = useNavigate()
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  const clip = useMotionValue<string>(HIDDEN)
  const edgeY = useMotionValue<number>(window.innerHeight)
  const markOpacity = useMotionValue<number>(0)
  // Le liseré n'est visible QUE pendant une transition : au repos il reste
  // à opacité 0 (sinon une ligne orange fantôme peut apparaître au bord).
  const edgeOpacity = useMotionValue<number>(0)

  const veilRef = useRef<HTMLDivElement | null>(null)
  const busy = useRef(false)
  const pending = useRef<string | null>(null)
  const selfNav = useRef(false)
  const startedFrom = useRef<string | null>(null)
  const prevPath = useRef<string | null>(null)
  const timers = useRef<number[]>([])
  const locationRef = useRef(location.pathname)
  locationRef.current = location.pathname

  const vh = () => window.innerHeight

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  /** Pose de la nouvelle page : translateY 18px → 0 pendant la révélation. */
  const settleNewPage = () => {
    const page = document.getElementById('page-wrapper')
    if (!page) return
    page.style.willChange = 'transform'
    animate(page, { y: [18, 0] }, {
      duration: 0.55,
      ease: EASE,
      onComplete: () => {
        page.style.willChange = ''
        page.style.transform = ''
      },
    })
  }

  const runUncover = () => {
    animate(clip, OPEN, { duration: UNCOVER_S, ease: EASE })
    animate(edgeY, 0, { duration: UNCOVER_S, ease: EASE })
    animate(markOpacity, 0, { duration: 0.18, ease: 'easeOut' })
    animate(edgeOpacity, 0, { duration: 0.18, ease: 'easeOut' })
    settleNewPage()
    later(() => {
      // Retour à l'état de repos (invisible, cliquable au travers).
      animate(clip, HIDDEN, { duration: 0 })
      animate(edgeY, vh(), { duration: 0 })
      if (veilRef.current) veilRef.current.style.pointerEvents = ''
      busy.current = false
      // Un clic reçu PENDANT ce cycle (ex. reveal popstate) ne doit pas être
      // perdu : on le rejoue maintenant que le rideau est libre.
      const queued = pending.current
      pending.current = null
      if (queued && queued !== locationRef.current) requestRef.current(queued)
    }, UNCOVER_S * 1000 + 80)
  }

  const runCover = () => {
    if (veilRef.current) veilRef.current.style.pointerEvents = 'auto'
    animate(edgeY, vh(), { duration: 0 })
    animate(edgeOpacity, 1, { duration: 0 })
    animate(markOpacity, 0, { duration: 0 })
    animate(edgeY, 0, { duration: COVER_S, ease: EASE })
    animate(clip, COVERED, {
      duration: COVER_S,
      ease: EASE,
      onComplete: () => {
        // Swap sous couverture — sauf si un popstate a déjà changé la route.
        if (locationRef.current === startedFrom.current && pending.current) {
          selfNav.current = true
          navigate(pending.current)
        }
        // Maintien : wordmark + liseré repositionné sous le bord bas.
        animate(edgeY, vh(), { duration: 0 })
        animate(markOpacity, 1, { duration: 0.14, ease: 'easeOut' })
        later(runUncover, HOLD_MS)
      },
    })
  }

  const request = (to: string) => {
    prefetchRoute(to) // tête d'avance : le chunk se charge pendant la montée
    if (busy.current) {
      pending.current = to // retarget : la dernière intention gagne
      return
    }
    busy.current = true
    pending.current = to
    startedFrom.current = locationRef.current
    if (reduced) {
      navigate(to)
      busy.current = false
      pending.current = null
      return
    }
    runCover()
  }

  // Référence stable vers `request` pour le rejeu des clics mis en file
  // pendant un cycle de rideau (closure toujours fraîche).
  const requestRef = useRef(request)
  requestRef.current = request

  // Interception des clics liens internes (phase de capture) +
  // préchargement du chunk visé dès le survol (liens paresseux).
  useEffect(() => {
    if (reduced) return
    const internalHref = (element: EventTarget | null): string | null => {
      const anchor = (element as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return null
      if (anchor.target && anchor.target !== '_self') return null
      if (anchor.hasAttribute('download')) return null
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href.includes('#')) return null
      return href
    }
    const onPointerOver = (event: PointerEvent) => {
      const href = internalHref(event.target)
      if (href) prefetchRoute(href)
    }
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const href = internalHref(event.target)
      if (!href) return
      event.preventDefault()
      event.stopPropagation()
      request(href)
    }
    document.addEventListener('pointerover', onPointerOver, { capture: true })
    document.addEventListener('click', onClick, { capture: true })
    return () => {
      document.removeEventListener('pointerover', onPointerOver, { capture: true })
      document.removeEventListener('click', onClick, { capture: true })
    }
  }, [reduced])

  // popstate (retour / avancer) : révélation rapide, sans couverture préalable.
  // Garde par chemin précédent — pas par « premier rendu » : sous StrictMode
  // (dev) les effets tournent deux fois sur la même instance, et une garde
  // booléenne laisserait partir un reveal fantôme au remontage.
  useEffect(() => {
    const previous = prevPath.current
    prevPath.current = location.pathname
    if (selfNav.current) {
      selfNav.current = false
      return
    }
    if (previous === null || previous === location.pathname) return
    if (reduced || busy.current) return
    busy.current = true
    if (veilRef.current) veilRef.current.style.pointerEvents = 'auto'
    animate(clip, COVERED, { duration: 0 })
    animate(edgeOpacity, 1, { duration: 0 })
    animate(markOpacity, 0, { duration: 0 })
    later(() => {
      animate(edgeY, vh(), { duration: 0 })
      runUncover()
    }, 90)
  }, [location.pathname, reduced])

  // Nettoyage des minuteries au démontage.
  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  return (
    <>
      <motion.div ref={veilRef} className="page-veil" style={{ clipPath: clip }} aria-hidden="true">
        <motion.p className="page-veil__mark" style={{ opacity: markOpacity }}>
          UUPT
        </motion.p>
      </motion.div>
      <motion.div
        className="page-veil__edge"
        style={{ y: edgeY, opacity: edgeOpacity }}
        aria-hidden="true"
      />
    </>
  )
}
