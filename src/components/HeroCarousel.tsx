import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface HeroCarouselProps {
  images: readonly string[]
  /** Durée d'affichage d'une image en ms (défaut : 5 000). */
  interval?: number
  /** Variante « rapide » : fondu plus court (heroes pôles, cartes pôles). */
  fast?: boolean
  /** Indication `sizes` rendue sur chaque <img> (défaut : plein viewport). */
  sizes?: string
  /** Charge la 1re image en priorité haute — à ne passer QUE depuis les
   *  heroes plein écran (HomeHero, PoleHero, PageHero), candidats LCP de la
   *  page. Les diaporamas décoratifs (cartes pôles, volet formulaire) restent
   *  lazy pour ne pas concurrencer le vrai LCP. */
  priority?: boolean
}
/** Les URLs Unsplash embarquent leur largeur (…&w=1920) — le descripteur
 * srcSet se déduit directement de l'URL, pas d'un tableau mesuré. */
export function buildSrcSet(url: string): string {
  const match = url.match(/[?&]w=(\d+)/)
  return match ? `${url} ${match[1]}w` : url
}

/**
 * Carrousel d'arrière-plan automatique : images en fond en <img> responsive
 * (srcset/lazy), fondues l'une dans l'autre, classe `.is-active` sur la slide
 * visible. `prefers-reduced-motion` : la première image reste affichée en
 * statique, sans défilement.
 */
export default function HeroCarousel({
  images,
  interval = 5000,
  fast = false,
  sizes = '100vw',
  priority = false,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  /** Slide quittée au dernier tick : reste montée le temps de son fondu. */
  const [previous, setPrevious] = useState<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return
    const id = window.setInterval(() => {
      setPrevious(current)
      setCurrent((shown) => (shown + 1) % images.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, images.length, interval, current])

  // Montage fenêtré : ne devancer que la slide suivante (préchargée pendant
  // l'affichage de la courante) — sans quoi toutes les <img> du hero
  // intersectent le viewport dès l'ouverture et concurrencent le LCP. La
  // slide sortante reste montée un tick de plus pour son fondu de sortie.
  // prefers-reduced-motion : seule la slide 0 est montée (diaporama figé).
  const isSlideMounted = (index: number): boolean => {
    if (prefersReducedMotion) return index === 0
    const next = (current + 1) % images.length
    return index === current || index === next || index === previous
  }

  return (
    <div className={`hero-carousel${fast ? ' hero-carousel--fast' : ''}`} aria-hidden="true">
      {images.map((image, index) => (
        <div
          key={image}
          className={
            index === (prefersReducedMotion ? 0 : current) ? 'hero-slide is-active' : 'hero-slide'
          }
        >
          {/* Décoratif : le wrapper est aria-hidden, l'<img> n'expose pas d'alt. */}
          {isSlideMounted(index) && (
            <img
              src={image}
              srcSet={buildSrcSet(image)}
              sizes={sizes}
              alt=""
              loading={index === 0 && priority ? 'eager' : 'lazy'}
              fetchPriority={index === 0 && priority ? 'high' : 'auto'}
              decoding="async"
              draggable={false}
            />
          )}
        </div>
      ))}
    </div>
  )
}
