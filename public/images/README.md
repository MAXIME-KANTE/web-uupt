# Images du site UUPT

Déposez ici les photos officielles. Les noms de fichiers doivent correspondre
**exactement** aux chemins déclarés dans `src/data/uuptData.ts` :

| Fichier attendu | Emplacement dans le site | Format / taille conseillés |
| --- | --- | --- |
| `hero-bg.jpg` | Image de fond plein écran du hero | 1920 × 1080 px, JPEG < 400 Ko |
| `campus-thies.jpg` | Section « À propos » (illustration) | 1200 × 900 px |
| `axe-academique.jpg` | Carte de l'axe *Académique & Culturel* | 800 × 600 px |
| `axe-innovation.jpg` | Carte de l'axe *Innovation* | 800 × 600 px |
| `axe-sport.jpg` | Carte de l'axe *Sportif* | 800 × 600 px |

## Bonnes pratiques

- **Compressez** les images (TinyPNG, ImageOptim, `squoosh.app`) avant l'ajout :
  le poids de la page en dépend directement.
- Le hero est chargé avec `loading="eager"` + `fetchpriority="high"` (image LCP) ;
  les autres images sont en `loading="lazy"`.
- Le hero utilise `<img>` en `object-cover` avec un voile sombre
  (`bg-scrim-dark`), ce qui permet de garder un texte blanc lisible quelle que
  soit la photo fournie.

## Fallback automatique

Si un fichier est manquant, `SmartImage` (`src/components/ui/SmartImage.tsx`)
affiche l'URL Unsplash définie dans le champ `fallback` de l'asset concerné.
Aucune image cassée n'apparaît donc sur le site.
