import type { ImgHTMLAttributes } from 'react'

type BrandLogoVariant = 'header' | 'drawer' | 'footer' | 'badge'
type BrandLogoTone = 'light' | 'ink' | 'auto'

/** Source unique du logo fourni dans le dossier public.
 *  TODO(UUPT) : produire les déclinaisons light/ink dédiées (spec §4) —
 *  en attendant, les deux tons pointent sur le même fichier `dame.png`
 *  (mot-symbole « UUPT » porté par l'alt ci-dessous). */
const TONE_SRC: Record<Exclude<BrandLogoTone, 'auto'>, string> = {
  light: '/images/uupt-logo.png',
  ink: '/images/uupt-logo.png',
}

const VARIANT_DEFAULT_TONE: Record<BrandLogoVariant, BrandLogoTone> = {
  header: 'auto',
  drawer: 'ink',
  footer: 'light',
  badge: 'ink',
}

interface BrandLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  variant?: BrandLogoVariant
  tone?: BrandLogoTone
  priority?: boolean
}

export default function BrandLogo({
  variant = 'header',
  tone,
  priority = false,
  className,
  ...props
}: BrandLogoProps) {
  const resolved = tone ?? VARIANT_DEFAULT_TONE[variant]
  const base = ['brand-logo', `brand-logo--${variant}`, className].filter(Boolean).join(' ')

  if (resolved === 'auto') {
    // Pile light/ink superposées (grid-area 1/1). alt="" : le lien/bouton
    // hôte porte déjà son aria-label — les images sont décoratives.
    return (
      <span className={`${base} brand-logo--swap`}>
        <img
          className="brand-logo__img brand-logo__img--light"
          src={TONE_SRC.light}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <img
          className="brand-logo__img brand-logo__img--ink"
          src={TONE_SRC.ink}
          alt=""
          loading="lazy"
        />
      </span>
    )
  }

  return (
    <img
      {...props}
      className={base}
      src={TONE_SRC[resolved]}
      alt="Logo UUPT — Union des Universités Privées de Thiès"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}
