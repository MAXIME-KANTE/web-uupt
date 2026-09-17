import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useLanguage } from '../../context/LanguageContext'
import Reveal from '../Reveal'
import type { Stat } from '../../types'
import { keyStats } from '../../data/uuptData'

/**
 * Bande « L'UUPT en chiffres » — compteurs animés au passage à l'écran,
 * pilotée par `keyStats` de `src/data/uuptData.ts` (établissements, axes,
 * événements, disciplines). `prefix`/`suffix` (« +10 », « 12+ ») sont
 * accolés au nombre compté sans être animés ; `detail` et `icon` restent
 * disponibles dans la donnée pour les pages intérieures (aucun slot CSS
 * dans cette bande : le gabarit n'affiche que figure + libellé).
 *
 * Implémentation : un rAF par compteur, eased outExpo, écriture directe
 * dans `textContent` (aucun setState, aucun re-render). La valeur finale
 * reste accessible aux lecteurs d'écran via un `sr-only` ; le nombre
 * animé est `aria-hidden`. `prefers-reduced-motion` → valeur immédiate.
 */

const DURATION_MS = 1500

/** easeOutExpo : départ vif, atterrissage précis — le classique des compteurs éditoriaux. */
const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))

interface StatsBandProps {
  /** Chiffres affichés — défaut : `keyStats` de uuptData. */
  stats?: readonly Stat[]
}

function format(value: number): string {
  return String(Math.round(value))
}

function CounterValue({
  value,
  prefix = '',
  suffix = '',
  reduced,
}: {
  value: number
  prefix?: string
  suffix?: string
  reduced: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const write = (current: number) => {
      node.textContent = `${prefix}${format(current)}${suffix}`
    }
    write(reduced ? value : 0)
    if (reduced) return

    let raf = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1)
        write(value * easeOutExpo(progress))
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
  }, [value, prefix, suffix, reduced])

  return (
    <span className="stats-band__figure">
      {/* Valeur finale toujours accessible, nombre animé décoratif. */}
      <span className="sr-only">{`${prefix}${format(value)}${suffix}`}</span>
      <span ref={ref} aria-hidden="true" />
    </span>
  )
}

export default function StatsBand({ stats = keyStats }: StatsBandProps) {
  const reduced = usePrefersReducedMotion()
  // Un attribut aria-label ne peut pas suivre le motif des paires data-lang :
  // la variante est choisie au rendu selon la langue active.
  const { lang } = useLanguage()

  return (
    <section
      className="stats-band"
      aria-label={lang === 'fr' ? "L'UUPT en chiffres" : 'UUPT in numbers'}
    >
      <div className="container">
        <Reveal className="stats-band__heading">
          <span className="eyebrow eyebrow--onDark" data-lang="fr">L’UUPT en chiffres</span>
          <span className="eyebrow eyebrow--onDark" data-lang="en">UUPT in numbers</span>
        </Reveal>
        <div className="stats-band__row">
          {stats.map((stat) => (
            <Reveal key={stat.id} className="stats-band__item">
              <CounterValue
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                reduced={reduced}
              />
              <span className="stats-band__label">
                <span data-lang="fr">{stat.label.fr}</span>
                <span data-lang="en">{stat.label.en}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
