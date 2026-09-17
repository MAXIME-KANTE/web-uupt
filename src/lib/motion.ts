import type { Transition, Variants } from 'framer-motion';

/* ------------------------------------------------------------------
 * Variantes d'animation partagees (framer-motion)
 * On centralise ici les courbes et les delais pour garantir une
 * choregraphie homogene sur tout le site (apparitions au scroll).
 * ------------------------------------------------------------------ */

/** Courbe d'acceleration douce utilisee pour toutes les apparitions. */
export const EASE_OUT: Transition['ease'] = 'easeOut';

/** Duree de reference d'une transition standard. */
export const BASE_DURATION = 0.6;

/** Container qui fait apparaitre ses enfants en cascade. */
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

/** Apparition depuis le bas (bloc generique). */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: BASE_DURATION, ease: EASE_OUT },
  },
};

/** Fondu simple. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** Apparition laterale (gauche -> droite). */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: BASE_DURATION, ease: EASE_OUT } },
};

/** Apparition laterale (droite -> gauche). */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: BASE_DURATION, ease: EASE_OUT } },
};

/** Apparition avec leger zoom (cartes premium, badges). */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Options de viewport : l'animation ne se joue qu'une fois, a 25% de visibilite. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

/** Options de viewport pour les longs contenus (timeline). */
export const viewportOnceSoft = { once: true, amount: 0.15 } as const;

/** Micro-interaction de survol : legere elevation. */
export const hoverLift = {
  y: -6,
  transition: { duration: 0.25, ease: EASE_OUT },
} as const;

/** Micro-interaction d'appui : leger enfoncement. */
export const tapPress = { scale: 0.97 } as const;

/** Animation d'entree d'un panneau d'onglet. */
export const tabPanel: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE_OUT } },
};