import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface ShowcaseSlide {
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

const SLIDES: readonly ShowcaseSlide[] = [
  {
    labelFr: 'Groupe',
    labelEn: 'Group',
    titleFr: 'SALEEL GROUPE ouvre officiellement ses portes à Thiès',
    titleEn: 'SALEEL GROUPE officially opens its doors in Thiès',
    subtitleFr: 'Lancement – Octobre 2026',
    subtitleEn: 'Launch – October 2026',
    textFr:
      "Quatre pôles, une seule équipe : SALEEL GROUPE démarre ses activités en génie civil, immobilier, comptabilité et numérique, avec l'ambition de devenir un acteur de référence en Afrique de l'Ouest d'ici 2035.",
    textEn:
      'Four divisions, one team: SALEEL GROUPE begins operations in civil engineering, real estate, accounting and digital, with the ambition of becoming a leading player in West Africa by 2035.',
    image: '/asso.webp',
    alt: 'SALEEL GROUPE – lancement des activités',
  },
  {
    labelFr: 'Numérique',
    labelEn: 'Digital',
    titleFr: 'Mise en ligne du site web SALEEL GROUPE',
    titleEn: 'SALEEL GROUPE website goes live',
    subtitleFr: 'Juin 2026',
    subtitleEn: 'June 2026',
    textFr:
      "Notre pôle Numérique lance le site officiel du groupe, bilingue et pensé pour nos clients au Sénégal et dans la diaspora. Une vitrine digitale moderne qui reflète l'ambition et la qualité de nos travaux.",
    textEn:
      "Our Digital division launches the group's official website, bilingual and designed for clients in Senegal and the diaspora. A modern digital showcase reflecting the ambition and quality of our work.",
    image: '/travaux-rehabilitation-batiment-genie-civil-construction-chantier-795.webp',
    alt: 'SALEEL GROUPE – site web',
  },
  {
    labelFr: 'Génie Civil',
    labelEn: 'Civil Engineering',
    titleFr: 'Premiers chantiers suivis par notre pôle BTP',
    titleEn: 'First sites supervised by our construction division',
    subtitleFr: 'À venir',
    subtitleEn: 'Coming soon',
    textFr:
      'Études géotechniques et suivi de chantier : nos premiers projets de construction seront bientôt présentés ici. L’équipe BTP de SALEEL GROUPE met au point des solutions durables, adaptées aux réalités du terrain et aux exigences modernes.',
    textEn:
      'Geotechnical studies and site supervision: our first construction projects will be featured here soon. The BTP team at SALEEL GROUPE develops sustainable solutions, adapted to field realities and modern requirements.',
    image: '/images/7.webp',
    alt: 'SALEEL GROUPE – génie civil',
  },
  {
    labelFr: 'Immobilier',
    labelEn: 'Real Estate',
    titleFr: 'Premiers biens disponibles à la vente et à la location',
    titleEn: 'First properties available for sale and rent',
    subtitleFr: 'À venir',
    subtitleEn: 'Coming soon',
    textFr:
      'Notre catalogue de biens à Thiès et dans les environs sera publié prochainement. Du neuf comme de l’occasion, nos programmes immobiliers allient design, qualité et rentabilité.',
    textEn:
      'Our catalogue of properties in and around Thiès will be published soon. New and resale properties, our real estate programmes combine design, quality and profitability.',
    image: '/images/6.webp',
    alt: 'SALEEL GROUPE – immobilier',
  },
  {
    labelFr: 'Comptabilité',
    labelEn: 'Accounting',
    titleFr: 'Accompagnement des premières créations d’entreprises',
    titleEn: 'Support for our first business registrations',
    subtitleFr: 'À venir',
    subtitleEn: 'Coming soon',
    textFr:
      'Notre pôle Comptabilité ouvre ses portes aux indépendants et porteurs de projets. Expertise comptable, fidélisation et optimisations fiscales : une offre clé en main pour sécuriser votre entreprise.',
    textEn:
      'Our Accounting division opens to freelancers and project owners. Bookkeeping, tax optimisation and compliance: a turnkey service to secure your business.',
    image: '/je.webp',
    alt: 'SALEEL GROUPE – comptabilité',
  },
  {
    labelFr: 'Groupe',
    labelEn: 'Group',
    titleFr: 'Partenariats bancaires avec BOA et BSIC',
    titleEn: 'Banking partnerships with BOA and BSIC',
    subtitleFr: 'À venir',
    subtitleEn: 'Coming soon',
    textFr:
      'SALEEL GROUPE annoncera prochainement ses partenariats stratégiques avec la Banque Occidentale d’Afrique (BOA) et la BSIC pour faciliter le financement et le découvert bancaire de vos projets.',
    textEn:
      'SALEEL GROUPE will soon announce its strategic partnerships with the West African Bank (BOA) and BSIC to facilitate project financing and banking facilities.',
    image: '/images/8.webp',
    alt: 'SALEEL GROUPE – partenariats bancaires',
  },
]

const AUTOPLAY_DELAY = 6000

/**
 * Carrousel « Réalisations » de la page Nos Réalisations :
 * lecture automatique, pause au survol, respect de prefers-reduced-motion.
 */
export default function ShowcaseCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { lang } = useLanguage()

  useEffect(() => {
    if (prefersReducedMotion || paused || SLIDES.length < 2) return
    const id = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % SLIDES.length)
    }, AUTOPLAY_DELAY)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, paused])

  return (
    <div
      className="showcase-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Accent orange en haut à gauche */}
      <div className="showcase-accent" aria-hidden="true" />

      <div className="showcase-card">
        {/* En-tête : titre + lien vers toutes les réalisations */}
        <div className="showcase-header">
          <div className="section-heading">
            <span className="eyebrow" data-lang="fr">Nos Réalisations</span>
            <span className="eyebrow" data-lang="en">Our Achievements</span>
            <h2 data-lang="fr">Ce que nous accomplissons, pôle par pôle.</h2>
            <h2 data-lang="en">What we're achieving, division by division.</h2>
          </div>
          <Link to="/realisations" className="button button--outline" data-lang="fr">
            Toutes nos réalisations →
          </Link>
          <Link to="/realisations" className="button button--outline" data-lang="en">
            All our achievements →
          </Link>
        </div>

        {/* Conteneur des slides */}
        <div className="showcase-slides">
          {SLIDES.map((slide, index) => (
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
        <div className="showcase-controls" role="tablist" aria-label={lang === 'fr' ? 'Navigation des réalisations' : 'Achievements navigation'}>
          <div className="showcase-dots">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.titleFr}
                type="button"
                className={index === current ? 'showcase-dot is-active' : 'showcase-dot'}
                aria-label={`${lang === 'fr' ? 'Réalisation' : 'Achievement'} ${index + 1}`}
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
              aria-label={lang === 'fr' ? 'Réalisation précédente' : 'Previous achievement'}
              onClick={() => setCurrent((current - 1 + SLIDES.length) % SLIDES.length)}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="showcase-arrow"
              aria-label={lang === 'fr' ? 'Réalisation suivante' : 'Next achievement'}
              onClick={() => setCurrent((current + 1) % SLIDES.length)}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
