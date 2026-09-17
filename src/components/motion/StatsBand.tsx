import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useLanguage } from '../../context/LanguageContext'
import Reveal from '../Reveal'

/**
 * Bande « Le groupe en chiffres » — compteurs animés au passage à l'écran.
 *
 * Seuls des chiffres réels et vérifiables du site sont comptés (pôles,
 * dates clés) : aucun chiffre commercial n'est inventé. « Thiès » reste
 * un libellé textuel.
 *
 * Implémentation : un rAF par compteur, eased outExpo, écriture directe
 * dans `textContent` (aucun setState, aucun re-render). La valeur finale
 * reste accessible aux lecteurs d'écran via un `sr-only` ; le nombre
 * animé est `aria-hidden`. `prefers-reduced-motion` → valeur immédiate.
 */

const DURATION_MS = 1500

/** easeOutExpo : départ vif, atterrissage précis — le classique des compteurs éditoriaux. */
const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))

type Stat = {
  /** Valeur numérique à compter (absente pour les libellés purs comme « Thiès »). */
  value?: number
  /** Longueur de zéro de remplissage (« 4 » → « 04 »). */
  pad?: number
  /** Libellé non numérique. */
  text?: string
  fr: string
  en: string
}

const STATS: readonly Stat[] = [
  { value: 4, pad: 2, fr: "Pôles d'activité", en: 'Business divisions' },
  { value: 2026, fr: 'Année de lancement', en: 'Year founded' },
  { value: 2035, fr: 'Vision Afrique de l’Ouest', en: 'West Africa vision' },
  { text: 'Thiès', fr: 'Siège social, Sénégal', en: 'Headquarters, Senegal' },
]

function format(value: number, pad = 0): string {
  return String(Math.round(value)).padStart(pad, '0')
}

function CounterValue({ value, pad = 0, reduced }: { value: number; pad?: number; reduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.textContent = format(reduced ? value : 0, pad)
    if (reduced) return

    let raf = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1)
        node.textContent = format(value * easeOutExpo(progress), pad)
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // Déclenchement une seule fois, quand la bande entre à l'écran.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, pad, reduced])

  return (
    <span className="stats-band__figure">
      {/* Valeur finale toujours accessible, nombre animé décoratif. */}
      <span className="sr-only">{format(value, pad)}</span>
      <span ref={ref} aria-hidden="true" />
    </span>
  )
}

export default function StatsBand() {
  const reduced = usePrefersReducedMotion()
  // Un attribut aria-label ne peut pas suivre le motif des paires data-lang :
  // la variante est choisie au rendu selon la langue active.
  const { lang } = useLanguage()

  return (
    <section
      className="stats-band"
      aria-label={lang === 'fr' ? 'SALEEL GROUPE en chiffres' : 'SALEEL GROUPE in numbers'}
    >
      <div className="container">
        <Reveal className="stats-band__heading">
          <span className="eyebrow eyebrow--onDark" data-lang="fr">Le groupe en chiffres</span>
          <span className="eyebrow eyebrow--onDark" data-lang="en">The group in numbers</span>
        </Reveal>
        <div className="stats-band__row">
          {STATS.map((stat) => (
            <Reveal key={stat.fr} className="stats-band__item">
              {stat.value !== undefined ? (
                <CounterValue value={stat.value} pad={stat.pad} reduced={reduced} />
              ) : (
                <span className="stats-band__figure">{stat.text}</span>
              )}
              <span className="stats-band__label">
                <span data-lang="fr">{stat.fr}</span>
                <span data-lang="en">{stat.en}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
