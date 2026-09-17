import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { MediaAsset } from '@/types';

/* ------------------------------------------------------------------
 * SmartImage
 * Affiche l'image locale (`public/images/...`) et bascule
 * automatiquement sur une photo Unsplash de secours si le fichier
 * n'est pas encore present. Evite toute image cassee.
 * ------------------------------------------------------------------ */

export interface SmartImageProps {
  asset: MediaAsset;
  /**
   * Classes du conteneur : **doit** inclure l'utilitaire de position
   * (`relative`, `absolute inset-0`...) car le squelette et l'image
   * sont positionnes en absolu a l'interieur.
   */
  className?: string;
  /** Classes de la balise <img> (object-position, effet de zoom au survol...). */
  imageClassName?: string;
  /** `true` pour l'image LCP du hero (chargement prioritaire). */
  priority?: boolean;
}

export function SmartImage({
  asset,
  className,
  imageClassName,
  priority = false,
}: SmartImageProps) {
  const [source, setSource] = useState(asset.src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span className={cn('block overflow-hidden bg-slate-200', className)}>
      {/* Squelette de chargement */}
      {!isLoaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200"
        />
      )}

      <img
        src={source}
        alt={asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // Fichier local absent -> on bascule sur l'image de secours.
          if (source !== asset.fallback) setSource(asset.fallback);
        }}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0',
          imageClassName,
        )}
      />
    </span>
  );
}