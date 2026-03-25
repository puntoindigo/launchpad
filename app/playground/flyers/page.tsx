'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

type Format = { label: string; w: number; h: number }
type Palette = { bg: string; accent: string; text: string; sub: string }

const FORMATS: Format[] = [
  { label: 'Post cuadrado', w: 1080, h: 1080 },
  { label: 'Story / Reels', w: 1080, h: 1920 },
  { label: 'Banner web', w: 1200, h: 628 },
  { label: 'Portada LinkedIn', w: 1584, h: 396 },
]

const PALETTES: Palette[] = [
  { bg: '#0a0a0a', accent: '#c8f135', text: '#ffffff', sub: '#aaaaaa' },
  { bg: '#1a1a2e', accent: '#e94560', text: '#eaeaea', sub: '#888899' },
  { bg: '#ffffff', accent: '#3b82f6', text: '#0a0a0a', sub: '#555555' },
  { bg: '#0f172a', accent: '#a855f7', text: '#f1f5f9', sub: '#94a3b8' },
  { bg: '#fafaf0', accent: '#f97316', text: '#1a1a1a', sub: '#666666' },
  { bg: '#0d1117', accent: '#22c55e', text: '#e6edf3', sub: '#7d8590' },
]

const SCALE = 0.4 // preview scale

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY)
      line = words[n] + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  if (line.trim()) ctx.fillText(line.trim(), x, currentY)
  return currentY
}

export default function FlyerPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [formatIdx, setFormatIdx] = useState(0)
  const [paletteIdx, setPaletteIdx] = useState(0)
  const [title, setTitle] = useState('Título principal')
  const [subtitle, setSubtitle] = useState('Subtítulo o descripción breve del contenido')
  const [tag, setTag] = useState('Punto Indigo')
  const [logoText, setLogoText] = useState('PI')

  const fmt = FORMATS[formatIdx]
  const pal = PALETTES[paletteIdx]

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = fmt
    canvas.width = w
    canvas.height = h

    // Background
    ctx.fillStyle = pal.bg
    ctx.fillRect(0, 0, w, h)

    // Accent bar (left)
    ctx.fillStyle = pal.accent
    ctx.fillRect(0, 0, 12, h)

    // Decorative circle
    ctx.fillStyle = pal.accent + '18'
    ctx.beginPath()
    ctx.arc(w - 60, 60, w * 0.35, 0, Math.PI * 2)
    ctx.fill()

    // Logo badge
    const badgeSize = Math.min(w, h) * 0.08
    const badgeX = w - badgeSize - 50
    const badgeY = 50
    ctx.fillStyle = pal.accent
    ctx.beginPath()
    ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeSize * 0.2)
    ctx.fill()
    ctx.fillStyle = pal.bg
    ctx.font = `bold ${badgeSize * 0.45}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(logoText.slice(0, 3), badgeX + badgeSize / 2, badgeY + badgeSize / 2)

    // Tag pill
    const tagFontSize = w * 0.022
    ctx.font = `600 ${tagFontSize}px sans-serif`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    const tagMetrics = ctx.measureText(tag)
    const tagPad = tagFontSize * 1.2
    const tagH = tagFontSize * 2.2
    const tagW = tagMetrics.width + tagPad * 2
    const tagX = 60
    const tagY = h * 0.42
    ctx.fillStyle = pal.accent + '30'
    ctx.beginPath()
    ctx.roundRect(tagX, tagY, tagW, tagH, tagH / 2)
    ctx.fill()
    ctx.fillStyle = pal.accent
    ctx.fillText(tag, tagX + tagPad, tagY + tagH * 0.68)

    // Title
    const titleSize = Math.min(w * 0.072, 96)
    ctx.font = `900 ${titleSize}px sans-serif`
    ctx.fillStyle = pal.text
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    const titleY = tagY + tagH + titleSize * 1.3
    wrapText(ctx, title, 60, titleY, w - 120, titleSize * 1.2)

    // Subtitle
    const subSize = Math.min(w * 0.032, 40)
    ctx.font = `400 ${subSize}px sans-serif`
    ctx.fillStyle = pal.sub
    const subY = titleY + titleSize * 1.2 * Math.ceil(title.length / 20) + subSize * 1.5
    wrapText(ctx, subtitle, 60, subY, w - 120, subSize * 1.5)

    // Bottom accent line
    ctx.fillStyle = pal.accent
    ctx.fillRect(60, h - 60, w * 0.3, 3)

  }, [fmt, pal, title, subtitle, tag, logoText])

  useEffect(() => { draw() }, [draw])

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `flyer-${fmt.label.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-4 py-4 flex items-center gap-4">
        <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm">
          ← Labs
        </Link>
        <h1 className="font-bold text-lg flex-1">Playground · Flyers</h1>
        <button
          onClick={download}
          className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#ec498920', color: '#ec4899' }}
        >
          Descargar PNG
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
        {/* Controls */}
        <aside className="space-y-6">
          {/* Format */}
          <div>
            <label className="text-xs text-white/40 mb-2 block uppercase tracking-wider">Formato</label>
            <div className="grid grid-cols-2 gap-2">
              {FORMATS.map((f, i) => (
                <button
                  key={f.label}
                  onClick={() => setFormatIdx(i)}
                  className="text-xs px-2 py-2 rounded-lg border transition-colors text-left"
                  style={formatIdx === i
                    ? { borderColor: '#ec4899', backgroundColor: '#ec489920', color: '#ec4899' }
                    : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                >
                  <div className="font-medium">{f.label}</div>
                  <div className="text-white/30 mt-0.5" style={{ fontSize: 10 }}>{f.w}×{f.h}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Palette */}
          <div>
            <label className="text-xs text-white/40 mb-2 block uppercase tracking-wider">Paleta</label>
            <div className="flex flex-wrap gap-2">
              {PALETTES.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPaletteIdx(i)}
                  className="w-9 h-9 rounded-lg border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: p.bg,
                    borderColor: paletteIdx === i ? p.accent : 'transparent',
                    boxShadow: paletteIdx === i ? `0 0 0 2px ${p.accent}` : 'none',
                  }}
                  aria-label={`Paleta ${i + 1}`}
                >
                  <span
                    className="block w-3 h-3 rounded-full mx-auto"
                    style={{ backgroundColor: p.accent }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Text inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/40 mb-1 block">Título</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título principal"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">Subtítulo / Descripción</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 resize-none"
                rows={3}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Descripción breve"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">Etiqueta / Categoría</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Punto Indigo"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">Logo (texto / iniciales)</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 font-mono"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="PI"
                maxLength={3}
              />
            </div>
          </div>

          <button
            onClick={download}
            className="w-full py-2.5 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: '#ec4899', color: '#ffffff' }}
          >
            Descargar PNG
          </button>
        </aside>

        {/* Preview */}
        <div className="flex items-start justify-center">
          <div className="relative">
            <div className="text-xs text-white/30 mb-2 text-center">
              Preview — {fmt.w}×{fmt.h}
            </div>
            <div
              className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
              style={{
                width: fmt.w * SCALE,
                height: fmt.h * SCALE,
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: fmt.w * SCALE,
                  height: fmt.h * SCALE,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
