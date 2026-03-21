import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CheckCircle,
  XCircle,
  Mic,
  BarChart2,
  FileText,
  Shield,
  Download,
  Bell,
  Users,
  Clock,
  Zap,
  Star,
  TrendingUp,
  BookOpen,
  Calendar,
  Layout,
  Send,
  Moon,
  Music,
  Timer,
  Brain,
  Award,
  Briefcase,
} from 'lucide-react'
import { apps, getApp } from '@/lib/apps'

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }))
}

const featureIcons = [Zap, Star, Shield, Download, Clock, BarChart2, Bell, Users, TrendingUp, BookOpen, Calendar, Layout, Send, Moon, Music, Timer, Brain, Award, Briefcase, FileText]

function FeatureIcon({ index }: { index: number }) {
  const Icon = featureIcons[index % featureIcons.length]
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{app.icon}</span>
            <span className="font-semibold">{app.name}</span>
            <span
              className="hidden sm:inline text-xs px-2 py-0.5 rounded-full ml-1"
              style={{ backgroundColor: `${app.color}25`, color: app.color }}
            >
              {app.category}
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1"
          >
            ← Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative px-4 py-24 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${app.color}18 0%, transparent 70%)`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-6xl mb-6 block">{app.icon}</span>

          <span
            className="inline-block text-xs px-3 py-1 rounded-full font-medium mb-4"
            style={{ backgroundColor: `${app.color}20`, color: app.color }}
          >
            {app.category}
          </span>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            {app.name}
          </h1>

          <p
            className="text-2xl sm:text-3xl font-semibold mb-4"
            style={{ color: app.color }}
          >
            {app.tagline}
          </p>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {app.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-8 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: app.color, color: '#000' }}
            >
              Empezar gratis
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-base border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all">
              Ver planes
            </button>
          </div>

          <p className="text-white/30 text-sm mt-4">
            Gratis: {app.free}
          </p>
        </div>
      </section>

      {/* Problema */}
      <section className="px-4 py-20 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <h2 className="text-2xl font-bold">El problema</h2>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
            <p className="text-white/70 text-lg leading-relaxed">
              {app.problem}
            </p>
          </div>
        </div>
      </section>

      {/* Solución */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <h2 className="text-2xl font-bold">La solución</h2>
          </div>
          <div
            className="rounded-2xl p-8 border"
            style={{
              backgroundColor: `${app.color}08`,
              borderColor: `${app.color}30`,
            }}
          >
            <p className="text-white/80 text-lg leading-relaxed">
              {app.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">
            Todo lo que incluye
          </h2>
          <p className="text-white/40 text-center mb-12">
            Diseñado para {app.audience.toLowerCase()}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#111] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${app.color}20`, color: app.color }}
                >
                  <FeatureIcon index={i} />
                </div>
                <p className="text-white/80 text-sm font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Planes</h2>
          <p className="text-white/40 text-center mb-12">
            Empezá gratis. Escalá cuando lo necesitás.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-[#111] rounded-2xl p-8 border border-white/10">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Gratis</h3>
                <p className="text-4xl font-extrabold">$0</p>
                <p className="text-white/40 text-sm mt-1">Para empezar</p>
              </div>
              <div className="space-y-3 mb-8">
                {app.free.split(' · ').map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <span className="text-white/50 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-xl border border-white/20 text-white/70 font-medium hover:border-white/40 hover:text-white transition-colors text-sm">
                Empezar gratis
              </button>
            </div>

            {/* Pro */}
            <div
              className="rounded-2xl p-8 border-2 relative overflow-hidden"
              style={{ borderColor: app.color, backgroundColor: `${app.color}08` }}
            >
              <div
                className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-semibold"
                style={{ backgroundColor: app.color, color: '#000' }}
              >
                Recomendado
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">Pro</h3>
                <p className="text-4xl font-extrabold">{proPrice}</p>
                <p className="text-white/40 text-sm mt-1">Por usuario/mes</p>
              </div>
              <div className="space-y-3 mb-8">
                {proFeatures.split(' + ').map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: app.color }}
                    />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: app.color, color: '#000' }}
              >
                Empezar con Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        className="px-4 py-24"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${app.color}15 0%, transparent 70%)`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-5xl mb-6 block">{app.icon}</span>
          <h2 className="text-4xl font-extrabold mb-4">
            Empezá gratis hoy
          </h2>
          <p className="text-white/50 mb-8 text-lg">
            {app.free} — sin tarjeta de crédito.
          </p>
          <button
            className="px-10 py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: app.color, color: '#000' }}
          >
            Crear cuenta gratis
          </button>
          <p className="text-white/30 text-sm mt-4">
            Para {app.audience.toLowerCase()}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>{app.icon}</span>
            <span className="font-semibold">{app.name}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/30 text-sm">Un producto de Punto Indigo</span>
          </div>
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ← Ver todas las apps
          </Link>
        </div>
      </footer>
    </div>
  )
}
