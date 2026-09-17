import { Link } from 'react-router-dom'
import { ArrowRight, Handshake } from 'lucide-react'
import HeroPoleBold from './HeroPoleBold'
import PrestationsAccordion from './PrestationsAccordion'
import type { Prestation } from './PrestationsAccordion'
import ShowcaseCarousel from './ShowcaseCarousel'
import type { ShowcaseSlide } from './ShowcaseCarousel'
import Reveal from './Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCalquePool } from '../hooks/useCalquePool'
import { useLanguage } from '../context/LanguageContext'
import { AXE_GALLERIES } from '../constants'
import type { AxeId } from '../constants'
import { navLinks } from '../data/uuptData'
import type { ActivityAxis } from '../types'

/* ── Légendes de galerie (copie d'interface, une par photo d'axe) ───────
 * Les images viennent d'AXE_GALLERIES (constants.ts) — les légendes vivent
 * ici : elles décrivent le TYPE de moment photographié (illustrations
 * Unsplash en attendant les vraies photos d'événements, voir le TODO dans
 * constants.ts). L'étiquette du badge reprend le titre de l'axe. */
const AXE_GALLERY_SLIDES: Record<AxeId, readonly ShowcaseSlide[]> = {
  'academique-culturel': [
    {
      labelFr: 'Académique & Culturel',
      labelEn: 'Academic & Cultural',
      titleFr: 'Rencontres et émulation',
      titleEn: 'Encounters and emulation',
      subtitleFr: 'Photo d’illustration',
      subtitleEn: 'Illustrative photo',
      textFr:
        'Panels, débats et formations : l’axe réunit les campus autour des grandes idées du moment.',
      textEn:
        'Panels, debates and training: the axis brings campuses together around the ideas of the moment.',
      image: AXE_GALLERIES['academique-culturel'][0],
      alt: 'Salle de bibliothèque universitaire – illustration',
    },
    {
      labelFr: 'Académique & Culturel',
      labelEn: 'Academic & Cultural',
      titleFr: 'Éloquence et culture générale',
      titleEn: 'Eloquence and general knowledge',
      subtitleFr: 'Photo d’illustration',
      subtitleEn: 'Illustrative photo',
      textFr:
        'Plaidoiries et concours d’éloquence mettent en lumière les talents de chaque filière.',
      textEn:
        'Moot courts and public-speaking contests spotlight the talents of every programme.',
      image: AXE_GALLERIES['academique-culturel'][1],
      alt: 'Panel académique étudiant sur scène – illustration',
    },
  ],
  innovation: [
    {
      labelFr: 'Innovation',
      labelEn: 'Innovation',
      titleFr: 'Prototypes en exposition',
      titleEn: 'Prototypes on display',
      subtitleFr: 'Photo d’illustration',
      subtitleEn: 'Illustrative photo',
      textFr:
        'Les filières techniques présentent leurs réalisations : maquettes, logiciels et objets connectés.',
      textEn:
        'The technical programmes present their work: scale models, software and connected devices.',
      image: AXE_GALLERIES.innovation[0],
      alt: 'Composants électroniques d’un prototype étudiant – illustration',
    },
    {
      labelFr: 'Innovation',
      labelEn: 'Innovation',
      titleFr: 'Démonstrations et rencontres',
      titleEn: 'Demonstrations and encounters',
      subtitleFr: 'Photo d’illustration',
      subtitleEn: 'Illustrative photo',
      textFr:
        'Démonstrations en direct et rencontres avec l’écosystème pour faire mûrir les projets étudiants.',
      textEn:
        'Live demonstrations and meetings with the ecosystem to help student projects mature.',
      image: AXE_GALLERIES.innovation[1],
      alt: 'Étudiants travaillant ensemble sur un projet technique – illustration',
    },
  ],
  sportif: [
    {
      labelFr: 'Sportif',
      labelEn: 'Sports',
      titleFr: 'Tournois inter-établissements',
      titleEn: 'Inter-campus tournaments',
      subtitleFr: 'Photo d’illustration',
      subtitleEn: 'Illustrative photo',
      textFr:
        'Basket, hand et foot : les équipes engagées par les BDE s’affrontent dans un esprit de fair-play.',
      textEn:
        'Basketball, handball and football: the teams entered by the BDEs compete in a spirit of fair play.',
      image: AXE_GALLERIES.sportif[0],
      alt: 'Terrain de basket-ball lors d’un tournoi inter-établissements – illustration',
    },
  ],
}

interface AxePageTemplateProps {
  /** L'axe à rendre — résolu par la page via activityAxes.find(...). */
  axe: ActivityAxis
}

/**
 * Gabarit commun des trois pages d'axes (`/axe-academique-culturel`,
 * `/axe-innovation`, `/axe-sportif`), composé depuis la page pôle SALEEL
 * (`GenieCivilPage.tsx`) :
 *
 * 1. Hero « Contraste Typographique Massif » (HeroPoleBold) — diaporama de
 *    la galerie de l'axe (AXE_GALLERIES, la 1re image ouvre le bal), surtitre
 *    « Axe 01 — … » (activityAxes.order), titre = tagline, accroche = la
 *    description courte de la navigation, CTA « Participer aux activités » ;
 * 2. Présentation — activityAxes.description sur fond quadrillé tribal
 *    (la section remonte en carte claire sur le hero, pattern REF) ;
 * 3. Activités — les sous-champs d'activités de l'axe (uuptData) en
 *    accordéon de cartes extensibles (PrestationsAccordion) ;
 * 4. Galerie — AXE_GALLERIES[axe] en carrousel ShowcaseCarousel ;
 * 5. CTA — « Participer aux activités » → /contact et
 *    « Découvrir les BDE » → /partenaires sur bandeau photo de l'axe.
 *
 * Le JSON-LD (Service + fil d'Ariane) reste défini au niveau module de
 * chaque page (référence stable, voir JsonLd) ; ce gabarit gère le meta
 * titre/description par langue (usePageMeta).
 */
