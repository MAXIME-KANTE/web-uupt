# UUPT — Site officiel de l'Union des Universités Privées de Thiès

Site vitrine de l'**Union des Universités Privées de Thiès (UUPT)**, mouvement estudiantin
inter-établissements créé le **26 avril 2026** à Thiès (Sénégal).

Le site est **bilingue français / anglais** (bascule instantanée, choix mémorisé), prérendu
pour le référencement et animé au scroll (GSAP + Lenis), sur le gabarit du site SALEEL GROUPE
(dossier de référence `SALEEL WEB V1/`, hors dépôt).

| Route | Page |
|---|---|
| `/` | Accueil (hero diaporama, chiffres, axes, CTA) |
| `/axe-academique-culturel` | Axe Académique & Culturel |
| `/axe-innovation` | Axe Innovation |
| `/axe-sportif` | Axe Sportif |
| `/a-propos` | À propos (mission, partenariat BDE) |
| `/historique` | Historique (chronologie animée) |
| `/partenaires` | BDE Partenaires (annuaire des établissements) |
| `/contact` | Contact (formulaire FormSubmit) |
| `/mentions-legales` | Mentions légales |
| `/politique-de-confidentialite` | Politique de confidentialité |
| `/merci` | Remerciement après envoi (hors sitemap/prérendu, **sans** noindex) |
| `*` | 404 dédiée (noindex) |

---

## Stack technique

- **React 19 + TypeScript strict** — SPA routée par `react-router-dom` v7 (accueil eager,
  11 pages lazy via `src/pages/pageLoaders.ts`, préchargées au survol des liens)
- **Vite 8** — build, dev server et **prérendu** (`scripts/prerender.mjs` : chaque route
  indexable est capturée dans Chrome headless — `puppeteer-core`, Chrome du système — vers
  `dist/<route>/index.html`, plus `dist/404.html`)
- **Tailwind CSS 3.4** (preflight désactivé pour préserver le design system `src/App.css`)
  + **GSAP 3** (`ScrollTrigger`, `@gsap/react`) et **framer-motion** (rideau de transition
  `PageVeil`, preloader, magnétisme) pour les animations, synchronisées avec le scroll fluide
  **Lenis**
- **lucide-react** — icônes

## Démarrage

```bash
npm install        # première fois
npm run dev        # serveur de dev → http://localhost:5173
npm run typecheck  # vérification TypeScript stricte
npm run build      # tsc -b + vite build + PRÉRENDU → dist/
npm run preview    # sert le build de production
```

> Le prérendu requiert Chrome sur la machine ; `SKIP_PRERENDER=1 npm run build` pour s'en
> passer (SPA nu servi tel quel).

## Fonctionnalités clés

- **Bilingue FR/EN** — chaque texte existe en paires `data-lang="fr"/"en"` masquées par CSS
  selon la langue ; choix persisté (`localStorage`, clé `uupt-lang`) et appliqué avant le
  premier paint. Tout le contenu éditorial est piloté par `src/data/uuptData.ts` (champs
  `fr`/`en`).
- **SEO** — JSON-LD (`EducationalOrganization` + `WebSite`) dans `index.html` ; titre,
  description, canonical, Open Graph et Twitter Card posés par route via
  `src/hooks/usePageMeta.ts` ; `public/sitemap.xml` (10 URLs, alternates `hreflang` fr/en)
  et `public/robots.txt` (Disallow `/merci`) copiés dans `dist/` au build ; **prérendu
  statique** des 10 routes indexables + 404 (contenu complet dans le HTML, LCP instantané :
  le preloader React se saute via `window.__PRERENDERED__`).
- **Rideau de transition** (`PageVeil`) — mot-symbole « UUPT » à chaque navigation interne,
  prefetch du chunk de la route cible sous couverture ; désactivé en
  `prefers-reduced-motion` (comme toutes les animations).
- **Formulaire de contact** — envoi AJAX via FormSubmit (voir ci-dessous), sans backend,
  avec repli `mailto:` honnête si le service est injoignable.
- **Bouton WhatsApp flottant** — `https://wa.me/<organization.whatsapp>` (uuptData).

## Formulaire de contact — FormSubmit

Le formulaire (`src/components/ContactForm.tsx`) poste en **AJAX** ( `fetch` JSON) vers

```
https://formsubmit.co/ajax/${CONTACT_EMAIL}     <!-- CONTACT_EMAIL = maximekante23@gmail.com -->
```

avec un payload JSON : `_subject` (objet construit), `_template: "table"`, `_captcha:
"false"`, `_replyto` (email du visiteur), `_honey` (leurre antispam) et les champs
`Nom`, `Email`, `Établissement`, `Qualité`, `Message`. **Il n'y a PAS de redirection
`_next`** : en cas de succès (`data.success`), la navigation se fait côté client vers la
route `/merci` (page de remerciement dédiée). En cas d'échec réseau, un bouton propose le
`mailto:` pré-rempli vers la même adresse.

