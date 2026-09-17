import { Link } from 'react-router-dom'
import { ArrowRight, Handshake, Info } from 'lucide-react'
import JsonLd, { breadcrumbJsonLd } from '../components/JsonLd'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Magnetic from '../components/motion/Magnetic'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCalquePool } from '../hooks/useCalquePool'
import { useLanguage } from '../context/LanguageContext'
import {
  partnerDirectory,
  partnerStatusLabels,
  partnersCopy,
} from '../data/uuptData'
import type { PartnerStatus } from '../types'

/** Données structurées de la page — référence stable au niveau module. */
const JSON_LD_GRAPH = [
  breadcrumbJsonLd([
    { name: 'Accueil', path: '' },
    { name: 'BDE Partenaires', path: 'partenaires' },
  ]),
]

/* Habillage du badge de statut d'affiliation (partnerStatusLabels) —
   une teinte par statut : affilié (établi), adhésion en cours (transitoire),
   invité (prospect). Couleurs de la palette Tailwind standard, posées sur
   le fond nuit des cartes. */
const STATUS_STYLES: Record<PartnerStatus, string> = {
  affilie: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
  'en-cours': 'border-amber-400/30 bg-amber-500/10 text-amber-300',
  invite: 'border-slate-400/30 bg-slate-500/10 text-slate-300',
}
const STATUS_DOTS: Record<PartnerStatus, string> = {
  affilie: 'bg-emerald-400',
  'en-cours': 'bg-amber-400',
  invite: 'bg-slate-400',
}

/**
 * Page BDE Partenaires — route /partenaires.
 *
 * Gabarit REF : composition « page dédiée » SALEEL (PageHero → section de
 * contenu → CTA), dont la section centrale est une grille de cartes sombres
 * minérales (l'esthétique de la CommunityCard / des tuiles ValeursGrid :
 * fond nuit, filet blanc 10 %, accent orange), composée avec le contenu
 * UUPT :
 *
 * 1. PageHero « BDE Partenaires » (photo du pool calque, accroche
 *    partnersCopy) ;
 * 2. Annuaire — une carte par établissement de `partnerDirectory` (8 pôles) :
 *    sigle, statut d'affiliation (partnerStatusLabels), nom, type · domaine,
 *    filières, BDE ; bandeau d'information tant que la liste nominative
 *    officielle n'est pas validée (isPlaceholder) ; grille responsive
 *    1 colonne mobile / 2 tablette / 3 bureau, révélée au scroll (Reveal) ;
 * 3. bandeau « Devenir partenaire » — texte + CTA /contact.
 */
