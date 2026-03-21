import Link from 'next/link'
import { apps } from '@/lib/apps'

const techDetails: Record<
  string,
  {
    stack: string[]
    tables: string[]
    routes: string[]
    devTime: string
    monetization: string
  }
> = {
  dictum: {
    stack: ['Next.js 15', 'Whisper API (OpenAI)', 'GPT-4o', 'Supabase', 'Stripe'],
    tables: ['users', 'dictations(id, user_id, audio_url, transcript, formatted_text, type, created_at)', 'templates(id, name, type, prompt_template)', 'exports(id, dictation_id, format, url)'],
    routes: ['POST /api/dictate — sube audio y dispara transcripción', 'POST /api/format — formatea el texto con template jurídico', 'GET /api/dictations — historial del usuario', 'POST /api/export — genera DOCX/PDF'],
    devTime: '6-8 semanas (1 dev full-stack)',
    monetization: 'Freemium con límite de dictados/mes. Pro $12/mes. Potencial enterprise para estudios jurídicos grandes.',
  },
  tradelog: {
    stack: ['Next.js 15', 'Supabase (PostgreSQL)', 'GPT-4o', 'Recharts', 'Stripe'],
    tables: ['users', 'trades(id, user_id, pair, direction, entry, exit, pnl, notes, opened_at, closed_at)', 'insights(id, user_id, type, message, severity, generated_at)', 'alerts(id, user_id, condition, active)'],
    routes: ['POST /api/trades — registrar operación', 'GET /api/trades — listar con filtros', 'POST /api/analyze — trigger análisis IA', 'GET /api/insights — patrones detectados', 'GET /api/stats — métricas agregadas'],
    devTime: '5-7 semanas (1 dev full-stack)',
    monetization: 'Freemium 20 trades. Pro $9/mes. Alto LTV por ser herramienta de mejora continua — los traders la usan diariamente.',
  },
  mednota: {
    stack: ['Next.js 15', 'Whisper API', 'GPT-4o (medical fine-tune)', 'Supabase', 'Stripe', 'AWS S3 (audio encriptado)'],
    tables: ['users(id, specialty)', 'consultations(id, user_id, patient_code, audio_url, transcript, hc_structured, patient_summary, created_at)', 'templates(id, specialty, hc_schema)', 'agenda_sync(id, user_id, provider, token)'],
    routes: ['POST /api/consultations/start — inicia grabación', 'POST /api/consultations/stop — cierra y procesa', 'GET /api/consultations/:id — HC generada', 'GET /api/consultations/:id/summary — resumen paciente', 'GET /api/export/:id — PDF de HC'],
    devTime: '8-10 semanas (requiere QA médico adicional)',
    monetization: 'Pro $19/mes. Ticket más alto justificado por ahorro de 1-2hs/día. Posible integración con EMR/HIS para enterprise.',
  },
  cvmatch: {
    stack: ['Next.js 15', 'GPT-4o', 'Supabase', 'pdf-parse', 'Stripe'],
    tables: ['users', 'cvs(id, user_id, raw_text, parsed_json, created_at)', 'optimizations(id, user_id, cv_id, job_description, optimized_cv, ats_score_before, ats_score_after, cover_letter, created_at)'],
    routes: ['POST /api/cv/upload — parsea y guarda CV', 'POST /api/optimize — optimiza CV para oferta', 'GET /api/optimizations — historial', 'POST /api/cover-letter — genera carta'],
    devTime: '4-5 semanas',
    monetization: 'Freemium 3 usos. Pro $7/mes. Ciclo corto de búsqueda laboral (3-6 meses) pero alto volumen de usuarios. Potencial afiliado con portales de empleo.',
  },
  lexgen: {
    stack: ['Next.js 15', 'GPT-4o', 'Supabase', 'docx (npm)', 'pdfkit', 'Stripe'],
    tables: ['users', 'contracts(id, user_id, type, form_data, generated_text, created_at)', 'contract_types(id, name, slug, prompt_template, fields_schema)', 'downloads(id, contract_id, format, created_at)'],
    routes: ['GET /api/contract-types — tipos disponibles', 'POST /api/contracts/generate — genera contrato desde form', 'GET /api/contracts/:id — ver contrato', 'POST /api/contracts/:id/export — DOCX o PDF'],
    devTime: '5-6 semanas (más tiempo en redacción legal de prompts)',
    monetization: 'Freemium 2 contratos. Pro $15/mes. También viable como pago por contrato ($3-5 unitario). Mercado grande: freelancers + pymes en LATAM.',
  },
  pitchia: {
    stack: ['Next.js 15', 'GPT-4o', 'Supabase', 'pptxgenjs', 'Stripe'],
    tables: ['users', 'pitches(id, user_id, company_name, brief_json, slides_json, feedback_json, created_at)', 'templates(id, industry, name, slide_schema)'],
    routes: ['POST /api/pitches — crea pitch desde brief', 'GET /api/pitches/:id — ver deck generado', 'PUT /api/pitches/:id/slide/:n — editar slide', 'POST /api/pitches/:id/export — PDF / PPTX', 'POST /api/pitches/:id/feedback — análisis automático'],
    devTime: '6-7 semanas',
    monetization: 'Freemium 1 pitch. Pro $12/mes. Usuarios muy motivados (están buscando inversión). Posible B2B con aceleradoras e incubadoras.',
  },
  cotizador: {
    stack: ['Next.js 15', 'Supabase', 'Resend (emails)', 'Stripe'],
    tables: ['users', 'clients(id, user_id, name, email, phone)', 'services(id, user_id, name, price, currency)', 'quotes(id, user_id, client_id, items_json, total, status, token, sent_at, approved_at)', 'reminders(id, quote_id, scheduled_at, sent_at)'],
    routes: ['POST /api/quotes — crear presupuesto', 'GET /api/quotes/:token — vista pública del cliente', 'POST /api/quotes/:token/approve — cliente aprueba', 'POST /api/reminders/schedule — programar reminder', 'GET /api/dashboard — métricas de ingresos'],
    devTime: '5-6 semanas',
    monetization: 'Freemium 5 presupuestos. Pro $10/mes. Retención alta (herramienta de trabajo diario). Expansión natural a facturación e integración con pasarelas de pago.',
  },
  docenteia: {
    stack: ['Next.js 15', 'GPT-4o', 'Supabase', 'Stripe'],
    tables: ['users(id, level, subject)', 'lessons(id, user_id, topic, level, objectives, plan_json, exercises_json, evaluation_json, created_at)', 'question_bank(id, user_id, topic, question, answer, difficulty)', 'curricula(id, level, subject, standards_json)'],
    routes: ['POST /api/lessons/generate — genera plan de clase', 'GET /api/lessons — historial', 'POST /api/questions/generate — genera banco de preguntas', 'GET /api/questions — banco del usuario', 'POST /api/export/:id — PDF imprimible'],
    devTime: '5-6 semanas',
    monetization: 'Freemium 3 clases. Pro $8/mes. Mercado enorme en LATAM (docentes con bajo poder adquisitivo — precio accesible clave). Posible B2B con escuelas y plataformas educativas.',
  },
  fokus: {
    stack: ['Next.js 15', 'Supabase', 'GPT-4o (insights)', 'Stripe'],
    tables: ['users', 'sessions(id, user_id, duration_min, quality_rating, task_label, started_at, ended_at)', 'insights(id, user_id, type, message, data_json, generated_at)', 'settings(id, user_id, default_duration, break_duration, notifications)'],
    routes: ['POST /api/sessions/start — inicia sesión', 'POST /api/sessions/end — cierra con rating', 'GET /api/sessions/stats — estadísticas semanales', 'POST /api/insights/generate — análisis de patrones', 'GET /api/insights — sugerencias activas'],
    devTime: '4-5 semanas',
    monetization: 'Freemium funcional. Pro $5/mes (precio de impulso). MRR bajo por usuario pero volumen alto. Potencial integración con Notion, Linear, Jira para B2B.',
  },
  sleeptones: {
    stack: ['Next.js 15', 'Supabase', 'Web Audio API', 'Stripe'],
    tables: ['users', 'sounds(id, name, category, url, duration_s)', 'mixes(id, user_id, name, layers_json, created_at)', 'sessions(id, user_id, mix_id, duration_min, goal, started_at)', 'presets(id, goal, description, layers_json)'],
    routes: ['GET /api/sounds — catálogo de sonidos', 'POST /api/mixes — guardar mezcla', 'GET /api/mixes — mezclas del usuario', 'GET /api/presets — presets por objetivo', 'GET /api/sessions/stats — análisis de uso'],
    devTime: '4-5 semanas (más tiempo en curación de audio)',
    monetization: 'Freemium con límite de sonidos. Pro $6/mes. Diferenciador: personalización inteligente vs. apps de ruido estático. Potencial en apps de meditación y wellness.',
  },
}

