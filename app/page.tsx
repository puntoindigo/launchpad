import Link from 'next/link'
import { apps } from '@/lib/apps'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Punto Indigo Labs
            </h1>
            <p className="text-white/50 text-sm mt-1">
              10 ideas. 1 stack. Listas para lanzar.
            </p>
          </div>
          <Link
            href="/tecnico"
            className="text-sm px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            Documento técnico →
          </Link>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {apps.map((app) => (
            <div
              key={app.slug}
              className="bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all group relative overflow-hidden"
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: app.color }}
              />

              <div className="relative">
                {/* Icon + category */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{app.icon}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: `${app.color}20`,
                      color: app.color,
                    }}
                  >
                    {app.category}
                  </span>
                </div>

                {/* Name + tagline */}
                <h2 className="text-xl font-bold mb-1">{app.name}</h2>
                <p className="text-white/60 text-sm mb-3">{app.tagline}</p>
                <p className="text-white/40 text-xs leading-relaxed mb-5 line-clamp-2">
                  {app.description}
                </p>

                {/* Pricing hint + version links */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs text-white/30">
                    Pro: {app.pro.split(' — ')[0]}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/${app.slug}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                    >
                      v1
                    </Link>
                    <Link
                      href={`/v2/${app.slug}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      style={{ backgroundColor: `${app.color}22`, color: app.color }}
                    >
                      v2 · skill →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center text-white/20 text-sm">
          2026 · Punto Indigo
        </div>
      </footer>
    </div>
  )
}