export default function PartenairesPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'BDE Partenaires – Union des Universités Privées de Thiès'
      : 'Partner BDEs – Union of Private Universities of Thiès',
    lang === 'fr' ? partnersCopy.description.fr : partnersCopy.description.en,
  )

  const calque = useCalquePool()

  return (
    <>
      <JsonLd id="jsonld-page" graph={JSON_LD_GRAPH} />

      {/* ===== 1 · HERO — photo du pool calque, accroche partnersCopy
             (chaque établissement représenté par son BDE). ===== */}
      <PageHero variant="photo" images={calque.slice(0, 3)}>
        <span className="eyebrow" data-lang="fr">{partnersCopy.eyebrow.fr}</span>
        <span className="eyebrow" data-lang="en">{partnersCopy.eyebrow.en}</span>
        <h1 data-lang="fr">BDE Partenaires</h1>
        <h1 data-lang="en">Partner BDEs</h1>
        {/* `highlight` est optionnel dans SectionCopy — la ligne d'accroche
            n'est rendue que si la donnée le fournit. */}
        {partnersCopy.highlight && (
          <>
            <p className="hero-lead--onphoto" data-lang="fr">
              {partnersCopy.title.fr} <em className="ti">{partnersCopy.highlight.fr}</em>.
            </p>
            <p className="hero-lead--onphoto" data-lang="en">
              {partnersCopy.title.en} <em className="ti">{partnersCopy.highlight.en}</em>.
            </p>
          </>
        )}
        <p className="hero-lead--onphoto" data-lang="fr">{partnersCopy.description.fr}</p>
        <p className="hero-lead--onphoto" data-lang="en">{partnersCopy.description.en}</p>
      </PageHero>

      {/* Sentinelle pour le header sticky */}
      <div className="scroll-sentinel" aria-hidden="true" />

      {/* ===== 2 · ANNUAIRE — grille de cartes (une par pôle du répertoire),
             fond quadrillé tribal, cartes sombres en contrepoint. ===== */}
      <section
        className="section section--tribal"
        id="annuaire"
        aria-label={lang === 'fr' ? 'Annuaire des pôles et BDE' : 'Pole and BDE directory'}
      >
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="eyebrow" data-lang="fr">L’annuaire des pôles</span>
            <span className="eyebrow" data-lang="en">The pole directory</span>
            <h2 data-lang="fr">
              Qui compose <em className="ti">l’Union</em> aujourd’hui.
            </h2>
            <h2 data-lang="en">
              Who makes up <em className="ti">the Union</em> today.
            </h2>
          </Reveal>

          {/* Bandeau d'information tant que la liste nominative officielle
              n'est pas validée (partnerDirectory.isPlaceholder, uuptData). */}
          {partnerDirectory.isPlaceholder && (
            <Reveal
              className="mx-auto mb-10 flex max-w-3xl items-start gap-3 rounded-xl border border-line bg-sand/70 p-4 text-left"
              role="note"
            >
              <Info size={18} className="mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-ink">
                <span data-lang="fr">{partnerDirectory.notice.fr}</span>
                <span data-lang="en">{partnerDirectory.notice.en}</span>
              </p>
            </Reveal>
          )}

          {/* Grille responsive : 1 colonne mobile / 2 tablette / 3 bureau. */}
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partnerDirectory.establishments.map((partner) => (
              <Reveal
                as="article"
                key={partner.id}
                aria-label={partner.name}
                className="rounded-2xl border border-white/10 bg-night p-6 transition-colors duration-500 hover:border-white/25"
              >
                {/* En-tête : sigle du pôle + statut d'affiliation. */}
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg bg-white/5 px-2.5 font-display text-xs font-extrabold tracking-widest text-orange-400"
                    aria-hidden="true"
                  >
                    {partner.shortName}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider ${STATUS_STYLES[partner.status]}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${STATUS_DOTS[partner.status]}`}
                      aria-hidden="true"
                    />
                    <span data-lang="fr">{partnerStatusLabels[partner.status].fr}</span>
                    <span data-lang="en">{partnerStatusLabels[partner.status].en}</span>
                  </span>
                </div>

                {/* Nom du pôle (nom propre — non traduit, champ string). */}
                <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-white">
                  {partner.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <span data-lang="fr">{partner.kind.fr} · {partner.field.fr}</span>
                  <span data-lang="en">{partner.kind.en} · {partner.field.en}</span>
                </p>

                {/* Filières représentées (champs bilingues). */}
                <ul
                  className="mt-4 flex flex-wrap gap-1.5"
                  aria-label={
                    lang === 'fr'
                      ? `Filières de ${partner.name}`
                      : `Programmes of ${partner.name}`
                  }
                >
                  {partner.filieres.map((filiere) => (
                    <li
                      key={filiere.fr}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300"
                    >
                      <span data-lang="fr">{filiere.fr}</span>
                      <span data-lang="en">{filiere.en}</span>
                    </li>
                  ))}
                </ul>

                {/* BDE affilié (nom propre — non traduit, champ string). */}
                <div className="mt-5 flex items-center gap-2.5 border-t border-white/10 pt-4 text-sm text-slate-200">
                  <Handshake size={16} className="shrink-0 text-orange-400" aria-hidden="true" />
                  <span>{partner.bdeName}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3 · DEVENIR PARTENAIRE — la porte d'entrée pour les
             établissements et leurs BDE (bandeau photo, pool calque). ===== */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div
              className="cta-photo-bg cta-photo-bg--calque"
              style={{ backgroundImage: `url("${calque[3] ?? calque[0]}")` }}
            />
            <h2 data-lang="fr">
              Votre établissement souhaite <em className="ti">rejoindre l’Union ?</em>
            </h2>
            <h2 data-lang="en">
              Want your institution to <em className="ti">join the Union?</em>
            </h2>
            <p className="relative z-[1] mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-white/80">
              <span data-lang="fr">
                Direction d’établissement ou bureau des étudiants : présentons ensemble le
                projet de l’Union à votre campus et construisons les activités de ses trois
                axes.
              </span>
              <span data-lang="en">
                Institution leadership or student board: let’s present the Union’s project to
                your campus and build the activities of its three axes together.
              </span>
            </p>
            <div className="relative z-[1] flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Link to="/contact" className="button button--light">
                  <span data-lang="fr">Devenir partenaire</span>
                  <span data-lang="en">Become a partner</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </Magnetic>
              <Link to="/historique" className="button button--ghost">
                <span data-lang="fr">Découvrir l’historique</span>
                <span data-lang="en">Explore our story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
