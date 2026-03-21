import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle, Star, ChevronDown, ArrowRight } from 'lucide-react'
import { apps, getApp } from '@/lib/apps'
import { appsV2Themes, getAppV2Theme } from '@/lib/apps-v2'

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }))
}


/* ─── Sub-layouts for hero ────────────────────────────────────── */

function HeroEditorialLeft({ app, t }: { app: ReturnType<typeof getApp>; t: ReturnType<typeof getAppV2Theme> }) {
  if (!app || !t) return null
  const lines = t.heroAlt.split('\n')
  const isTerminal = t.heroLayout === 'terminal'
  return (
    <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-32">
      <div>
        {/* issue line */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-12 opacity-60" style={{ background: t.accent }} />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: t.accent, fontFamily: t.fontMono || t.fontBody }}>
            {app.category}
          </span>
        </div>
        <h1 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.05, fontWeight: 900, color: t.text, letterSpacing: '-0.02em' }}>
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 1 ? <em style={{ fontStyle: 'italic', color: t.accent }}>{line}</em> : line}
            </span>
          ))}
        </h1>
        <p style={{ fontFamily: t.fontBody, color: t.textMuted, fontSize: '1.15rem', lineHeight: 1.7, marginTop: '2rem', maxWidth: '42ch' }}>
          {app.heroSubtext}
        </p>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ background: t.accent, color: t.accentFg, padding: '14px 32px', borderRadius: '6px', fontFamily: t.fontBody, fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}>
            Empezar gratis →
          </button>
          <span style={{ fontFamily: t.fontMono || t.fontBody, color: t.textDim, fontSize: '0.8rem', alignSelf: 'center' }}>
            {app.free}
          </span>
        </div>
      </div>
      {/* right: big decorative number */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 1, opacity: 0.06, fontFamily: t.fontDisplay, fontWeight: 900, color: t.accent, userSelect: 'none', position: 'absolute' }}>
          {app.icon}
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {app.stats.map((s, i) => (
            <div key={i} style={{ border: `1px solid ${t.border}`, borderRadius: '8px', padding: '1.25rem 1.75rem', background: t.surface }}>
              <div style={{ fontFamily: t.fontDisplay, fontSize: '2.2rem', fontWeight: 900, color: t.accent }}>{s.value}</div>
              <div style={{ fontFamily: t.fontBody, fontSize: '0.8rem', color: t.textMuted, marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroCenteredXL({ app, t }: { app: ReturnType<typeof getApp>; t: ReturnType<typeof getAppV2Theme> }) {
  if (!app || !t) return null
  const lines = t.heroAlt.split('\n')
  return (
    <div className="max-w-5xl mx-auto px-5 py-40 text-center flex flex-col items-center min-h-[85vh] justify-center">
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{t.heroVisual}</div>
      <span style={{ fontFamily: t.fontMono || t.fontBody, color: t.accent, fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem', display: 'block' }}>
        — {app.category} —
      </span>
      <h1 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.05, fontWeight: 700, color: t.text, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
        {lines.map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {i === lines.length - 1 ? <em style={{ fontStyle: 'italic', color: t.accent }}>{line}</em> : line}
          </span>
        ))}
      </h1>
      <p style={{ fontFamily: t.fontBody, color: t.textMuted, fontSize: '1.1rem', lineHeight: 1.75, maxWidth: '50ch', marginBottom: '3rem' }}>
        {app.heroSubtext}
      </p>
      {/* decorative rule */}
      <div style={{ width: '100%', maxWidth: '280px', height: '1px', background: `linear-gradient(90deg, transparent, ${t.accent}80, transparent)`, marginBottom: '3rem' }} />
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button style={{ background: t.accent, color: t.accentFg, padding: '16px 40px', borderRadius: '4px', fontFamily: t.fontBody, fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
          Empezar gratis
        </button>
        <button style={{ background: 'transparent', color: t.textMuted, padding: '16px 28px', border: `1px solid ${t.border}`, borderRadius: '4px', fontFamily: t.fontBody, fontWeight: 400, fontSize: '0.9rem', cursor: 'pointer' }}>
          Ver planes
        </button>
      </div>
    </div>
  )
}

function HeroSplitReverse({ app, t }: { app: ReturnType<typeof getApp>; t: ReturnType<typeof getAppV2Theme> }) {
  if (!app || !t) return null
  const lines = t.heroAlt.split('\n')
  return (
    <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] py-28">
      {/* right: visual block (comes first visually on desktop via order) */}
      <div style={{ order: 1 }} className="lg:order-2">
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* glow */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${t.accent}30, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{app.icon}</div>
          <div style={{ fontFamily: t.fontDisplay, fontSize: '1.5rem', color: t.text, marginBottom: '1rem', fontWeight: 700, lineHeight: 1.3 }}>
            {app.tagline}
          </div>
          <div style={{ height: '1px', background: t.border, margin: '1.5rem 0' }} />
          {app.stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.6rem 0', borderBottom: i < app.stats.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <span style={{ fontFamily: t.fontBody, fontSize: '0.82rem', color: t.textMuted }}>{s.label}</span>
              <span style={{ fontFamily: t.fontDisplay, fontSize: '1.4rem', fontWeight: 700, color: t.accent }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* left: text */}
      <div style={{ order: 2 }} className="lg:order-1">
        <span style={{ display: 'inline-block', background: `${t.accent}18`, color: t.accent, border: `1px solid ${t.accent}35`, borderRadius: '100px', padding: '5px 16px', fontSize: '0.75rem', fontFamily: t.fontBody, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          {app.category}
        </span>
        <h1 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          {lines.map((line, i) => (
            <span key={i} style={{ display: 'block', color: i === 0 ? t.text : t.accent }}>
              {line}
            </span>
          ))}
        </h1>
        <p style={{ fontFamily: t.fontBody, color: t.textMuted, fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          {app.heroSubtext}
        </p>
        <button style={{ background: t.accent, color: t.accentFg, padding: '15px 36px', borderRadius: '12px', fontFamily: t.fontBody, fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}>
          Empezar gratis →
        </button>
        <div style={{ marginTop: '1.5rem', fontFamily: t.fontBody, fontSize: '0.8rem', color: t.textDim }}>
          Sin tarjeta · {app.free}
        </div>
      </div>
    </div>
  )
}

function HeroTerminal({ app, t }: { app: ReturnType<typeof getApp>; t: ReturnType<typeof getAppV2Theme> }) {
  if (!app || !t) return null
  return (
    <div className="max-w-5xl mx-auto px-5 py-32 min-h-[85vh] flex flex-col justify-center">
      {/* terminal window */}
      <div style={{ background: t.surface, border: `1px solid ${t.borderStrong}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '3rem', maxWidth: '700px' }}>
        <div style={{ background: t.bgAlt, padding: '10px 16px', display: 'flex', gap: '8px', alignItems: 'center', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: '1rem', fontFamily: t.fontMono || t.fontBody, fontSize: '0.75rem', color: t.textDim }}>
            {app.slug}.sh
          </span>
        </div>
        <div style={{ padding: '1.5rem', fontFamily: t.fontMono || t.fontBody, fontSize: '0.85rem', lineHeight: 2, color: t.textMuted }}>
          <div><span style={{ color: t.accent }}>❯ </span><span style={{ color: t.text }}>status</span></div>
          <div style={{ color: t.textDim, paddingLeft: '1.5rem' }}>
            {app.stats.map((s, i) => (
              <div key={i}>{s.label}: <span style={{ color: t.accent }}>{s.value}</span></div>
            ))}
          </div>
          <div style={{ marginTop: '0.5rem' }}><span style={{ color: t.accent }}>❯ </span><span style={{ color: t.text, fontWeight: 700 }}>{app.slug} --start</span><span style={{ display: 'inline-block', width: '8px', height: '1em', background: t.accent, marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} /></div>
        </div>
      </div>
      <h1 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, fontWeight: 900, color: t.text, letterSpacing: '-0.03em', textTransform: t.fontDisplay.includes('Exo') ? 'uppercase' : 'none' }}>
        {app.name}
      </h1>
      <p style={{ fontFamily: t.fontBody, color: t.textMuted, fontSize: '1.1rem', marginTop: '1rem', maxWidth: '50ch', lineHeight: 1.7 }}>
        {app.heroSubtext}
      </p>
      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button style={{ background: t.accent, color: t.accentFg, padding: '13px 30px', borderRadius: '4px', fontFamily: t.fontMono || t.fontBody, fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em', border: 'none', cursor: 'pointer' }}>
          EMPEZAR GRATIS
        </button>
        <span style={{ fontFamily: t.fontMono || t.fontBody, color: t.textDim, fontSize: '0.8rem' }}>// {app.free}</span>
      </div>
    </div>
  )
}

function HeroMagazineGrid({ app, t }: { app: ReturnType<typeof getApp>; t: ReturnType<typeof getAppV2Theme> }) {
  if (!app || !t) return null
  const lines = t.heroAlt.split('\n')
  return (
    <div className="max-w-6xl mx-auto px-5 py-24 min-h-[85vh] flex flex-col justify-center">
      {/* top rule */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ height: '2px', flex: 1, background: t.borderStrong }} />
        <span style={{ fontFamily: t.fontMono || t.fontBody, fontSize: '0.7rem', color: t.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {app.category} · {app.slug}.app
        </span>
        <div style={{ height: '2px', flex: 1, background: t.borderStrong }} />
      </div>

      {/* large headline across full width */}
      <h1 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.95, fontWeight: 900, color: t.text, letterSpacing: '-0.04em', marginBottom: '3rem' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'block', textIndent: i === 1 ? '3rem' : i === 2 ? '6rem' : '0' }}>
            {line}
          </div>
        ))}
      </h1>

      {/* bottom row: stats + CTA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1px', background: t.border }}>
        {app.stats.map((s, i) => (
          <div key={i} style={{ background: t.bg, padding: '1.5rem' }}>
            <div style={{ fontFamily: t.fontDisplay, fontSize: '2rem', fontWeight: 900, color: t.accent }}>{s.value}</div>
            <div style={{ fontFamily: t.fontBody, fontSize: '0.75rem', color: t.textMuted, marginTop: '0.3rem' }}>{s.label}</div>
          </div>
        ))}
        <div style={{ background: t.accent, padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minWidth: '140px' }}>
          <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, color: t.accentFg, fontSize: '0.9rem', textAlign: 'center' }}>
            Empezar<br />gratis →
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── PAGE ─────────────────────────────────────────────────────── */
export default async function LandingV2({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const app = getApp(slug)
  const t = getAppV2Theme(slug)
  if (!app || !t) notFound()

  const proPrice = app.pro.split(' — ')[0]
  const proFeatures = app.pro.split(' — ')[1] || ''

  const pageStyle = {
    background: t.bg,
    color: t.text,
    fontFamily: t.fontBody,
    minHeight: '100vh',
    overflowX: 'hidden' as const,
  }

  return (
    <>
      {/* Font import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('${t.fontImport}');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .v2-fadein { animation: fadeUp 0.6s ease forwards; }
        .v2-fadein-2 { animation: fadeUp 0.6s 0.15s ease both; }
        .v2-fadein-3 { animation: fadeUp 0.6s 0.3s ease both; }
        @keyframes pulse-slow { 0%,100%{opacity:0.6} 50%{opacity:1} }
      `}} />

      <div style={pageStyle}>
        {/* ── NAV ─────────────────────────────────────── */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${t.border}`, background: `${t.bg}e0`, backdropFilter: 'blur(16px)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: t.textDim, textDecoration: 'none', fontSize: '0.82rem', fontFamily: t.fontBody }}>
              <ArrowLeft size={14} />
              <span>Labs</span>
            </Link>
            <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: '1rem', color: t.text, letterSpacing: '-0.01em' }}>
              {app.icon} {app.name}
            </span>
            <button style={{ background: t.accent, color: t.accentFg, border: 'none', borderRadius: '6px', padding: '9px 22px', fontFamily: t.fontBody, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', letterSpacing: '0.02em' }}>
              Gratis →
            </button>
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────── */}
        <section style={{ paddingTop: '60px', position: 'relative', ...( t.bgEffectCSS ? { backgroundImage: 'var(--bg-effect)' } : {}) }}>
          {t.bgEffectCSS && (
            <style dangerouslySetInnerHTML={{ __html: `
              section:first-of-type { background-image: ${t.bgEffectCSS.match(/background-image:\s*([^;]+);?/)?.[1] || 'none'} !important; }
            `}} />
          )}
          {/* overlay gradient from bg color at edges */}
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${t.accent}12 0%, transparent 60%)`, pointerEvents: 'none' }} />
          <div className="v2-fadein" style={{ position: 'relative', zIndex: 1 }}>
            {t.heroLayout === 'editorial-left' && <HeroEditorialLeft app={app} t={t} />}
            {t.heroLayout === 'centered-xl' && <HeroCenteredXL app={app} t={t} />}
            {t.heroLayout === 'split-reverse' && <HeroSplitReverse app={app} t={t} />}
            {t.heroLayout === 'terminal' && <HeroTerminal app={app} t={t} />}
            {t.heroLayout === 'magazine-grid' && <HeroMagazineGrid app={app} t={t} />}
          </div>
        </section>

        {/* ── DIVIDER LINE ─────────────────────────────── */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${t.accent}60, transparent)` }} />

        {/* ── CÓMO FUNCIONA ────────────────────────────── */}
        <section style={{ background: t.bgAlt, padding: '7rem 1.25rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '4rem' }}>
              <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: t.accent, display: 'block', marginBottom: '1rem' }}>
                Proceso
              </span>
              <h2 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: t.text, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Tres pasos.
                <br />
                <em style={{ fontStyle: 'italic', color: t.accent }}>Sin fricción.</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: t.border }}>
              {app.steps.map((step, i) => (
                <div key={i} style={{ background: t.bg, padding: '2.5rem', position: 'relative' }}>
                  <div style={{ fontFamily: t.fontMono || t.fontDisplay, fontSize: '4rem', fontWeight: 900, color: `${t.accent}25`, lineHeight: 1, marginBottom: '1.5rem', userSelect: 'none' }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ fontFamily: t.fontDisplay, fontSize: '1.25rem', fontWeight: 700, color: t.text, marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: t.fontBody, fontSize: '0.9rem', color: t.textMuted, lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                  {i < app.steps.length - 1 && (
                    <ArrowRight size={16} style={{ position: 'absolute', right: '-9px', top: '50%', transform: 'translateY(-50%)', color: t.accent, display: 'none' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS — editorial 2-col ─────────────── */}
        <section style={{ padding: '7rem 1.25rem', background: t.bg }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
              <div style={{ position: 'sticky', top: '100px' }}>
                <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: t.accent, display: 'block', marginBottom: '1rem' }}>
                  Lo que cambia
                </span>
                <h2 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: t.text, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  En tu trabajo,<br />cada día.
                </h2>
                <div style={{ width: '40px', height: '3px', background: t.accent, marginTop: '2rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0', borderTop: `1px solid ${t.border}` }}>
                {app.benefits.map((b, i) => (
                  <div key={i} style={{ padding: '2rem 1.5rem', borderBottom: `1px solid ${t.border}`, borderRight: i % 2 === 0 ? `1px solid ${t.border}` : 'none' }}>
                    <div style={{ width: '28px', height: '2px', background: t.accent, marginBottom: '1.25rem' }} />
                    <h3 style={{ fontFamily: t.fontDisplay, fontSize: '1rem', fontWeight: 700, color: t.text, marginBottom: '0.6rem', lineHeight: 1.3 }}>
                      {b.title}
                    </h3>
                    <p style={{ fontFamily: t.fontBody, fontSize: '0.85rem', color: t.textMuted, lineHeight: 1.7 }}>
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS — large pull quotes ──────────── */}
        <section style={{ background: t.bgAlt, padding: '7rem 1.25rem', borderTop: `1px solid ${t.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: t.accent }}>
                Testimonios
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {app.testimonials.map((testi, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr auto', gap: '2rem', alignItems: 'start', padding: '2.5rem 0', borderBottom: `1px solid ${t.border}` }}>
                  {/* avatar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.25rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `${t.accent}20`, border: `1px solid ${t.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontWeight: 700, color: t.accent, fontSize: '1.1rem' }}>
                      {testi.name.charAt(0)}
                    </div>
                    <div style={{ fontFamily: t.fontBody, fontSize: '0.78rem', color: t.text, fontWeight: 600 }}>{testi.name}</div>
                    <div style={{ fontFamily: t.fontBody, fontSize: '0.72rem', color: t.textDim }}>{testi.role}</div>
                  </div>
                  {/* quote */}
                  <blockquote style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', color: t.text, lineHeight: 1.5, fontWeight: 400 }}>
                    &ldquo;{testi.quote}&rdquo;
                  </blockquote>
                  {/* stars */}
                  <div style={{ display: 'flex', gap: '3px', paddingTop: '0.5rem' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={12} fill={t.accent} stroke="none" style={{ color: t.accent }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────── */}
        <section style={{ padding: '7rem 1.25rem', background: t.bg }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: t.accent, display: 'block', marginBottom: '1rem' }}>
                Inversión
              </span>
              <h2 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>
                Empezá gratis. Escalá cuando quieras.
              </h2>
              <p style={{ fontFamily: t.fontBody, color: t.textMuted, marginTop: '1rem', fontSize: '0.9rem' }}>
                Plan Pro: <strong style={{ color: t.accent }}>{app.dailyCost}</strong> — menos que lo que perdés sin esto.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: t.border }}>
              {/* Free */}
              <div style={{ background: t.bg, padding: '3rem' }}>
                <div style={{ fontFamily: t.fontBody, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.textDim, marginBottom: '1.5rem' }}>Gratis</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: '3.5rem', fontWeight: 900, color: t.text, lineHeight: 1, marginBottom: '0.5rem' }}>$0</div>
                <div style={{ fontFamily: t.fontBody, fontSize: '0.8rem', color: t.textDim, marginBottom: '2.5rem' }}>Para empezar sin riesgo</div>
                <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {app.free.split(' · ').map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `1px solid ${t.borderStrong}`, flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={10} style={{ color: t.textDim }} />
                      </div>
                      <span style={{ fontFamily: t.fontBody, fontSize: '0.85rem', color: t.textMuted }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', padding: '14px', border: `1px solid ${t.borderStrong}`, background: 'transparent', color: t.textMuted, fontFamily: t.fontBody, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.02em' }}>
                  Empezar gratis
                </button>
              </div>
              {/* Pro */}
              <div style={{ background: t.accent, padding: '3rem', position: 'relative' }}>
                <div style={{ fontFamily: t.fontBody, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.accentFg, opacity: 0.7, marginBottom: '1.5rem' }}>Pro · Más popular</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: '3.5rem', fontWeight: 900, color: t.accentFg, lineHeight: 1, marginBottom: '0.5rem' }}>{proPrice}</div>
                <div style={{ fontFamily: t.fontBody, fontSize: '0.8rem', color: t.accentFg, opacity: 0.7, marginBottom: '2.5rem' }}>Por mes · cancelá cuando quieras</div>
                <div style={{ borderTop: `1px solid ${t.accentFg}30`, paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {proFeatures.split(' + ').map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <CheckCircle size={16} style={{ color: t.accentFg, flexShrink: 0, marginTop: '1px' }} />
                      <span style={{ fontFamily: t.fontBody, fontSize: '0.85rem', color: t.accentFg }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', padding: '14px', background: t.accentFg, color: t.bg, fontFamily: t.fontBody, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none', letterSpacing: '0.02em' }}>
                  Empezar con Pro →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <section style={{ background: t.bgAlt, padding: '7rem 1.25rem', borderTop: `1px solid ${t.border}` }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '4rem' }}>
              <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: t.accent, display: 'block', marginBottom: '1rem' }}>
                Preguntas
              </span>
              <h2 style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>
                Lo que suelen preguntar
              </h2>
            </div>
            <div style={{ borderTop: `1px solid ${t.border}` }}>
              {app.faqs.map((faq, i) => (
                <details key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <summary style={{ padding: '1.75rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '1rem' }}>
                    <span style={{ fontFamily: t.fontDisplay, fontSize: '1rem', fontWeight: 600, color: t.text, lineHeight: 1.4 }}>{faq.q}</span>
                    <ChevronDown size={16} style={{ color: t.accent, flexShrink: 0 }} />
                  </summary>
                  <p style={{ paddingBottom: '1.75rem', fontFamily: t.fontBody, fontSize: '0.9rem', color: t.textMuted, lineHeight: 1.8 }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ──────────────────────────────── */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '8rem 1.25rem', background: t.bg, borderTop: `1px solid ${t.border}` }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 70% at 50% 100%, ${t.accent}18, transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, color: t.text, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              {app.closingLine.split('. ').map((sentence, i) => (
                <div key={i} style={{ color: i === 1 ? t.accent : t.text }}>{sentence}{i < app.closingLine.split('. ').length - 1 ? '.' : ''}</div>
              ))}
            </div>
            <p style={{ fontFamily: t.fontBody, color: t.textMuted, fontSize: '0.95rem', marginBottom: '3rem', lineHeight: 1.7 }}>
              Empezá gratis — {app.free}.<br />Sin tarjeta de crédito.
            </p>
            <button style={{ background: t.accent, color: t.accentFg, padding: '18px 50px', fontFamily: t.fontDisplay, fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em', border: 'none', cursor: 'pointer' }}>
              Crear cuenta gratis
            </button>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────── */}
        <footer style={{ borderTop: `1px solid ${t.border}`, padding: '2rem 1.25rem', background: t.bg }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: t.fontBody, fontSize: '0.85rem' }}>
              <span>{app.icon}</span>
              <span style={{ fontWeight: 700, color: t.text }}>{app.name}</span>
              <span style={{ color: t.textDim }}>·</span>
              <span style={{ color: t.textDim }}>Punto Indigo</span>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontFamily: t.fontBody, fontSize: '0.8rem' }}>
              <Link href={`/${slug}`} style={{ color: t.textDim, textDecoration: 'none' }}>Ver versión anterior</Link>
              <Link href="/" style={{ color: t.textDim, textDecoration: 'none' }}>← Todas las ideas</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
