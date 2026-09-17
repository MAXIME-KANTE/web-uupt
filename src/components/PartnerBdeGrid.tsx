import { useRef } from 'react'
import { ArrowUpRight, Handshake } from 'lucide-react'
import { partnerBdeSection, partnerBdes } from '../data/uuptData'
import type { PartnerBde, PartnerBdeSection } from '../types'
import { useLanguage } from '../context/LanguageContext'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Grille des BDE partenaires officiels — refonte haut de gamme
 * inspirée 21st.dev / Framer, charte « Mineral Glassmorphism » :
 *
 * - Fond nuit profond, cartes STRICTEMENT rectangulaires en verre dépoli
 *   (`border border-white/10 bg-night/60 backdrop-blur`) ;
 * - Lien externe par carte vers le site officiel de l'établissement
 *   (`target="_blank"` + `rel="noopener noreferrer"`) ;
 * - Micro-interactions au survol : filet blanc 30 %, flèche diagonale qui
 *   s'écarte, ligne métallique blanche qui balaie la base de la carte ;
 * - Entrée au défilement : ScrollTrigger en cascade (stagger), set+to à
 *   fin explicite (jamais de `from`, qui figerait le prérendu).
 *
 * `prefers-reduced-motion` : aucun état posé, cartes visibles, statique.
 */
interface PartnerBdeGridProps {
  /** Liste des BDE à afficher — défaut : `partnerBdes` (uuptData). */
  items?: readonly PartnerBde[]
  /** Copie de l'en-tête de section — défaut : `partnerBdeSection`. */
  section?: PartnerBdeSection
}

export default function PartnerBdeGrid({
  items = partnerBdes,
  section = partnerBdeSection,
}: PartnerBdeGridProps) {
  const root = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const { lang } = useLanguage()
  const { copy, cta } = section

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

  // Apparition en cascade des cartes partenaires.
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const cards = root.current.querySelectorAll('.bde-partner-card')
      if (!cards.length) return
      gsap.set(cards, { y: 40, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      id="bde-partenaires"
      className="section section--dark"
      aria-label={lang === 'fr' ? 'BDE partenaires de l’Union' : 'Union partner BDEs'}
    >
      <div className="container">
        <div ref={root}>
          {/* ── En-tête de section ─────────────────────────────────── */}
          <div className="section-heading">
            <span className="eyebrow" data-lang="fr">{copy.eyebrow.fr}</span>
            <span className="eyebrow" data-lang="en">{copy.eyebrow.en}</span>
            <h2 data-lang="fr">
              {copy.title.fr} <em className="ti">{copy.highlight?.fr}.</em>
            </h2>
            <h2 data-lang="en">
              {copy.title.en} <em className="ti">{copy.highlight?.en}.</em>
            </h2>
            <p data-lang="fr">{copy.description.fr}</p>
            <p data-lang="en">{copy.description.en}</p>
          </div>

          {/* ── Grille — rectangles stricts, verre minéral ─────────── */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {items.map((bde) => (
              <a
                key={bde.id}
                href={bde.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bde-partner-card group relative flex min-h-[15rem] flex-col overflow-hidden border border-white/10 bg-night/60 p-7 backdrop-blur-md transition-colors duration-500 hover:border-white/30 hover:bg-night/80"
              >
                {/* Tag + flèche diagonale. */}
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/60">
                    <Handshake size={12} className="text-brand" aria-hidden="true" />
                    <span data-lang="fr">{bde.tag.fr}</span>
                    <span data-lang="en">{bde.tag.en}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>

                {/* Identité — noms propres non traduits. */}
                <div className="mt-auto">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-white/50">
                    <span data-lang="fr">{bde.location.fr}</span>
                    <span data-lang="en">{bde.location.en}</span>
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                    {bde.universityName}
                  </h3>
                  <p className="mt-1.5 text-sm font-light text-white/70">{bde.bdeName}</p>

                  {/* Lien externe explicite. */}
                  <span className="mt-4 inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.12em] text-white/50 transition-colors duration-300 group-hover:text-white">
                    <span data-lang="fr">{cta.fr}</span>
                    <span data-lang="en">{cta.en}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>

                {/* Ligne métallique — balayage de la base au survol. */}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}