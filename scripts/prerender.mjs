/**
 * Prérendu statique du SPA (chaîné à `npm run build`).
 *
 * Sert `dist/` sur un serveur HTTP local minimal, charge chaque route dans
 * Chrome headless (puppeteer-core + Chrome du système), attend l'état stable
 * (networkidle + preloader terminé — min 0,9 s / plafond 2,6 s — + marge),
 * puis sauvegarde le HTML rendu :
 *
 *   dist/<route>/index.html   (10 routes indexables — /merci est exclue du
 *                              prérendu et du sitemap, SANS balise noindex)
 *   dist/404.html             (route inconnue → NotFoundPage rendue)
 *
 * Le HTML sauvegardé reçoit `window.__PRERENDERED__ = true` : le Preloader
 * React se saute à l'arrivée (le contenu est déjà peint) → LCP instantané,
 * zéro double-boot. Le `index.html` servi en dev ne porte jamais ce flag.
 *
 * Variables d'environnement :
 *   SITE_URL                  (défaut https://uupt.maximekante23.workers.dev)
 *   PRERENDER_PORT            (défaut 4317)
 *   PUPPETEER_EXECUTABLE_PATH (Chrome/Chromium explicite)
 *   SKIP_PRERENDER=1          (sort immédiatement — machine sans Chrome)
 */
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const SITE = process.env.SITE_URL || 'https://uupt.maximekante23.workers.dev'
const PORT = Number(process.env.PRERENDER_PORT || 4317)
const DIST = path.resolve('dist')
const SETTLE_MS = 2600 // preloader : min 0,9 s / plafond 2,6 s + fondu 640 ms

// Routes indexables uniquement (/merci : hors sitemap et hors prérendu —
// volontairement SANS meta robots, l'exclusion est purement infrastructure).
const ROUTES = [
  '/',
  '/axe-academique-culturel',
  '/axe-innovation',
  '/axe-sportif',
  '/a-propos',
  '/historique',
  '/partenaires',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
]

if (process.env.SKIP_PRERENDER === '1') {
  console.warn('[prerender] SKIP_PRERENDER=1 — HTML non prérendu (SPA nu servi tel quel).')
  process.exit(0)
}

if (!existsSync(DIST)) {
  console.error(`[prerender] dist/ introuvable (${DIST}) — lance \`vite build\` d'abord.`)
  process.exit(1)
}

/* ---------- Chrome du système (jamais de téléchargement puppeteer) ---------- */
function findChrome() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    process.env.LOCALAPPDATA &&
      path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean)
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }
  return null
}

const chromePath = findChrome()
if (!chromePath) {
  // Le prérendu est une optimisation : sans navigateur système, le build reste
  // déployable et Vite fournit le shell SPA avec le routage côté client.
  console.warn(
    '[prerender] Aucun Chrome/Chromium trouvé — HTML non prérendu (SPA nu).',
  )
  process.exit(0)
}

/* ---------- Serveur statique minimal (node:http, zéro dépendance) ---------- */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
    let rel = decodeURIComponent(url.pathname).replace(/\\/g, '/')
    if (rel.endsWith('/')) rel += 'index.html'
    // Anti-traversée : le chemin résolu doit rester sous dist/ — et doit être
    // un FICHIER (existsSync dit aussi true pour un dossier → readFile EISDIR
    // → 500 : piège des routes dont dist/<route>/ existe déjà).
    const file = path.join(DIST, rel)
    let st = null
    try {
      st = statSync(file)
    } catch {}
    if (file.startsWith(DIST) && st?.isFile()) {
      const data = await readFile(file)
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      })
      res.end(data)
      return
    }
    // Repli SPA : le routeur client rend la page (ou la 404 dédiée).
    const shell = await readFile(path.join(DIST, 'index.html'))
    res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' })
    res.end(shell)
  } catch (err) {
    console.error(`[prerender] 500 sur ${req.url} :`, err?.stack ?? err)
    res.writeHead(500)
    res.end('prerender server error')
  }
})

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve))
const BASE = `http://127.0.0.1:${PORT}`
console.log(`[prerender] ${BASE} → ${DIST} (Chrome : ${chromePath})`)

