import { useState } from 'react';

import { organization } from '@/data/uuptData';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
 * BrandLogo
 * Logo officiel de l'UUPT dans un encadre blanc arrondi
 * (`bg-white p-2 rounded-lg shadow-md`).
 *
 * Sources testees dans l'ordre : /dame.png -> /dame.svg ->
 * /images/dame.png -> /images/dame.svg. Si aucune n'est disponible,
 * un monogramme typographique prend le relais : le site reste
 * presentable meme sans le fichier logo.
 * ------------------------------------------------------------------ */

const LOGO_SOURCES = ['/dame.png', '/dame.svg', '/images/dame.png', '/images/dame.svg'];

export interface BrandLogoProps {
  /** Classes complementaires du cadre blanc. */
  className?: string;
  /** Classes de l'image (taille). */
  imageClassName?: string;
  /** Affiche le bloc typographique a droite du cadre. */
  showWordmark?: boolean;
  /** Couleur du texte : `light` sur fond sombre, `dark` sur fond clair. */
  textTone?: 'light' | 'dark';
}

export function BrandLogo({
  className,
  imageClassName,
  showWordmark = true,
  textTone = 'light',
}: BrandLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);

  const hasImage = sourceIndex < LOGO_SOURCES.length;
  const currentSource = hasImage ? LOGO_SOURCES[sourceIndex] : undefined;

  return (
    <span className="flex items-center gap-3">
      {/* Encadre blanc arrondi contenant le logo */}
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-md',
          className,
        )}
      >
        {hasImage && currentSource ? (
          <img
            src={currentSource}
            alt={`Logo ${organization.name} (${organization.acronym})`}
            width={80}
            height={80}
            onError={() => setSourceIndex((previous) => previous + 1)}
            className={cn('h-10 w-10 object-contain', imageClassName)}
          />
        ) : (
          <span
            aria-label={organization.acronym}
            className={cn(
              'grid h-10 w-10 place-items-center rounded bg-slate-900 font-display text-[0.72rem] font-extrabold tracking-tight text-white',
              imageClassName,
            )}
          >
            UU
          </span>
        )}
      </span>

      {/* Bloc typographique */}
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-lg font-extrabold tracking-tight',
              textTone === 'light' ? 'text-white' : 'text-slate-900',
            )}
          >
            {organization.acronym}
          </span>
          <span
            className={cn(
              'mt-1 text-[0.6rem] font-medium uppercase tracking-[0.16em]',
              textTone === 'light' ? 'text-white/70' : 'text-slate-500',
            )}
          >
            Universités Privées de Thiès
          </span>
        </span>
      )}
    </span>
  );
}