import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLanguage } from '../context/LanguageContext'
import BrandLogo from '../components/BrandLogo'
import Reveal from '../components/Reveal'

/**
 * Page de remerciement après soumission réussie du formulaire de contact.
 * Route : /merci — accédée uniquement après un envoi FormSubmit réussi.
 *
 * NB : volontairement SANS noindex (ruling plan T8) — la route est tenue à
 * l'écart des moteurs par les moyens d'infrastructure (hors sitemap.xml et
 * hors prérendu, scripts/prerender.mjs), pas par une balise robots.
 */
export default function ThankYouPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr' ? 'Merci – UUPT' : 'Thank you – UUPT',
    lang === 'fr'
      ? 'Votre message a bien été envoyé. Le bureau de l’Union revient vers vous dans les meilleurs délais.'
      : 'Your message has been sent. The Union’s office will get back to you as soon as possible.',
  )

  return (
    <>
      <section className="thankyou-section">
        <div className="container thankyou-container">
          <Reveal className="thankyou-card">
            <div className="thankyou-logo-wrap">
              <BrandLogo className="thankyou-logo" tone="ink" />
            </div>

            <div className="thankyou-icon">
              <CheckCircle size={56} aria-hidden="true" />
            </div>

            <h1 data-lang="fr">Merci !</h1>
            <h1 data-lang="en">Thank you!</h1>

            <p className="thankyou-lead" data-lang="fr">
              Votre message a bien été envoyé. Le bureau de l’Union revient vers
              vous dans les meilleurs délais et, le cas échéant, transmet votre
              demande au BDE compétent.
            </p>
            <p className="thankyou-lead" data-lang="en">
              Your message has been sent. The Union’s office will get back to
              you as soon as possible and, where applicable, forward your
              request to the relevant BDE.
            </p>

            <div className="thankyou-badge">
              <Clock size={18} aria-hidden="true" />
              <span data-lang="fr">Réponse sous 24h à 48h ouvrées</span>
              <span data-lang="en">Reply within 24–48 working hours</span>
            </div>

            <div className="thankyou-actions">
              <Link to="/" className="button button--primary" data-lang="fr">
                Retour à l’accueil <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/" className="button button--primary" data-lang="en">
                Back to home <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/a-propos" className="button button--outline" data-lang="fr">
                Découvrir l’Union
              </Link>
              <Link to="/a-propos" className="button button--outline" data-lang="en">
                Discover the Union
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
