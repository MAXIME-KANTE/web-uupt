import { Link } from 'react-router-dom'
import { ArrowRight, Home } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLanguage } from '../context/LanguageContext'
import Magnetic from '../components/motion/Magnetic'

/**
 * Page 404 personnalisée aux couleurs de l'UUPT.
 * Route : catch-all « * » dans App.tsx.
 */
export default function NotFoundPage() {
  const { lang } = useLanguage()
  usePageMeta(
    lang === 'fr' ? 'Page introuvable – UUPT' : 'Page not found – UUPT',
    lang === 'fr'
      ? "La page que vous recherchez n'existe pas ou a été déplacée sur le site de l'UUPT."
      : 'The page you are looking for does not exist or has been moved on the UUPT website.',
    true, // noindex : page 404
  )

  return (
    <section className="not-found-section">
      <div className="container not-found-container">
        <div className="not-found-code" aria-hidden="true">404</div>

        <h1 data-lang="fr">Page introuvable</h1>
        <h1 data-lang="en">Page not found</h1>

        <p className="not-found-lead" data-lang="fr">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Pas d'inquiétude, retrouvez votre chemin ci-dessous.
        </p>
        <p className="not-found-lead" data-lang="en">
          The page you're looking for doesn't exist or has been moved.
          No worries, find your way below.
        </p>

        <div className="not-found-actions">
          <Magnetic>
            <Link to="/" className="button button--primary" data-lang="fr">
              <Home size={17} aria-hidden="true" /> Retour à l'accueil
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/" className="button button--primary" data-lang="en">
              <Home size={17} aria-hidden="true" /> Back to home
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/contact" className="button button--outline" data-lang="fr">
              Nous contacter <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/contact" className="button button--outline" data-lang="en">
              Contact us <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
