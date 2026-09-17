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
 * Politique de confidentialité — adaptée à l'UUPT.
 * Route : /politique-de-confidentialite
 * ⚠️ À faire relire par un professionnel du droit avant la mise en ligne.
 */
export default function PrivacyPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr'
      ? 'Politique de confidentialité – UUPT'
      : 'Privacy policy – UUPT',
    lang === 'fr'
      ? "Politique de confidentialité de l'UUPT : données collectées via le formulaire de contact, finalités, durée de conservation, absence de traceurs et vos droits."
      : 'UUPT privacy policy: data collected through the contact form, purposes, retention period, absence of trackers and your rights.',
  )

  const calque = useCalquePool()

  return (
    <>
      <PageHero variant="photo" images={calque.slice(0, 3)}>
        <span className="eyebrow" data-lang="fr">Protection des données</span>
        <span className="eyebrow" data-lang="en">Data protection</span>
        <h1 data-lang="fr">Politique de confidentialité</h1>
        <h1 data-lang="en">Privacy policy</h1>
      </PageHero>

      <div className="scroll-sentinel" aria-hidden="true" />

      <section className="section legal-section">
        <div className="container container--narrow">
          {/* ── FR ─────────────────────────────────────────────── */}
          <Reveal>
            <div className="legal-content" data-lang="fr">
              <p><strong>Dernière mise à jour :</strong> Septembre 2026</p>

              <h2>1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles est{' '}
                <strong>{organization.name} ({organization.acronym})</strong>,
                mouvement estudiantin inter-établissements basé à{' '}
                {organization.city}, {organization.country.fr}.
              </p>
              <p>
                Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>2. Données collectées</h2>
              <p>
                Les données personnelles collectées via le formulaire de
                contact sont exclusivement :
              </p>
              <ul>
                <li>Nom complet</li>
                <li>Adresse email</li>
                <li>Établissement (optionnel)</li>
                <li>Qualité (étudiant, membre ou président de BDE, direction d'établissement, enseignant, partenaire — optionnel)</li>
                <li>Contenu du message</li>
              </ul>
              <p>
                Ces données sont transmises à l'adresse email officielle de
                l'Union via un service d'acheminement tiers (FormSubmit).{' '}
                <strong>Aucune donnée n'est stockée sur le site lui-même.</strong>
              </p>

              <h2>3. Finalité du traitement</h2>
              <p>
                Les données collectées sont utilisées exclusivement pour :
              </p>
              <ul>
                <li>Répondre à votre demande (adhésion, activité, renseignement ou partenariat)</li>
                <li>Assurer la liaison avec le BDE de l'établissement concerné lorsque votre demande le requiert</li>
              </ul>
              <p>
                Votre adresse email sert uniquement à vous répondre. Vos données
                ne sont jamais utilisées à des fins de prospection non sollicitée
                et ne sont jamais vendues à des tiers.
              </p>

              <h2>4. Cookies et traceurs</h2>
              <p>
                Ce site n'utilise <strong>aucun cookie de suivi</strong>, aucun
                outil d'analyse statistique (type Google Analytics) et aucun
                pixel de retargeting publicitaire. Seule une préférence technique
                de langue (<code>localStorage</code>) est enregistrée pour
                mémoriser votre choix linguistique (français/anglais).
              </p>

              <h2>5. Durée de conservation</h2>
              <p>
                Les données transmises par le formulaire de contact sont
                conservées dans la messagerie de l'Union pour la durée nécessaire
                au traitement de votre demande, et au maximum pendant 24 mois.
              </p>

              <h2>6. Vos droits</h2>
              <p>
                Conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008
                sur la protection des données à caractère personnel, vous
                disposez d'un droit d'accès, de rectification et de suppression
                de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, adressez votre demande à :{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>7. Sécurité</h2>
              <p>
                L'{organization.acronym} met en œuvre les mesures techniques et
                organisationnelles appropriées pour protéger vos données contre
                tout accès non autorisé, modification, divulgation ou
                destruction.
              </p>

              <h2>8. Modifications</h2>
              <p>
                La présente politique peut être mise à jour à tout moment. Toute
                modification sera publiée sur cette page avec la date de
                dernière mise à jour.
              </p>
            </div>
          </Reveal>

          {/* ── EN ─────────────────────────────────────────────── */}
          <Reveal>
            <div className="legal-content" data-lang="en">
              <p><strong>Last updated:</strong> September 2026</p>

              <h2>1. Data controller</h2>
              <p>
                The data controller is{' '}
                <strong>{organization.name} ({organization.acronym})</strong>,
                an inter-campus student movement based in {organization.city},{' '}
                {organization.country.en}.
              </p>
              <p>
                Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>2. Data collected</h2>
              <p>
                Personal data collected through the contact form is limited to:
              </p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Institution (optional)</li>
                <li>Role (student, BDE member or president, institution leadership, teacher, partner — optional)</li>
                <li>Message content</li>
              </ul>
              <p>
                This data is forwarded to the Union's official email address
                through a third-party delivery service (FormSubmit).{' '}
                <strong>No data is stored on the site itself.</strong>
              </p>

              <h2>3. Purpose of processing</h2>
              <p>
                Collected data is used exclusively to:
              </p>
              <ul>
                <li>Respond to your request (membership, activity, enquiry or partnership)</li>
                <li>Liaise with the BDE of the institution concerned whenever your request requires it</li>
              </ul>
              <p>
                Your email address is used solely to reply to you. Your data is
                never used for unsolicited marketing and is never sold to third
                parties.
              </p>

              <h2>4. Cookies and trackers</h2>
              <p>
                This site uses <strong>no tracking cookies</strong>, no
                analytics tools (such as Google Analytics), and no advertising
                retargeting pixels. Only a technical language preference
                (<code>localStorage</code>) is stored to remember your language
                choice (French/English).
              </p>

              <h2>5. Data retention</h2>
              <p>
                Data submitted through the contact form is retained in the
                Union's mailbox for as long as needed to process your request,
                and for a maximum of 24 months.
              </p>

              <h2>6. Your rights</h2>
              <p>
                In accordance with Senegalese Law No. 2008-12 of January 25,
                2008, on the protection of personal data, you have the right to
                access, rectify, and delete your personal data.
              </p>
              <p>
                To exercise these rights, send your request to:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>7. Security</h2>
              <p>
                {organization.acronym} implements appropriate technical and
                organisational measures to protect your data against
                unauthorised access, modification, disclosure, or destruction.
              </p>

              <h2>8. Updates</h2>
              <p>
                This policy may be updated at any time. Any changes will be
                published on this page with the updated date.
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
