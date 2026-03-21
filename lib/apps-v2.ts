/**
 * V2 theme data per app — applied via frontend-design SKILL
 * Each app gets a completely distinct aesthetic direction.
 */

export type AppV2Theme = {
  slug: string
  // Aesthetic direction (for reference)
  tone: string
  // Google Fonts import URL (embed in <style>)
  fontImport: string
  fontDisplay: string  // CSS font-family for headings
  fontBody: string     // CSS font-family for body/copy
  fontMono?: string    // optional mono accent
  // Color palette
  theme: 'dark' | 'light'
  bg: string
  bgAlt: string
  surface: string
  surfaceHover: string
  text: string
  textMuted: string
  textDim: string
  accent: string
  accentFg: string     // text on accent bg
  accentAlt: string    // secondary accent
  border: string
  borderStrong: string
  // Background effect class or CSS (injected as style)
  bgEffectCSS: string
  // Hero layout variant
  heroLayout: 'editorial-left' | 'centered-xl' | 'split-reverse' | 'terminal' | 'magazine-grid'
  // Alternative hero headline (punchier for this aesthetic)
  heroAlt: string
  // Visual accent element (emoji or SVG hint shown large in hero)
  heroVisual: string
}

export const appsV2Themes: AppV2Theme[] = [
  {
    slug: 'dictum',
    tone: 'Brutalist editorial — law journal meets Swiss modernism',
    fontImport: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Crimson+Pro:ital,wght@0,300;0,400;1,400&display=swap',
    fontDisplay: "'Playfair Display', Georgia, serif",
    fontBody: "'Crimson Pro', Georgia, serif",
    theme: 'dark',
    bg: '#0c0c0a',
    bgAlt: '#121210',
    surface: '#181816',
    surfaceHover: '#1f1f1c',
    text: '#f0ece0',
    textMuted: '#a09c8c',
    textDim: '#5c5848',
    accent: '#6366f1',
    accentFg: '#ffffff',
    accentAlt: '#dc2626',
    border: '#2a2826',
    borderStrong: '#3d3a30',
    bgEffectCSS: `
      background-image:
        repeating-linear-gradient(0deg, transparent, transparent 79px, #2a282620 79px, #2a282620 80px),
        repeating-linear-gradient(90deg, transparent, transparent 79px, #2a282620 79px, #2a282620 80px);
    `,
    heroLayout: 'editorial-left',
    heroAlt: 'El escrito perfecto no se teclea.\nSe dicta.',
    heroVisual: '⚖',
  },
  {
    slug: 'tradelog',
    tone: 'Bloomberg terminal — data viz war room aesthetic',
    fontImport: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;700;900&display=swap',
    fontDisplay: "'Exo 2', sans-serif",
    fontBody: "'Exo 2', sans-serif",
    fontMono: "'Share Tech Mono', monospace",
    theme: 'dark',
    bg: '#020d06',
    bgAlt: '#051209',
    surface: '#081a0e',
    surfaceHover: '#0c2414',
    text: '#e0ffe8',
    textMuted: '#5db87a',
    textDim: '#2d6640',
    accent: '#00ff66',
    accentFg: '#020d06',
    accentAlt: '#ff4444',
    border: '#0d3320',
    borderStrong: '#1a5535',
    bgEffectCSS: `
      background-image: repeating-linear-gradient(
        0deg, transparent, transparent 23px,
        rgba(0,255,102,0.04) 23px, rgba(0,255,102,0.04) 24px
      );
    `,
    heroLayout: 'terminal',
    heroAlt: 'SISTEMA ACTIVO. SESGOS DETECTADOS: 3. RECOMENDACIÓN: LEER EL ANÁLISIS.',
    heroVisual: '📊',
  },
  {
    slug: 'mednota',
    tone: 'Clinical elegance — LIGHT theme, premium healthcare journal',
    fontImport: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap',
    fontDisplay: "'DM Serif Display', Georgia, serif",
    fontBody: "'DM Sans', system-ui, sans-serif",
    theme: 'light',
    bg: '#f7f9fc',
    bgAlt: '#eef2f8',
    surface: '#ffffff',
    surfaceHover: '#f0f4fa',
    text: '#0f1c2e',
    textMuted: '#4a6080',
    textDim: '#8fa4be',
    accent: '#2563eb',
    accentFg: '#ffffff',
    accentAlt: '#0ea5e9',
    border: '#dce6f0',
    borderStrong: '#b8cfe0',
    bgEffectCSS: `
      background-image: radial-gradient(#b8cfe055 1px, transparent 1px);
      background-size: 28px 28px;
    `,
    heroLayout: 'split-reverse',
    heroAlt: 'La consulta que importa\nes la que vivís,\nno la que escribís.',
    heroVisual: '🩺',
  },
  {
    slug: 'cvmatch',
    tone: 'Luxury editorial — high-end recruitment firm, gold and black',
    fontImport: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Jost:wght@300;400;500&display=swap',
    fontDisplay: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Jost', system-ui, sans-serif",
    theme: 'dark',
    bg: '#080604',
    bgAlt: '#0e0b07',
    surface: '#141009',
    surfaceHover: '#1c160e',
    text: '#f5edd8',
    textMuted: '#a08c60',
    textDim: '#5c4e30',
    accent: '#c9a84c',
    accentFg: '#080604',
    accentAlt: '#e8c870',
    border: '#2a2018',
    borderStrong: '#403020',
    bgEffectCSS: `
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23080604'/%3E%3Crect width='1' height='1' fill='%23c9a84c08'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23c9a84c08'/%3E%3C/svg%3E");
    `,
    heroLayout: 'magazine-grid',
    heroAlt: 'Tu próximo trabajo\nya existe.\nSolo necesita encontrarte.',
    heroVisual: '✦',
  },
  {
    slug: 'lexgen',
    tone: 'Art Deco authority — 1920s court meets contemporary legal design',
    fontImport: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Spectral:ital,wght@0,300;0,400;1,400&display=swap',
    fontDisplay: "'Cinzel', Georgia, serif",
    fontBody: "'Spectral', Georgia, serif",
    theme: 'dark',
    bg: '#0a0614',
    bgAlt: '#100820',
    surface: '#160c28',
    surfaceHover: '#1e1035',
    text: '#f0e8d8',
    textMuted: '#9a8870',
    textDim: '#4e4438',
    accent: '#c9a84c',
    accentFg: '#0a0614',
    accentAlt: '#8b5cf6',
    border: '#2a1e40',
    borderStrong: '#3d2e58',
    bgEffectCSS: `
      background-image:
        repeating-linear-gradient(45deg, #c9a84c08 0px, transparent 1px, transparent 40px, #c9a84c06 41px),
        repeating-linear-gradient(-45deg, #c9a84c06 0px, transparent 1px, transparent 40px, #c9a84c04 41px);
    `,
    heroLayout: 'centered-xl',
    heroAlt: 'Un acuerdo sin papel\nno es un acuerdo.\nEs una apuesta.',
    heroVisual: '📜',
  },
  {
    slug: 'pitchia',
    tone: 'Maximalist startup chaos — bold, angular, high-energy',
    fontImport: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,700&family=Barlow:wght@300;400;500&display=swap',
    fontDisplay: "'Barlow Condensed', Arial Narrow, sans-serif",
    fontBody: "'Barlow', system-ui, sans-serif",
    theme: 'dark',
    bg: '#0a0000',
    bgAlt: '#120000',
    surface: '#1a0000',
    surfaceHover: '#220000',
    text: '#fff5f5',
    textMuted: '#cc8888',
    textDim: '#664444',
    accent: '#ff2d2d',
    accentFg: '#ffffff',
    accentAlt: '#ff8c00',
    border: '#3a1010',
    borderStrong: '#551818',
    bgEffectCSS: `
      background-image:
        repeating-linear-gradient(
          -55deg,
          transparent 0px, transparent 60px,
          #ff2d2d06 60px, #ff2d2d06 62px
        );
    `,
    heroLayout: 'editorial-left',
    heroAlt: 'DECKS VISTOS: 200.\nDECKS RECORDADOS: 3.\n¿EL TUYO ES UNO?',
    heroVisual: '🚀',
  },
  {
    slug: 'cotizador',
    tone: 'Playful bright — LIGHT theme, Figma-meets-freelancer sketchbook',
    fontImport: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,800;0,900;1,400&display=swap',
    fontDisplay: "'Nunito', system-ui, sans-serif",
    fontBody: "'Nunito', system-ui, sans-serif",
    theme: 'light',
    bg: '#fffbf0',
    bgAlt: '#fff3d0',
    surface: '#ffffff',
    surfaceHover: '#fffbf0',
    text: '#1a1206',
    textMuted: '#6b5a3a',
    textDim: '#b09070',
    accent: '#06b6d4',
    accentFg: '#ffffff',
    accentAlt: '#f59e0b',
    border: '#f0d890',
    borderStrong: '#e0c060',
    bgEffectCSS: `
      background-image: radial-gradient(#06b6d418 1.5px, transparent 1.5px);
      background-size: 24px 24px;
    `,
    heroLayout: 'split-reverse',
    heroAlt: 'Mandaste el presupuesto.\nAhora a esperar.\n¿O no?',
    heroVisual: '💼',
  },
  {
    slug: 'docenteia',
    tone: 'Retro-digital — classroom of the future, acid green terminal',
    fontImport: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Syne+Mono&display=swap',
    fontDisplay: "'Syne', system-ui, sans-serif",
    fontBody: "'Syne', system-ui, sans-serif",
    fontMono: "'Syne Mono', monospace",
    theme: 'dark',
    bg: '#050f05',
    bgAlt: '#081808',
    surface: '#0a1e0a',
    surfaceHover: '#0e280e',
    text: '#e8ffe8',
    textMuted: '#6aaf6a',
    textDim: '#2d6a2d',
    accent: '#adff2f',
    accentFg: '#050f05',
    accentAlt: '#00e5ff',
    border: '#1a3a1a',
    borderStrong: '#2a5a2a',
    bgEffectCSS: `
      background-image:
        repeating-linear-gradient(0deg, #adff2f06 0px, transparent 1px, transparent 19px, #adff2f04 20px);
    `,
    heroLayout: 'terminal',
    heroAlt: '> planificar_clase.sh --tema "lo_que_quieras" --nivel "el_tuyo" --output "lista_para_imprimir"',
    heroVisual: '🎓',
  },
  {
    slug: 'fokus',
    tone: 'Stark brutalist — LIGHT theme, The Economist meets stopwatch',
    fontImport: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap',
    fontDisplay: "'Libre Baskerville', Georgia, serif",
    fontBody: "'Libre Baskerville', Georgia, serif",
    fontMono: "'Courier Prime', 'Courier New', monospace",
    theme: 'light',
    bg: '#f5f4ee',
    bgAlt: '#eceae0',
    surface: '#ffffff',
    surfaceHover: '#f5f4ee',
    text: '#0d0c08',
    textMuted: '#5c5840',
    textDim: '#a09c80',
    accent: '#f97316',
    accentFg: '#ffffff',
    accentAlt: '#dc2626',
    border: '#d8d4c0',
    borderStrong: '#bdb890',
    bgEffectCSS: '',
    heroLayout: 'magazine-grid',
    heroAlt: 'No trabajás poco.\nTrabajás en el\nmomento equivocado.',
    heroVisual: '⏱',
  },
  {
    slug: 'sleeptones',
    tone: 'Organic dreamy — night sky, cosmic fluid, aurora borealis',
    fontImport: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Raleway:wght@200;300;400&display=swap',
    fontDisplay: "'Lora', Georgia, serif",
    fontBody: "'Raleway', system-ui, sans-serif",
    theme: 'dark',
    bg: '#04020e',
    bgAlt: '#080420',
    surface: '#0c0620',
    surfaceHover: '#110830',
    text: '#e8e0f8',
    textMuted: '#8878c8',
    textDim: '#443878',
    accent: '#a78bfa',
    accentFg: '#04020e',
    accentAlt: '#60a5fa',
    border: '#1a1040',
    borderStrong: '#2a1858',
    bgEffectCSS: `
      background-image:
        radial-gradient(ellipse 120% 80% at 20% -20%, #2d1b6930 0%, transparent 50%),
        radial-gradient(ellipse 80% 60% at 80% 110%, #1e3a6020 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, #a78bfa08 0%, transparent 70%);
    `,
    heroLayout: 'centered-xl',
    heroAlt: 'Ocho horas en cama\nno son ocho horas\nde descanso.',
    heroVisual: '🌙',
  },
]

export function getAppV2Theme(slug: string): AppV2Theme | undefined {
  return appsV2Themes.find((t) => t.slug === slug)
}
