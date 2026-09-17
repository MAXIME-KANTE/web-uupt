/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* Tokens miroirs de :root (App.css) — spec §5. Le config d'origine UUPT
         ne les portait pas : les utilities `bg-night`, `text-ink`, `bg-brand`
         des composants copiés de SALEEL (ValeursGrid, PrestationsAccordion,
         ProgrammesGrid, cartes partenaires) étaient silencieusement absentes
         du CSS généré. Garder ce bloc synchronisé avec :root (App.css). */
      colors: {
        ink: '#16213a', // --fg : encre navy
        muted: '#5c6470', // --fg-muted : gris ardoise
        subtle: '#5f6b7a', // --fg-subtle
        cream: '#fdfcfa', // --bg : blanc chaud
        sand: '#f0ebdf', // --sand
        line: '#e7e4dd', // --border
        night: '#0f172a', // --bg-dark
        brand: {
          DEFAULT: '#f97316', // --primary (ACCENT uniquement)
          dark: '#ea6c0a', // --primary-dark
        },
      },
      fontFamily: {
        // Inter pour le texte courant, Manrope pour les titres (style corporate)
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%': { transform: 'scale(1.7)', opacity: '0' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
      },
      backgroundImage: {
        // Voile sombre applique sur les images de fond (contraste du texte blanc)
        'scrim-dark':
          'linear-gradient(180deg, rgb(0 0 0 / 0.65) 0%, rgb(0 0 0 / 0.45) 45%, rgb(0 0 0 / 0.75) 100%)',
      },
    },
  },
  plugins: [],
};

