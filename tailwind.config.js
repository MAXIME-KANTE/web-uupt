/** @type {import('tailwindcss').Config} */
export default {
  /* Utilities Tailwind pour les NOUVEAUX composants (bento, GSAP…) — le
     design system historique vit dans App.css. Le preflight est DÉSACTIVÉ :
     il réinitialiserait les styles de tout le site existant. */
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      /* Tokens miroirs de :root (App.css) — garder les deux en synchrone. */
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
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 16px 0 rgb(0 0 0 / 0.10)', // --shadow-md
        lift: '0 10px 32px 0 rgb(0 0 0 / 0.12)', // --shadow-lg
      },
    },
  },
  plugins: [],
}
