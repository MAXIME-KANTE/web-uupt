import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { whatsappAction } from '@/data/uuptData';

/* ------------------------------------------------------------------
 * FloatingWhatsApp : bouton d'action rapide fixe en bas a droite.
 * Pastille verte (`bg-emerald-500`) avec anneau pulsant
 * (`animate-pulse-ring`, defini dans tailwind.config.js).
 * ------------------------------------------------------------------ */

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappAction.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappAction.ariaLabel}
      title={whatsappAction.label}
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_-8px_rgba(16,185,129,0.7)] transition-colors duration-300 hover:bg-emerald-600"
    >
      {/* Anneau pulsant decoratif */}
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500/60"
      />
      <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
    </motion.a>
  );
}
