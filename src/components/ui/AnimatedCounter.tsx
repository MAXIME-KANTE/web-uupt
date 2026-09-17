import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
 * AnimatedCounter : compteur numerique anime.
 * Le decompte demarre lorsque le chiffre entre dans le viewport
 * (une seule fois), puis restitue le resultat formate en francais.
 * ------------------------------------------------------------------ */

export interface AnimatedCounterProps {
  /** Valeur cible du decompte. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Duree de l'animation en secondes. */
  duration?: number;
  /** Decomptes declenches en cascade (delai en secondes). */
  delay?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.8,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, duration, delay]);

  return (
    <span ref={containerRef} className={cn('tabular-nums', className)}>
      {prefix}
      {displayValue.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
}