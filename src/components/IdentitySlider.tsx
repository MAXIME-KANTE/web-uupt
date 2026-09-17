import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useLanguage } from '../context/LanguageContext'

/** Un texte de présentation de l'Union — paires bilingues (pattern Valeur/Prestation). */
export interface IdentitySlide {
  eyebrowFr: string
  eyebrowEn: string
  titleFr: string
  titleEn: string
  descFr: string
  descEn: string
}

interface IdentitySliderProps {
  /** Diaporama de textes (identité, création, mission…) — requis, contenu UUPT. */
  slides: readonly IdentitySlide[]
  /** Libellé accessible du carrousel ; défaut : l'eyebrow de la 1re slide. */
  ariaLabelFr?: string
  ariaLabelEn?: string
}

/**
 * Carrousel de textes de la bannière signature (motif Kenté) :
 * défilement automatique toutes les 3 s, pause au survol,
 * respect de prefers-reduced-motion.
 *
 * À placer dans une section sombre (`section.pattern-banner` d'App.css) :
 * les textes héritent sa couleur blanche — le composant ne porte aucun fond.
 */
export default function IdentitySlider({ slides, ariaLabelFr, ariaLabelEn }: IdentitySliderProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { lang } = useLanguage()

  useEffect(() => {
    if (prefersReducedMotion || paused || slides.length < 2) return
    const id = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [paused, prefersReducedMotion, slides.length])

  if (!slides.length) return null

  const ariaLabel =
    lang === 'fr'
      ? (ariaLabelFr ?? slides[0].eyebrowFr)
      : (ariaLabelEn ?? slides[0].eyebrowEn)

  return (
    <div
      className="identity-carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.eyebrowFr}
          className={index === current ? 'identity-slide is-active' : 'identity-slide'}
        >
          <span className="eyebrow" data-lang="fr">{slide.eyebrowFr}</span>
          <span className="eyebrow" data-lang="en">{slide.eyebrowEn}</span>
          <h2 data-lang="fr">{slide.titleFr}</h2>
          <h2 data-lang="en">{slide.titleEn}</h2>
          <p data-lang="fr">{slide.descFr}</p>
          <p data-lang="en">{slide.descEn}</p>
        </div>
      ))}
    </div>
  )
}
