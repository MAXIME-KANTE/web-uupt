import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Un visuel de la galerie — paires fr/en + image (voir AXE_GALLERIES). */
export interface ShowcaseSlide {
  labelFr: string
  labelEn: string
  titleFr: string
  titleEn: string
  subtitleFr: string
  subtitleEn: string
  textFr: string
  textEn: string
  image: string
  alt: string
}

interface ShowcaseCarouselProps {
  slides: readonly ShowcaseSlide[]
  /** Sur-titre de l'en-tête (paires fr/en). */
  eyebrowFr: string
  eyebrowEn: string
  /** Titre de l'en-tête (paires fr/en). */
  titleFr: string
  titleEn: string
  /** Lien optionnel à droite de l'en-tête (label fr/en + route). */
  link?: { to: string; fr: string; en: string }
  /** Libellé accessible de la section carrousel. */
  ariaLabel?: string
}

const AUTOPLAY_DELAY = 6000

/**
 * Carrousel « galerie » (gabarit Réalisations SALEEL, paramétré UUPT) :
 * lecture automatique, pause au survol, respect de prefers-reduced-motion.
 * Les slides sont fournies par la page (pages d'axes : AXE_GALLERIES).
 */
export default function ShowcaseCarousel({
  slides,
  eyebrowFr,
  eyebrowEn,
  titleFr,
  titleEn,
  link,
  ariaLabel,
}: ShowcaseCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { lang } = useLanguage()

  useEffect(() => {
    if (prefersReducedMotion || paused || slides.length < 2) return
    const id = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length)
    }, AUTOPLAY_DELAY)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, paused, slides.length])

  // Galerie vide (aucune photo encore disponible) : section muette.
  if (!slides.length) return null

  return (
    <div
      className="showcase-wrapper"
      aria-label={ariaLabel ?? (lang === 'fr' ? 'Galerie photos' : 'Photo gallery')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Accent encre en haut à gauche */}
      <div className="showcase-accent" aria-hidden="true" />

      <div className="showcase-card">
        {/* En-tête : titre + lien optionnel */}
        <div className="showcase-header">
          <div className="section-heading">
            <span className="eyebrow" data-lang="fr">{eyebrowFr}</span>
            <span className="eyebrow" data-lang="en">{eyebrowEn}</span>
            <h2 data-lang="fr">{titleFr}</h2>
            <h2 data-lang="en">{titleEn}</h2>
          </div>
          {link && (
            <Link to={link.to} className="button button--outline" data-lang="fr">
              {link.fr}
            </Link>
          )}
          {link && (
            <Link to={link.to} className="button button--outline" data-lang="en">
              {link.en}
            </Link>
          )}
        </div>

        {/* Conteneur des slides */}
        <div className="showcase-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.titleFr}
              className={index === current ? 'showcase-slide is-active' : 'showcase-slide'}
            >
              <div className="showcase-grid">
                <div className="showcase-text">
                  <div className="showcase-badge">
                    <div className="badge-logo">
                      <BrandLogo variant="badge" />
                    </div>
                    <div className="badge-separator" />
                    <span className="badge-label" data-lang="fr">{slide.labelFr}</span>
                    <span className="badge-label" data-lang="en">{slide.labelEn}</span>
                  </div>
                  <h2 data-lang="fr">{slide.titleFr}</h2>
                  <h2 data-lang="en">{slide.titleEn}</h2>
                  <p className="showcase-subtitle" data-lang="fr">{slide.subtitleFr}</p>
                  <p className="showcase-subtitle" data-lang="en">{slide.subtitleEn}</p>
                  <p data-lang="fr">{slide.textFr}</p>
                  <p data-lang="en">{slide.textEn}</p>
                </div>
                <div className="showcase-image">
                  <img src={slide.image} alt={slide.alt} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commandes : pastilles + flèches */}
        <div className="showcase-controls" role="tablist" aria-label={lang === 'fr' ? 'Navigation de la galerie' : 'Gallery navigation'}>
          <div className="showcase-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.titleFr}
                type="button"
                className={index === current ? 'showcase-dot is-active' : 'showcase-dot'}
                aria-label={`${lang === 'fr' ? 'Visuel' : 'Visual'} ${index + 1}`}
                role="tab"
                aria-selected={index === current}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
          <div className="showcase-arrows">
            <button
              type="button"
              className="showcase-arrow"
              aria-label={lang === 'fr' ? 'Visuel précédent' : 'Previous visual'}
              onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="showcase-arrow"
              aria-label={lang === 'fr' ? 'Visuel suivant' : 'Next visual'}
              onClick={() => setCurrent((current + 1) % slides.length)}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
