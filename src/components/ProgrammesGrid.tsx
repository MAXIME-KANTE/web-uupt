import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bath, BedDouble, MapPin, Maximize, MessageCircle } from 'lucide-react'
import { organization } from '../data/uuptData'
import { useLanguage } from '../context/LanguageContext'
import { buildSrcSet } from './HeroCarousel'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { getLenis } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* ── Données de gabarit ─────────────────────────────────────────────────
 * TODO(UUPT) : la source SALEEL (`src/data/properties.ts`, immobilier)
 * n'est PAS reprise (spec §7 « Retirés »). Le gabarit est conservé à
 * l'identique (grille asymétrique + cascade GSAP) en attendant la donnée
 * UUPT définitive (grille d'événements/programmes, tâches 8-13) : la liste
 * vide laisse la section muette (titre + CTA), sans contenu inventé. */
type PropertyType = 'appartement' | 'villa' | 'terrain' | 'bureau'

interface Property {
  id: string
  titleFr: string
  titleEn: string
  type: PropertyType
  city: string
  district: string
  priceXof: number
  bedrooms: number
  bathrooms: number
  surfaceM2: number
  image: string
  imageAltFr: string
  imageAltEn: string
  badgeFr?: string
  badgeEn?: string
}

const PROPERTIES: readonly Property[] = []

const formatPriceXof = (priceXof: number): string => `${priceXof.toLocaleString('fr-FR')} FCFA`

const PROPERTY_TYPE_LABELS: Record<PropertyType, { fr: string; en: string }> = {
  appartement: { fr: 'Appartement', en: 'Apartment' },
  villa: { fr: 'Villa', en: 'House' },
  terrain: { fr: 'Terrain', en: 'Land' },
  bureau: { fr: 'Bureau', en: 'Office' },
}

const propertyWhatsAppHref = (property: Property, lang: 'fr' | 'en'): string => {
  const message =
    lang === 'fr'
      ? `Bonjour ${organization.acronym}, je suis intéressé(e) par « ${property.titleFr} » (${property.city}). Pouvez-vous me donner plus d'informations ?`
      : `Hello ${organization.acronym}, I'm interested in "${property.titleEn}" (${property.city}). Could you send me more information?`
  return `https://wa.me/${organization.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Étendues asymétriques (desktop, grille 12 colonnes) : lignes 5+7, 7+5,
 *  4+4+4 — maillage net, jamais de rangée de carrés rigides. */
const SPANS: readonly string[] = [
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
] as const

/**
 * Grille des programmes immobiliers phares (page Immobilier) — refonte
 * haut de gamme inspirée 21st.dev / Framer :
 *
 * - Grille ASYMÉTRIQUE de conteneurs STRICTEMENT rectangulaires et
 *   VERTICAUX (ratio éditorial 4:5) sur fond sombre profond ;
 * - Design verre dépoli minimaliste : `border border-white/10`,
 *   `bg-night/60 backdrop-blur`, panneau d'infos en glassmorphism ;
 * - Micro-zoom fluide au survol : loupe de 3 % (scale 1.03) sur l'image,
 *   sans script bloquant ;
 * - Entrée au défilement : ScrollTrigger en cascade (stagger), set+to à fin
 *   explicite (jamais de `from`, qui figerait le prérendu).
 *
 * `prefers-reduced-motion` : aucun état posé, cartes visibles, statique.
 */
export default function ProgrammesGrid() {
  const root = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const { lang } = useLanguage()

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

  // Apparition en cascade des cartes.
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const cards = root.current.querySelectorAll('.programme')
      if (!cards.length) return
      gsap.set(cards, { y: 60, opacity: 0 })
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.09,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section className="section section--dark" id="biens" aria-label="Programmes immobiliers phares">
      <div className="container">
        <div ref={root}>
          <div className="section-heading">
            <span className="eyebrow" data-lang="fr">Programmes immobiliers phares</span>
            <span className="eyebrow" data-lang="en">Flagship real estate programmes</span>
            <h2 data-lang="fr">
              Le portail vers votre prochain <em className="ti">chez-vous.</em>
            </h2>
            <h2 data-lang="en">
              The gateway to your next <em className="ti">home.</em>
            </h2>
            <p data-lang="fr">
              Appartements, villas et biens d'exception sélectionnés par notre équipe — chaque
              annonce est vérifiée et accompagnée de bout en bout par nos conseillers.
            </p>
            <p data-lang="en">
              Apartments, houses and exceptional properties selected by our team — every listing
              is verified and supported end to end by our advisors.
            </p>
          </div>

          {/* Grille asymétrique — rectangles verticaux stricts 4:5. */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
{PROPERTIES.map((property, i) => {
              const typeLabel = PROPERTY_TYPE_LABELS[property.type]
              return (
                <figure
                  key={property.id}
                  className={`programme group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-night/60 backdrop-blur-md ${SPANS[i]}`}
                >
                  <img
                    src={property.image}
                    srcSet={buildSrcSet(property.image)}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    alt={lang === 'fr' ? property.imageAltFr : property.imageAltEn}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
                  />

                  {/* Type + badge en surimpression. */}
                  <span className="programme__type absolute left-4 top-4 z-10 rounded-sm border border-white/20 bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    <span data-lang="fr">{typeLabel.fr}</span>
                    <span data-lang="en">{typeLabel.en}</span>
                  </span>
                  {property.badgeFr && property.badgeEn && (
                    <span className="programme__badge absolute right-4 top-4 z-10 rounded-sm bg-brand px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white">
                      <span data-lang="fr">{property.badgeFr}</span>
                      <span data-lang="en">{property.badgeEn}</span>
                    </span>
                  )}

                  {/* Voile de lisibilité vers le bas. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-black/30 to-black/70"
                  />

                  {/* Panneau d'infos — verre dépoli minimaliste. */}
                  <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-white/5 p-4 backdrop-blur-md lg:p-5">
                    <p className="programme__price font-display text-lg font-bold text-white tabular-nums">
                      {formatPriceXof(property.priceXof)}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold leading-snug text-white">
                      <span data-lang="fr">{property.titleFr}</span>
                      <span data-lang="en">{property.titleEn}</span>
                    </h3>
                    <p className="programme__loc mt-1.5 flex items-center gap-1.5 text-xs text-white/85">
                      <MapPin size={13} aria-hidden="true" className="text-orange-400" />
                      <span>{property.city} · {property.district}</span>
                    </p>

                    <div className="programme__specs mt-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-white/80">
                      <span className="inline-flex items-center gap-1">
                        <Maximize size={12} aria-hidden="true" />
                        {property.surfaceM2} m²
                      </span>
                      <span className="opacity-40" aria-hidden="true">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BedDouble size={12} aria-hidden="true" />
                        <span data-lang="fr">{property.bedrooms} ch.</span>
                        <span data-lang="en">{property.bedrooms} bd.</span>
                      </span>
                      <span className="opacity-40" aria-hidden="true">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath size={12} aria-hidden="true" />
                        <span data-lang="fr">{property.bathrooms} sdb</span>
                        <span data-lang="en">{property.bathrooms} ba.</span>
                      </span>
                      <a
                        href={propertyWhatsAppHref(property, lang)}
                        target="_blank"
                        rel="noopener"
                        aria-label={lang === 'fr' ? 'Demander via WhatsApp' : 'Ask via WhatsApp'}
                        className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/15 text-white transition-colors hover:bg-white/10"
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </figure>
              )
            })}
          </div>
{/* CTA sous la grille. */}
          <div className="mt-12 flex justify-center">
            <Link to="/contact" className="button button--light">
              <span data-lang="fr">Vous ne trouvez pas votre bien ? Parlons-en</span>
              <span data-lang="en">Can't find your property? Let's talk</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}