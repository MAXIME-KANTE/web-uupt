# Spécification — Refonte du site UUPT sur l'architecture et le design de SALEEL WEB V1

- **Date** : 2026-09-17
- **Statut** : Design approuvé par le propriétaire (présenté et validé en 3 parties en conversation)
- **Projet cible** : site UUPT (racine de ce dépôt)
- **Projet de référence** : `SALEEL WEB V1/SALEEL WEB/` (matière première, exclue du dépôt git)

---

## 1. Objectif et contexte

Le site UUPT (Union des Universités Privées de Thiès, mouvement estudiantin créé le 26 avril 2026) existe déjà (React 19 + Vite + Tailwind, 6 pages) mais avec un design différent. Le propriétaire souhaite qu'il reprenne **exactement l'architecture et le design** du site SALEEL WEB V1 — même système de design, même machinerie d'animations et de navigation, même qualité de build — en y plaçant le contenu réel de l'UUPT.

## 2. Décisions verrouillées

| Décision | Choix validé |
|---|---|
| Périmètre | **Duplication quasi littérale** de la machinerie SALEEL (même design, mêmes gabarits de sections) |
| Identité visuelle | **Palette identique à SALEEL** (tokens inchangés, y compris l'orange de marque) |
| Fonctionnalités | **Dispositif complet** : preloader, PageVeil, smooth scroll Lenis, GSAP, i18n FR/EN, pages légales, page merci, 404, JSON-LD |
| Carte des pages | **Approche A** : gabarits SALEEL + carte des pages UUPT (aucune page creuse, pas d'actualités) |

## 3. Sources et cibles

- **Copié depuis SALEEL** : `src/` (design system, composants, contexte, hooks, libs), `scripts/prerender.mjs`, `vite.config.ts`, `tailwind.config.js`, structure de `index.html`.
- **Conservé depuis UUPT** : `src/data/uuptData.ts` (**source de vérité du contenu**, à enrichir des traductions EN), `public/dame.*` (logo), `public/favicon.svg`, README (à actualiser en fin de chantier).
- **Remplacé** : l'intégralité de l'ancien `src/` hors `data/uuptData.ts` (l'ancien design reste récupérable dans l'historique git — commit initial `185abcb`).
- **Hors dépôt** : `SALEEL WEB V1/` et `SALEEL WEB V1.zip` (`.gitignore`).

## 4. Mise en place du projet

- **package.json** : `name: "uupt"` ; dépendances alignées sur celles de SALEEL — `react`, `react-dom`, `react-router-dom`, `gsap`, `@gsap/react`, `lenis`, `framer-motion` (le gabarit SALEEL l'utilise : chunk `vendor-motion`), `lucide-react` ; devDependencies — `puppeteer-core`, `sharp` (prérendu), `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `vite`, `@vitejs/plugin-react`.
- **Scripts npm** : `dev`, `typecheck` (`tsc -b`), `build` (`tsc -b && vite build && node scripts/prerender.mjs`), `preview`.
- **index.html** : `lang="fr"`, titre et méta-description UUPT, balises Open Graph, Google Fonts (Inter, Poppins, Instrument Serif), `theme-color #16213a`, preload de la 1ʳᵉ image du hero (URL Unsplash `w=1920`, synchronisée avec le Preloader), JSON-LD `EducationalOrganization` + `WebSite`.
- **constants.ts** : `CONTACT_EMAIL` (email UUPT, placeholder `TODO(UUPT)`), `SITE_URL` (placeholder `https://uupt.maximekante23.workers.dev`, à substituer au domaine final — même procédure documentée que SALEEL : constants.ts + index.html + sitemap.xml), inventaire d'images UUPT (`HOME_HERO_SLIDES`, galleries par axe, `HERO_IMAGES`, pool de fonds).
- **Logo** : `BrandLogo` = `dame.png` + mot-symbole « UUPT » ; favicon UUPT existant.

## 5. Architecture applicative

Structure de `App.tsx` **copiée de SALEEL à l'identique** :

```
LanguageProvider
 ├─ ScrollToTop
 ├─ SmoothScroll (Lenis)
 ├─ .page-wrapper
 │   ├─ skip-links (fr)
 │   ├─ Navbar
 │   └─ main#main-content > Suspense (fallback .route-loading)
 │        └─ Routes — Accueil en chunk initial, 11 pages lazy()
 └─ Footer
Preloader (plafonné 2,6 s)
WhatsAppButton (hors .page-wrapper)
PageVeil
```

- **Design system** : `src/App.css` (≈ 5 600 lignes) copié tel quel + `src/tailwind.css` ; `tailwind.config.js` avec `preflight: false` et les tokens SALEEL : ink `#16213a`, muted `#5c6470`, subtle `#5f6b7a`, cream `#fdfcfa`, sand `#f0ebdf`, line `#e7e4dd`, night `#0f172a`, brand `#f97316`, brand-dark `#ea6c0a` ; polices `sans: Inter`, `display: Poppins`, `accent: Instrument Serif` ; ombres card/lift.
- **Lazy-loading** : seule la page d'accueil vit dans le chunk initial (LCP) ; les 11 autres sont des `lazy()` préchargés au survol des liens via `src/pages/pageLoaders.ts` (adapté à la nouvelle carte).
- **Découpage vendor** : `vite.config.ts` de SALEEL repris (groupes `vendor-react`, `vendor-motion`).

## 6. Carte des routes (12)

| Route | Page | Gabarit SALEEL | Contenu UUPT |
|---|---|---|---|
| `/` | Accueil *(chunk initial)* | HomePage + HeroCarousel | hero carrousel (3 visuels, `heroContent`) → bandeau d'engagement → stats animées (`keyStats` : 12+ établissements, 3 axes, 10+ événements, 3 disciplines) → 3 piliers de mission (`missionPillars`) → aperçu des 3 axes → marquee des BDE → principes de collaboration BDE (`bdePartnership`) → CTA contact |
| `/axe-academique-culturel` | Axe 01 | page pôle (hero carrousel dédié + sections) | `activityAxes[academique-culturel]` : tagline, description, activités/points forts, galerie, CTA |
| `/axe-innovation` | Axe 02 | page pôle | `activityAxes[innovation]` |
| `/axe-sportif` | Axe 03 | page pôle | `activityAxes[sportif]` |
| `/a-propos` | À propos | AboutPage (IdentitySlider + ValeursGrid) | présentation de l'Union (`organization`) + 4 principes de collaboration BDE |
| `/historique` | Historique | page dédiée + ProcessTimeline | `timelineSteps` : Genèse → Concertation → Adhésion → Lancement 26 avril 2026 |
| `/partenaires` | BDE Partenaires | page dédiée + grille de cartes (CommunityCard) | `partnerDirectory` : 8 BDE (nom, sigle, type, filières, BDE affilié) + CTA « devenir partenaire » |
| `/contact` | Contact | ContactPage | formulaire FormSubmit (`roleOptions`, `contactFormCopy`, redirection `/merci`) + cartes `contactChannels` + `socialLinks` |
| `/mentions-legales` | Mentions légales | LegalPage | textes adaptés UUPT |
| `/politique-de-confidentialite` | Confidentialité | PrivacyPage | textes adaptés UUPT |
| `/merci` | Confirmation | ThankYouPage | message après envoi du formulaire |
| `*` | 404 | NotFoundPage | — |

**Navigation** : items Accueil · À propos · Nos Axes · Historique · BDE Partenaires + bouton Contact. **Seule extension structurelle au gabarit SALEEL** : « Nos Axes » ouvre un petit menu déroulant vers les 3 pages d'axes (sous-liste dans le MobileDrawer).

## 7. Composants

- **Copiés tels quels (moteur)** : `Preloader`, `PageVeil`, `SmoothScroll`, `ScrollToTop`, `WhatsAppButton`, `Reveal`, `WordReveal`, `Marquee`, `JsonLd`, `RandomBackdrop`, `MobileDrawer` (structure), hooks (`useCalquePool`, `usePageMeta`, `usePrefersReducedMotion`), `lib/gsap`, `lib/smoothScroll`, `motion/{GsapWords, Magnetic, ProcessTimeline, StatsBand}`.
- **Adaptés (gabarit conservé, contenu UUPT)** : `Navbar` (+ dropdown Axes), `Footer` (`footerCopy`, colonnes, réseaux), `BrandLogo`, `HomeHero`/`HeroCarousel`, `PageHero`, `PolesExpertise` → aperçu des axes, `ValeursGrid`, `IdentitySlider`, `ProgrammesGrid`, `PrestationsAccordion`, `ShowcaseCarousel`, `CommunityCard`, `ContactForm`, `LanguageContext` (chaînes internes UUPT), `constants.ts`, `pageLoaders.ts`.
- **Retirés (sans équivalent UUPT — YAGNI)** : `PropertyCard`, `data/properties.ts`, `ImmobilierHero`, `RealisationsExplorer`, `RealisationsGallery`, `NewsCard`, `ActualitesBento`, `ProjetPhare`, `Testimonials`, `DiasporaRotator`/`DiasporaSection`. L'ancien `src/` UUPT (sections, `lib/motion`, `SmartImage`, etc.) est retiré ; son contenu survit via `uuptData.ts`.

## 8. Contenu et i18n

- `uuptData.ts` reste **la source de vérité**. Convention i18n unique, alignée sur SALEEL :
  - **Chaînes d'interface** (boutons, labels de composants, preloader, skip-links, méta-titres) : attributs `data-lang="fr|en"` dans les composants, basculés par `LanguageContext` — pattern SALEEL inchangé.
  - **Contenu éditorial** (texts de `uuptData.ts` : piliers, axes, timeline, partenaires, formulaire, footer) : champs doublés `fr` / `en` dans les données, consommés via le contexte de langue.
- Tout le contenu est rédigé en **FR + EN** (le FR existant est conservé tel quel ; l'EN est une traduction nouvelle respectant le ton du mouvement).
- Le Preloader, les skip-links, les méta-titres et le formulaire suivent le même basculement FR/EN.

## 9. Images

- **URLs Unsplash distantes** déjà choisies dans `uuptData.ts` — aucun asset local à produire (contrairement à SALEEL et ses webp optimisés).
- Les mécanismes SALEEL sont adaptés : `srcSet` construit sur le paramètre `w=` d'Unsplash (le tableau mesuré `SLIDE_INTRINSIC_WIDTHS` devient inutile), preload du hero sur l'URL `w=1920`.
- `useCalquePool` reçoit une sélection de visuels campus/étudiants pour les fonds de section aléatoires et bandeaux CTA.
- Fonds de secours encre/sable sous chaque carrousel pendant le chargement ; chargement natif différé hors hero.

## 10. SEO, build et prérendu

- `usePageMeta` sur chaque page (titre/description FR+EN), JSON-LD `EducationalOrganization` (nom, logo `dame.png`, date de fondation 2026-04-26, adresse Thiès Sénégal, `sameAs` réseaux) + `WebSite`.
- `sitemap.xml` (11 URLs, hors 404) + `robots.txt`.
- `scripts/prerender.mjs` adapté aux 12 routes (404 → `404.html`) ; `SITE_URL` injecté partout depuis `constants.ts`.

## 11. Cas limites et comportements dégradés

- **`prefers-reduced-motion`** : PageVeil, Lenis et animations GSAP neutralisés, site pleinement utilisable.
- **Preloader** : plafonné à 2,6 s même si les images tardent.
- **Formulaire** : FormSubmit exige une première soumission réelle pour activer l'adresse (email de confirmation) — procédure documentée dans le README ; message d'erreur affiché si l'envoi échoue.
- **Chunk manquant** (hors-ligne) : comportement SALEEL conservé — un rechargement suffit, pas d'ErrorBoundary supplémentaire (YAGNI).
- **Images distantes indisponibles** : les fonds de secours garantissent une mise en page stable.

## 12. Validation

1. `npm run typecheck` et `npm run build` (build + prérendu des 12 routes) sans erreur.
2. Les 12 fichiers HTML prérendus contiennent le contenu final.
3. Passes manuelles : navigation FR/EN complète, transitions PageVeil, smooth scroll, preloader au premier chargement, drawer mobile + dropdown Axes, formulaire (activation FormSubmit), 404, mode reduced-motion (émulation DevTools), responsive mobile/desktop.
4. Lighthouse sur l'accueil : LCP = image hero préchargée.

## 13. Hors périmètre

- Actualités / réalisations (aucun contenu UUPT — supprimées en Approche A).
- Back-end (le formulaire passe par le service tiers FormSubmit).
- Contenus définitifs des coordonnées (placeholders conservés, voir §14).
- Nommage de domaine définitif et déploiement.

## 14. Placeholders à finaliser par le propriétaire

Marqués `TODO(UUPT)` dans le code, centralisés dans `constants.ts` / `uuptData.ts` :

1. Numéro WhatsApp flottant.
2. Email réel de contact (et activation FormSubmit).
3. `SITE_URL` définitif (constants.ts + index.html + sitemap.xml).
4. Noms réels des établissements/BDE si la liste actuelle est encore provisoire.
