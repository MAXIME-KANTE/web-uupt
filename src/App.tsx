import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import PageVeil from './components/motion/PageVeil'
import SmoothScroll from './components/motion/SmoothScroll'
import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'

// Pages intérieures chargées à la demande (découpage du bundle) : l'accueil
// reste dans le chunk initial (LCP) ; les autres chunks sont préchargés au
// survol des liens par PageVeil — voir src/pages/pageLoaders.ts.
const AxeAcademiqueCulturelPage = lazy(() => import('./pages/AxeAcademiqueCulturelPage'))
const AxeInnovationPage = lazy(() => import('./pages/AxeInnovationPage'))
const AxeSportifPage = lazy(() => import('./pages/AxeSportifPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const HistoriquePage = lazy(() => import('./pages/HistoriquePage'))
const PartenairesPage = lazy(() => import('./pages/PartenairesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <SmoothScroll />
      <div className="page-wrapper" id="page-wrapper">
        <a href="#main-content" className="skip-link" data-lang="fr">
          Aller au contenu principal
        </a>
        <a href="#main-content" className="skip-link" data-lang="en">
          Skip to main content
        </a>

        <Navbar />

        {/* Landmark main — cible du skip-link. */}
        <main id="main-content">
          <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/axe-academique-culturel" element={<AxeAcademiqueCulturelPage />} />
              <Route path="/axe-innovation" element={<AxeInnovationPage />} />
              <Route path="/axe-sportif" element={<AxeSportifPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/historique" element={<HistoriquePage />} />
              <Route path="/partenaires" element={<PartenairesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/mentions-legales" element={<LegalPage />} />
              <Route path="/politique-de-confidentialite" element={<PrivacyPage />} />
              <Route path="/merci" element={<ThankYouPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>

      {/* Hors de .page-wrapper pour rester fixe à l'écran (voir WhatsAppButton). */}
      <Preloader />
      <WhatsAppButton />
      {/* Rideau de transition entre pages — s'efface en reduced-motion. */}
      <PageVeil />
    </LanguageProvider>
  )
}
