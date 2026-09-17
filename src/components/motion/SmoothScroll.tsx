import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { setLenis } from '../../lib/smoothScroll'

declare global {
  interface Window {
    /** Hook de test/capture : wrapper `__shots.html` pilote le scroll via Lenis. */
    __lenis?: Lenis
  }
}

/**
 * Inertie de scroll « premium » (inspirée des sites d'agence) : une seule
 * instance Lenis, une seule boucle requestAnimationFrame, détruite au
 * démontage. Désactivée lorsque l'utilisateur préfère réduire les animations
 * (scroll natif conservé) — Lenis ne lissera pas non plus le toucher
 * (`smoothTouch` désactivé par défaut).
 *
 * Lenis anime le scroll natif de la fenêtre : `position: sticky` (panneaux
 * empilés) et `useScroll` de framer-motion fonctionnent sans synchronisation
 * particulière.
 */
export default function SmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    setLenis(lenis)
    window.__lenis = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
      delete window.__lenis
    }
  }, [reduced])

  return null
}
