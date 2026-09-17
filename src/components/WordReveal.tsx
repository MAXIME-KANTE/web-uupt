import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface WordRevealProps {
  textFr: string
  textEn: string
  className?: string
}

interface WordProps {
  progress: MotionValue<number>
  range: [number, number]
  word: string
  reduced: boolean
}

/** Un mot : opacité liée à un segment de la progression du scroll. */
function Word({ progress, range, word, reduced }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1])
  if (reduced) {
    return <span className="story-word">{word}{' '}</span>
  }
  return (
    <motion.span className="story-word" style={{ opacity }}>
      {word}{' '}
    </motion.span>
  )
}

/**
 * Paragraphe révélé mot à mot au scroll (style « Our Story ») : les mots
 * passent de 0.25 à 1 d'opacité, séquentiellement, au fil du défilement.
 * La langue active (contexte) détermine le texte découpé.
 */
export default function WordReveal({ textFr, textEn, className }: WordRevealProps) {
  const { lang } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.45'],
  })

  const words = (lang === 'en' ? textEn : textFr).split(' ')

  return (
    <p ref={ref} className={className ?? 'story-text'}>
      {words.map((word, index) => (
        <Word
          key={`${lang}-${index}`}
          progress={scrollYProgress}
          range={[index / words.length, Math.min((index + 1) / words.length, 1)]}
          word={word}
          reduced={reduced}
        />
      ))}
    </p>
  )
}
