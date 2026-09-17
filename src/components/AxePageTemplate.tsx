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
import { AXE_GALLERIES, CALQUE_BAND_INDEX, HERO_SLIDE_COUNT } from '../constants'
import type { AxeId } from '../constants'
import { navLinks } from '../data/uuptData'
import type { ActivityAxis } from '../types'

/* ── Légendes du diaporama de galerie, une par photo d'axe ─────────────
 * Les images viennent d'AXE_GALLERIES (constants.ts) : le hero de la page
 * affiche les HERO_SLIDE_COUNT premières photos, la galerie « L'axe en
 * images » les HERO_SLIDE_COUNT suivantes — chaque axe expose donc deux
 * séries de 6 photos distinctes. Les quatre premières légendes reprennent
 * les activités de l'axe (uuptData) ; les deux suivantes décrivent ses
 * temps forts. Micro-copie d'interface, dans l'esprit des légendes
 * d'origine du gabarit. L'étiquette du badge reprend le titre de l'axe. */
interface AxeGalleryCaption {
  titleFr: string
  titleEn: string
  textFr: string
  textEn: string
  alt: string
}

const AXE_GALLERY_CAPTIONS: Record<AxeId, readonly AxeGalleryCaption[]> = {
  'academique-culturel': [
    {
      titleFr: 'Panels de discussion',
      titleEn: 'Panel discussions',
      textFr:
        'Tables rondes thématiques réunissant étudiants, enseignants et professionnels autour des grands enjeux du Sénégal et de l’Afrique.',
      textEn:
        'Thematic round tables bringing together students, teachers and professionals around the major challenges facing Senegal and Africa.',
      alt: 'Panels de discussion de l’axe Académique & Culturel de l’UUPT',
    },
    {
      titleFr: 'Sessions de formation',
      titleEn: 'Training sessions',
      textFr:
        'Ateliers pratiques : méthodologie de recherche, rédaction scientifique, communication et préparation à l’insertion professionnelle.',
      textEn:
        'Hands-on workshops: research methodology, academic writing, communication and preparation for professional life.',
      alt: 'Sessions de formation de l’axe Académique & Culturel de l’UUPT',
    },
    {
      titleFr: 'Débats d’idées',
      titleEn: 'Inter-campus debates',
      textFr:
        'Confrontations argumentées entre établissements sur des sujets de société, arbitrées par un jury et restituées devant le public.',
      textEn:
        'Reasoned confrontations between institutions on issues of society, judged by a jury and presented before the audience.',
      alt: 'Débats inter-établissements de l’axe Académique & Culturel de l’UUPT',
    },
    {
      titleFr: 'Concours de plaidoirie',
      titleEn: 'Moot court competitions',
      textFr:
        'Compétition d’éloquence et de droit réservée aux filières juridiques, évaluée par des praticiens du barreau et de la magistrature.',
      textEn:
        'An eloquence and law competition reserved for legal programmes, judged by practitioners from the bar and the bench.',
      alt: 'Concours de plaidoirie de l’axe Académique & Culturel de l’UUPT',
    },
    {
      titleFr: 'Culture générale et éloquence',
      titleEn: 'General knowledge and eloquence',
      textFr:
        'Quiz, joutes verbales et veillées culturelles donnent à chaque filière l’occasion de se distinguer.',
      textEn:
        'Quizzes, verbal jousts and cultural evenings give every programme a chance to stand out.',
      alt: 'Épreuve de culture générale de l’axe Académique & Culturel de l’UUPT',
    },
    {
      titleFr: 'Restitution publique',
      titleEn: 'Public presentation',
      textFr:
        'Les travaux de l’année sont présentés aux étudiants, aux directions et aux partenaires de l’Union.',
      textEn:
        'The year’s work is presented to students, management and the Union’s partners.',
      alt: 'Restitution publique des travaux de l’axe Académique & Culturel de l’UUPT',
    },
  ],
  innovation: [
    {
      titleFr: 'Expositions des projets étudiants',
      titleEn: 'Student project exhibitions',
      textFr:
        'Galeries techniques où chaque établissement présente ses prototypes, maquettes et travaux de fin de cycle au grand public.',
      textEn:
        'Technical galleries where each institution presents its prototypes, scale models and final-year projects to the general public.',
      alt: 'Exposition des projets étudiants de l’axe Innovation de l’UUPT',
    },
    {
      titleFr: 'Démonstrations en direct',
      titleEn: 'Live demonstrations',
      textFr:
        'Sessions de démonstration et de tests de solutions numériques, robotiques et énergétiques développées par les étudiants.',
      textEn:
        'Demonstration and testing sessions for the digital, robotic and energy solutions developed by students.',
      alt: 'Démonstration en direct de l’axe Innovation de l’UUPT',
    },
    {
      titleFr: 'Rencontres avec l’écosystème',
      titleEn: 'Meetings with the ecosystem',
      textFr:
        'Mise en relation avec les entreprises, incubateurs et institutions pour accélérer la maturation des projets présentés.',
      textEn:
        'Connecting students with companies, incubators and institutions to accelerate the maturation of the projects presented.',
      alt: 'Rencontre avec l’écosystème de l’axe Innovation de l’UUPT',
    },
    {
      titleFr: 'Concours d’innovation',
      titleEn: 'Innovation competitions',
      textFr:
        'Distinction des meilleures créations par un jury mixte, réunissant enseignants-chercheurs et professionnels du secteur.',
      textEn:
        'The best creations are recognised by a mixed jury of teacher-researchers and industry professionals.',
      alt: 'Concours d’innovation de l’axe Innovation de l’UUPT',
    },
    {
      titleFr: 'Ateliers de prototypage',
      titleEn: 'Prototyping workshops',
      textFr:
        'Impression 3D, électronique embarquée et développement logiciel : les campus outillent leurs idées avant les concours.',
      textEn:
        '3D printing, embedded electronics and software development: campuses equip their ideas before the competitions.',
      alt: 'Atelier de prototypage de l’axe Innovation de l’UUPT',
    },
    {
      titleFr: 'Solutions pour Thiès',
      titleEn: 'Solutions for Thiès',
      textFr:
        'Des projets pensés pour les besoins réels de la ville : énergie, mobilité et services numériques.',
      textEn:
        'Projects designed around the city’s real needs: energy, mobility and digital services.',
      alt: 'Présentation de solutions locales de l’axe Innovation de l’UUPT',
    },
  ],
  sportif: [
    {
      titleFr: 'Tournois inter-établissements',
      titleEn: 'Inter-campus tournaments',
      textFr:
        'Championnats organisés par l’UUPT réunissant les équipes engagées par chaque BDE affilié.',
      textEn:
        'Championships organised by UUPT bringing together the teams entered by each affiliated BDE.',
      alt: 'Tournoi inter-établissements de l’axe Sportif de l’UUPT',
    },
    {
      titleFr: 'Basket-ball',
      titleEn: 'Basketball',
      textFr:
        'Compétition phare des campus thiessois, disputée en gymnase avec arbitrage officiel et supporters des deux camps.',
      textEn:
        'The flagship competition of the Thiès campuses, played indoors with official refereeing and supporters from both sides.',
      alt: 'Match de basket-ball de l’axe Sportif de l’UUPT',
    },
    {
      titleFr: 'Handball',
      titleEn: 'Handball',
      textFr:
        'Format de tournoi à élimination directe favorisant l’intensité, la discipline collective et la cohésion d’équipe.',
      textEn:
        'A knockout tournament format that favours intensity, collective discipline and team cohesion.',
      alt: 'Match de handball de l’axe Sportif de l’UUPT',
    },
    {
      titleFr: 'Football',
      titleEn: 'Football',
      textFr:
        'Le rendez-vous le plus attendu de l’année, véritable ciment social entre les établissements privés de Thiès.',
      textEn:
        'The most eagerly awaited event of the year, a true social bond between the private institutions of Thiès.',
      alt: 'Match de football de l’axe Sportif de l’UUPT',
    },
    {
      titleFr: 'Esprit d’équipe et fair-play',
      titleEn: 'Team spirit and fair play',
      textFr:
        'Arbitrage officiel, supporters des deux camps et respect des adversaires : les règles communes à tous les campus.',
      textEn:
        'Official refereeing, supporters from both sides and respect for opponents: the rules shared by every campus.',
      alt: 'Esprit d’équipe de l’axe Sportif de l’UUPT',
    },
    {
      titleFr: 'Remise des trophées',
      titleEn: 'Trophy ceremony',
      textFr:
        'Chaque saison s’achève par la remise des trophées aux équipes et aux BDE les plus engagés.',
      textEn:
        'Every season ends with trophies awarded to the most committed teams and BDEs.',
      alt: 'Remise des trophées de l’axe Sportif de l’UUPT',
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
 *    HERO_SLIDE_COUNT photos de l'axe (AXE_GALLERIES[0 … 5]), surtitre
 *    « Axe 01 — … » (activityAxes.order), titre = tagline, accroche = la
 *    description courte de la navigation, CTA « Participer aux activités » ;
 * 2. Présentation — activityAxes.description sur fond quadrillé tribal
 *    (la section remonte en carte claire sur le hero, pattern REF) ;
 * 3. Activités — les sous-champs d'activités de l'axe (uuptData) en
 *    accordéon de cartes extensibles (PrestationsAccordion) ;
 * 4. Galerie — les HERO_SLIDE_COUNT photos SUIVANTES de l'axe en carrousel
 *    (ShowcaseCarousel) : la page expose ainsi 12 photos distinctes ;
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
  /* Hero : les HERO_SLIDE_COUNT premières photos de l'axe (6).
   * Galerie : les HERO_SLIDE_COUNT suivantes, légendées (6). */
  const heroImages = gallery.slice(0, HERO_SLIDE_COUNT)
  const captions = AXE_GALLERY_CAPTIONS[axeId]
  const slides: readonly ShowcaseSlide[] = gallery
    .slice(HERO_SLIDE_COUNT, HERO_SLIDE_COUNT + captions.length)
    .map((image, index) => {
      const caption = captions[index]
      const position = String(index + 1).padStart(2, '0')
      return {
        labelFr: axe.title.fr,
        labelEn: axe.title.en,
        titleFr: caption.titleFr,
        titleEn: caption.titleEn,
        subtitleFr: `Photo ${position} · ${axe.title.fr}`,
        subtitleEn: `Photo ${position} · ${axe.title.en}`,
        textFr: caption.textFr,
        textEn: caption.textEn,
        image,
        alt: caption.alt,
      }
    })

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

  /* Fonds de bande CTA : photos de l'axe (rotation AXE_GALLERIES[axe]),
   * index CALQUE_BAND_INDEX — juste après le lot du hero, donc jamais l'une
   * des photos déjà affichées par le diaporama de la page. */
  const axePool = useCalquePool(gallery)

  return (
    <>
      {/* ===== 1 · HERO — diaporama de l'axe (HERO_SLIDE_COUNT photos),
             surtitre « Axe 01 — … », titre = tagline, sentinelle inclus
             (HeroPoleBold). ===== */}
      <HeroPoleBold
        images={heroImages}
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

      {/* ===== 4 · GALERIE — les 6 photos suivantes de l'axe en carrousel
             (légendes du gabarit ; la carte blanche signe la rupture claire). ===== */}
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
              style={{ backgroundImage: `url("${axePool[CALQUE_BAND_INDEX] ?? axePool[0]}")` }}
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