export default function AxePageTemplate({ axe }: AxePageTemplateProps) {
  const { lang } = useLanguage()
  const axeId = axe.id as AxeId
  const gallery = AXE_GALLERIES[axeId]
  const slides = AXE_GALLERY_SLIDES[axeId]

  usePageMeta(
    lang === 'fr' ? `Axe ${axe.title.fr} – UUPT` : `${axe.title.en} axis – UUPT`,
    lang === 'fr' ? axe.description.fr : axe.description.en,
  )

  /* Accroche courte du hero : description de l'entrée de navigation de
   * l'axe (uuptData) — la description complète vit dans la section 2. */
  const navEntry = navLinks.find((link) => link.to === `/axe-${axe.id}`)
  const leadFr = navEntry?.description.fr ?? axe.tagline.fr
  const leadEn = navEntry?.description.en ?? axe.tagline.en

  /* Activités de l'axe (uuptData) → cartes de l'accordéon. */
  const activities: readonly Prestation[] = axe.activities.map((activity) => ({
    fr: activity.title.fr,
    en: activity.title.en,
    descFr: activity.description.fr,
    descEn: activity.description.en,
  }))

  /* Fonds de bande CTA : photos de l'axe uniquement (jamais un terrain de
   * sport sur la page Innovation — contrat documenté dans useCalquePool). */
  const axePool = useCalquePool(gallery)

  return (
    <>
      {/* ===== 1 · HERO — diaporama de l'axe, surtitre « Axe 01 — … »,
             titre = tagline, sentinelle inclus (HeroPoleBold). ===== */}
      <HeroPoleBold
        images={gallery}
        ariaLabel={`UUPT — Axe ${axe.order} ${axe.title.fr}`}
        eyebrowFr={`Axe ${axe.order} — ${axe.title.fr}`}
        eyebrowEn={`Axis ${axe.order} — ${axe.title.en}`}
        titleFr={`${axe.tagline.fr}.`}
        titleEn={`${axe.tagline.en}.`}
        leadFr={leadFr}
        leadEn={leadEn}
        ctaFr="Participer aux activités"
        ctaEn="Take part in the activities"
      />

      {/* ===== 2 · PRÉSENTATION — activityAxes.description, fond tribal
             (carte claire remontée sur le hero, pattern REF). ===== */}
      <section className="section section--tribal" aria-label={axe.title.fr}>
        <div className="container container--narrow">
          <Reveal className="section-heading section-heading--center">
            <span className="eyebrow" data-lang="fr">Présentation de l’axe</span>
            <span className="eyebrow" data-lang="en">About this axis</span>
            <h2 data-lang="fr">{axe.title.fr}</h2>
            <h2 data-lang="en">{axe.title.en}</h2>
            <p data-lang="fr">{axe.description.fr}</p>
            <p data-lang="en">{axe.description.en}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== 3 · ACTIVITÉS — accordéon de cartes extensibles (les 4
             activités de l'axe, données uuptData). ===== */}
      <PrestationsAccordion
        items={activities}
        eyebrow={{ fr: 'Activités de l’axe', en: 'Axis activities' }}
        heading={{
          fr: [{ t: 'Quatre formats d’activités, ' }, { t: 'une même ambition.', ti: true }],
          en: [{ t: 'Four activity formats, ' }, { t: 'one ambition.', ti: true }],
        }}
      />

      {/* ===== 4 · GALERIE — AXE_GALLERIES[axe] en carrousel (légendes du
             gabarit ; la carte blanche signe la rupture claire). ===== */}
      <section className="section section--alt" aria-label={lang === 'fr' ? 'Galerie de l’axe' : 'Axis gallery'}>
        <ShowcaseCarousel
          slides={slides}
          eyebrowFr="Galerie de l’axe"
          eyebrowEn="Axis gallery"
          titleFr="L’axe en images."
          titleEn="The axis in pictures."
          ariaLabel={lang === 'fr' ? 'Galerie de l’axe' : 'Axis gallery'}
        />
      </section>

      {/* ===== 5 · CTA — bandeau photo de l'axe : participer (contact) ou
             découvrir les BDE (partenaires). ===== */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div
              className="cta-photo-bg cta-photo-bg--calque"
              style={{ backgroundImage: `url("${axePool[3] ?? axePool[0]}")` }}
            />
            <h2 data-lang="fr">Envie de participer à cet axe ?</h2>
            <h2 data-lang="en">Want to take part in this axis?</h2>
            <div className="relative z-[1] mt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="button button--light">
                <span data-lang="fr">Participer aux activités</span>
                <span data-lang="en">Take part in the activities</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/partenaires" className="button button--ghost">
                <span data-lang="fr">Découvrir les BDE</span>
                <span data-lang="en">Discover the BDEs</span>
                <Handshake size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