### ⚠️ Activation (à faire UNE fois avant la mise en production)

À la **première soumission réelle**, FormSubmit envoie un **email d'activation** à
`maximekante23@gmail.com` : ouvrir cet email et cliquer son lien de confirmation une seule fois.
Ensuite, chaque soumission arrive automatiquement dans la boîte de réception. Sans cette
étape, les messages ne sont pas délivrés.

## Modifier le contenu

- **`src/data/uuptData.ts`** — SOURCE DE VÉRITÉ du contenu : `organization` (identité,
  coordonnées, date de création), `navLinks`, `activityAxes`, `timelineSteps`,
  `partnerDirectory`, `contactChannels`, `socialLinks`, `roleOptions`… tous bilingues
  (`fr`/`en`).
- **`src/constants.ts`** — `CONTACT_EMAIL`, `SITE_URL`, **pool des photos locales**
  (`LOCAL_PHOTOS`, fichiers de `public/images`) et diaporamas (`HOME_HERO_SLIDES`,
  `AXE_GALLERIES`, `HERO_SLIDE_COUNT` = 6 images par hero, `CALQUE_BAND_INDEX`) —
  garder `HOME_HERO_SLIDES[0]` en cohérence avec le `<link rel="preload">` de
  `index.html`.
- **Visuels** — toutes les photos viennent de `public/images` (registre `LOCAL_PHOTOS`) :
  héros de toutes les pages, galeries `ShowcaseCarousel`, mini-carrousels des cartes
  d'axes, bandeaux CTA et volet du formulaire de contact. Les images Unsplash ne
  subsistent que comme `fallback` déclaratif dans `media` (`uuptData.ts`). Voir
  `public/images/README.md` pour ajouter/retirer une photo.

### ⚠️ Placeholders à substituer avant mise en ligne (marqués `TODO(UUPT)`)

1. **Email de contact** — `CONTACT_EMAIL` dans `src/constants.ts`
   (`maximekante23@gmail.com`) : alimente le formulaire FormSubmit, le footer, les
   mentions légales et la politique de confidentialité. Changer aussi
   `organization.email` dans `uuptData.ts` si l'adresse définitive diffère.
2. **WhatsApp / téléphone** — RENSEIGNÉS dans `uuptData.ts` :
   `organization.whatsapp` (`221771490877`, format international sans espaces —
   bouton flottant et ContactForm) et `organization.phone` (`+221 77 149 08 77` —
   footer, page contact, JSON-LD). Substituer si les coordonnées officielles
   de l'Union diffèrent.
3. **Domaine / SITE_URL** — remplacer `https://uupt.maximekante23.workers.dev` PARTOUT :
   `SITE_URL` dans `src/constants.ts`, `index.html` (canonical, `og:url`, JSON-LD
   `@id`/`url`), `public/sitemap.xml` (chaque `<loc>` et `hreflang`) et `public/robots.txt`
   (ligne `Sitemap:`).
4. **Noms des établissements** — `partnerDirectory` dans `uuptData.ts` est un répertoire
   provisoire par pôles disciplinaires : substituer les dénominations officielles
   (`name`, `shortName`, `bdeName`) puis passer `isPlaceholder` à `false`.
5. **Réseaux sociaux** — les `href` de `socialLinks` (uuptData) sont des espaces réservés.

## Déploiement

`npm run build` produit `dist/` : les 10 dossiers de route prérendus + `index.html`,
`404.html`, `sitemap.xml`, `robots.txt` et les assets. Déploiement en **assets statiques**
(l'origine d'attente `*.workers.dev` vise Cloudflare Workers) : servir `dist/` et faire de
`404.html` la page d'erreur introuvable (équivalent `not_found_handling = "404-page"`).

## Structure

```
src/
  components/        Composants (Navbar + dropdown « Nos Axes », Footer, ContactForm,
                     heroes, carrousels, accordéons, Preloader, WhatsAppButton…)
  components/motion/ GSAP/Lenis/framer-motion partagés (GsapWords, StatsBand, PageVeil,
                     ProcessTimeline, Magnetic, SmoothScroll)
  components/icons/  Icônes maison (WhatsApp)
  pages/             Une page par route (+ pageLoaders.ts pour le lazy)
  hooks/             usePageMeta (SEO), usePrefersReducedMotion, useCalquePool
  lib/               gsap.ts (hub : registerPlugin UNE fois), smoothScroll.ts (Lenis)
  context/           LanguageContext (bascule FR/EN persistée)
  data/              uuptData.ts — tout le contenu bilingue
  constants.ts       SITE_URL, CONTACT_EMAIL, pools d'images
  App.css            Design system complet (tokens :root en tête)
scripts/
  prerender.mjs      Prérendu statique (10 routes + 404) chaîné à `npm run build`
public/              favicon, logo, SEO (sitemap.xml, robots.txt)
```

---

© UUPT — Union des Universités Privées de Thiès. Contact : maximekante23@gmail.com — +221 77 149 08 77
