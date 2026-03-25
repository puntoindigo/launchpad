import Link from 'next/link'
import { apps } from '@/lib/apps'
import { activeProjects } from '@/lib/activeProjects'

const statusLabel: Record<string, string> = {
  live: 'En vivo',
  local: 'Local / Tailscale',
  wip: 'En desarrollo',
}

const statusColor: Record<string, string> = {
  live: '#22c55e',
  local: '#c8f135',
  wip: '#f59e0b',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Punto Indigo Labs</h1>
          <p className="text-white/40 text-sm mt-1">
            Proyectos en curso · Herramientas · Ideas potenciales
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* ── En curso ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="text-lg font-semibold">En curso</h2>
            <span className="text-white/30 text-sm">{activeProjects.length} proyectos</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProjects.map((p) => {
              const href = p.internalUrl ?? p.url
              const isExternal = !!p.url && !p.internalUrl
              return (
                <div
                  key={p.slug}
                  className="bg-[#111] rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-all group relative overflow-hidden"
                >
                  {/* glow */}
                  <div
                    className="absolute top-0 right-0 w-28 h-28 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="relative">
                    {/* icon + status */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{p.icon}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: `${statusColor[p.status]}20`, color: statusColor[p.status] }}
                      >
                        {statusLabel[p.status]}
                      </span>
                    </div>
                    <h3 className="font-bold mb-0.5">{p.name}</h3>
                    <p className="text-white/50 text-xs mb-2">{p.tagline}</p>
                    <p className="text-white/30 text-xs leading-relaxed mb-4 line-clamp-2">
                      {p.description}
                    </p>
                    {/* tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/30">
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* actions */}
                    <div className="flex gap-2">
                      {href && (
                        <Link
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                          style={{ backgroundColor: `${p.color}22`, color: p.color }}
                        >
                          {p.internalUrl ? 'Abrir →' : 'Ver app →'}
                        </Link>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors"
                        >
                          Repo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Ideas potenciales ── */}
        <section>
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="text-lg font-semibold">Ideas potenciales</h2>
            <span className="text-white/30 text-sm">{apps.length} micro-SaaS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <div
                key={app.slug}
                className="bg-[#111] rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-all group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: app.color }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{app.icon}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${app.color}20`, color: app.color }}
                    >
                      {app.category}
                    </span>
                  </div>
                  <h3 className="font-bold mb-0.5">{app.name}</h3>
                  <p className="text-white/50 text-xs mb-2">{app.tagline}</p>
                  <p className="text-white/30 text-xs leading-relaxed mb-4 line-clamp-2">
                    {app.description}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/${app.slug}`}
                      className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors"
                    >
                      Landing v1
                    </Link>
                    <Link
                      href={`/v2/${app.slug}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      style={{ backgroundColor: `${app.color}22`, color: app.color }}
                    >
                      Landing v2
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 px-4 py-8 mt-4">
        <div className="max-w-6xl mx-auto text-center text-white/20 text-sm">
          2026 · Punto Indigo
        </div>
      </footer>
    </div>
  )
}
