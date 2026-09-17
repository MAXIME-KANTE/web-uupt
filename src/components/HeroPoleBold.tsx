import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroCarousel from './HeroCarousel'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../lib/gsap'

interface HeroPoleBoldProps {
  /** Diaporama de l'axe (galerie de l'axe, voir AXE_GALLERIES). */
  images: readonly string[]
  ariaLabel: string
  eyebrowFr: string
  eyebrowEn: string
  /** Titre massif — découpé mot à mot (une seule chaîne, retour à la ligne naturel). */
  titleFr: string
  titleEn: string
  leadFr: string
  leadEn: string
  ctaFr: string
  ctaEn: string
}

/**
 * Découpe un texte en mots « inline-block » cachés dans un masque
 * `overflow: hidden` — équivalent maison de SplitText (sans plugin licence).
 * La timeline GSAP fait remonter chaque mot de `y:100 → 0` : le texte semble
 * sortir du sol, mot par mot, derrière le masque.
 */
function splitWords(text: string) {
  const words = text.split(' ')
  return (
    <span className="hero-immo__mask inline-block overflow-hidden">
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 ? ' ' : null}
          <span className="hero-immo__word word-animate inline-block">{word}</span>
        </Fragment>
      ))}
    </span>
  )
}

/**
 * Hero « Contraste Typographique Massif » des pages pôles (standard Framer /
 * Lovart) — initialement dessiné pour /immobilier, appliqué aux QUATRE pôles :
 *
 * - Plein écran (100svh), diaporama rapide des images du pôle (3,4 s) sous un
 *   SCRIM gradient directionnel (noir 80 % à gauche → transparent à droite)
 *   qui garantit la lisibilité du texte blanc aligné à gauche ;
 * - Typographie « Contraste Massif » : surtitre ORANGE `text-sm
 *   tracking-[0.25em] text-orange-400`, titre massif en Poppins (text-5xl →
 *   lg:text-8xl, leading-[1.05], tracking-tight, max-w-4xl), accroche
 *   slate-200 max-w-2xl, puis bouton STRICTEMENT rectangulaire (rounded-sm)
 *   orange ;
 * - Timeline d'entrée GSAP (useGSAP, scope composant) : le surtitre apparaît
 *   en fondu → les mots du titre remontent de derrière leur masque (y:100,
 *   duration 0.9, stagger 0.04, power4.out) → le paragraphe et le bouton
 *   montent doucement (y:30, cascade).
 *
 * (Les classes CSS `.hero--immo` / `.hero-immo__*` restent celles du hero
 * Immobilier d'origine — bloc dédié en fin de App.css.)
 *
 * `prefers-reduced-motion` : aucune animation posée — le contenu est
 * directement visible (le prérendu sérialise aussi les états finaux).
 */
export default function HeroPoleBold({
  images,
  ariaLabel,
  eyebrowFr,
  eyebrowEn,
  titleFr,
  titleEn,
  leadFr,
  leadEn,
  ctaFr,
  ctaEn,
}: HeroPoleBoldProps) {
  const root = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reduced || !root.current) return
      const eyebrow = Array.from(root.current.querySelectorAll('.hero-immo__eyebrow'))
      const words = Array.from(root.current.querySelectorAll('.hero-immo__word'))
      const lead = Array.from(root.current.querySelectorAll('.hero-immo__lead'))
      const cta = Array.from(root.current.querySelectorAll('.hero-immo__cta'))

      const timeline = gsap.timeline()
      timeline
        // 1. Le surtitre apparaît en fondu (première scène de la chorégraphie).
        .fromTo(
          eyebrow,
          { opacity: 0 },
          { opacity: 1, duration: 0.55, ease: 'power2.out' },
        )
        // 2. Les mots du titre remontent de derrière leur masque.
        .fromTo(
          words,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power4.out',
          },
          '-=0.3',
        )
        // 3. Accroche puis bouton : fondu vers le haut (y:30), en cascade.
        .fromTo(
          lead,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.25',
        )
        .fromTo(
          cta,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.2',
        )
    },
    { scope: root },
  )

  return (
    <>
      <section className="hero hero--immo" aria-label={ariaLabel}>
        {/* Diaporama rapide des images du pôle (volet = 3,4 s, mêmes règles
            de performance que les autres heroes de pages pôles). */}
        <HeroCarousel images={images} interval={3400} fast priority />
        {/* Scrim de lisibilité : gradient directionnel noir → transparent.
            Le texte blanc à gauche ressort sur 80 % d'opacité, la photo
            reste pleinement visible à droite. */}
        <div
          className="hero-immo__scrim absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
          aria-hidden="true"
        />

        <div className="container">
          <div className="hero-immo__content">
            {/* Surtitre orange — apparition en fondu, première scène. */}
            <span
              className="hero-immo__eyebrow text-sm font-semibold tracking-[0.25em] text-orange-400 uppercase mb-4"
              data-lang="fr"
            >
              {eyebrowFr}
            </span>
            <span
              className="hero-immo__eyebrow text-sm font-semibold tracking-[0.25em] text-orange-400 uppercase mb-4"
              data-lang="en"
            >
              {eyebrowEn}
            </span>

            {/* Titre massif — chaque mot monte de derrière son propre masque
                (SplitText simulé, word-animate). */}
            <h1
              className="hero-immo__title font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl"
              data-lang="fr"
            >
              {splitWords(titleFr)}
            </h1>
            <h1
              className="hero-immo__title font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight max-w-4xl"
              data-lang="en"
            >
              {splitWords(titleEn)}
            </h1>

            {/* Accroche. */}
            <p
              className="hero-immo__lead text-lg md:text-xl text-slate-200 mt-8 max-w-2xl leading-relaxed"
              data-lang="fr"
            >
              {leadFr}
            </p>
            <p
              className="hero-immo__lead text-lg md:text-xl text-slate-200 mt-8 max-w-2xl leading-relaxed"
              data-lang="en"
            >
              {leadEn}
            </p>

            {/* CTA — STRICTEMENT un rectangle étiré (rounded-sm, jamais carré
                ni pill). Libellés FR/EN DANS le même lien. */}
            <Link
              to="/contact"
              className="hero-immo__cta inline-flex items-center gap-3 rounded-sm bg-orange-500 hover:bg-orange-600 text-white font-bold tracking-wide px-10 py-4 mt-10 transition-all"
            >
              <span data-lang="fr">{ctaFr}</span>
              <span data-lang="en">{ctaEn}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sentinelle APRÈS le hero : la navbar se compacte au défilement et la
          première section remonte en carte claire sur le bord inférieur. */}
      <div className="scroll-sentinel" aria-hidden="true" />
    </>
  )
}
