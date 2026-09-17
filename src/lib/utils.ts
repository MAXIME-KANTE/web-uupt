/**
 * Helper `cn` : concatene des classes CSS conditionnelles sans dependance externe.
 * Exemple : cn('p-4', isActive && 'bg-blue-600', className)
 */
export type ClassValue = string | number | null | undefined | false;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Raccourci de chemin de route interne pour la navigation. */
export function routePath(id: string): string {
  return `/${id === 'accueil' ? '' : id}`;
}

/** Raccourci d'ancre interne (conservé pour compatibilité). */
export function sectionHref(id: string): string {
  return `#${id}`;
}