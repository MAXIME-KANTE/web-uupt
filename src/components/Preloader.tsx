import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import { buildSrcSet } from './HeroCarousel'
import { HOME_HERO_SLIDES } from '../constants'

/**
 * Page servie en HTML PRERENDU (scripts/prerender.mjs) : le contenu est déjà
 * peint dans le HTML sauvegardé — on saute l'écran d'arrivée, sinon la page
 * jouerait un deuxième « boot » visuel par-dessus le contenu déjà visible.
 * Le flag est injecté UNIQUEMENT dans les fichiers prérendus ; le index.html
 * servi en dev ne le porte jamais (preloader normal).
 */
const PRERENDERED =
  typeof window !== 'undefined' &&
  (window as { __PRERENDERED__?: boolean }).__PRERENDERED__ === true

/**
 * Écran d'arrivée (preloader) — sigle UUPT pulsé sur fond nuit.
 *
 * Il reflète le VRAI chargement des ressources critiques : polices,
 * décodage de la première image du hero et fenêtre complète. Deux garde-fous :
 *  - un temps d'affichage MINIMAL (l'animation du logo doit être perçue) ;
 *  - un plafond MAXIMAL au-delà duquel on laisse passer quoi qu'il arrive —
 *    le preloader ne doit jamais retenir l'utilisateur indéfiniment.
 *
 * Sortie en fondu doux. `prefers-reduced-motion` : pas de pulsation (CSS),
 * simple fondu d'apparition du site.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<'boot' | 'leaving' | 'gone'>(() =>
    PRERENDERED ? 'gone' : 'boot',
  )

  useEffect(() => {
    // HTML prérendu : rien à attendre (voir PRERENDERED ci-dessus).
    if (PRERENDERED) return

    let cancelled = false
    const startedAt = performance.now()

    // Ressource critique n° 1 : la première image du diaporama du hero (LCP).
    // Même srcset/sizes que l'<img> du hero → le navigateur attend exactement
    // la variante qu'il affichera (même URL, donc même entrée de cache HTTP).
    const firstHeroImage = new Image()
    const firstHeroSrcSet = buildSrcSet(HOME_HERO_SLIDES[0])
    // Photo locale (pas de variante largeur) : srcset inutile, on ne pose que src.
    if (firstHeroSrcSet) {
      firstHeroImage.srcset = firstHeroSrcSet
      firstHeroImage.sizes = '100vw'
    }
    firstHeroImage.src = HOME_HERO_SLIDES[0]

    const windowLoaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    })
    const heroDecoded =
      typeof firstHeroImage.decode === 'function'
        ? firstHeroImage.decode().catch(() => undefined)
        : Promise.resolve()
    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    const MIN_VISIBLE_MS = 900
    const MAX_WAIT_MS = 2600

    const resources = Promise.allSettled([fontsReady, heroDecoded, windowLoaded])
    const cap = new Promise<void>((resolve) => {
      window.setTimeout(resolve, Math.max(0, MAX_WAIT_MS - (performance.now() - startedAt)))
    })

    Promise.race([resources.then(() => undefined), cap]).then(() => {
      const settle = () => {
        if (cancelled) return
        setPhase('leaving')
        window.setTimeout(() => {
          if (!cancelled) setPhase('gone')
        }, 640)
      }
      const remaining = MIN_VISIBLE_MS - (performance.now() - startedAt)
      window.setTimeout(settle, Math.max(0, remaining))
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className={`preloader${phase === 'leaving' ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader__mark">
        <BrandLogo className="preloader__logo" priority tone="light" />
      </div>
      <p className="preloader__word">UUPT</p>
    </div>
  )
}
