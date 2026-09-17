import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCalquePool } from '../hooks/useCalquePool'
import { useLanguage } from '../context/LanguageContext'
import { CONTACT_EMAIL } from '../constants'
import { organization } from '../data/uuptData'

/**
 * Mentions légales — adaptées à l'UUPT (mouvement estudiantin, droit sénégalais).
 * Route : /mentions-legales
 * ⚠️ À faire relire par un professionnel du droit avant la mise en ligne.
 */
export default function LegalPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'Mentions légales – UUPT'
      : 'Legal notice – UUPT',
    lang === 'fr'
      ? "Mentions légales du site de l'Union des Universités Privées de Thiès (UUPT) : éditeur, hébergement, propriété intellectuelle et droit applicable."
      : 'Legal notice of the Union of Private Universities of Thiès (UUPT) website: publisher, hosting, intellectual property and applicable law.',
  )

  const calque = useCalquePool()

  return (
    <>
      <PageHero variant="photo" images={calque.slice(0, 3)}>
        <span className="eyebrow" data-lang="fr">Informations légales</span>
        <span className="eyebrow" data-lang="en">Legal information</span>
        <h1 data-lang="fr">Mentions légales</h1>
        <h1 data-lang="en">Legal notice</h1>
      </PageHero>

      <div className="scroll-sentinel" aria-hidden="true" />

      <section className="section legal-section">
        <div className="container container--narrow">
          {/* ── FR ─────────────────────────────────────────────── */}
          <Reveal>
            <div className="legal-content" data-lang="fr">
              <h2>1. Éditeur du site</h2>
              <p>
                Le présent site internet est édité par{' '}
                <strong>{organization.name} ({organization.acronym})</strong>, mouvement
                estudiantin inter-établissements créé le{' '}
                {organization.createdLabel.fr} à {organization.city},{' '}
                {organization.country.fr}.
              </p>
              <ul>
                <li><strong>Dénomination :</strong> {organization.name} ({organization.acronym})</li>
                <li><strong>Nature :</strong> {organization.type.fr}</li>
                <li><strong>Siège :</strong> {organization.address.fr}</li>
                <li><strong>Date de création :</strong> {organization.createdLabel.fr}</li>
                <li>
                  <strong>Email :</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                {/* TODO(UUPT) : désigner le directeur de la publication. */}
                <li><strong>Directeur de la publication :</strong> à désigner</li>
              </ul>

              <h2>2. Hébergement</h2>
              {/* TODO(UUPT) : consigner l'identité et les coordonnées de
                  l'hébergeur définitif dès qu'il est connu. */}
              <p>
                Le site est hébergé par un prestataire d'hébergement web
                professionnel. Les coordonnées complètes de l'hébergeur peuvent
                être communiquées sur demande à l'adresse email de l'éditeur.
              </p>

              <h2>3. Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus (textes, images, graphismes, logo,
                icônes, sons, logiciels) présents sur ce site est protégé par les
                dispositions du droit sénégalais et des conventions
                internationales relatives à la propriété intellectuelle. Toute
                reproduction, représentation, modification ou exploitation,
                totale ou partielle, est interdite sans l'autorisation écrite
                préalable de {organization.name}.
              </p>

              <h2>4. Limitation de responsabilité</h2>
              <p>
                L'{organization.acronym} s'efforce de fournir des informations
                aussi précises que possible. Toutefois, elle ne saurait être
                tenue responsable des omissions, inexactitudes ou carences dans
                la mise à jour, qu'elles soient de son fait ou du fait de tiers
                partenaires.
              </p>

              <h2>5. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens vers d'autres sites, notamment
                les pages officielles des établissements affiliés et de leurs
                Bureaux Des Étudiants (BDE). L'{organization.acronym} ne dispose
                d'aucun moyen de contrôle du contenu de ces sites tiers et
                décline toute responsabilité quant à leur contenu.
              </p>

              <h2>6. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont régies par le droit
                sénégalais. Tout litige sera soumis à la compétence des
                tribunaux de {organization.city}, {organization.country.fr}.
              </p>
            </div>
          </Reveal>

          {/* ── EN ─────────────────────────────────────────────── */}
          <Reveal>
            <div className="legal-content" data-lang="en">
              <h2>1. Website publisher</h2>
              <p>
                This website is published by{' '}
                <strong>{organization.name} ({organization.acronym})</strong>,
                an inter-campus student movement founded on{' '}
                {organization.createdLabel.en} in {organization.city},{' '}
                {organization.country.en}.
              </p>
              <ul>
                <li><strong>Name:</strong> {organization.name} ({organization.acronym})</li>
                <li><strong>Nature:</strong> {organization.type.en}</li>
                <li><strong>Headquarters:</strong> {organization.address.en}</li>
                <li><strong>Founded:</strong> {organization.createdLabel.en}</li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                {/* TODO(UUPT): designate the publication director. */}
                <li><strong>Publication director:</strong> to be designated</li>
              </ul>

              <h2>2. Hosting</h2>
              {/* TODO(UUPT): record the identity and contact details of the
                  final hosting provider once confirmed. */}
              <p>
                The site is hosted by a professional web hosting provider. Full
                hosting provider details are available upon request at the
                publisher's email address.
              </p>

              <h2>3. Intellectual property</h2>
              <p>
                All content on this site (texts, images, graphics, logos, icons,
                sounds, software) is protected by Senegalese law and
                international intellectual property conventions. Any
                reproduction, representation, modification, or exploitation, in
                whole or in part, is prohibited without the prior written
                authorisation of {organization.name}.
              </p>

              <h2>4. Limitation of liability</h2>
              <p>
                {organization.acronym} strives to provide information as
                accurately as possible. However, it cannot be held liable for
                omissions, inaccuracies, or deficiencies in updates, whether
                attributable to itself or to third parties.
              </p>

              <h2>5. External links</h2>
              <p>
                The site may contain links to other websites, notably the
                official pages of affiliated institutions and their Students'
                Unions (BDE). {organization.acronym} has no means of controlling
                the content of these third-party sites and declines all
                responsibility for their content.
              </p>

              <h2>6. Applicable law</h2>
              <p>
                These legal notices are governed by Senegalese law. Any dispute
                shall be submitted to the jurisdiction of the courts of{' '}
                {organization.city}, {organization.country.en}.
              </p>
            </div>
          </Reveal>

          <Reveal className="legal-cta">
            <Link to="/contact" className="button button--outline" data-lang="fr">
              Une question ? Contactez-nous <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="button button--outline" data-lang="en">
              Any questions? Contact us <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
