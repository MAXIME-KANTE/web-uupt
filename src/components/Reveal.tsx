import { useEffect, useRef, useState } from 'react'
import type { AllHTMLAttributes, ElementType, ReactNode } from 'react'

interface RevealProps extends Omit<AllHTMLAttributes<HTMLElement>, 'as'> {
  children?: ReactNode
  /** Élément rendu (div par défaut) — remplace les classes `reveal` posées à la main. */
  as?: ElementType
  /** Utilise la variante `reveal-magic` (promise strip) plutôt que `reveal`. */
  magic?: boolean
  /** Index de décalage pour `reveal-magic` (attribut data-stagger). */
  stagger?: number
}

/**
 * Enveloppe d'animation d'apparition au scroll.
 * Ajoute `.is-visible` via IntersectionObserver quand l'élément entre dans
 * le viewport, une seule fois.
 * Tout attribut complémentaire (data-lang, href, aria-*) est transmis tel quel.
 */
export default function Reveal({
  children,
  as = 'div',
  magic = false,
  stagger,
  className,
  style,
  id,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      // Repli : tout afficher (navigateurs très anciens).
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const classes = [
    magic ? 'reveal-magic' : 'reveal',
    visible ? 'is-visible' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const Tag: ElementType = as

  return (
    <Tag
      ref={ref}
      id={id}
      className={classes}
      style={style}
      data-stagger={magic && stagger !== undefined ? stagger : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
