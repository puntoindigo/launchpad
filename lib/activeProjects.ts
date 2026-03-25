export type ActiveProject = {
  slug: string
  name: string
  tagline: string
  description: string
  url?: string
  internalUrl?: string
  status: 'live' | 'local' | 'wip'
  color: string
  icon: string
  tags: string[]
  repo?: string
}

export const activeProjects: ActiveProject[] = [
  {
    slug: 'devbot',
    name: 'Devbot',
    tagline: 'Orquestador de Claude Code bots',
    description:
      'Lanzá tareas de desarrollo desde el celular. Los bots trabajan, committean y deployean solos. Acceso vía Tailscale o local.',
    internalUrl: '/devbot',
    status: 'local',
    color: '#c8f135',
    icon: '🤖',
    tags: ['Node.js', 'WebSocket', 'Claude Code'],
    repo: 'https://github.com/puntoindigo/devbot-orchestrator',
  },
  {
    slug: 'remitero',
    name: 'Remitero',
    tagline: 'Gestión de remitos y entregas',
    description:
      'Sistema de gestión de remitos para sindicatos. Flujo de Proveeduría, kioskos por empresa y venta por peso.',
    url: 'https://remitero.vercel.app',
    status: 'live',
    color: '#3b82f6',
    icon: '📦',
    tags: ['Next.js 15', 'Supabase', 'Vercel'],
    repo: 'https://github.com/puntoindigo/remitero',
  },
  {
    slug: 'vorum',
    name: 'Vorum',
    tagline: 'CRM por WhatsApp para profesionales',
    description:
      'Bot de WhatsApp con panel admin para gestionar contactos, automatizar respuestas y registrar conversaciones.',
    url: 'https://vorum.puntoindigo.com',
    status: 'live',
    color: '#22c55e',
    icon: '💬',
    tags: ['Node.js', 'WhatsApp', 'PM2'],
    repo: 'https://github.com/puntoindigo/vorum-wa',
  },
  {
    slug: 'auris',
    name: 'Auris',
    tagline: 'Generador de sonidos binaurales',
    description:
      'Generador web de audio binaural con sesiones personalizadas, visualizador y exportación.',
    url: 'https://auris.puntoindigo.com',
    status: 'live',
    color: '#a855f7',
    icon: '🎧',
    tags: ['Web Audio API', 'Next.js'],
  },
  {
    slug: 'recibos',
    name: 'Recibos',
    tagline: 'Recibos digitales gremiales',
    description:
      'Plataforma de recibos digitales para sindicatos. Integrado con el flujo de crédito gremial de Remitero.',
    url: 'https://v0-recibos.vercel.app',
    status: 'live',
    color: '#f59e0b',
    icon: '🧾',
    tags: ['Next.js 15', 'Supabase'],
  },
  {
    slug: 'id',
    name: 'ID',
    tagline: 'Proveedor de identidad central',
    description:
      'Sistema de autenticación y autorización compartido entre proyectos del ecosistema Punto Indigo.',
    status: 'wip',
    color: '#ef4444',
    icon: '🔑',
    tags: ['Next.js 15', 'Neon', 'Drizzle'],
  },
  {
    slug: 'playground',
    name: 'Playground Flyers',
    tagline: 'Generador de gráficas y flyers',
    description:
      'Creá flyers, posts y banners con templates editables. Exportá como imagen lista para publicar.',
    internalUrl: '/playground/flyers',
    status: 'wip',
    color: '#ec4899',
    icon: '🎨',
    tags: ['Canvas API', 'Next.js'],
  },
]
