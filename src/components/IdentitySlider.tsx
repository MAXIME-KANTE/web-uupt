import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useLanguage } from '../context/LanguageContext'

interface IdentitySlide {
  eyebrowFr: string
  eyebrowEn: string
  titleFr: string
  titleEn: string
  descFr: string
  descEn: string
}

const SLIDES: readonly IdentitySlide[] = [
  {
    eyebrowFr: 'Notre identité',
    eyebrowEn: 'Our identity',
    titleFr: 'SALEEL GROUPE, une signature africaine.',
    titleEn: 'A multi-sector group, an African signature.',
    descFr:
      "Génie civil, immobilier, comptabilité, numérique : quatre pôles d'excellence réunis pour bâtir des projets durables et ambitieux.",
    descEn:
      'Civil engineering, real estate, accounting, digital: four centers of excellence united to build sustainable and ambitious projects.',
  },
  {
    eyebrowFr: 'Notre vision',
    eyebrowEn: 'Our vision',
    titleFr: 'Créer de la valeur au cœur des territoires.',
    titleEn: 'Creating value at the heart of local communities.',
    descFr:
      "Allier savoir-faire local et standards internationaux pour répondre efficacement aux défis de développement en Afrique de l'Ouest.",
    descEn:
      "Combining local expertise and international standards to effectively meet West Africa's development challenges.",
  },
  {
    eyebrowFr: 'Nos valeurs',
    eyebrowEn: 'Our values',
    titleFr: "Rigueur, intégrité et quête permanente d'excellence.",
    titleEn: 'Rigour, integrity and a constant quest for excellence.',
    descFr:
      'Un engagement total auprès de nos clients et partenaires, fondé sur la transparence et la réussite partagée.',
    descEn:
      'Total commitment to our clients and partners, built on transparency and shared success.',
  },
  {
    eyebrowFr: 'Engagement diaspora',
    eyebrowEn: 'Diaspora commitment',
    titleFr: 'Votre partenaire de confiance depuis l’étranger.',
    titleEn: 'Your trusted partner from abroad.',
    descFr:
      "Un accompagnement sur-mesure et transparent pour concrétiser et sécuriser vos projets d'investissement au Sénégal.",
    descEn:
      'Tailored, transparent support to realize and secure your investment projects in Senegal.',
  },
]

/**
 * Carrousel de textes de la bannière signature (motif Kenté) :
 * défilement automatique toutes les 3 s, pause au survol,
 * respect de prefers-reduced-motion.
 */
export default function IdentitySlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { lang } = useLanguage()

  useEffect(() => {
    if (prefersReducedMotion || paused || SLIDES.length < 2) return
    const id = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % SLIDES.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [paused, prefersReducedMotion])

  return (
    <div
      className="identity-carousel"
      aria-label={lang === 'fr' ? 'Notre identité' : 'Our identity'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, index) => (
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
