# Dossier `public/` — ressources visuelles du site UUPT

Ce dossier contient les fichiers servis tels quels par Vite (accessibles depuis
la racine du site, ex. `/dame.png`).

## 1. Logo

| Fichier | Usage | État |
| --- | --- | --- |
| **`public/dame.png`** | Logo officiel affiché dans la navbar (dans un encadré blanc arrondi) | **à fournir** |
| `public/dame.svg` | Emplacement de secours (monogramme UUPT provisoire) | présent |
| `public/favicon.svg` | Favicon du site | présent |

Le composant `BrandLogo` (`src/components/ui/BrandLogo.tsx`) tente les sources
dans cet ordre :

1. `/dame.png`
2. `/dame.svg`
3. `/images/dame.png`
4. `/images/dame.svg`

Si aucune image n'est trouvée, un **logo typographique UUPT** s'affiche
automatiquement : le site reste donc parfaitement présentable, même sans le
fichier `dame`.

👉 **Pour utiliser le logo officiel** : déposez simplement votre fichier ici sous
le nom `dame.png` (fond transparent recommandé, ratio proche du carré, largeur
≥ 256 px pour rester net sur écrans haute densité).

## 2. Images d'illustration

Placez les photos dans `public/images/` en respectant exactement les noms
attendus : voir `public/images/README.md`.

Tant qu'un fichier est absent, le composant `SmartImage` bascule
automatiquement sur une photo **Unsplash** de secours (définie dans
`src/data/uuptData.ts`). Le site n'affiche donc jamais d'image cassée.
