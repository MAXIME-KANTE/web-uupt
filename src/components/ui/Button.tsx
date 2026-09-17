import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
 * Button — bouton pillule unifie du site UUPT (charte 100% bleu).
 *
 * Trois modes de rendu selon les props :
 * - `to`   : lien interne -> <Link> de react-router
 * - `href` : lien externe / ancre -> <a> (target blank si http)
 * - sinon  : <button> classique (formulaires, actions locales)
 *
 * Variantes :
 * - primary     : bleu vif (action principale)
 * - white       : blanc massif (sur fonds sombres / photos)
 * - outline     : contour bleu sur fond clair
 * - outlineDark : contour translucide sur fond sombre
 * - ghost       : texte seul
 * ------------------------------------------------------------------ */

export type ButtonVariant = 'primary' | 'white' | 'outline' | 'outlineDark' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  /** Route interne react-router (ex: '/contact'). */
  to?: string;
  /** URL externe ou ancre (ex: 'https://...', '#section'). */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icône lucide affichée à gauche ou à droite du libellé. */
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  /** Occupe toute la largeur disponible. */
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-600/30',
  white: 'bg-white text-blue-900 shadow-lg shadow-blue-950/10 hover:bg-blue-50',
  outline:
    'border border-slate-300 bg-white text-blue-900 hover:border-blue-600 hover:text-blue-600',
  outlineDark:
    'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
  ghost: 'text-blue-600 hover:bg-blue-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  type = 'button',
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const baseClasses = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  // 1) Route interne react-router.
  if (to) {
    return (
      <Link to={to} onClick={onClick} aria-label={ariaLabel} className={baseClasses}>
        {content}
      </Link>
    );
  }

  // 2) Lien externe ou ancre.
  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  // 3) Bouton natif.
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}
