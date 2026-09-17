import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { SectionCopy } from '@/types';

/* ------------------------------------------------------------------
 * SectionTitle : en-tete de section reutilisable.
 * Pastille d'accroche + titre (portion mise en valeur en bleu) +
 * description. S'adapte aux sections claires et sombres.
 * ------------------------------------------------------------------ */

export interface SectionTitleProps extends SectionCopy {
  /** Icone affichee dans la pastille d'accroche. */
  icon?: LucideIcon;
  align?: 'left' | 'center';
  /** `dark` = texte clair pour les sections a fond sombre. */
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  align = 'center',
  tone = 'light',
  className,
}: SectionTitleProps) {
  const isDark = tone === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {/* Pastille d'accroche */}
      <span
        className={cn(
          'eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5',
          isDark ? 'bg-white/10 text-blue-300' : 'bg-blue-50 text-blue-600',
        )}
      >
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
        {eyebrow}
      </span>

      <h2
        className={cn(
          'max-w-3xl text-[1.75rem] leading-[1.18] sm:text-4xl lg:text-[2.6rem]',
          isDark ? 'text-white' : 'text-slate-900',
        )}
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-blue-600">{highlight}</span>
          </>
        )}
      </h2>

      <p
        className={cn(
          'max-w-2xl text-[0.97rem] leading-relaxed',
          isDark ? 'text-slate-300' : 'text-slate-600',
          align === 'center' && 'mx-auto',
        )}
      >
        {description}
      </p>
    </motion.div>
  );
}