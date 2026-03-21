import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle,
  Star,
  ChevronDown,
  Zap,
  Shield,
  Clock,
  BarChart2,
  FileText,
  Download,
  Bell,
  Users,
  TrendingUp,
  BookOpen,
  Calendar,
  Moon,
  Timer,
  Brain,
  Award,
  Briefcase,
  Mic,
  Send,
  Sparkles,
  Lock,
} from 'lucide-react'
import { apps, getApp } from '@/lib/apps'

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }))
}

const benefitIcons = [
  Zap, Clock, Shield, TrendingUp, Brain, Award,
  Briefcase, FileText, Download, Bell, Users, BookOpen,
  Calendar, Moon, Timer, Mic, Send, Sparkles, Lock, BarChart2,
]

function BenefitIcon({ index }: { index: number }) {
  const Icon = benefitIcons[index % benefitIcons.length]
  return <Icon className="w-5 h-5" />
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const app = getApp(slug)
  if (!app) notFound()

  const proPrice = app.pro.split(' — ')[0]
  const proFeatures = app.pro.split(' — ')[1] || ''

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Punto Indigo Labs</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">{app.icon}</span>
            <span className="font-semibold text-sm">{app.name}</span>
          </div>
          <button
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: app.color, color: '#000' }}
          >
            Empezar gratis
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-20 pb-16">
        {/* background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${app.color}22 0%, transparent 65%)`,
          }}
        />
        {/* category pill */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide uppercase"
            style={{ backgroundColor: `${app.color}18`, color: app.color, border: `1px solid ${app.color}35` }}
          >
            {app.icon} {app.category}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-balance">
            {app.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-white/55 max-w-2xl leading-relaxed mb-10">
            {app.heroSubtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: app.color, color: '#000' }}
            >
              Empezar gratis →
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-base border border-white/15 text-white/70 hover:border-white/30 hover:text-white transition-all">
              Ver cómo funciona
            </button>
          </div>

          {/* social proof micro line */}
          <div className="flex items-center gap-2 text-white/35 text-sm">
            <div className="flex -space-x-1">
              {[app.color, '#ffffff', '#888888'].map((c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#080808]"
                  style={{ backgroundColor: `${c}55` }}
                />
              ))}
            </div>
            <span>Usado por {app.stats[1].value} · {app.stats[1].label}</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/20">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-5 py-10 grid grid-cols-3 gap-6">
          {app.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-extrabold mb-1"
                style={{ color: app.color }}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-xs sm:text-sm leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ───────────────────────────────────────── */}
      <section className="px-5 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: app.color }}
          >
            Cómo funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Tres pasos. Sin fricción.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(33%-24px)] right-[calc(33%-24px)] h-px"
            style={{ background: `linear-gradient(90deg, ${app.color}40, ${app.color}40)` }}
          />

          {app.steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#111] border border-white/5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold mb-5 relative z-10"
                style={{ backgroundColor: `${app.color}20`, color: app.color, border: `2px solid ${app.color}40` }}
              >
                {i + 1}
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFICIOS ──────────────────────────────────────────── */}
      <section className="px-5 py-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: app.color }}
            >
              Lo que cambia
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              En tu trabajo, en tu día a día
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.benefits.map((benefit, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-0.5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: `${app.color}18`, color: app.color }}
                >
                  <BenefitIcon index={i} />
                </div>
                <h3 className="font-semibold text-sm mb-2 text-white/90">{benefit.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ─────────────────────────────────────────── */}
      <section className="px-5 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: app.color }}
          >
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Lo que dicen quienes ya lo usan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {app.testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#111] border border-white/5 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-current"
                    style={{ color: app.color }}
                  />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: `${app.color}25`, color: app.color }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/85">{t.name}</div>
                  <div className="text-xs text-white/35">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <section className="px-5 py-24 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: app.color }}
            >
              Precios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Empezá gratis. Escalá cuando quieras.
            </h2>
            <p className="text-white/40 text-sm">
              Plan Pro: <span style={{ color: app.color }}>{app.dailyCost}</span>
              {' '}— menos que lo que perdés sin esto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-[#111] border border-white/8">
              <div className="mb-8">
                <span className="text-xs text-white/30 uppercase tracking-wide font-medium">Gratis</span>
                <div className="text-4xl font-extrabold mt-2">$0</div>
                <div className="text-white/35 text-sm mt-1">Para empezar sin riesgos</div>
              </div>
              <div className="space-y-3 mb-8">
                {app.free.split(' · ').map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-white/25 mt-0.5 flex-shrink-0" />
                    <span className="text-white/45 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3.5 rounded-xl border border-white/12 text-white/60 font-semibold text-sm hover:border-white/25 hover:text-white/80 transition-all">
                Empezar gratis
              </button>
            </div>

            {/* Pro */}
            <div
              className="p-8 rounded-2xl border-2 relative overflow-hidden"
              style={{
                borderColor: `${app.color}60`,
                background: `linear-gradient(135deg, ${app.color}0a 0%, ${app.color}04 100%)`,
              }}
            >
              <div
                className="absolute top-0 right-0 text-xs font-bold px-3 py-1.5 rounded-bl-xl"
                style={{ backgroundColor: app.color, color: '#000' }}
              >
                Más popular
              </div>
              <div className="mb-8">
                <span className="text-xs uppercase tracking-wide font-medium" style={{ color: app.color }}>Pro</span>
                <div className="text-4xl font-extrabold mt-2">{proPrice}</div>
                <div className="text-white/35 text-sm mt-1">Por mes · cancelá cuando quieras</div>
              </div>
              <div className="space-y-3 mb-8">
                {proFeatures.split(' + ').map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: app.color }}
                    />
                    <span className="text-white/75 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: app.color, color: '#000' }}
              >
                Empezar con Pro →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="px-5 py-24 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: app.color }}
          >
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">Preguntas frecuentes</h2>
        </div>

        <div className="space-y-3">
          {app.faqs.map((faq, i) => (
            <details
              key={i}
              className="group p-6 rounded-2xl bg-[#111] border border-white/5 cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-4 list-none">
                <span className="font-semibold text-sm text-white/85">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────── */}
      <section className="px-5 py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 50% 110%, ${app.color}20 0%, transparent 65%)`,
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="text-5xl mb-6 block">{app.icon}</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            {app.closingLine}
          </h2>
          <p className="text-white/45 mb-10 text-lg">
            Empezá con el plan gratis — {app.free}.
            <br />
            Sin tarjeta de crédito.
          </p>
          <button
            className="px-12 py-5 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: app.color, color: '#000' }}
          >
            Crear cuenta gratis
          </button>
          <p className="text-white/25 text-sm mt-5">
            Para {app.audience.toLowerCase()}
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 px-5 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>{app.icon}</span>
            <span className="font-semibold">{app.name}</span>
            <span className="text-white/20">·</span>
            <span className="text-white/30">Un producto de Punto Indigo</span>
          </div>
          <Link
            href="/"
            className="text-sm text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Ver todas las ideas
          </Link>
        </div>
      </footer>
    </div>
  )
}
