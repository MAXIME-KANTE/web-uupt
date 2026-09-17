# UUPT — Site officiel de l'Union des Universités Privées de Thiès

Site vitrine de l'**Union des Universités Privées de Thiès (UUPT)**, mouvement estudiantin
inter-établissements créé le **26 avril 2026** à Thiès (Sénégal).

## Stack technique

| Élément      | Choix                                  |
| ------------ | -------------------------------------- |
| Framework    | React 19 + TypeScript (Vite 7)         |
| Styling      | Tailwind CSS 3 (`tailwind.config.js`)  |
| Icônes       | `lucide-react`                         |
| Animations   | `framer-motion`                        |
| Typographies | Manrope (titres) + Inter (texte)       |

## Démarrage

```bash
npm install
npm run dev        # serveur de développement (http://localhost:5173)
npm run typecheck  # vérification TypeScript stricte
npm run build      # build de production dans dist/
npm run preview    # prévisualisation du build
```

| Élément   | Emplacement / convention                                  |
| --------- | --------------------------------------------------------- |
| Logo      | `public/dame.png` (encadré blanc dans la navbar + footer) |
| Icônes    | `public/favicon.svg`                                      |
| Photos    | `public/images/*.jpg` via `SmartImage` + fallback Unsplash |

`SmartImage` affiche automatiquement l'image Unsplash de secours tant que le
fichier local est absent : voir `public/images/README.md` pour la liste des
fichiers attendus (`hero-bg.jpg`, `campus-thies.jpg`, `axe-academique.jpg`,
`axe-innovation.jpg`, `axe-sport.jpg`).

## Structure du projet

```
src/
├── App.tsx                      # assemblage des sections (page unique)
├── main.tsx                     # point d'entrée React
├── index.css                    # Tailwind + utilitaires maison (glass, gradients)
├── types.ts                     # toutes les interfaces du domaine UUPT
├── data/
│   └── uuptData.ts              # SOURCE DE VÉRITÉ du contenu (textes, chiffres, BDE)
├── lib/
│   ├── motion.ts                # variantes framer-motion partagées
│   └── utils.ts                 # helper `cn`
├── hooks/
│   └── useActiveSection.ts      # section active + état de scroll
└── components/
    ├── ui/                      # Button, SectionTitle, BrandLogo,
    │                            # SmartImage, AnimatedCounter, FloatingWhatsApp
    ├── layout/                  # Navbar (sticky) et Footer
    └── sections/                # Hero, StatsBar, About, Axes,
                                 # History, Partners, Contact
```

## Modifier le contenu

Tout le contenu éditorial est centralisé dans **`src/data/uuptData.ts`** :

- `organization` — identité, date de création, coordonnées ;
- `heroContent` (accroche, CTA, image de fond, bandeau défilant) ;
- `keyStats` — chiffres animés (établissements, axes, événements) ;
- `missionPillars`, `bdePartnership` — mission et partenariat avec les BDE ;
- `activityAxes` — les trois axes d'activités et leurs déclinaisons ;
- `timelineSteps` — historique (genèse → 26 avril 2026) ;
- `partnerDirectory` — établissements / BDE ;
- `contactChannels`, `socialLinks`, `roleOptions`, `contactFormCopy`, `footerCopy`.

### ⚠️ À personnaliser avant mise en ligne

1. **Liste des établissements partenaires** : `partnerDirectory.establishments` est un
   **répertoire provisoire** organisé par pôles disciplinaires. Remplacez `name`, `shortName`
   et `bdeName` par les dénominations officielles après validation par chaque direction, puis
   passez `partnerDirectory.isPlaceholder` à `false` pour masquer le bandeau d'information.
2. **Coordonnées** : `organization.email` et `organization.phone` sont des valeurs d'attente
   (repérées par un commentaire `TODO(UUPT)` dans le fichier de données).
3. **Réseaux sociaux** : les `href` de `socialLinks` valent `'#'` par défaut.
4. **Formulaire de contact** : la validation est côté client et l'envoi est **simulé**
   (`Contact.tsx`, fonction `handleSubmit`). Branchez-y votre service d'envoi
   (API email, Google Form, CRM…) avant la mise en production.
5. **WhatsApp flottant** : le bouton pointe vers `https://wa.me/<whatsapp>` ;
   renseignez `organization.whatsapp` (format international sans espaces).

## Design system

- **Style** : corporate clair, accent orange (`orange-500/600`), fonds `white`,
  `slate-50` et `slate-950` pour les bandeaux (stats, contact, footer).
- **Composants** : pilules (`rounded-full`) pour les boutons et pastilles,
  cartes `rounded-2xl`, ombres douces, micro-interactions framer-motion.
- **Animations** : variantes partagées dans `src/lib/motion.ts` (`fadeInUp`, `staggerContainer`,
  `scaleIn`, `tabPanel`, `viewportOnce`…), déclenchées une seule fois au scroll.
- **Accessibilité** : `aria-*` sur les contrôles, lien d'évitement,
  formulaire avec messages d'erreur reliés (`aria-describedby`),
  respect de `prefers-reduced-motion`.

## Sections de la page

`accueil` (Hero + chiffres animés) · `a-propos` (mission + BDE) · `axes` (cartes premium) ·
`historique` (timeline) · `partenaires` (établissements & BDE) · `contact` (formulaire).

Les identifiants de sections sont définis dans `navLinks` (`src/data/uuptData.ts`) : la navbar,
le footer et le suivi de section active (`useActiveSection`) en dépendent automatiquement.
