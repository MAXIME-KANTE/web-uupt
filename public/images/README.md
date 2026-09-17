# Images du site UUPT

Toutes les photos déposées dans ce dossier sont publiées sur le site via un
**registre central** : le tableau `LOCAL_PHOTOS` de `src/constants.ts`. Aucun
composant ne contient de chemin d'image en dur — héros, diaporamas de galerie,
mini-carrousels de cartes et bandeaux CTA puisent tous dans ce pool.

## Ajouter / retirer une photo

1. Déposer (ou supprimer) le fichier dans ce dossier.
2. Reporter exactement le nom de fichier dans `LOCAL_PHOTOS`
   (`src/constants.ts`).

Les compteurs se recalent seuls : `HERO_SLIDE_COUNT` (6 images par hero),
`rotatePhotos()` (fenêtres circulaires du pool) et `CALQUE_BAND_INDEX` (index
des bandeaux CTA, juste après le lot des héros).

## Où les photos apparaissent

| Emplacement | Photos utilisées |
| --- | --- |
| Hero de l'accueil | `HOME_HERO_SLIDES` — 6 photos (`LOCAL_PHOTOS[0..5]`) |
| Heros des pages d'axes (`HeroPoleBold`) | 6 premières photos de `AXE_GALLERIES[axe]` (rotation propre à chaque axe) |
| Galerie « L'axe en images » (pages d'axes) | les 6 photos suivantes de `AXE_GALLERIES[axe]` |
| Heros des pages intérieures (À propos, Historique, Partenaires, Contact, Mentions légales, Confidentialité) | `CALQUE_IMAGES` mélangé — 6 photos par hero |
| Mini-diaporamas des cartes « Nos axes » (accueil) | 6 premières photos de `AXE_GALLERIES[axe]` |
| Galerie « L'Union en images » (accueil, À propos, Partenaires) | `gallerySlides` (`src/data/uuptData.ts`) — 6 photos après le lot du hero |
| Bandeaux CTA (toutes les pages) | index `CALQUE_BAND_INDEX` du pool mélangé |

La première photo du hero (`HOME_HERO_SLIDES[0]`) est **préchargée** dans
`index.html` (image LCP, `fetchpriority="high"`) : si l'ordre de `LOCAL_PHOTOS`
change, mettre à jour cette balise `<link rel="preload" as="image">` en même
temps. La même photo sert d'aperçu Open Graph / Twitter (`og:image`,
`twitter:image` dans `index.html`, en URL absolue).

## Bonnes pratiques

- **Compressez** les images (TinyPNG, ImageOptim, `squoosh.app`) avant l'ajout :
  le poids de la page en dépend directement.
- **Format conseillé : paysage, au moins 1920 px de large** — les héros
  couvrent tout le viewport. Les photos actuelles font 608 à 1080 px de large :
  elles restent nettes sur mobile et tablette, mais un léger lissage est
  possible en plein écran très haute résolution.
- **Noms de fichiers** : les noms actuels (export WhatsApp, avec espaces et
  parenthèses) sont supportés — les URLs sont encodées via `encodeURI` dans
  `constants.ts`. Préférez toutefois un nom simple sans espace ni accent
  (`uupt-campus-01.jpg`) pour les prochains ajouts.
- Le hero utilise `<img>` en `object-cover` avec un voile sombre
  (`bg-scrim-dark` / `.hero-overlay`), ce qui permet de garder un texte blanc
  lisible quelle que soit la photo fournie.
- Les diaporamas sont chargés **paresseusement** (`loading="lazy"`, montage
  fenêtré des slides) ; seule la première image du hero d'accueil est chargée
  en priorité.

## Source de secours

Les images Unsplash de secours restent déclarées dans `media`
(`src/data/uuptData.ts`, champ `fallback`), au cas où une photo locale devrait
être retirée à la dernière minute. Les héros, eux, consomment directement le
pool local.