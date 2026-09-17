import { Fragment, useRef } from 'react'
import type { ElementType } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Segment de titre : `t` = texte, `ti` = fragment en italique éditoriale (em.ti). */
export interface TitleSegment {
  t: string
  ti?: boolean
}

interface GsapWordsProps {
  /** Contenu français — chaîne simple ou segments (fragments `ti` en em.ti). */
  fr: string | TitleSegment[]
  /** Contenu anglais — même forme que `fr`. */
  en: string | TitleSegment[]
  /** Élément rendu (h2 par défaut) — comme Reveal. */
  as?: ElementType
  className?: string
  /** Déclenchement ScrollTrigger ("top 85%" par défaut). */
  triggerStart?: string
}

interface Word {
  w: string
  ti: boolean
}

/** Chaîne/segments → liste de mots plats, chacun portant l'italique de son segment. */
function toWords(input: string | TitleSegment[]): Word[] {
  const segments = typeof input === 'string' ? [{ t: input }] : input
  return segments.flatMap((segment) =>
    segment.t
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, ti: segment.ti === true })),
  )
}

/** Une variante langue : mots enveloppés chacun dans un masque overflow-hidden. */
function LangWords({ lang, words }: { lang: 'fr' | 'en'; words: Word[] }) {
  return (
    <span data-lang={lang}>
      {words.map((word, i) => (
        <Fragment key={`${lang}-${i}`}>
          {/* Masque : le conteneur fixe, le mot glisse dedans (yPercent 118 → 0). */}
          <span className="inline-block overflow-hidden">
            <span className={word.ti ? 'gw-i ti' : 'gw-i'}>{word.w}</span>
          </span>{' '}
        </Fragment>
      ))}
    </span>
  )
}

/**
 * Titre bilingue révélé mot à mot au scroll (GSAP + ScrollTrigger).
 * Chaque mot vit dans un masque `overflow-hidden` ; l'inner glisse de
 * yPercent 118 → 0 en power4.out. Le masquage data-lang du site reste
 * maître (les wrappers de langue portent data-lang, jamais les mots).
 * `prefers-reduced-motion` : aucun tween — le titre est rendu tel quel.
 */
export default function GsapWords({
  fr,
  en,
  as = 'h2',
  className,
  triggerStart = 'top 85%',
}: GsapWordsProps) {
  const root = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reduced || !root.current) return
      const inners = root.current.querySelectorAll('.gw-i')
      if (!inners.length) return
      // set immédiat + to explicites (pas de from) : un `from` capture l'état
      // inline courant comme valeur de FIN — si le HTML prérendu transporte
      // encore le transform initial, l'animation resterait figée (voir
      // scripts/prerender.mjs qui force l'état final avant sérialisation).
      gsap.set(inners, { yPercent: 118 })
      gsap.to(inners, {
        yPercent: 0,
        duration: 0.85,
        ease: 'power4.out',
        stagger: 0.055,
        scrollTrigger: { trigger: root.current, start: triggerStart, once: true },
      })
    },
    { scope: root, dependencies: [reduced, triggerStart] },
  )

  const Tag: ElementType = as

  return (
    <Tag ref={root} className={className}>
      <LangWords lang="fr" words={toWords(fr)} />
      <LangWords lang="en" words={toWords(en)} />
    </Tag>
  )
}
