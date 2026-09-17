import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import Reveal from '../Reveal'

export interface ProcessPhase {
  eyebrowFr: string
  eyebrowEn: string
  fr: string
  en: string
  descFr: string
  descEn: string
}

interface ProcessTimelineProps {
  /** Étapes — textes repris tels quels de la section « Notre méthode ». */
  phases: readonly ProcessPhase[]
}

/**
 * Timeline verticale pilotée par le scroll : une ligne se remplit (scaleY,
 * GPU) à mesure que la section traverse le viewport et l'étape courante
 * s'active (pastille + contraste). Le `setState` ne survient qu'au changement
 * d'étape — jamais par pixel.
 *
 * Sous `prefers-reduced-motion` : ligne statique, toutes les étapes actives,
 * simples révélations au viewport (contenu immédiatement accessible).
 */
export default function ProcessTimeline({ phases }: ProcessTimelineProps) {
  const reduced = usePrefersReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.82', 'end 0.45'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const next = Math.min(
      phases.length - 1,
      Math.max(0, Math.floor(progress * phases.length)),
    )
    // Même valeur → React ignore le rendu : pas de re-render par pixel.
    setActive(next)
  })

  return (
    <div className="process-timeline">
      <div className="process-line" aria-hidden="true">
        <motion.div
          className="process-line__fill"
          style={reduced ? { scaleY: 1 } : { scaleY }}
        />
      </div>
      <ol ref={listRef} className="process-steps">
        {phases.map((phase, index) => {
          const isActive = reduced || index <= active
          return (
            <Reveal
              as="li"
              key={phase.eyebrowFr}
              className={`process-step${isActive ? ' is-active' : ''}`}
            >
              <span className="process-step__dot" aria-hidden="true" />
              <span className="eyebrow" data-lang="fr">
                {phase.eyebrowFr}
              </span>
              <span className="eyebrow" data-lang="en">
                {phase.eyebrowEn}
              </span>
              <h3 data-lang="fr">{phase.fr}</h3>
              <h3 data-lang="en">{phase.en}</h3>
              <p data-lang="fr">{phase.descFr}</p>
              <p data-lang="en">{phase.descEn}</p>
            </Reveal>
          )
        })}
      </ol>
    </div>
  )
}