export default function TecnicoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-white/30 text-sm font-mono">PUNTO INDIGO LABS</span>
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Inicio
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Documento Técnico
          </h1>
          <p className="text-white/50 text-lg">
            Stack, arquitectura y modelo de negocio de las 10 ideas de Punto Indigo Labs.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Stack común */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Stack común</h2>
          <p className="text-white/50 mb-6 text-sm">
            Todos los proyectos comparten el mismo núcleo tecnológico para maximizar reutilización y velocidad de desarrollo.
          </p>
          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Stack base</span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Framework', value: 'Next.js 15 — App Router, Server Components, Server Actions' },
                { label: 'Lenguaje', value: 'TypeScript 5 — strict mode en todo el codebase' },
                { label: 'Estilos', value: 'Tailwind CSS v4 — diseño oscuro, mobile-first' },
                { label: 'Base de datos', value: 'Supabase (PostgreSQL) — auth, RLS, realtime cuando aplica' },
                { label: 'IA', value: 'OpenAI (GPT-4o + Whisper) · Vercel AI SDK' },
                { label: 'Pagos', value: 'Stripe — subscriptions, webhooks, portal de facturación' },
                { label: 'Email', value: 'Resend — transaccional y notificaciones' },
                { label: 'Deploy', value: 'Vercel — edge functions, preview deployments, analytics' },
                { label: 'Monitoreo', value: 'Sentry — errores en prod. Vercel Analytics — uso' },
                { label: 'Auth', value: 'Supabase Auth — magic link, Google OAuth, session server-side' },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <dt className="text-xs text-white/30 font-medium uppercase tracking-wide">{label}</dt>
                  <dd className="text-white/70 text-sm">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modelo de negocio */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Modelo de negocio</h2>
          <p className="text-white/50 mb-6 text-sm">
            Patrón freemium con SaaS mensual, replicado en los 10 productos.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Freemium como adquisición',
                desc: 'Cada producto tiene un tier gratuito funcional que permite al usuario experimentar el valor real antes de pagar. El límite es de uso (dictados, operaciones, consultas) — no de features clave.',
              },
              {
                title: 'Pro como monetización',
                desc: 'El plan Pro desbloquea uso ilimitado + features avanzadas (exportación, IA, integraciones). Precio entre $5 y $19 USD/mes según segmento y valor percibido.',
              },
              {
                title: 'Distribución',
                desc: 'SEO + contenido especializado (ej: "cómo hacer una historia clínica más rápido"). Comunidades profesionales (grupos de abogados, médicos, docentes en WhatsApp/Telegram). Product Hunt en el lanzamiento.',
              },
              {
                title: 'Camino enterprise',
                desc: 'Dictum, MedNota y CVMatch tienen potencial B2B claro (estudios jurídicos, clínicas, plataformas de RRHH). Implementar SSO y billing por equipo en V2.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#111] rounded-xl p-5 border border-white/5">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Decisiones arquitectónicas */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Decisiones arquitectónicas</h2>
          <p className="text-white/50 mb-6 text-sm">
            Criterios que se aplican a todos los productos del portafolio.
          </p>
          <div className="space-y-3">
            {[
              { q: '¿Por qué Next.js App Router?', a: 'Server Components reducen JS en cliente. Layout compartido sin re-renders. SSG para landings → SEO perfecto. Route Handlers como API interna limpia.' },
              { q: '¿Por qué Supabase y no Prisma + PlanetScale?', a: 'Supabase unifica DB + Auth + Storage + Realtime. Menos servicios = menos complejidad operativa. RLS en la DB como capa de seguridad primaria.' },
              { q: '¿Por qué Vercel AI SDK?', a: 'Abstrae streaming de OpenAI con una API limpia. Soporta múltiples proveedores sin cambiar el código del producto. useChat y useCompletion listos para usar.' },
              { q: '¿Por qué Stripe y no MercadoPago?', a: 'Subscriptions y webhook handling más maduros. Mercado objetivo incluye LATAM + global. MercadoPago puede agregarse como método de pago dentro de Stripe en V2.' },
              { q: '¿Cómo se maneja el rate limiting?', a: 'Supabase RLS controla acceso por usuario. Tabla de usage_counters con reset mensual via cron job. Middleware en Next.js verifica límites antes de llamar a OpenAI.' },
            ].map(({ q, a }) => (
              <details key={q} className="bg-[#111] rounded-xl border border-white/5 group">
                <summary className="px-5 py-4 cursor-pointer font-medium text-sm text-white/80 hover:text-white transition-colors list-none flex items-center justify-between">
                  {q}
                  <span className="text-white/30 text-lg group-open:rotate-45 transition-transform inline-block">+</span>
                </summary>
                <div className="px-5 pb-4 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Por app */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Detalle por producto</h2>
          <p className="text-white/50 mb-8 text-sm">
            Stack específico, tablas principales, API routes y estimación de desarrollo.
          </p>
          <div className="space-y-10">
            {apps.map((app) => {
              const tech = techDetails[app.slug]
              if (!tech) return null
              return (
                <div key={app.slug} className="border border-white/10 rounded-2xl overflow-hidden">
                  {/* App header */}
                  <div
                    className="px-6 py-5 flex items-center gap-3"
                    style={{ background: `linear-gradient(to right, ${app.color}15, transparent)` }}
                  >
                    <span className="text-3xl">{app.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold">{app.name}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${app.color}25`, color: app.color }}
                        >
                          {app.category}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm mt-0.5">{app.tagline}</p>
                    </div>
                    <Link
                      href={`/${app.slug}`}
                      className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors whitespace-nowrap"
                    >
                      Ver landing
                    </Link>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stack */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/30 mb-3">Stack específico</h4>
                      <ul className="space-y-1.5">
                        {tech.stack.map((s) => (
                          <li key={s} className="flex items-center gap-2 text-sm text-white/60">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: app.color }}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tablas */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/30 mb-3">Tablas principales</h4>
                      <ul className="space-y-1.5">
                        {tech.tables.map((t) => (
                          <li key={t} className="text-xs font-mono text-white/50 leading-relaxed">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* API Routes */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/30 mb-3">API Routes principales</h4>
                      <ul className="space-y-1.5">
                        {tech.routes.map((r) => (
                          <li key={r} className="text-xs font-mono text-white/50 leading-relaxed">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Meta */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Tiempo estimado</h4>
                        <p className="text-white/60 text-sm">{tech.devTime}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Potencial de monetización</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{tech.monetization}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Pricing</h4>
                        <div className="space-y-1">
                          <p className="text-xs text-white/40">Free: {app.free}</p>
                          <p className="text-xs" style={{ color: app.color }}>Pro: {app.pro}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Estimación global */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Resumen ejecutivo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Productos', value: '10', sub: 'Ideas listas para desarrollar' },
              { label: 'Tiempo total estimado', value: '52-70 sem', sub: 'Para los 10 productos secuenciales' },
              { label: 'MRR potencial', value: '$5-19/user', sub: 'Rango de precios del portafolio' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-[#111] rounded-xl p-6 border border-white/5 text-center">
                <p className="text-3xl font-extrabold mb-1">{value}</p>
                <p className="text-white/70 text-sm font-medium mb-1">{label}</p>
                <p className="text-white/30 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/20 text-sm">2026 · Punto Indigo Labs — Documento Técnico</span>
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  )
}
