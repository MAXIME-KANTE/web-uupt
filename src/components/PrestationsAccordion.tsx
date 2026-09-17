import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import GsapWords from './motion/GsapWords'

/** Une prestation — même forme que les EXPERTISES des pages pôles. */
export interface Prestation {
  fr: string
  en: string
  descFr: string
  descEn: string
}

interface PrestationsAccordionProps {
  items: readonly Prestation[]
}

/**
 * Section « Nos prestations » — accordéon horizontal de cartes extensibles
 * (Expandable Hover Cards, style Framer / 21st.dev) :
 *
 * - Bandeau NUIT arrondi (halos décoratifs internes) qui donne au verre des
 *   cartes une matière à flouter : chaque carte `flex-1` en verre
 *   (`bg-white/5 backdrop-blur-md border border-white/10`, rounded-3xl,
 *   overflow-hidden) dans un conteneur flex à hauteur fixe (gap-4) ;
 * - La carte ACTIVE (état React `activeCard` : survol, focus, clic, Entrée /
 *   Espace) passe en `flex-[3]` via `transition-all duration-700 ease-in-out`
 *   — l'expansion reste en CSS/GPU ( Flip reste réservé aux transitions de
 *   vue, voir RealisationsExplorer) ;
 * - Le descriptif détaillé (`opacity-0`) n'apparaît (opacity-100, fondu +
 *   montée décalée) QUE sur la carte élargie ;
 * - Entrée en scène : set+to (y:100→0, opacity 0→1, stagger 0.15, duration 1,
 *   power4.out) sur ScrollTrigger « top 80% » du conteneur ; le titre est
 *   révélé mot à mot depuis un masque (GsapWords).
 *
 * Mobile : la pile devient verticale (flex-col) — même mécanique, la carte
 * active grandit en hauteur. `prefers-reduced-motion` : aucune animation.
 */
export default function PrestationsAccordion({ items }: PrestationsAccordionProps) {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  // Lenis anime le scroll natif → branchement maison pour que ScrollTrigger
  // suive l'inertie (même motif que RealisationsExplorer/ActualitesBento).
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

  // Entrée des cartes au scroll : mêmes paramètres qu'un gsap.from (y:100,
  // opacity 0, stagger 0.15, duration 1, power4.out, ScrollTrigger « top 80% »)
  // mais en pattern canonique set+to à fin EXPLICITE — un `from` fige les
  // cartes à opacity 0 dans le prérendu (progress(1) ne rend pas l'état
  // « naturel » de fin ; bug documenté dans CLAUDE.md et prerender.mjs).
  useGSAP(
    () => {
      if (reduced || !listRef.current) return
      const cards = listRef.current.querySelectorAll('.prestation-card')
      if (!cards.length) return
      gsap.set(cards, { y: 100, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  /** Carte focusable : Entrée / Espace forcent aussi l'expansion. */
  const onCardKey = (index: number, e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    setActive(index)
  }

  return (
    <section className="section" aria-label="Nos prestations">
      <div className="container">
        {/* Panneau nuit : porte le titre et donne au verre des cartes un fond
            à flouter (halos internes, décoratifs). */}
        <div
          ref={root}
          className="prestations-panel relative overflow-hidden rounded-3xl bg-night px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16"
        >
          {/* Halos décoratifs — c'est eux qui donnent de la matière au
              backdrop-blur des cartes en verre. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
          />

          {/* Titre — révélé mot à mot depuis un masque (SplitText maison). */}
          <div className="relative flex flex-col items-center gap-4 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400"
              data-lang="fr"
            >
              Nos prestations
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400"
              data-lang="en"
            >
              Our services
            </span>
            <GsapWords
              fr={[{ t: 'Quatre savoir-faire, un même souci du ' }, { t: 'détail.', ti: true }]}
              en={[{ t: 'Four areas of expertise, the same attention to ' }, { t: 'detail.', ti: true }]}
              className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl"
            />
          </div>

          {/* Accordéon : colonne sur mobile, rangée à hauteur fixe dès md. */}
          <div
            ref={listRef}
            className="relative mt-10 flex h-[620px] flex-col gap-4 md:h-[500px] md:flex-row"
          >
            {items.map((item, i) => {
              const isActive = i === active
              return (
                <article
                  key={item.fr}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onCardKey(i, e)}
                  className={`prestation-card group relative flex-1 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-700 ease-in-out focus-visible:border-orange-400/60 focus-visible:outline-none sm:p-5 ${
                    isActive ? 'flex-[3] border-white/25 bg-white/10' : ''
                  }`}
                >
                  {/* Lueur au sol de la carte élargie. */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/70 to-transparent transition-opacity duration-700 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="relative flex h-full flex-col justify-end">
                    <span className="text-[11px] font-bold tracking-[0.3em] text-orange-400">
                      0{i + 1}
                    </span>
                    <h3
                      className={`mt-2 font-display font-extrabold leading-tight text-white transition-all duration-500 ${
                        isActive ? 'text-2xl' : 'text-base sm:text-lg'
                      }`}
                    >
                      <span data-lang="fr">{item.fr}</span>
                      <span data-lang="en">{item.en}</span>
                    </h3>

                    {/* Descriptif détaillé — visible uniquement quand la carte
                        est élargie (opacity-0 → opacity-100, fondu décalé). */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isActive ? 'mt-3 opacity-100 delay-200 translate-y-0' : 'mt-0 max-h-0 opacity-0 translate-y-3'
                      }`}
                    >
                      <p className="max-w-md text-sm leading-relaxed text-slate-300">
                        <span data-lang="fr">{item.descFr}</span>
                        <span data-lang="en">{item.descEn}</span>
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
