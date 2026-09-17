import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroCarousel from './HeroCarousel'
import Reveal from './Reveal'
import type { AxeId } from '../constants'
import { AXE_GALLERIES } from '../constants'
import { activityAxes, axesCopy } from '../data/uuptData'

interface Pole {
  id: AxeId
  num: string
  to: string
  titleFr: string
  titleEn: string
  descFr: string
  descEn: string
}

/**
 * Les trois axes d'activités de l'UUPT — cartes dérivées de `activityAxes`
 * (source : `src/data/uuptData.ts`) : numéro d'ordre, titre, tagline et
 * route `/axe-<id>` de chaque axe. L'en-tête de section vient d'`axesCopy`.
 */
const POLES: readonly Pole[] = activityAxes.map((axis) => ({
  // Les ids de `activityAxes` sont alignés sur les clés d'`AXE_GALLERIES`.
  id: axis.id as AxeId,
  num: axis.order,
  to: `/axe-${axis.id}`,
  titleFr: axis.title.fr,
  titleEn: axis.title.en,
  descFr: axis.tagline.fr,
  descEn: axis.tagline.en,
}))

/**
 * Mini-diaporama d'une carte pôle : le HeroCarousel n'est monté que lorsque
 * la carte approche du viewport (IntersectionObserver, marge 300 px) — sans
 * quoi l'accueil chargerait ~24 background-images dès l'ouverture. Tant que
 * le diaporama n'est pas monté, la pastille sable tient la place (même
 * ratio). prefers-reduced-motion : HeroCarousel fige la première image.
 */
function CardSlideshow({ images }: { images: readonly string[] }) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = mediaRef.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setNear(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={mediaRef} className="service-card__media" aria-hidden="true">
      {/* Vignette ~45vw sur desktop (grille 2×2) : sizes plus fin que le
          100vw par défaut pour ne pas sur-télécharger. */}
      {near && (
        <HeroCarousel images={images} interval={2800} fast sizes="(min-width: 561px) 45vw, 92vw" />
      )}
    </div>
  )
}

/**
 * Section « Nos axes » de l'accueil — trois cartes BLANCHES dont chacune
 * porte un mini-diaporama rapide des images de son axe (`AXE_GALLERIES`).
 * La couleur vient des photographies, le reste de la carte reste encre
 * sur blanc (variante `.service-card--ink`). L'ancre `id="poles"` est la
 * cible du CTA primaire du hero.
 */
export default function PolesExpertise() {
  return (
    <section className="section section--tribal" id="poles">
      <div className="container">
        <Reveal className="section-heading section-heading--center">
          <span className="eyebrow" data-lang="fr">{axesCopy.eyebrow.fr}</span>
          <span className="eyebrow" data-lang="en">{axesCopy.eyebrow.en}</span>
          <h2 data-lang="fr">
            {axesCopy.title.fr}{' '}
            <em className="ti">{axesCopy.highlight ? `${axesCopy.highlight.fr}.` : ''}</em>
          </h2>
          <h2 data-lang="en">
            {axesCopy.title.en}{' '}
            <em className="ti">{axesCopy.highlight ? `${axesCopy.highlight.en}.` : ''}</em>
          </h2>
          <p data-lang="fr">{axesCopy.description.fr}</p>
          <p data-lang="en">{axesCopy.description.en}</p>
        </Reveal>

        <div className="service-grid service-grid--poles">
          {POLES.map((pole) => (
            <Reveal as="article" key={pole.id} className="service-card service-card--ink">
              {/* Mini-diaporama de l'axe (décoratif : la carte porte déjà son titre). */}
              <CardSlideshow images={AXE_GALLERIES[pole.id]} />
              <div className="service-card__top">
                <span>{pole.num}</span>
              </div>
              <h3 data-lang="fr">{pole.titleFr}</h3>
              <h3 data-lang="en">{pole.titleEn}</h3>
              <p data-lang="fr">{pole.descFr}</p>
              <p data-lang="en">{pole.descEn}</p>
              {/* Un seul lien : les libellés FR/EN sont des spans (un
                  `.service-card a` sur deux frères bilingues battrait la règle
                  de masquage [data-lang] et afficherait les deux langues). */}
              <Link to={pole.to}>
                <span data-lang="fr">Découvrir</span>
                <span data-lang="en">Discover</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
