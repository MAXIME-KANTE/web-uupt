# Refonte UUPT sur l'architecture SALEEL — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruire le site UUPT avec l'architecture et le design exacts de SALEEL WEB V1 (design system App.css, preloader, PageVeil, Lenis, GSAP, i18n FR/EN, routes lazy, prérendu), en y plaçant le contenu réel de l'Union des Universités Privées de Thiès.

**Architecture:** SPA React multi-pages. La machinerie SALEEL est copiée verbatim (moteur) ; les gabarits de sections sont habillés du contenu de `src/data/uuptData.ts`. Seule l'accueil est dans le chunk initial ; les 11 autres pages sont lazy + préchargées au survol. Le build prérend les 10 routes indexables + la 404 via Chrome headless.

**Tech Stack:** React 19, TypeScript (config SALEEL), Vite 8, Tailwind 3 (preflight off, design system dans `App.css`), react-router-dom 7, GSAP + @gsap/react, Lenis, framer-motion, lucide-react, puppeteer-core + sharp (prérendu).

**Spec:** `docs/superpowers/specs/2026-09-17-uupt-rebuild-saleel-design.md` (le plan s'appuie sur la spec — les exécuteurs lisent les deux).

## Global Constraints

- **Référence intouchable** : ne JAMAIS modifier `SALEEL WEB V1/` — lecture seule. Les copies se font depuis `SALEEL WEB V1/SALEEL WEB/…` (ci-après `REF/`).
- **Palette verbatim SALEEL** : ink `#16213a`, cream `#fdfcfa`, sand `#f0ebdf`, brand `#f97316`, brand-dark `#ea6c0a` — aucune couleur modifiée.
- **Polices** : sans = Inter, display = Poppins, accent = Instrument Serif (Google Fonts, bloc `<head>` de la Task 3).
- **preflight: false** — tout le design vit dans `src/App.css` (copié tel quel).
- **i18n** : FR par défaut ; chaînes d'interface = paires `data-lang="fr|en"` + classe `.lang-en` sur `<html>` ; contenu éditorial = champs `fr`/`en` dans `uuptData.ts` (convention spec §8). Clé localStorage : `'uupt-lang'`.
- **Placeholders propriétaire** marqués `TODO(UUPT)` : email `contact@uupt.sn`, téléphone/WhatsApp, `SITE_URL = 'https://uupt.maximekante23.workers.dev'` — valeurs conservées telles quelles, jamais inventées.
- **Aucune dépendance hors de la liste SALEEL** (versions copiées verbatim de `REF/package.json`).
- **Chaque tâche** se termine par : `npm run typecheck` sans erreur + commit git (message français, se terminant par `Co-Authored-By: Claude Code <noreply@anthropic.com>`).
- **Pas de framework de test** (aucun n'existe dans les deux projets, spec §12) : la vérification par tâche = typecheck + build/dev-server + vérifications manuelles listées.
- Environnement Windows ; PowerShell par défaut, Bash disponible.

---

### Task 1: Aligner les dépendances sur la toolchain SALEEL

**Files:**
- Modify: `package.json` (remplacement complet)
- Delete: tout `src/` sauf `src/data/uuptData.ts` et `src/types.ts`

**Interfaces:**
- Produces: scripts npm `dev` / `typecheck` / `build` / `preview` utilisés par toutes les tâches suivantes.

- [ ] **Step 1: Remplacer `package.json`**

```json
{
  "name": "uupt",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "typecheck": "tsc -b",
    "build": "tsc -b && vite build && node scripts/prerender.mjs",
    "preview": "vite preview"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "framer-motion": "^13.1.1",
    "gsap": "^3.15.0",
    "lenis": "^1.3.26",
    "lucide-react": "^1.33.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.2"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.6.0",
    "postcss": "^8.5.28",
    "puppeteer-core": "^25.10.0",
    "sharp": "^0.35.4",
    "tailwindcss": "^3.4.17",
    "typescript": "^7.0.2",
    "vite": "^8.2.2"
  }
}
```

- [ ] **Step 2: Purger l'ancien src/** — supprimer tout le contenu de `src/` SAUF `src/data/uuptData.ts` et `src/types.ts` (source de vérité du contenu, spec §3). Ne pas toucher à `public/`, `index.html`, `postcss.config.js`.

- [ ] **Step 3: Installer**

Run: `npm install`
Expected: installation réussie (le package-lock est régénéré). Si `npm install` échoue sur une version, copier la valeur EXACTE depuis `REF/package.json` et recommencer — ne jamais choisir une autre version.

- [ ] **Step 4: Vérifier la config TS** — `npx tsc -b` échouera forcément (plus de src) : c'est attendu ici, l'erreur doit être « aucun fichier src » et non une erreur de tsconfig. Si erreur de structure de projets TS, copier les tsconfig de `REF/` (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) en ajustant uniquement les chemins `include`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m " chore: aligne la toolchain sur SALEEL et purge l'ancien src (contenu UUPT conservé)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 2: Copier le moteur SALEEL verbatim + coquille de routes navigable

**Files:**
- Create (copie verbatim depuis `REF/src/…` → `src/…`) :
  - `src/App.css`, `src/tailwind.css`
  - `src/lib/gsap.ts`, `src/lib/smoothScroll.ts`
  - `src/hooks/useCalquePool.ts`, `src/hooks/usePageMeta.ts`, `src/hooks/usePrefersReducedMotion.ts`
  - `src/components/motion/{GsapWords,Magnetic,PageVeil,ProcessTimeline,SmoothScroll,StatsBand}.tsx`
  - `src/components/{Preloader,ScrollToTop,WhatsAppButton,Reveal,WordReveal,Marquee,JsonLd,PageHero,MobileDrawer,BrandLogo,Footer,Navbar,ContactForm,FaqAccordion,HomeHero,HeroCarousel,HeroPoleBold,PolesExpertise,ValeursGrid,IdentitySlider,ProgrammesGrid,PrestationsAccordion,ShowcaseCarousel,CommunityCard,PromiseStrip}.tsx` (selon présence dans REF — voir Step 1)
  - `src/pages/{AboutPage,ContactPage,LegalPage,PrivacyPage,ThankYouPage,NotFoundPage,HomePage}.tsx` (gabarits, adaptés dans les tâches 8-13)
  - `src/context/LanguageContext.tsx`
  - `scripts/prerender.mjs`
  - `vite.config.ts` (remplace celui d'UUPT — groupes vendor-react/vendor-motion, spec §5)
  - `src/vite-env.d.ts` si présent dans REF
- Create (nouveau) : `src/constants.ts`, `src/pages/pageLoaders.ts`, stubs de pages axes
- Modify: `src/App.tsx`, `src/main.tsx`, `index.html` (Task 3), `src/components/Preloader.tsx` (Task 4)

**Détail de copie :** copier aussi tout composant de gabarit présent dans `REF/src/components/` qui sert une section du site UUPT : `HomeHero`, `HeroCarousel`, `HeroPoleBold`, `PolesExpertise`, `ValeursGrid`, `IdentitySlider`, `ProgrammesGrid`, `PrestationsAccordion`, `ShowcaseCarousel`, `CommunityCard`, `PromiseStrip`, `SectionTitle` (ou équivalent), `icons/WhatsAppIcon`. NE PAS copier : `PropertyCard`, `ImmobilierHero`, `RealisationsExplorer`, `RealisationsGallery`, `NewsCard`, `ActualitesBento`, `ProjetPhare`, `Testimonials`, `DiasporaRotator`, `DiasporaSection`, `data/properties.ts`, `data/` de SALEEL en général.

**Interfaces:**
- Produces: `prefetchRoute(path: string): void` (pageLoaders), `useLanguage()` → `{lang, setLang, toggleLang}`, routes complètes navigables avec pages stub.

- [ ] **Step 1: Copier les fichiers verbatim** (PowerShell, depuis la racine du projet) :

```powershell
$ref = "SALEEL WEB V1\SALEEL WEB\src"
New-Item -ItemType Directory -Force src\lib, src\hooks, src\components\motion, src\components\icons, src\context, src\pages, src\data, scripts | Out-Null
Copy-Item "$ref\App.css","$ref\tailwind.css" src\
Copy-Item "$ref\lib\*.ts" src\lib\
Copy-Item "$ref\hooks\*.ts" src\hooks\
Copy-Item "$ref\components\motion\*.tsx" src\components\motion\
Copy-Item "$ref\context\LanguageContext.tsx" src\context\
Copy-Item "$ref\pages\pageLoaders.ts" src\pages\ -ErrorAction SilentlyContinue
# Composants copiés un à un (liste ci-dessus) :
foreach ($c in @('Preloader','ScrollToTop','WhatsAppButton','Reveal','WordReveal','Marquee','JsonLd','PageHero','MobileDrawer','BrandLogo','Footer','Navbar','ContactForm','HomeHero','HeroCarousel','HeroPoleBold','PolesExpertise','ValeursGrid','IdentitySlider','ProgrammesGrid','PrestationsAccordion','ShowcaseCarousel','CommunityCard','PromiseStrip')) {
  if (Test-Path "$ref\components\$c.tsx") { Copy-Item "$ref\components\$c.tsx" src\components\ }
}
if (Test-Path "$ref\components\icons") { Copy-Item "$ref\components\icons\*" src\components\icons\ }
Copy-Item "SALEEL WEB V1\SALEEL WEB\scripts\prerender.mjs" scripts\
Copy-Item "SALEEL WEB V1\SALEEL WEB\vite.config.ts" .
```

Si un fichier de la liste n'existe pas sous ce nom dans REF, chercher son équivalent (`Glob REF/src/components/*.tsx`) et noter la correspondance dans le commit — ne rien inventer.

- [ ] **Step 1 bis: Adapter `HeroCarousel` au srcSet Unsplash** (spec §9 — le tableau mesuré `SLIDE_INTRINSIC_WIDTHS` de SALEEL n'est pas repris car les URLs Unsplash portent déjà leur largeur `w=`) : dans `src/components/HeroCarousel.tsx`, remplacer la fonction `buildSrcSet` (et tout usage de `SLIDE_INTRINSIC_WIDTHS` importé de `./constants`) par :

```ts
/** Les URLs Unsplash embarquent leur largeur (…&w=1920) — le descripteur
 * srcSet se déduit directement de l'URL, pas d'un tableau mesuré. */
const buildSrcSet = (url: string): string => {
  const match = url.match(/[?&]w=(\d+)/)
  return match ? `${url} ${match[1]}w` : url
}
```

Puis `Grep SLIDE_INTRINSIC_WIDTHS src/` → zéro occurrence restante (corriger tout autre importeur de la même façon).

- [ ] **Step 2: Créer `src/constants.ts`**

```ts
/**
 * Configuration centrale du site UUPT — source unique pour le formulaire
 * (FormSubmit), le JSON-LD (index.html) et le prérendu (scripts/prerender.mjs).
 */

/** Email de contact opérationnel — TODO(UUPT) : remplacer par l'email officiel. */
export const CONTACT_EMAIL = 'contact@uupt.sn'

/**
 * Origine publique du site (placeholder — TODO(UUPT) : substituer au domaine
 * définitif ici ET dans index.html / sitemap.xml, comme documenté chez SALEEL).
 */
export const SITE_URL = 'https://uupt.maximekante23.workers.dev'

/** URL Unsplash optimisée (le site n'utilise que des visuels distants, spec §9). */
const unsplash = (id: string, width = 1920): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

/** Diaporama du hero d'accueil — la 1re image est préchargée dans index.html
 * (et attendue par le Preloader : mettre les deux à jour ensemble). */
export const HOME_HERO_SLIDES: readonly string[] = [
  unsplash('photo-1523050854058-8df90110c9f1'),
  unsplash('photo-1475721027785-f74eccf877e2'),
  unsplash('photo-1523240795612-9a054b0db644'),
]

export type AxeId = 'academique-culturel' | 'innovation' | 'sportif'

/** Galerie de chaque axe — hero de page axe + mini-carrousels de l'accueil.
 * TODO(UUPT) : enrichir avec de vraies photos d'événements quand disponibles. */
export const AXE_GALLERIES: Record<AxeId, readonly string[]> = {
  'academique-culturel': [
    unsplash('photo-1521587760476-6c12a4b040da', 1600),
    unsplash('photo-1475721027785-f74eccf877e2', 1600),
  ],
  innovation: [
    unsplash('photo-1518770660439-4636190af475', 1600),
    unsplash('photo-1523240795612-9a054b0db644', 1600),
  ],
  sportif: [unsplash('photo-1546519638-68e109498ffc', 1600)],
}

/** Pool d'arrière-plans aléatoires (fonds de section, bandeaux CTA) — useCalquePool. */
export const CALQUE_IMAGES: readonly string[] = [
  unsplash('photo-1523050854058-8df90110c9f1', 1920),
  unsplash('photo-1523240795612-9a054b0db644', 1920),
  unsplash('photo-1475721027785-f74eccf877e2', 1920),
]
```

- [ ] **Step 3: Réécrire `src/pages/pageLoaders.ts`** (conserver verbatim la mécanique `prefetchRoute`/`inflight` du fichier copié, remplacer uniquement la table) :

```ts
const loaders: Record<string, () => Promise<unknown>> = {
  '/axe-academique-culturel': () => import('./AxeAcademiqueCulturelPage'),
  '/axe-innovation': () => import('./AxeInnovationPage'),
  '/axe-sportif': () => import('./AxeSportifPage'),
  '/a-propos': () => import('./AboutPage'),
  '/historique': () => import('./HistoriquePage'),
  '/partenaires': () => import('./PartenairesPage'),
  '/contact': () => import('./ContactPage'),
  '/mentions-legales': () => import('./LegalPage'),
  '/politique-de-confidentialite': () => import('./PrivacyPage'),
  '/merci': () => import('./ThankYouPage'),
}
```

- [ ] **Step 4: Créer les stubs de pages** — pour chaque entrée du loader + NotFound, créer le fichier minimal (exemple pour `src/pages/AxeAcademiqueCulturelPage.tsx`, répéter avec le bon nom exporté par défaut) :

```tsx
/** Stub — remplacé par la page finale dans une tâche dédiée. */
export default function AxeAcademiqueCulturelPage() {
  return <div className="page-wrapper" style={{ minHeight: '60vh' }} />
}
```

Fichiers : `AxeAcademiqueCulturelPage`, `AxeInnovationPage`, `AxeSportifPage`, `AboutPage`, `HistoriquePage`, `PartenairesPage`, `ContactPage`, `LegalPage`, `PrivacyPage`, `ThankYouPage`, `NotFoundPage`.

- [ ] **Step 5: Réécrire `src/App.tsx`** (structure SALEEL verbatim, carte UUPT) :

```tsx
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
```

- [ ] **Step 6: Créer `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './tailwind.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 7: Stub `src/pages/HomePage.tsx`** (remplacé en Task 9) :

```tsx
export default function HomePage() {
  return <div style={{ minHeight: '100vh' }} />
}
```

- [ ] **Step 8: Adapter `scripts/prerender.mjs`** — remplacer uniquement `SITE` par défaut et `ROUTES` :

```js
const SITE = process.env.SITE_URL || 'https://uupt.maximekante23.workers.dev'
// ...
// Routes indexables uniquement (/merci est noindex et hors sitemap).
const ROUTES = [
  '/',
  '/axe-academique-culturel',
  '/axe-innovation',
  '/axe-sportif',
  '/a-propos',
  '/historique',
  '/partenaires',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
]
```

(Tout le reste du script — serveur statique, capture, 404 — inchangé.)

- [ ] **Step 9: Vérifier** — `npm run typecheck` → PASS. `npm run dev` → le serveur démarre ; toutes les 12 routes naviguent sans erreur console (pages stub). Arrêter le serveur.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: copie le moteur SALEEL (design system, motion, routeur lazy) et pose la carte des 12 routes UUPT

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 3: index.html UUPT (méta, polices, preload LCP, JSON-LD)

**Files:**
- Modify: `index.html` (remplacement complet)

**Interfaces:**
- Produces: `window.__PRERENDERED__` consommé par Preloader ; clé `'uupt-lang'` lue au boot ; JSON-LD EducationalOrganization + WebSite.

- [ ] **Step 1: Remplacer `index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, viewport-fit=cover"
    />
    <title>UUPT – Union des Universités Privées de Thiès</title>
    <meta
      name="description"
      content="UUPT, mouvement estudiantin inter-établissements de Thiès, Sénégal : académique & culturel, innovation et sport. Fédérer, promouvoir, collaborer avec les BDE."
    />
    <link rel="canonical" href="https://uupt.maximekante23.workers.dev/" />

    <!-- ── Open Graph + Twitter Cards (aperçus WhatsApp / LinkedIn / FB) ── -->
    <meta property="og:title" content="UUPT – Union des Universités Privées de Thiès" />
    <meta
      property="og:description"
      content="Mouvement estudiantin inter-établissements de Thiès, Sénégal : académique & culturel, innovation et sport."
    />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_SN" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:site_name" content="UUPT" />
    <!-- Domaine provisoire workers.dev — à re-substituer au domaine définitif. -->
    <meta property="og:url" content="https://uupt.maximekante23.workers.dev/" />
    <meta
      property="og:image"
      content="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="800" />
    <meta
      property="og:image:alt"
      content="Étudiants réunis sur le parvis d'un campus universitaire"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="UUPT – Union des Universités Privées de Thiès" />
    <meta
      name="twitter:description"
      content="Mouvement estudiantin inter-établissements de Thiès, Sénégal : académique & culturel, innovation et sport."
    />
    <meta
      name="twitter:image"
      content="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    />

    <!-- ── Favicon (dame UUPT) ── -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/dame.png" />
    <link rel="mask-icon" href="/favicon.svg" color="#f97316" />

    <meta name="theme-color" content="#16213a" />

    <!-- ── Polices : préchargées (non bloquantes) → zéro FOIT/écran blanc ── -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=Instrument+Serif:ital@1&display=swap"
      rel="preload"
      as="style"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=Instrument+Serif:ital@1&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media = 'all'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=Instrument+Serif:ital@1&display=swap"
        rel="stylesheet"
      />
    </noscript>

    <!-- Première image du diaporama du hero (LCP) — doît refléter
         HOME_HERO_SLIDES[0] (src/constants.ts). -->
    <link
      as="image"
      fetchpriority="high"
      href="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
      rel="preload"
      imagesrcset="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80 1920w"
      imagesizes="100vw"
    />
    <script>
      // Applique la langue sauvegardée avant le premier rendu pour éviter
      // un flash de la mauvaise langue (le CSS masque via la classe .lang-en).
      if (localStorage.getItem("uupt-lang") === "en") {
        document.documentElement.classList.add("lang-en");
        document.documentElement.lang = "en";
      }
    </script>
    <!-- Données structurées : EducationalOrganization + WebSite (pas de
         SearchAction — pas de recherche interne). -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "EducationalOrganization",
            "@id": "https://uupt.maximekante23.workers.dev/#organization",
            "name": "Union des Universités Privées de Thiès",
            "alternateName": "UUPT",
            "description": "Mouvement estudiantin inter-établissements fédérant les universités et écoles privées de Thiès, Sénégal : académique & culturel, innovation et sport.",
            "foundingDate": "2026-04-26",
            "url": "https://uupt.maximekante23.workers.dev/",
            "email": "contact@uupt.sn",
            "logo": {
              "@type": "ImageObject",
              "@id": "https://uupt.maximekante23.workers.dev/#logo",
              "url": "https://uupt.maximekante23.workers.dev/dame.png",
              "caption": "Logo UUPT"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Thiès",
              "addressRegion": "Thiès",
              "addressCountry": "SN"
            }
          },
          {
            "@type": "WebSite",
            "@id": "https://uupt.maximekante23.workers.dev/#website",
            "url": "https://uupt.maximekante23.workers.dev/",
            "name": "UUPT – Union des Universités Privées de Thiès",
            "inLanguage": ["fr", "en"],
            "publisher": { "@id": "https://uupt.maximekante23.workers.dev/#organization" }
          }
        ]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Vérifier** — `npm run dev`, ouvrir l'accueil : aucune erreur console ; l'onglet affiche « UUPT – Union des Universités Privées de Thiès » ; basculer `localStorage.uupt-lang = 'en'` + recharger ne casse rien.

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "feat: index.html UUPT (méta FR/EN, polices SALEEL, preload LCP, JSON-LD EducationalOrganization)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 4: LanguageContext, Preloader, BrandLogo — réglages de marque

**Files:**
- Modify: `src/context/LanguageContext.tsx` (1 ligne)
- Modify: `src/components/Preloader.tsx`
- Modify: `src/components/BrandLogo.tsx`
- Modify: `src/components/WhatsAppButton.tsx`

**Interfaces:**
- Consumes: `HOME_HERO_SLIDES` (constants.ts, Task 2).
- Produces: `useLanguage()` inchangé ; clé localStorage `'uupt-lang'` ; logo = `/dame.png` ; WhatsApp = numéro uuptData.

- [ ] **Step 1: LanguageContext** — remplacer `const STORAGE_KEY = 'saleel-lang'` par :

```ts
const STORAGE_KEY = 'uupt-lang'
```

- [ ] **Step 2: Preloader** — lire le fichier copié ; remplacer la/les références à l'image hero SALEEL (`/HERO/1.webp`) par `HOME_HERO_SLIDES[0]` importé depuis `../constants` ; remplacer tout texte visible (ex. nom de marque) par « UUPT » avec paires `data-lang="fr|en"` si le texte existe en double. Conserver la plafond 2,6 s et la logique `window.__PRERENDERED__` tels quels.

- [ ] **Step 3: BrandLogo** — lire le fichier ; remplacer l'asset logo SALEEL par `/dame.png` (attribut `src`) et le mot-symbole par « UUPT » ; conserver les variants (`header`/`footer` si présents) et l'`alt` : « Logo UUPT — Union des Universités Privées de Thiès ». Si BrandLogo dessine un SVG inline SALEEL, le remplacer par :

```tsx
<img src="/dame.png" alt="Logo UUPT — Union des Universités Privées de Thiès" />
```

dans le même conteneur/classes (le CSS App.css dimensionne déjà `.brand img`).

- [ ] **Step 4: WhatsAppButton** — lire le fichier ; remplacer le numéro codé en dur par la valeur `organization.whatsapp` de `src/data/uuptData.ts` (`import { organization } from '../data/uuptData'`), `aria-label` FR/EN en paires `data-lang`.

- [ ] **Step 5: Vérifier** — `npm run typecheck` → PASS ; `npm run dev` : le preloader s'affiche puis fondue ≤ 2,6 s ; le logo dame apparaît dans le header ; le bouton WhatsApp flotte en bas à droite.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: réglages de marque (clé i18n uupt-lang, logo dame, preloader sur le hero UUPT, WhatsApp depuis uuptData)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 5: Navbar bilingue avec menu déroulant « Nos Axes » + MobileDrawer

**Files:**
- Modify: `src/components/Navbar.tsx` (NAV_ITEMS + rendu dropdown)
- Modify: `src/App.css` (bloc `.nav-dropdown`, fin de fichier)
- Modify: `src/components/MobileDrawer.tsx` (sous-liste axes)

**Interfaces:**
- Consumes: routes `/axe-*` (Task 2).
- Produces: navigation complète ; la classe `.scroll-sentinel` attendue par le header est posée par les pages (Tasks 9-13).

- [ ] **Step 1: NAV_ITEMS** — dans Navbar.tsx, remplacer le tableau par :

```tsx
const NAV_ITEMS: readonly NavItem[] = [
  { to: '/', fr: 'Accueil', en: 'Home' },
  { to: '/a-propos', fr: 'À propos', en: 'About' },
  { to: '/historique', fr: 'Historique', en: 'History' },
  { to: '/partenaires', fr: 'BDE Partenaires', en: 'Partner BDEs' },
]

const AXES_MENU: readonly { to: string; fr: string; en: string }[] = [
  { to: '/axe-academique-culturel', fr: 'Académique & Culturel', en: 'Academic & Cultural' },
  { to: '/axe-innovation', fr: 'Innovation', en: 'Innovation' },
  { to: '/axe-sportif', fr: 'Sportif', en: 'Sports' },
]
```

- [ ] **Step 2: Rendu du dropdown** — dans `<nav className="desktop-nav">`, après le `.map(NAV_ITEMS)`, insérer (les NavLink gardent le pattern de classes `active` existant) :

```tsx
<div className="nav-dropdown">
  <button
    type="button"
    className="nav-dropdown__trigger"
    aria-haspopup="true"
    aria-expanded={axesOpen}
    onClick={() => setAxesOpen((v) => !v)}
    onBlur={(e) => {
      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setAxesOpen(false)
    }}
  >
    <span data-lang="fr">Nos Axes</span>
    <span data-lang="en">Our Axes</span>
  </button>
  <div className={`nav-dropdown__panel${axesOpen ? ' is-open' : ''}`} role="menu">
    {AXES_MENU.map((axe) => (
      <Fragment key={axe.to}>
        <NavLink
          to={axe.to}
          className={({ isActive }) => `nav-dropdown__link${isActive ? ' active' : ''}`}
          data-lang="fr"
          onClick={() => setAxesOpen(false)}
        >
          {axe.fr}
        </NavLink>
        <NavLink
          to={axe.to}
          className={({ isActive }) => `nav-dropdown__link${isActive ? ' active' : ''}`}
          data-lang="en"
          onClick={() => setAxesOpen(false)}
        >
          {axe.en}
        </NavLink>
      </Fragment>
    ))}
  </div>
</div>
```

avec en haut du composant : `const [axesOpen, setAxesOpen] = useState(false)` + un effet existant à étendre : fermer le dropdown à la navigation (`useEffect(() => { setAxesOpen(false) }, [location.pathname])`, à côté de l'effet drawer déjà présent). Marquer l'item actif : si `location.pathname.startsWith('/axe-')`, ajouter la classe `active` au trigger (`className={`nav-dropdown__trigger${location.pathname.startsWith('/axe-') ? ' active' : ''}`}`).

- [ ] **Step 3: CSS du dropdown** — ajouter à la FIN de `src/App.css` (s'appuie sur les tokens existants) :

```css
/* ── Menu déroulant « Nos Axes » (navigation bureau) ─────────────────── */
.nav-dropdown { position: relative; }
.nav-dropdown__trigger {
  display: inline-flex; align-items: center; gap: 6px;
  background: none; border: 0; cursor: pointer;
  font: inherit; color: inherit; padding: 0;
}
.nav-dropdown__trigger::after {
  content: ''; width: 7px; height: 7px; margin-left: 2px;
  border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg) translateY(-2px); transition: transform 0.2s ease;
}
.nav-dropdown__trigger[aria-expanded='true']::after { transform: rotate(225deg) translateY(-1px); }
.nav-dropdown__panel {
  position: absolute; top: calc(100% + 10px); left: 50%;
  translate: -50% 0; min-width: 220px; padding: 10px;
  background: var(--cream, #fdfcfa); border: 1px solid var(--line, #e7e4dd);
  border-radius: 16px; box-shadow: var(--shadow-lift, 0 18px 40px -18px rgb(22 33 58 / 0.25));
  opacity: 0; visibility: hidden; transform: translateY(-6px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
}
.nav-dropdown__panel.is-open { opacity: 1; visibility: visible; transform: translateY(0); }
.nav-dropdown__link {
  display: block; padding: 9px 14px; border-radius: 10px;
  color: var(--ink, #16213a); text-decoration: none; white-space: nowrap;
}
.nav-dropdown__link:hover { background: var(--sand, #f0ebdf); }
```

Si les variables CSS réelles d'App.css portent d'autres noms (`--color-ink` etc.), utiliser celles-ci — vérifier le bloc `:root` d'App.css et adapter les `var()`.

- [ ] **Step 4: MobileDrawer** — lire le fichier ; dans la liste des liens, sous l'entrée « Nos Axes », insérer les 3 liens d'axe en réutilisant la même classe que les items existants + la classe additionnelle `drawer-sublink` ; ajouter à App.css :

```css
.drawer-sublink { padding-left: 28px; font-size: 0.92em; }
```

Fermer le drawer au clic des sous-liens comme pour les liens existants (même gestionnaire).

- [ ] **Step 5: Vérifier** — `npm run typecheck` → PASS ; `npm run dev` : le dropdown s'ouvre/se ferme, clavier inclus (Tab relie trigger → liens, Échap via blur), actif sur `/axe-*` ; le drawer mobile liste les 3 axes ; FR/EN basculent tous les libellés.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: navbar UUPT bilingue avec menu déroulant Nos Axes (bureau + drawer mobile)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 6: Footer UUPT

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `footerCopy`, `contactChannels`, `socialLinks`, `navLinks` (uuptData), `CONTACT_EMAIL` (constants).

- [ ] **Step 1: Adapter le contenu** — lire le Footer copié (structure SALEEL : bloc marque, colonnes de navigation, contact, mentions) et remplacer :
  - Marque : logo dame + « UUPT » + `footerCopy.tagline` (paires `data-lang` pour les textes).
  - Colonne navigation : Accueil `/`, À propos `/a-propos`, Nos Axes `/axe-academique-culturel` (+2), Historique `/historique`, BDE Partenaires `/partenaires`.
  - Colonne légale : Mentions légales `/mentions-legales`, Politique de confidentialité `/politique-de-confidentialite`.
  - Contact : email (`organization.email`, `mailto:`), localisation « Thiès, Sénégal », téléphone (`organization.phone` — `TODO(UUPT)`).
  - Réseaux : `socialLinks` de uuptData (icônes lucide équivalentes à celles du gabarit).
  - Ligne copyright : `© {new Date().getFullYear()} UUPT — Union des Universités Privées de Thiès` + `footerCopy` FR/EN.

- [ ] **Step 2: Vérifier** — `npm run typecheck` → PASS ; `npm run dev` : footer complet sur toutes les pages, liens internes naviguent, FR/EN OK.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: footer UUPT (navigation, contact, réseaux, mentions)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 7: uuptData.ts — convention i18n fr/en + routes à jour

**Files:**
- Modify: `src/data/uuptData.ts`
- Modify: `src/types.ts` (types des champs traduits)

**Interfaces:**
- Produces: convention consommée par TOUTES les pages (Tasks 9-13) : chaque champ éditorial traduit devient `{ fr: string; en: string }`, lu via `const { lang } = useLanguage()` puis `field[lang]`.

- [ ] **Step 1: Type helper** — dans `src/types.ts`, ajouter :

```ts
/** Champ éditorial bilingue (convention spec §8 : contenu = champs fr/en). */
export interface LocalizedText {
  fr: string
  en: string
}
```

- [ ] **Step 2: Transformer les champs texte** — pour CHAQUE export éditorial de uuptData.ts, remplacer les champs `string` de contenu par des paires `{ fr, en }` : `heroContent` (titre, sous-titre, CTA), `keyStats[].label/detail`, `missionPillars[].title/description`, `bdePartnership` (intro + points), `activityAxes[].title/tagline/description` + sous-champs d'activités, `timelineSteps[].phase/period/title/description`, `partnerDirectory[].name/kind/field/filieres/bdeName` (noms propres restent des `string` simples — sigles et noms d'établissements ne se traduisent pas), `contactFormCopy`, `footerCopy`, descriptions de `navLinks`. Le FR existant va dans `fr` tel quel (caractères typographiques conservés) ; l'`en` est une traduction soignée au ton du mouvement (ex. « Ensemble, construisons l'avenir » → « Together, we build the future »).
  - Mettre à jour les types associés (`title: string` → `title: LocalizedText`).
  - `navLinks` : remplacer l'entrée `axes` (`/axes`) par trois entrées pointant vers `/axe-academique-culturel`, `/axe-innovation`, `/axe-sportif` (labels : « Académique & Culturel », « Innovation », « Sportif ») — et traduire les `description`.

- [ ] **Step 3: Vérifier** — `npm run typecheck` → les erreurs signalent les composants qui lisaient les champs en `string` : corriger UNIQUEMENT les stubs/points d'usage créés dans les tâches précédentes (gabarits pas encore branchés : aucun normalement) → PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: uuptData bilingue (champs fr/en) et navigation pointant vers les 3 pages d'axes

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 8: Pages transverses (Mentions légales, Confidentialité, Merci, 404)

**Files:**
- Modify: `src/pages/LegalPage.tsx`, `src/pages/PrivacyPage.tsx`, `src/pages/ThankYouPage.tsx`, `src/pages/NotFoundPage.tsx` (gabarits copiés en Task 2)

**Interfaces:**
- Consumes: `usePageMeta` (hook copié), `CONTACT_EMAIL`, `SITE_URL`.

- [ ] **Step 1: LegalPage / PrivacyPage** — conserver la structure du gabarit (PageHero + sections de texte) ; remplacer les textes par les mentions UUPT : éditeur = Union des Universités Privées de Thiès, Thiès Sénégal ; contact = `CONTACT_EMAIL` ; hébergement/directeur de publication marqués `TODO(UUPT)` ; données personnelles : formulaire via FormSubmit (email uniquement utilisé pour répondre), pas de traceurs, droits d'accès via `CONTACT_EMAIL`. Textes FR + EN (`data-lang`).
- [ ] **Step 2: ThankYouPage** — gabarit inchangé ; messages FR/EN : « Merci ! Votre message a bien été envoyé. » / « Thank you! Your message has been sent. » + lien retour accueil. Aucun `noindex` supplémentaire à poser : la route est déjà hors sitemap et hors prérendu (Task 2, Step 8).
- [ ] **Step 3: NotFoundPage** — gabarit inchangé ; texte FR/EN « Page introuvable » / « Page not found » + bouton retour accueil.
- [ ] **Step 4: Vérifier** — `npm run typecheck` → PASS ; naviguer sur les 4 routes : contenu complet, bilingue, liens OK.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: pages transverses UUPT (mentions légales, confidentialité, merci, 404)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 9: Page d'accueil — composition complète

**Files:**
- Modify: `src/pages/HomePage.tsx` (remplace le stub)
- Modify: composants de gabarit branchés au besoin (`HomeHero`/`HeroCarousel`, `PromiseStrip`, `StatsBand`, `ValeursGrid`, `PolesExpertise`, `Marquee`)

**Interfaces:**
- Consumes: `HOME_HERO_SLIDES`, `CALQUE_IMAGES` (constants) ; `heroContent`, `keyStats`, `missionPillars`, `activityAxes`, `bdePartnership`, `partnerDirectory`, `contactChannels` (uuptData).
- Produces: la structure `.scroll-sentinel` attendue par la Navbar (posée juste sous le hero, comme dans `REF/src/pages/HomePage.tsx`).

- [ ] **Step 1: Lire les gabarits source** — `REF/src/pages/HomePage.tsx` (220 lignes) sert de composition de référence : ordre des sections, classes, sentinelles. Reproduire CET ordre avec le contenu UUPT :

| # | Section | Gabarit (copié) | Contenu UUPT |
|---|---|---|---|
| 1 | Hero plein écran + sentinelle | `HomeHero`/`HeroCarousel` | `HOME_HERO_SLIDES`, `heroContent` (surtitre, titre, paragraphe, 2 CTA → `/a-propos` + `/contact`), paires `data-lang` |
| 2 | Bandeau d'engagement | `PromiseStrip` | `heroContent.promise` ou tagline `organization` (fr/en) |
| 3 | Stats animées | `StatsBand` (motion) | `keyStats` : 12+ établissements, 3 axes, 10+ événements, 3 disciplines |
| 4 | Piliers de mission | `ValeursGrid` | `missionPillars` (Fédérer / Promouvoir / Collaborer) |
| 5 | Aperçu des 3 axes | `PolesExpertise` | `activityAxes` + `AXE_GALLERIES` (mini-carrousels → liens `/axe-*`) |
| 6 | Marquee | `Marquee` | noms courts des 8 BDE (`partnerDirectory[].shortName`) |
| 7 | Collaboration BDE | `IdentitySlider` ou cartes du gabarit | `bdePartnership` (4 principes) |
| 8 | CTA contact | bandeau du gabarit + `RandomBackdrop`/`CALQUE_IMAGES` | CTA → `/contact` |

- [ ] **Step 2: Implémenter** — adapter chaque composant branché : ses props/textes codés en dur SALEEL deviennent des props alimentées par uuptData (paires fr/en via `useLanguage()`). Ne rien changer au style/classes. Les composants trop couplés au métier SALEEL (textes BTP codés en dur non paramétrés) sont réécrits en gardant EXACTEMENT les classes App.css.
- [ ] **Step 3: Vérifier** — `npm run typecheck` → PASS ; `npm run dev` : accueil complet ; carrousel hero fonctionne (flèches/points si le gabarit en a) ; stats s'animent au scroll ; header transparent sur hero puis compacté au scroll (sentinelle OK) ; FR/EN complets ; responsive 400 px / 1366 px sans débordement horizontal.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: page d'accueil UUPT (hero carrousel, stats, piliers, axes, marquee BDE, CTA)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 10: Gabarit de page axe + les 3 pages d'axes

**Files:**
- Create: `src/pages/AxeAcademiqueCulturelPage.tsx`, `src/pages/AxeInnovationPage.tsx`, `src/pages/AxeSportifPage.tsx` (remplacent les stubs)
- Modify: composants `HeroPoleBold`/`ShowcaseCarousel`/`ProgrammesGrid`/`PrestationsAccordion` branchés au besoin

**Interfaces:**
- Consumes: `AXE_GALLERIES`, `activityAxes` (avec sous-champs d'activités de chaque axe), `contactChannels`.

- [ ] **Step 1: Construire le gabarit depuis la page pôle SALEEL** — lire `REF/src/pages/GenieCivilPage.tsx` (référence de structure : hero de page + sentinelle, section description, sections de prestations/programmes, galerie, CTA). Structure commune des 3 pages :

| # | Section | Source contenu |
|---|---|---|
| 1 | Hero image + sentinelle | `AXE_GALLERIES[axe][0]` + `activityAxes[axe].order` en surtitre (« Axe 01 »…), titre/tagline |
| 2 | Description | `activityAxes[axe].description` (fr/en) |
| 3 | Activités / points forts | sous-champs d'activités de l'axe dans uuptData, présentés via `ProgrammesGrid` ou `PrestationsAccordion` |
| 4 | Galerie | `AXE_GALLERIES[axe]` via `ShowcaseCarousel` |
| 5 | CTA | « Participer aux activités » → `/contact` ; « Découvrir les BDE » → `/partenaires` |

- [ ] **Step 2: Écrire les 3 pages** — un seul gabarit paramétré : `const axe = activityAxes.find(a => a.id === 'academique-culturel')!` etc. Tout texte passe par les paires fr/en.
- [ ] **Step 3: Vérifier** — `npm run typecheck` → PASS ; naviguer les 3 routes : hero correct par axe, transitions PageVeil entre pages, préchargement au survol du dropdown (onglet Réseau : le chunk se charge au hover), bilingue, responsive.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: pages des 3 axes (académique & culturel, innovation, sportif)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 11: Page À propos

**Files:**
- Modify: `src/pages/AboutPage.tsx` (remplace le stub)

**Interfaces:**
- Consumes: `organization`, `missionPillars`, `bdePartnership`, `media.about`.

- [ ] **Step 1: Compositions** — depuis `REF/src/pages/AboutPage.tsx` : PageHero (« À propos de l'UUPT » / « About UUPT ») → IdentitySlider (présentation : `organization.type`, création 26 avril 2026, mission) → ValeursGrid (les 4 principes de `bdePartnership` : co-construction, équité, transparence, montée en compétences) → bandeau CTA vers `/historique` et `/partenaires`.
- [ ] **Step 2: Vérifier** — `npm run typecheck` → PASS ; page complète, sentinelle/header OK, bilingue, responsive.
- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: page À propos (présentation de l'Union, principes de collaboration BDE)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 12: Pages Historique et Partenaires

**Files:**
- Modify: `src/pages/HistoriquePage.tsx`, `src/pages/PartenairesPage.tsx` (remplacent les stubs)

**Interfaces:**
- Consumes: `timelineSteps`, `partnerDirectory`, `keyStats`.

- [ ] **Step 1: Historique** — PageHero (« Notre historique » / « Our history ») → `ProcessTimeline` (motion) alimenté par `timelineSteps` (Genèse → Concertation → Adhésion → Lancement 26 avril 2026 ; l'API du composant copié dicte le mapping exact des props — lire le fichier) → encadré statistiques (`keyStats`) si le gabarit en a un.
- [ ] **Step 2: Partenaires** — PageHero (« BDE Partenaires » / « Partner BDEs ») → grille de cartes `CommunityCard` : une carte par BDE (`partnerDirectory` : nom, sigle, kind, field, filières, bdeName) → section « Devenir partenaire » (texte + CTA `/contact`).
- [ ] **Step 3: Vérifier** — `npm run typecheck` → PASS ; les deux pages complètes ; timeline animée au scroll ; grille responsive (1 col. mobile / 2-3 bureau) ; bilingue.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: pages Historique (chronologie animée) et BDE Partenaires (annuaire 8 BDE)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 13: Page Contact + Formulaire

**Files:**
- Modify: `src/pages/ContactPage.tsx`, `src/components/ContactForm.tsx` (copié en Task 2)

**Interfaces:**
- Consumes: `CONTACT_EMAIL` (constants), `roleOptions`, `contactFormCopy`, `contactChannels`, `socialLinks` (uuptData).
- Produces: redirection `/merci` après envoi (route Task 8).

- [ ] **Step 1: ContactForm** — lire le gabarit ; conserver la mécanique FormSubmit (action `https://formsubmit.co/${CONTACT_EMAIL}`, champs `_next: ${SITE_URL}/merci`, `_subject`, honeypot) ; remplacer les champs/textes par `contactFormCopy` FR/EN ; le sélecteur de rôle est alimenté par `roleOptions` (labels fr/en).
- [ ] **Step 2: ContactPage** — PageHero (« Contact ») → formulaire → cartes `contactChannels` (localisation, email, téléphone/WhatsApp avec icônes lucide du gabarit) → rangée `socialLinks`.
- [ ] **Step 3: Vérifier** — `npm run typecheck` → PASS ; soumettre le formulaire en dev : il POSTe vers FormSubmit (1ʳᵉ soumission → email d'activation FormSubmit attendu — noter la procédure dans le README, Task 14) ; validation HTML5 active ; erreur réseau → message du gabarit affiché.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: page Contact (formulaire FormSubmit bilingue, canaux, réseaux)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 14: SEO final, build prérendu, validation complète, README

**Files:**
- Create: `public/sitemap.xml`, `public/robots.txt`
- Modify: `README.md`
- Modify: éventuels derniers réglages `usePageMeta` par page

**Interfaces:**
- Consumes: tout le site ; `SITE_URL`.

- [ ] **Step 1: `public/robots.txt`**

```
User-agent: *
Allow: /
Disallow: /merci

Sitemap: https://uupt.maximekante23.workers.dev/sitemap.xml
```

- [ ] **Step 2: `public/sitemap.xml`** — 10 URLs (pas /merci, pas 404) : `/`, `/axe-academique-culturel`, `/axe-innovation`, `/axe-sportif`, `/a-propos`, `/historique`, `/partenaires`, `/contact`, `/mentions-legales`, `/politique-de-confidentialite` — chacune `<url><loc>https://uupt.maximekante23.workers.dev<Route></loc><xhtml:link rel="alternate" hreflang="fr" …/><xhtml:link rel="alternate" hreflang="en" …/><changefreq>monthly</changefreq></url>` (précision : la spec §10 annonçait 11 URLs par erreur de compte — /merci étant noindex, le total indexable est bien 10).
- [ ] **Step 3: usePageMeta** — vérifier chaque page appelle `usePageMeta` avec titre/description FR/EN (accroche unique par page, ex. accueil : « UUPT – Ensemble, construisons l'avenir »).
- [ ] **Step 4: Build complet** — `npm run build` → 12 routes prérendues attendues dans la sortie (`✓ /`, `✓ /axe-*` ×3, `✓ /a-propos`, `✓ /historique`, `✓ /partenaires`, `✓ /contact`, `✓ /mentions-legales`, `✓ /politique-de-confidentialite`, `✓ 404`) ; `dist/404.html` existe ; les HTML contiennent le contenu (grep un titre UUPT dans `dist/index.html`).
- [ ] **Step 5: Validation manuelle (spec §12)** — `npm run preview` puis : navigation FR/EN complète ; PageVeil entre chaque page ; smooth scroll Lenis ; preloader au 1ᵉʳ chargement + absent en retour arrière ; drawer mobile + dropdown ; formulaire ; 404 sur route inconnue ; reduced-motion (DevTools → Rendering → Emulate prefers-reduced-motion) : site utilisable sans animations ; responsive 400 px.
- [ ] **Step 6: README** — mettre à jour : stack (tableau SALEEL-adapté), scripts (`build` inclut le prérendu), structure src/, édition du contenu (uuptData fr/en + constants.ts), **procédure d'activation FormSubmit** (1ʳᵉ soumission réelle → email de confirmation), liste des `TODO(UUPT)` (WhatsApp, email, SITE_URL/domaine, noms d'établissements).
- [ ] **Step 7: Commit final**

```bash
git add -A && git commit -m "feat: SEO (sitemap, robots), prérendu validé, README et procédures TODO(UUPT)

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```
