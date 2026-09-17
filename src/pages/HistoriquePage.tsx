import { Link } from 'react-router-dom'
import { ArrowRight, Handshake } from 'lucide-react'
import JsonLd, { breadcrumbJsonLd } from '../components/JsonLd'
import PageHero from '../components/PageHero'
import ProcessTimeline from '../components/motion/ProcessTimeline'
import type { ProcessPhase } from '../components/motion/ProcessTimeline'
import StatsBand from '../components/motion/StatsBand'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCalquePool } from '../hooks/useCalquePool'
import { useLanguage } from '../context/LanguageContext'
import { keyStats, organization, timelineCopy, timelineSteps } from '../data/uuptData'

/** Données structurées de la page — référence stable au niveau module. */
const JSON_LD_GRAPH = [
  breadcrumbJsonLd([
    { name: 'Accueil', path: '' },
    { name: 'Historique', path: 'historique' },
  ]),
]

/* `timelineSteps` (uuptData : Genèse → Concertation → Adhésion → Lancement)
   mappés dans l'API du composant copié (`ProcessPhase`). L'eyebrow reprend
   la grammaire des phases SALEEL (« 01 – Écoute ») enrichie de la période
   UUPT : « 04 – Lancement officiel · 26 Avril 2026 ». Les icônes et le
   drapeau `isMilestone` de la donnée n'ont pas d'équivalent dans l'API du
   gabarit (aucun slot) — l'étape fondatrice reste signalée par sa date. */
const PHASES: readonly ProcessPhase[] = timelineSteps.map((step) => ({
  eyebrowFr: `${String(step.order).padStart(2, '0')} – ${step.phase.fr} · ${step.period.fr}`,
  eyebrowEn: `${String(step.order).padStart(2, '0')} – ${step.phase.en} · ${step.period.en}`,
  fr: step.title.fr,
  en: step.title.en,
  descFr: step.description.fr,
  descEn: step.description.en,
}))

/**
 * Page Historique — route /historique.
 *
 * Gabarit REF : composition « page dédiée » SALEEL (PageHero → section
 * narrative → StatsBand → CTA, cf. AboutPage REF) dont la section centrale
 * est la timeline verticale animée au scroll de la méthode SALEEL
 * (ProcessTimeline, section « Notre méthode » du HomePage REF), composée
 * avec le contenu UUPT :
 *
 * 1. PageHero « Notre historique » (photo du pool calque, accroche
 *    timelineCopy : l'idée née d'un panel → la création officielle) ;
 * 2. ProcessTimeline — les 4 étapes `timelineSteps`, ligne remplie au scroll
 *    (scaleY GPU), pastille active par étape, repli statique complet sous
 *    prefers-reduced-motion ;
 * 3. StatsBand — `keyStats` : l'Union en chiffres issue de cette histoire
 *    (12+ établissements, 3 axes, +10 événements, 3 disciplines) ;
 * 4. bandeau CTA vers /partenaires (découvrir les BDE) et /contact.
 */
export default function HistoriquePage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'Notre historique – Union des Universités Privées de Thiès'
      : 'Our history – Union of Private Universities of Thiès',
    lang === 'fr' ? timelineCopy.description.fr : timelineCopy.description.en,
  )

  const calque = useCalquePool()

  return (
    <>
      <JsonLd id="jsonld-page" graph={JSON_LD_GRAPH} />

      {/* ===== 1 · HERO — photo du pool calque (campus/étudiants), accroche
             narrative de la chronologie (timelineCopy). ===== */}
      <PageHero variant="photo" images={calque.slice(0, 3)}>
        <span className="eyebrow" data-lang="fr">{timelineCopy.eyebrow.fr}</span>
        <span className="eyebrow" data-lang="en">{timelineCopy.eyebrow.en}</span>
        <h1 data-lang="fr">Notre historique</h1>
        <h1 data-lang="en">Our history</h1>
        {/* `highlight` est optionnel dans SectionCopy — la ligne d'accroche
            n'est rendue que si la donnée le fournit. */}
        {timelineCopy.highlight && (
          <>
            <p className="hero-lead--onphoto" data-lang="fr">
              {timelineCopy.title.fr} <em className="ti">{timelineCopy.highlight.fr}</em>.
            </p>
            <p className="hero-lead--onphoto" data-lang="en">
              {timelineCopy.title.en} <em className="ti">{timelineCopy.highlight.en}</em>.
            </p>
          </>
        )}
        <p className="hero-lead--onphoto" data-lang="fr">{timelineCopy.description.fr}</p>
        <p className="hero-lead--onphoto" data-lang="en">{timelineCopy.description.en}</p>
      </PageHero>

      {/* Sentinelle pour le header sticky */}
      <div className="scroll-sentinel" aria-hidden="true" />

      {/* ===== 2 · CHRONOLOGIE — timeline verticale remplie par le scroll
             (gabarit ProcessTimeline), fond quadrillé tribal comme la
             section « Notre méthode » du REF. ===== */}
      <section
        className="section section--tribal"
        aria-label={lang === 'fr' ? 'Chronologie de création' : 'Founding timeline'}
      >
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="eyebrow" data-lang="fr">Le parcours</span>
            <span className="eyebrow" data-lang="en">The journey</span>
            <h2 data-lang="fr">
              De la genèse au <em className="ti">{organization.createdLabel.fr}.</em>
            </h2>
            <h2 data-lang="en">
              From genesis to <em className="ti">{organization.createdLabel.en}.</em>
            </h2>
          </Reveal>
          <ProcessTimeline phases={PHASES} />
        </div>
      </section>

      {/* ===== 3 · CHIFFRES CLÉS — l'Union issue de cette histoire, en
            compteurs animés (keyStats, même bande que l'accueil). ===== */}
      <StatsBand stats={keyStats} />

      {/* ===== 4 · CTA — la suite de la découverte : les BDE partenaires
             qui portent l'Union, et le contact (bandeau photo, pool calque). ===== */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div
              className="cta-photo-bg cta-photo-bg--calque"
              style={{ backgroundImage: `url("${calque[3] ?? calque[0]}")` }}
            />
            <h2 data-lang="fr">
              Une Union jeune, <em className="ti">déjà en mouvement.</em>
            </h2>
            <h2 data-lang="en">
              A young Union, <em className="ti">already on the move.</em>
            </h2>
            <div className="relative z-[1] mt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/partenaires" className="button button--light">
                <span data-lang="fr">Découvrir les BDE partenaires</span>
                <span data-lang="en">Discover the partner BDEs</span>
                <Handshake size={17} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="button button--ghost">
                <span data-lang="fr">Nous contacter</span>
                <span data-lang="en">Contact us</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
