import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface MagneticProps {
  children: ReactNode
  className?: string
  /** Attraction relative (0 = off, ~0.35 = agréable) — déplacement plafonné. */
  strength?: number
  /** Plafond de déplacement en px (subtil : jamais plus de ~12px). */
  max?: number
}

/**
 * Enveloppe magnétique pour les CTA importants : l'élément est doucement
 * attiré par le curseur (translation plafonnée), puis revient en place avec
 * l'easing premium du design system.
 *
 * - uniquement les pointeurs de précision (`pointerType === 'mouse'`) ;
 * - `transform: translate3d` uniquement — aucune propriété de layout ;
 * - aucun state : la transition CSS lisse le suivi, sans boucle rAF ;
 * - inactif sous `prefers-reduced-motion` et au toucher.
 *
 * La zone cliquable reste celle de l'élément (le déplacement la suit
 * intégralement — comportement standard du magnétisme d'interface).
 */
export default function Magnetic({
  children,
  className,
  strength = 0.35,
  max = 12,
}: MagneticProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  // Translation actuellement appliquée : getBoundingClientRect() la inclut,
  // on la retire donc pour mesurer l'attraction depuis la position de repos
  // (sinon l'élément s'auto-amortit à mesure qu'il s'approche du curseur et
  // le magnétisme paraît plus faible que prévu).
  const shiftX = useRef(0)
  const shiftY = useRef(0)

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    const element = ref.current
    if (!element || reduced || event.pointerType !== 'mouse') return
    const rect = element.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2 - shiftX.current)
    const offsetY = event.clientY - (rect.top + rect.height / 2 - shiftY.current)
    const clamp = (value: number) =>
      Math.max(-max, Math.min(max, value * strength))
    const dx = clamp(offsetX)
    const dy = clamp(offsetY)
    shiftX.current = dx
    shiftY.current = dy
    element.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  }

  const release = () => {
    const element = ref.current
    if (element) element.style.transform = 'translate3d(0, 0, 0)'
    shiftX.current = 0
    shiftY.current = 0
  }

  return (
    <span
      ref={ref}
      className={`magnetic${className ? ` ${className}` : ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      onPointerCancel={release}
      onPointerUp={release}
    >
      {children}
    </span>
  )
}
