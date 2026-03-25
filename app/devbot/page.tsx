'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

type BotStatus = 'running' | 'done' | 'error' | 'stopped' | 'waiting'

type Bot = {
  id: string
  project: string
  task: string
  status: BotStatus
  phase?: string
  startedAt: number
  endedAt?: number
  logs?: string[]
  sessionId?: string
}

type Project = {
  name: string
  path: string
}

const STATUS_COLOR: Record<BotStatus, string> = {
  running: '#c8f135',
  done: '#22c55e',
  error: '#ef4444',
  stopped: '#6b7280',
  waiting: '#f59e0b',
}

const STATUS_LABEL: Record<BotStatus, string> = {
  running: 'Corriendo',
  done: 'Listo',
  error: 'Error',
  stopped: 'Detenido',
  waiting: 'Esperando',
}

function elapsed(ms: number) {
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ${s % 60}s`
  return `${Math.floor(m / 60)}h ${m % 60}m`
}

export default function DevbotPage() {
  const [serverUrl, setServerUrl] = useState('http://localhost:3333')
  const [editingUrl, setEditingUrl] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [bots, setBots] = useState<Bot[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedBot, setSelectedBot] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalProject, setModalProject] = useState('')
  const [modalNewProject, setModalNewProject] = useState('')
  const [modalTask, setModalTask] = useState('')
  const [launching, setLaunching] = useState(false)
  const [modalError, setModalError] = useState('')
  const [now, setNow] = useState(Date.now())
  const [copied, setCopied] = useState(false)
  const [retrying, setRetrying] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Persist server URL
  useEffect(() => {
    const saved = localStorage.getItem('devbot-server-url')
    if (saved) setServerUrl(saved)
  }, [])

  // Tick for elapsed time
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const fetchBots = useCallback(async (url: string) => {
    try {
      const res = await fetch(`${url}/api/bots`)
      if (!res.ok) return
      const data: Bot[] = await res.json()
      setBots(data)
    } catch { /* ignore */ }
  }, [])

  const fetchProjects = useCallback(async (url: string) => {
    try {
      const res = await fetch(`${url}/api/projects`)
      if (!res.ok) return
      const data: Project[] = await res.json()
      setProjects(data)
    } catch { /* ignore */ }
  }, [])

  const connect = useCallback((url: string) => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setConnected(false)

    const wsUrl = url.replace(/^http/, 'ws')
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
      fetchBots(url)
      fetchProjects(url)
    }

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        if (msg.type === 'log' || msg.type === 'done' || msg.type === 'error' || msg.type === 'deploy') {
          setBots((prev) =>
            prev.map((b) => {
              if (b.id !== msg.botId) return b
              const logs = [...(b.logs ?? []), msg.data]
              const status: BotStatus =
                msg.type === 'done' ? 'done'
                : msg.type === 'error' ? 'error'
                : b.status
              return { ...b, logs, status, endedAt: msg.type === 'done' || msg.type === 'error' ? Date.now() : b.endedAt }
            })
          )
        }
        if (msg.type === 'started') {
          fetchBots(url)
        }
      } catch { /* ignore */ }
    }

    ws.onclose = () => {
      setConnected(false)
      wsRef.current = null
      // Auto-retry every 5s while disconnected
      retryTimerRef.current = setTimeout(() => connect(url), 5000)
    }

    ws.onerror = () => {
      setConnected(false)
    }
  }, [fetchBots, fetchProjects])

  // Clear retry timer on unmount
  useEffect(() => {
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current)
    }
  }, [])

  // Initial connect
  useEffect(() => {
    connect(serverUrl)
    return () => { wsRef.current?.close() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveUrl() {
    const trimmed = urlInput.trim().replace(/\/$/, '')
    if (!trimmed) return
    setServerUrl(trimmed)
    localStorage.setItem('devbot-server-url', trimmed)
    setEditingUrl(false)
    connect(trimmed)
    fetchProjects(trimmed)
  }

  async function launchBot() {
    setModalError('')
    const projectPath = modalProject === '__new__'
      ? undefined
      : projects.find((p) => p.name === modalProject)?.path
    const newProjectName = modalProject === '__new__' ? modalNewProject.trim() : undefined
    const task = modalTask.trim()

    if (!task) { setModalError('Escribí la tarea.'); return }
    if (modalProject === '__new__' && !newProjectName) { setModalError('Escribí el nombre del nuevo proyecto.'); return }
    if (!projectPath && modalProject !== '__new__') { setModalError('Seleccioná un proyecto.'); return }

    setLaunching(true)
    try {
      if (modalProject === '__new__' && newProjectName) {
        const createRes = await fetch(`${serverUrl}/api/projects/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newProjectName }),
        })
        if (!createRes.ok) { setModalError('No se pudo crear el proyecto.'); setLaunching(false); return }
        const created = await createRes.json()
        await fetch(`${serverUrl}/api/bots/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectPath: created.path, task }),
        })
      } else {
        await fetch(`${serverUrl}/api/bots/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectPath, task }),
        })
      }
      setShowModal(false)
      setModalTask('')
      setModalProject('')
      setModalNewProject('')
      fetchBots(serverUrl)
    } catch {
      setModalError('No se pudo conectar al servidor.')
    } finally {
      setLaunching(false)
    }
  }

  async function stopBot(id: string) {
    await fetch(`${serverUrl}/api/bots/${id}/stop`, { method: 'POST' })
    fetchBots(serverUrl)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'monospace' }}>

      {/* Header */}
      <header className="border-b border-white/10 px-4 py-4 flex items-center gap-4">
        <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm">
          ← Labs
        </Link>
        <h1 className="font-bold text-lg flex-1">Devbots</h1>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: connected ? '#22c55e' : '#ef4444' }}
          />
          {editingUrl ? (
            <div className="flex gap-2 items-center">
              <input
                className="bg-white/5 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none w-52"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveUrl()}
                autoFocus
                placeholder="http://localhost:3000"
              />
              <button onClick={saveUrl} className="text-xs text-[#c8f135] hover:opacity-80">OK</button>
              <button onClick={() => setEditingUrl(false)} className="text-xs text-white/40 hover:text-white">✕</button>
            </div>
          ) : (
            <button
              onClick={() => { setUrlInput(serverUrl); setEditingUrl(true) }}
              className="text-xs text-white/40 hover:text-white transition-colors font-mono"
            >
              {serverUrl.replace('http://', '')}
            </button>
          )}
        </div>
      </header>

      {/* Offline panel */}
      {!connected && (
        <div className="max-w-3xl mx-auto px-4 mt-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <h2 className="font-bold">Servidor no encontrado</h2>
            </div>
            <p className="text-white/50 text-sm mb-5">
              El devbot no está corriendo en <code className="font-mono text-white/70">{serverUrl}</code>.
              Inicialo en la terminal y la página se va a conectar automáticamente.
            </p>

            {/* Start command */}
            <div className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white/80 flex items-center justify-between gap-4 mb-4">
              <span className="truncate">
                cd C:\Users\Ema\Documents\projects\devbot-orchestrator &amp;&amp; node server.js
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    'cd C:\\Users\\Ema\\Documents\\projects\\devbot-orchestrator && node server.js'
                  )
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors flex-shrink-0"
              >
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setRetrying(true)
                  if (retryTimerRef.current) clearTimeout(retryTimerRef.current)
                  connect(serverUrl)
                  setTimeout(() => setRetrying(false), 2000)
                }}
                className="text-sm px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                {retrying ? 'Reintentando...' : 'Reintentar ahora'}
              </button>
              <span className="text-xs text-white/30">
                Reintentando automáticamente cada 5 segundos
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 py-8">

        {/* Bot list */}
        {bots.length === 0 ? (
          <div className="text-center text-white/30 py-16">
            {connected ? 'Ningún bot activo. Presioná + para lanzar una tarea.' : 'Esperando conexión...'}
          </div>
        ) : (
          <div className="space-y-3">
            {bots.map((bot) => (
              <div
                key={bot.id}
                className="bg-[#111] rounded-xl border border-white/5 overflow-hidden cursor-pointer hover:border-white/15 transition-all"
                onClick={() => setSelectedBot(selectedBot === bot.id ? null : bot.id)}
              >
                <div className="p-4 flex items-start gap-3">
                  <span
                    className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: STATUS_COLOR[bot.status] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-white/40 font-mono">{bot.project}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ backgroundColor: `${STATUS_COLOR[bot.status]}20`, color: STATUS_COLOR[bot.status] }}
                      >
                        {STATUS_LABEL[bot.status]}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 truncate">{bot.task}</p>
                    {bot.phase && (
                      <p className="text-xs text-white/30 mt-0.5 font-mono">{bot.phase}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-white/30 font-mono">
                      {elapsed(now - bot.startedAt)}
                    </span>
                    {bot.status === 'running' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); stopBot(bot.id) }}
                        className="text-xs px-2 py-1 rounded border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
                      >
                        Detener
                      </button>
                    )}
                  </div>
                </div>

                {/* Logs panel */}
                {selectedBot === bot.id && (
                  <div className="border-t border-white/5 bg-black/30 p-4">
                    <div className="text-xs text-white/30 mb-2 font-mono">— logs —</div>
                    {(bot.logs?.length ?? 0) === 0 ? (
                      <p className="text-xs text-white/20 font-mono">Sin logs todavía...</p>
                    ) : (
                      <pre className="text-xs text-white/60 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
                        {(bot.logs ?? []).join('\n')}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => { setShowModal(true); setModalError('') }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-2xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#c8f135', color: '#0a0a0a' }}
        aria-label="Nueva tarea"
      >
        +
      </button>

      {/* Modal nueva tarea */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-[#111] rounded-2xl border border-white/10 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">Nueva tarea</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white text-xl leading-none"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Proyecto</label>
                <select
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                  value={modalProject}
                  onChange={(e) => setModalProject(e.target.value)}
                >
                  <option value="">— Seleccioná —</option>
                  {projects.map((p) => (
                    <option key={p.path} value={p.name}>{p.name}</option>
                  ))}
                  <option value="__new__">+ Nuevo proyecto</option>
                </select>
              </div>

              {modalProject === '__new__' && (
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Nombre del proyecto</label>
                  <input
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 font-mono"
                    placeholder="mi-proyecto"
                    value={modalNewProject}
                    onChange={(e) => setModalNewProject(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-white/50 mb-1 block">Tarea</label>
                <textarea
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 resize-none"
                  rows={5}
                  placeholder="Describí la tarea en lenguaje natural. Ej: Agregá un endpoint /api/health que devuelva { ok: true }"
                  value={modalTask}
                  onChange={(e) => setModalTask(e.target.value)}
                />
              </div>

              {modalError && (
                <p className="text-xs text-[#ef4444]">{modalError}</p>
              )}

              <button
                onClick={launchBot}
                disabled={launching}
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                style={{ backgroundColor: '#c8f135', color: '#0a0a0a' }}
              >
                {launching ? 'Lanzando...' : 'Lanzar bot'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
