export type Tool = {
  name: string
  description: string
  url?: string
  internalUrl?: string
  color: string
  icon: string
  status: 'available' | 'exploring' | 'integrated'
  note?: string
}

export const tools: Tool[] = [
  {
    name: 'Kapso',
    description:
      'Plataforma para crear páginas de aterrizaje y formularios de captura de leads con IA.',
    url: 'https://kapso.io',
    color: '#f97316',
    icon: '⚡',
    status: 'exploring',
    note: 'Integrar como canal de adquisición en proyectos SaaS',
  },
  {
    name: 'Devbot',
    description:
      'Orquestador de Claude Code. Lanzá tareas de dev desde cualquier dispositivo.',
    internalUrl: '/devbot',
    color: '#c8f135',
    icon: '🤖',
    status: 'available',
  },
  {
    name: 'Flyer Playground',
    description: 'Generá gráficas y flyers con templates editables para redes sociales.',
    internalUrl: '/playground/flyers',
    color: '#ec4899',
    icon: '🎨',
    status: 'exploring',
  },
]
