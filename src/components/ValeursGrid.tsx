import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import GsapWords from './motion/GsapWords'

/** Une valeur du groupe — icône lucide + paires bilingues. */
export interface Valeur {
  icon: LucideIcon
  fr: string
  en: string
  descFr: string
  descEn: string
}

interface ValeursGridProps {
  items: readonly Valeur[]
}

/**
 * Section « Nos valeurs » — GRILLE STRUCTURÉE 3×2 (inspiration 21st.dev /
 * Framer), remplaçant l'ancien accordéon de piliers à libellés verticalisés :
 *
 * - Grid 3 colonnes × 2 lignes sur desktop, 2 sur tablette, 1 sur mobile ;
 * - Cartes MINIMALISTES à fond sombre minéral (`bg-night`), bordure
 *   ultra-fine `border-white/10`, padding généreux `p-8`, icône épurée
 *   au-dessus du texte — le texte respire, plus aucun chevauchement ;
 * - Zéro interaction de survol lourde : simple transition de BORDURE au
 *   hover (white/10 → white/25) ;
 * - Entrée au défilement : fondu enchaîné GSAP de bas en haut avec léger
 *   décalage en cascade (stagger) via ScrollTrigger (set+to à fin explicite,
 *   jamais de `from` qui figerait le prérendu).
 *
 * `prefers-reduced-motion` : aucun état posé, cartes visibles, statique.
 */
export default function ValeursGrid({ items }: ValeursGridProps) {
  const root = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  // Lenis anime le scroll natif → ScrollTrigger doit suivre l'inertie.
  useGSAP(
    () => {
      if (reduced) return
      const lenis = getLenis()
      if (!lenis) return
      const update = () => ScrollTrigger.update()
      lenis.on('scroll', update)
      return () => {
        lenis.off('scroll', update)
      }
    },
    { dependencies: [reduced] },
  )

  // Apparition en cascade des cartes (fondu de bas en haut).
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const tiles = root.current.querySelectorAll('.valeur-tile')
      if (!tiles.length) return
      gsap.set(tiles, { y: 60, opacity: 0 })
      gsap.to(tiles, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section className="section" aria-label="Nos valeurs">
      <div className="container">
        <div ref={root}>
          <div className="section-heading">
            <span className="eyebrow" data-lang="fr">Nos valeurs</span>
            <span className="eyebrow" data-lang="en">Our values</span>
            <GsapWords
              fr={[{ t: 'Des valeurs solides, comme nos ' }, { t: 'fondations.', ti: true }]}
              en={[{ t: 'Values as solid as our ' }, { t: 'foundations.', ti: true }]}
              className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
            />
          </div>

          {/* Grille 3×2 aux espacements équilibrés — jamais de carré : les
              cartes restent des rectangles respirants (p-8). */}
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.fr}
                  aria-label={item.fr}
                  className="valeur-tile relative rounded-lg border border-white/10 bg-night p-8 transition-colors duration-500 hover:border-white/25 focus-visible:border-orange-400/60 focus-visible:outline-none"
                >
                  <Icon
                    size={26}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="text-orange-400"
                  />
                  <h3 className="mt-6 font-display text-xl font-extrabold leading-tight text-white">
                    <span data-lang="fr">{item.fr}</span>
                    <span data-lang="en">{item.en}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    <span data-lang="fr">{item.descFr}</span>
                    <span data-lang="en">{item.descEn}</span>
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}