import { Link } from 'react-router-dom'
import HomeHero from '../components/HomeHero'
import PromiseStrip from '../components/PromiseStrip'
import StatsBand from '../components/motion/StatsBand'
import ValeursGrid from '../components/ValeursGrid'
import type { Valeur } from '../components/ValeursGrid'
import PolesExpertise from '../components/PolesExpertise'
import Marquee from '../components/Marquee'
import Magnetic from '../components/motion/Magnetic'
import Reveal from '../components/Reveal'
import { useCalquePool } from '../hooks/useCalquePool'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLanguage } from '../context/LanguageContext'
import {
  bdePartnership,
  heroContent,
  keyStats,
  missionPillars,
  partnerDirectory,
} from '../data/uuptData'

/* Piliers de mission (uuptData) → format de cartes de ValeursGrid. */
const MISSION_PILLARS: readonly Valeur[] = missionPillars.map((pillar) => ({
  icon: pillar.icon,
  fr: pillar.title.fr,
  en: pillar.title.en,
  descFr: pillar.description.fr,
  descEn: pillar.description.en,
}))

/* Sigles des 8 BDE du répertoire — la séquence est doublée pour que la
   boucle du marquee couvre les grands viewports sans vide à droite
   (les sigles courts × 8 ne font qu'environ 1280 px de large). */
const BDE_SHORT_NAMES = partnerDirectory.establishments.map(
  (establishment) => establishment.shortName,
)
const BDE_MARQUEE_ITEMS: readonly string[] = [...BDE_SHORT_NAMES, ...BDE_SHORT_NAMES]

export default function HomePage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'UUPT – Union des Universités Privées de Thiès'
      : 'UUPT – Union of Private Universities of Thiès',
    lang === 'fr'
      ? "L'UUPT fédère les étudiants des universités, écoles et instituts privés de Thiès autour de trois axes — académique & culturel, innovation et sport inter-établissements — en collaboration avec les BDE de chaque campus."
      : 'UUPT brings together the students of Thiès’s private universities, schools and institutes around three axes — academic & cultural, innovation and inter-campus sports — in collaboration with the BDE of every campus.',
  )

  const calque = useCalquePool()
  const CtaIcon = heroContent.secondaryCta.icon

  return (
    /* Wrapper .home-page : porte la typo légèrement agrandie des sections
       de l'accueil (voir bloc dédié dans App.css) sans toucher aux pages
       intérieures. */
    <div className="home-page">
      {/* ========== 1 · HERO — plein écran : diaporama HOME_HERO_SLIDES en
           fond, contenu `heroContent` centré (surtitre, titre accentué,
           accroche, 2 CTA), sentinelle de scroll pour la Navbar. ========== */}
      <HomeHero />

      {/* ========== 2 · BANDEAU D'ENGAGEMENT — la tagline officielle de
           l'Union remonte en carte claire (`.promise-rise`) sur le bord
           inférieur du hero. ========== */}
      <div className="promise-rise">
        <PromiseStrip />
      </div>

      {/* ========== 3 · CHIFFRES CLÉS — compteurs animés au scroll
           (keyStats : 12+ établissements, 3 axes, +10 événements,
           3 disciplines sportives). ========== */}
      <StatsBand stats={keyStats} />

      {/* ========== 4 · PILIERS DE MISSION — les trois engagements
           statutaires (Fédérer / Promouvoir / Collaborer avec les BDE). ========== */}
      <ValeursGrid
        items={MISSION_PILLARS}
        eyebrow={{ fr: 'Notre mission', en: 'Our mission' }}
        heading={{
          fr: [{ t: 'Trois engagements, ' }, { t: 'une seule Union.', ti: true }],
          en: [{ t: 'Three commitments, ' }, { t: 'one Union.', ti: true }],
        }}
      />

      {/* ========== 5 · AXES — trois cartes blanches, chacune avec un
           mini-diaporama des images de son axe (`AXE_GALLERIES`) et le
           lien vers sa page (`/axe-*`). Cible du CTA primaire du hero. ========== */}
      <PolesExpertise />

      {/* ========== 6 · MARQUEE — sigles des 8 BDE partenaires. ========== */}
      <Marquee items={BDE_MARQUEE_ITEMS} />

      {/* ========== 7 · COLLABORATION BDE — les 4 principes du
           partenariat (bdePartnership) en cartes du gabarit. ========== */}
      <section className="section section--tribal" id="bde">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="eyebrow" data-lang="fr">{bdePartnership.eyebrow.fr}</span>
            <span className="eyebrow" data-lang="en">{bdePartnership.eyebrow.en}</span>
            <h2 data-lang="fr">{bdePartnership.title.fr}</h2>
            <h2 data-lang="en">{bdePartnership.title.en}</h2>
            <p data-lang="fr">{bdePartnership.description.fr}</p>
            <p data-lang="en">{bdePartnership.description.en}</p>
          </Reveal>
          <div className="values-grid">
            {bdePartnership.commitments.map((commitment) => {
              const Icon = commitment.icon
              return (
                <Reveal key={commitment.id} className="value-item">
                  <div className="value-icon">
                    <Icon className="value-svg" aria-hidden="true" />
                  </div>
                  <h3 data-lang="fr">{commitment.title.fr}</h3>
                  <h3 data-lang="en">{commitment.title.en}</h3>
                  <p data-lang="fr">{commitment.description.fr}</p>
                  <p data-lang="en">{commitment.description.en}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== 8 · CTA CONTACT — bandeau photo (pool CALQUE_IMAGES)
           avant le footer. ========== */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div
              className="cta-photo-bg cta-photo-bg--calque"
              style={{ backgroundImage: `url("${calque[2] ?? calque[0]}")` }}
            />
            <h2 data-lang="fr">
              Une idée, un campus, un projet ? <em className="ti">Écrivez-nous.</em>
            </h2>
            <h2 data-lang="en">
              An idea, a campus, a project? <em className="ti">Write to us.</em>
            </h2>
            <Magnetic>
              <Link
                to={heroContent.secondaryCta.href}
                className="button button--light"
                data-lang="fr"
              >
                {heroContent.secondaryCta.label.fr}
                {CtaIcon && <CtaIcon size={17} aria-hidden="true" />}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to={heroContent.secondaryCta.href}
                className="button button--light"
                data-lang="en"
              >
                {heroContent.secondaryCta.label.en}
                {CtaIcon && <CtaIcon size={17} aria-hidden="true" />}
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  )
}
