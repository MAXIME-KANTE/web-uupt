import { Link } from 'react-router-dom'
import { ArrowRight, Handshake } from 'lucide-react'
import JsonLd, { breadcrumbJsonLd } from '../components/JsonLd'
import PageHero from '../components/PageHero'
import IdentitySlider from '../components/IdentitySlider'
import type { IdentitySlide } from '../components/IdentitySlider'
import ValeursGrid from '../components/ValeursGrid'
import type { Valeur } from '../components/ValeursGrid'
import ShowcaseCarousel from '../components/ShowcaseCarousel'
import { CALQUE_BAND_INDEX, HERO_SLIDE_COUNT } from '../constants'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCalquePool } from '../hooks/useCalquePool'
import { useLanguage } from '../context/LanguageContext'
import {
  aboutCopy,
  bdePartnership,
  galleryCopy,
  gallerySlides,
  media,
  missionPillars,
  organization,
} from '../data/uuptData'

/** Données structurées de la page — référence stable au niveau module. */
const JSON_LD_GRAPH = [
  breadcrumbJsonLd([
    { name: 'Accueil', path: '' },
    { name: 'À propos', path: 'a-propos' },
  ]),
]

/** Minuscule initiale (« Fédérer… » → « fédérer… ») pour les énumérations en phrase. */
const decapitalize = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1)

/* Diaporama de présentation (gabarit IdentitySlider), composé depuis uuptData :
   identité (organization), création du 26 avril 2026 à Thiès et mission
   (tagline + les trois piliers missionPillars). */
const IDENTITY_SLIDES: readonly IdentitySlide[] = [
  {
    eyebrowFr: 'Notre identité',
    eyebrowEn: 'Our identity',
    titleFr: `L’${organization.acronym}, ${decapitalize(organization.type.fr)}.`,
    titleEn: `${organization.acronym}, an ${decapitalize(organization.type.en)}.`,
    descFr: `${organization.name} rassemble les étudiants des établissements d’enseignement supérieur privés de la ville.`,
    descEn: `${organization.name} brings together the students of the city’s private higher-education institutions.`,
  },
  {
    eyebrowFr: 'Notre création',
    eyebrowEn: 'Our founding',
    titleFr: `Née le ${organization.createdLabel.fr} à ${organization.city}.`,
    titleEn: `Founded on ${organization.createdLabel.en} in ${organization.city}.`,
    descFr: 'Des campus privés souvent isolés les uns des autres, qui choisissent de parler d’une même voix et de porter ensemble des projets communs.',
    descEn: 'Private campuses that once stood apart from one another, choosing to speak with one voice and carry common projects together.',
  },
  {
    eyebrowFr: 'Notre mission',
    eyebrowEn: 'Our mission',
    titleFr: `« ${organization.tagline.fr} »`,
    titleEn: `“${organization.tagline.en}”`,
    descFr: `${decapitalize(missionPillars[0].title.fr)}, ${decapitalize(missionPillars[1].title.fr)} et ${decapitalize(missionPillars[2].title.fr)} : les trois engagements statutaires de l’Union.`,
    descEn: `${decapitalize(missionPillars[0].title.en)}, ${decapitalize(missionPillars[1].title.en)} and ${decapitalize(missionPillars[2].title.en)}: the Union’s three statutory commitments.`,
  },
]

/* Les 4 principes de collaboration BDE (bdePartnership.commitments) → cartes
   du gabarit ValeursGrid — même mapping que les piliers de l'accueil. */
const BDE_COMMITMENTS: readonly Valeur[] = bdePartnership.commitments.map((commitment) => ({
  icon: commitment.icon,
  fr: commitment.title.fr,
  en: commitment.title.en,
  descFr: commitment.description.fr,
  descEn: commitment.description.en,
}))

/**
 * Page À propos — route /a-propos.
 *
 * Gabarit REF : `AboutPage.tsx` de SALEEL WEB (spec §6 : IdentitySlider +
 * ValeursGrid), composé avec le contenu UUPT :
 *
 * 1. PageHero « À propos de l'UUPT » (diaporama media.about.src + pool
 *    calque, accroche aboutCopy) ;
 * 2. IdentitySlider sur bannière Kenté — présentation de l'Union (identité,
 *    création du 26 avril 2026 à Thiès, mission) ;
 * 3. ValeursGrid — les 4 principes de collaboration BDE (co-construction,
 *    équité, transparence, montée en compétences) ;
 * 4. ShowcaseCarousel — galerie « L'Union en images » (6 photos officielles) ;
 * 5. bandeau CTA vers /historique et /partenaires.
 */