/* ---------- Capture d'une route ---------- */
async function captureRoute(page, route) {
  await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve())
  await new Promise((r) => setTimeout(r, SETTLE_MS))

  let html = await page.evaluate(() => {
    // État stable « tout visible » : les révélations au scroll (IntersectionObserver)
    // n'ont pas encore joué sous le pli — on force l'état final pour que le HTML
    // sauvegardé ne contienne pas de sections opacité 0.
    document.querySelectorAll(
      '.reveal, .reveal-magic, .reveal-left, .reveal-right, .reveal-zoom',
    ).forEach((el) => el.classList.add('is-visible'))
    // Animations GSAP (ScrollTrigger) : même logique — un tween `from` sous le
    // pli a posé son état initial en style inline (opacity 0…). On force l'état
    // FINAL de chaque animation : le HTML sauvegardé reste entièrement visible,
    // et les tweens recréés au chargement réel captureront un état propre au
    // lieu d'hériter d'un inline opacity 0 prérendu (piège observé : `from`
    // capturant l'état prérendu comme valeur de FIN → animation 0 → 0 figée).
    window.__gsap?.ScrollTrigger.getAll().forEach((st) => {
      try {
        if (st.animation) st.animation.progress(1)
      } catch {
        /* tween déjà terminé ou tué */
      }
    })
    // Filet de sécurité : un preloader encore accroché ne doit pas être sauvegardé.
    document.querySelector('.preloader')?.remove()
    return '<!doctype html>\n' + document.documentElement.outerHTML
  })

  // Les URL absolues du serveur local deviennent l'origine publique
  // (canonical, og:url, etc. — posées par usePageMeta depuis window.location).
  html = html
    .replaceAll(`http://127.0.0.1:${PORT}`, SITE)
    .replaceAll(`http://localhost:${PORT}`, SITE)
    // Flag consommé par src/components/Preloader.tsx : pas de second boot.
    // Première occurrence uniquement (= <head> du document, pas un littéral).
    .replace('<head>', '<head><script>window.__PRERENDERED__=true</script>')

  const outPath = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html')
  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, html, 'utf8')
  return { route, outPath, bytes: Buffer.byteLength(html) }
}

/* ---------- Boucle principale ---------- */
const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: 'shell',
  args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 })

const results = []
const failures = []
// Ordre de capture : '/' en DERNIER — avant l'écriture de dist/index.html,
// le repli SPA sert encore la coquille Vite vierge (sinon il servirait le
// HTML déjà prérendu de l'accueil à chaque route suivante).
const orderedRoutes = [...ROUTES.filter((r) => r !== '/')]
for (const route of orderedRoutes) {
  try {
    results.push(await captureRoute(page, route))
    console.log(`[prerender] ✓ ${route} → ${results[results.length - 1].bytes} o`)
  } catch (err) {
    failures.push(route)
    console.error(`[prerender] ✗ ${route} : ${err?.message ?? err}`)
  }
}

// 404 dédiée : route inconnue → NotFoundPage (noindex) rendue par le routeur.
try {
  const notFound = await captureRoute(page, '/___404-capture___')
  await writeFile(path.join(DIST, '404.html'), await readFile(notFound.outPath), 'utf8')
  await rm(path.dirname(notFound.outPath), { recursive: true, force: true })
  console.log(`[prerender] ✓ 404 → dist/404.html (${notFound.bytes} o)`)
} catch (err) {
  failures.push('404')
  console.error(`[prerender] ✗ 404 : ${err?.message ?? err}`)
}

// L'accueil en tout dernier (voir orderedRoutes) : jusqu'ici dist/index.html
// restait la coquille Vite propre, servie à tous les replis SPA.
try {
  results.push(await captureRoute(page, '/'))
  console.log(`[prerender] ✓ / → ${results[results.length - 1].bytes} o`)
} catch (err) {
  failures.push('/')
  console.error(`[prerender] ✗ / : ${err?.message ?? err}`)
}

await browser.close()
server.close()

if (failures.length) {
  console.error(`[prerender] Échecs : ${failures.join(', ')}`)
  process.exitCode = 1
} else {
  console.log(`[prerender] ${results.length} routes + 404 prérendues.`)
}