export default function AboutPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'À propos de l’UUPT – Union des Universités Privées de Thiès'
      : 'About UUPT – Union of Private Universities of Thiès',
    lang === 'fr' ? aboutCopy.description.fr : aboutCopy.description.en,
  )

  const calque = useCalquePool()

  /* Diaporama du hero : la photo officielle de la page (media.about.src,
     pool public/images) ouvre le bal, complétée par le pool calque —
     HERO_SLIDE_COUNT photos au total (contrat « 6 par hero »). */
  const heroImages = [media.about.src, ...calque.slice(0, HERO_SLIDE_COUNT - 1)]

  return (
    <>
      <JsonLd id="jsonld-page" graph={JSON_LD_GRAPH} />

      {/* ===== 1 · HERO — diaporama photo de la page (media.about.src +
             pool calque, 6 photos) + accroche aboutCopy. ===== */}
      <PageHero variant="photo" images={heroImages}>
        <span className="eyebrow" data-lang="fr">{aboutCopy.eyebrow.fr}</span>
        <span className="eyebrow" data-lang="en">{aboutCopy.eyebrow.en}</span>
        <h1 data-lang="fr">À propos de l’UUPT</h1>
        <h1 data-lang="en">About UUPT</h1>
        {/* `highlight` est optionnel dans SectionCopy — la ligne d'accroche
            n'est rendue que si la donnée le fournit. */}
        {aboutCopy.highlight && (
          <>
            <p className="hero-lead--onphoto" data-lang="fr">
              {aboutCopy.title.fr} <em className="ti">{aboutCopy.highlight.fr}</em>.
            </p>
            <p className="hero-lead--onphoto" data-lang="en">
              {aboutCopy.title.en} <em className="ti">{aboutCopy.highlight.en}</em>.
            </p>
          </>
        )}
        <p className="hero-lead--onphoto" data-lang="fr">{aboutCopy.description.fr}</p>
        <p className="hero-lead--onphoto" data-lang="en">{aboutCopy.description.en}</p>
      </PageHero>

      {/* Sentinelle pour le header sticky */}
      <div className="scroll-sentinel" aria-hidden="true" />

      {/* ===== 2 · PRÉSENTATION — carrousel de textes (IdentitySlider) sur la
             bannière signature au motif Kenté (pattern REF : le slider vit
             dans .pattern-banner, ses textes héritent le blanc). ===== */}
      <section
        className="pattern-banner"
        aria-label={lang === 'fr' ? 'Présentation de l’Union' : 'About the Union'}
      >
        <div className="container">
          <IdentitySlider
            slides={IDENTITY_SLIDES}
            ariaLabelFr="Présentation de l’Union"
            ariaLabelEn="About the Union"
          />
        </div>
      </section>

      {/* ===== 3 · PRINCIPES BDE — les 4 engagements de collaboration
             (bdePartnership) en cartes du gabarit ValeursGrid. ===== */}
      <ValeursGrid
        items={BDE_COMMITMENTS}
        eyebrow={bdePartnership.eyebrow}
        heading={{
          fr: [{ t: 'Quatre principes, ' }, { t: 'une même collaboration.', ti: true }],
          en: [{ t: 'Four principles, ' }, { t: 'one collaboration.', ti: true }],
        }}
      />

      {/* ===== 4 · GALERIE — « L'Union en images » : diaporama des photos
             officielles (gallerySlides) en carte blanche. ===== */}
      <section
        className="section section--alt"
        aria-label={lang === 'fr' ? 'Galerie photos de l’Union' : 'Union photo gallery'}
      >
        <ShowcaseCarousel
          slides={gallerySlides}
          eyebrowFr={galleryCopy.eyebrow.fr}
          eyebrowEn={galleryCopy.eyebrow.en}
          titleFr={`${galleryCopy.title.fr} ${galleryCopy.highlight?.fr ?? ''}.`}
          titleEn={`${galleryCopy.title.en} ${galleryCopy.highlight?.en ?? ''}.`}
          link={{ to: '/historique', fr: 'Notre historique', en: 'Our history' }}
          ariaLabel={lang === 'fr' ? 'Galerie photos de l’Union' : 'Union photo gallery'}
        />
      </section>

      {/* ===== 5 · CTA — la suite de la découverte : l'historique de la
             création et les BDE partenaires (bandeau photo, pool calque). ===== */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div
              className="cta-photo-bg cta-photo-bg--calque"
              style={{ backgroundImage: `url("${calque[CALQUE_BAND_INDEX] ?? calque[0]}")` }}
            />
            <h2 data-lang="fr">
              Envie d’aller plus loin ? <em className="ti">Poursuivez la découverte.</em>
            </h2>
            <h2 data-lang="en">
              Want to go further? <em className="ti">Keep exploring.</em>
            </h2>
            <div className="relative z-[1] mt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/historique" className="button button--light">
                <span data-lang="fr">Découvrir l’historique</span>
                <span data-lang="en">Explore our story</span>
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
