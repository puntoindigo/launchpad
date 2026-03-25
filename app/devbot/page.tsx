'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// ── Types ────────────────────────────────────────────────────────────────────

type BotStatus = 'iniciando' | 'corriendo' | 'completado' | 'detenido' | 'error'

type Bot = {
  id: string
  name: string
  projectPath: string
  task: string
  status: BotStatus
  phase?: string
  startTime: string
  endTime?: string
  closed: boolean
  logCount: number
  resumable: boolean
  sessionId: string | null
  parentBotId: string | null
}

type Project = { name: string; path: string }
type Config  = { nombre?: string; telefono?: string }

// ── Log parsing ──────────────────────────────────────────────────────────────

type ParsedLine =
  | { kind: 'init';       tools: string[]; sessionId: string }
  | { kind: 'thinking';   text: string }
  | { kind: 'text';       text: string }
  | { kind: 'tool_call';  name: string; input: Record<string, unknown> }
  | { kind: 'tool_result'; name: string; content: string; isError: boolean }
  | { kind: 'result';     text: string; isError: boolean }
  | { kind: 'done' }
  | { kind: 'error';      text: string }
  | { kind: 'log';        text: string }
  | { kind: 'stderr';     text: string }
  | { kind: 'skip' }

function parseLine(raw: string): ParsedLine {
  // Format: [ISO] [eventType] data
  const m = raw.match(/^\[([^\]]+)\] \[([^\]]+)\] ([\s\S]*)$/)
  if (!m) return { kind: 'log', text: raw }
  const [, , evType, data] = m

  if (evType === 'done') return { kind: 'done' }
  if (evType === 'error') return { kind: 'error', text: data }

  // stderr
  if (data.startsWith('[stderr]')) {
    const text = data.replace(/^\[stderr\]\s*/, '')
    if (text.includes('no stdin data received')) return { kind: 'skip' }
    return { kind: 'stderr', text }
  }

  // Try Claude stream-json
  if (data.startsWith('{')) {
    try {
      const j = JSON.parse(data)

      // System init
      if (j.type === 'system' && j.subtype === 'init') {
        return { kind: 'init', tools: j.tools ?? [], sessionId: j.session_id ?? '' }
      }

      // Rate limit / misc — skip
      if (j.type === 'rate_limit_event') return { kind: 'skip' }

      // Assistant message
      if (j.type === 'assistant' && Array.isArray(j.message?.content)) {
        // Return the FIRST meaningful block; caller will see multiple lines for same msg
        for (const block of j.message.content) {
          if (block.type === 'thinking' && block.thinking)
            return { kind: 'thinking', text: block.thinking }
          if (block.type === 'text' && block.text)
            return { kind: 'text', text: block.text }
          if (block.type === 'tool_use')
            return { kind: 'tool_call', name: block.name ?? '', input: block.input ?? {} }
        }
        return { kind: 'skip' }
      }

      // Tool result (user message wrapping tool results)
      if (j.type === 'user' && Array.isArray(j.message?.content)) {
        for (const block of j.message.content) {
          if (block.type === 'tool_result') {
            const content = Array.isArray(block.content)
              ? block.content.map((c: { text?: string }) => c.text ?? '').join('\n')
              : (block.content ?? '')
            return { kind: 'tool_result', name: '', content, isError: !!block.is_error }
          }
        }
        return { kind: 'skip' }
      }

      // Final result
      if (j.type === 'result') {
        return { kind: 'result', text: j.result ?? '', isError: j.is_error ?? false }
      }

      return { kind: 'skip' }
    } catch { /* not JSON */ }
  }

  // Plain log line
  return { kind: 'log', text: data }
}

// ── Log renderer ─────────────────────────────────────────────────────────────

const TOOL_ICON: Record<string, string> = {
  Bash: '$ ', Read: '📄', Write: '✏️', Edit: '✏️', Glob: '🔍',
  Grep: '🔍', WebFetch: '🌐', WebSearch: '🌐', Task: '🤖',
  TodoWrite: '📋', default: '🔧',
}

function ToolCallCard({ name, input }: { name: string; input: Record<string, unknown> }) {
  const [open, setOpen] = useState(false)
  const icon = TOOL_ICON[name] ?? TOOL_ICON.default
  // Show the most relevant input field inline
  const preview =
    (input.command as string) ??
    (input.file_path as string) ??
    (input.pattern as string) ??
    (input.query as string) ??
    (input.url as string) ??
    JSON.stringify(input).slice(0, 80)

  return (
    <div className="my-1">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-start gap-2 text-left w-full group"
      >
        <span className="text-white/30 font-mono text-xs mt-0.5 flex-shrink-0">{icon}</span>
        <span className="text-xs font-mono">
          <span className="text-[#c8f135]/80">{name}</span>
          <span className="text-white/30 ml-1 group-hover:text-white/50 transition-colors">
            {String(preview).slice(0, 100)}{String(preview).length > 100 ? '…' : ''}
          </span>
        </span>
        <span className="text-white/20 text-xs ml-auto flex-shrink-0">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <pre className="mt-1 ml-5 text-xs font-mono text-white/40 bg-black/20 rounded p-2 overflow-x-auto">
          {JSON.stringify(input, null, 2)}
        </pre>
      )}
    </div>
  )
}

function ToolResultCard({ content, isError }: { content: string; isError: boolean }) {
  const [open, setOpen] = useState(false)
  const lines = content.split('\n')
  const preview = lines.slice(0, 2).join('\n')
  const truncated = lines.length > 2 || content.length > 120

  return (
    <div className="my-1 ml-4 border-l-2 border-white/10 pl-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-left w-full"
        disabled={!truncated}
      >
        <pre className={`text-xs font-mono whitespace-pre-wrap ${isError ? 'text-[#ef4444]/70' : 'text-white/30'}`}>
          {open ? content : preview}
          {!open && truncated && <span className="text-white/20"> … [{lines.length} líneas]</span>}
        </pre>
      </button>
    </div>
  )
}

function ThinkingBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="my-1">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-white/25 hover:text-white/40 transition-colors"
      >
        <span className="text-xs italic">🤔 pensando…</span>
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <pre className="mt-1 ml-4 text-xs font-mono text-white/25 italic whitespace-pre-wrap bg-black/10 rounded p-2 max-h-40 overflow-y-auto">
          {text}
        </pre>
      )}
    </div>
  )
}

function LogView({ rawLogs }: { rawLogs: string[] }) {
  // Deduplicate: Claude streams the same assistant message multiple times as it grows.
  // We only want the LAST version of each message ID.
  // Strategy: group consecutive assistant lines with same msg ID, keep last.
  const parsed = rawLogs.map(parseLine)

  return (
    <div className="space-y-0.5">
      {parsed.map((line, i) => {
        switch (line.kind) {
          case 'skip':
            return null

          case 'init':
            return (
              <div key={i} className="text-xs text-white/25 font-mono py-1 border-b border-white/5 mb-2">
                🚀 Sesión iniciada · {line.tools.length} herramientas
              </div>
            )

          case 'thinking':
            return <ThinkingBlock key={i} text={line.text} />

          case 'text':
            return (
              <div key={i} className="my-2 text-sm text-white/85 leading-relaxed whitespace-pre-wrap">
                {line.text}
              </div>
            )

          case 'tool_call':
            return <ToolCallCard key={i} name={line.name} input={line.input} />

          case 'tool_result':
            return <ToolResultCard key={i} content={line.content} isError={line.isError} />

          case 'result':
            return line.isError ? null : (
              <div key={i} className="mt-3 p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-sm text-[#22c55e]/90 whitespace-pre-wrap">
                {line.text}
              </div>
            )

          case 'done':
            return (
              <div key={i} className="mt-2 text-xs text-[#22c55e]/60 font-mono flex items-center gap-1">
                ✓ completado
              </div>
            )

          case 'error':
            return (
              <div key={i} className="mt-2 p-2 rounded bg-[#ef4444]/10 border border-[#ef4444]/20 text-xs text-[#ef4444]/80 font-mono">
                {line.text}
              </div>
            )

          case 'stderr':
            return (
              <div key={i} className="text-xs text-[#f59e0b]/50 font-mono">
                ⚠ {line.text}
              </div>
            )

          case 'log':
          default:
            return (
              <div key={i} className="text-xs text-white/25 font-mono">
                {line.text}
              </div>
            )
        }
      })}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function projectName(path: string) {
  return path.replace(/\\/g, '/').split('/').pop() ?? path
}

function elapsed(startIso: string, endIso?: string) {
  const ms = (endIso ? new Date(endIso) : new Date()).getTime() - new Date(startIso).getTime()
  const s  = Math.floor(Math.abs(ms) / 1000)
  if (s < 60)  return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60)  return `${m}m ${s % 60}s`
  return `${Math.floor(m / 60)}h ${m % 60}m`
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}

const STATUS_COLOR: Record<BotStatus, string> = {
  iniciando:  '#f59e0b',
  corriendo:  '#c8f135',
  completado: '#22c55e',
  detenido:   '#6b7280',
  error:      '#ef4444',
}

const STATUS_LABEL: Record<BotStatus, string> = {
  iniciando:  'Iniciando…',
  corriendo:  'Corriendo',
  completado: 'Completado',
  detenido:   'Detenido',
  error:      'Error',
}

// ── Bot card (fuera del padre para evitar re-mount en cada render) ────────────

type BotCardProps = {
  bot: Bot
  depth?: number
  openId: string | null
  logs: Record<string, string[]>
  loadingLogs: Record<string, boolean>
  logsEndRef: React.RefObject<HTMLDivElement | null>
  children: Record<string, Bot[]>
  replyText: Record<string, string>
  replying: Record<string, boolean>
  onToggle: (id: string) => void
  onStop: (id: string) => void
  onClose: (id: string) => void
  onReplyChange: (id: string, val: string) => void
  onReplySend: (bot: Bot) => void
}

function BotCard({
  bot, depth = 0,
  openId, logs, loadingLogs, logsEndRef, children,
  replyText, replying,
  onToggle, onStop, onClose, onReplyChange, onReplySend,
}: BotCardProps) {
  const isOpen    = openId === bot.id
  const botLogs   = logs[bot.id] ?? []
  const color     = STATUS_COLOR[bot.status] ?? '#888'
  const isRunning = bot.status === 'corriendo' || bot.status === 'iniciando'
  const kids      = children[bot.id] ?? []

  return (
    <div className={depth > 0 ? 'ml-4 mt-2 border-l-2 border-white/10 pl-3' : ''}>
      <div className="bg-[#111] rounded-xl border border-white/5 overflow-hidden transition-all hover:border-white/10">

        {/* Header row */}
        <div
          className="p-4 flex items-start gap-3 cursor-pointer hover:bg-white/[0.02]"
          onClick={() => onToggle(bot.id)}
        >
          {/* Status dot */}
          <div className="mt-1 flex-shrink-0">
            {isRunning ? (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: color }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: color }} />
              </span>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full block" style={{ backgroundColor: color }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-xs font-mono text-white/40">{projectName(bot.projectPath)}</span>
              <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                style={{ backgroundColor: `${color}20`, color }}>
                {STATUS_LABEL[bot.status]}
              </span>
              {bot.resumable && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#c8f135]/10 text-[#c8f135]/70">
                  reanudable
                </span>
              )}
              {bot.parentBotId && (
                <span className="text-xs text-white/25">↳ respuesta</span>
              )}
            </div>
            <p className="text-sm text-white/80 line-clamp-2">{bot.task}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-white/25 font-mono">
              <span>{fmtTime(bot.startTime)}</span>
              <span>·</span>
              <span>{elapsed(bot.startTime, bot.endTime)}</span>
              {bot.logCount > 0 && <><span>·</span><span>{bot.logCount} líneas</span></>}
              {kids.length > 0 && <><span>·</span><span>{kids.length} respuesta{kids.length > 1 ? 's' : ''}</span></>}
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isRunning && (
              <button onClick={e => { e.stopPropagation(); onStop(bot.id) }}
                className="text-xs px-2 py-1 rounded border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors">
                Detener
              </button>
            )}
            {!isRunning && !bot.closed && (
              <button onClick={e => { e.stopPropagation(); onClose(bot.id) }}
                className="text-xs px-2 py-1 rounded border border-white/10 text-white/30 hover:text-white hover:border-white/20 transition-colors">
                Archivar
              </button>
            )}
            <span className="text-white/20 text-sm">{isOpen ? '▲' : '▼'}</span>
          </div>
        </div>

        {/* Expanded panel */}
        {isOpen && (
          <div className="border-t border-white/5">
            <div className="bg-black/40 px-4 py-4 max-h-[480px] overflow-y-auto">
              {loadingLogs[bot.id] ? (
                <p className="text-xs text-white/30 font-mono">Cargando…</p>
              ) : botLogs.length === 0 ? (
                <p className="text-xs text-white/20 font-mono">Sin actividad registrada.</p>
              ) : (
                <>
                  <LogView rawLogs={botLogs} />
                  <div ref={logsEndRef} />
                </>
              )}
            </div>

            <div className="border-t border-white/5 px-4 py-3">
              <div className="flex gap-2 items-start">
                <div className="flex-1">
                  <textarea
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#c8f135]/40 font-mono resize-none"
                    rows={2}
                    placeholder={
                      bot.resumable
                        ? 'Respondé a Claude para continuar esta sesión…'
                        : 'Enviá una nueva tarea en el mismo proyecto con este contexto…'
                    }
                    value={replyText[bot.id] ?? ''}
                    onChange={e => onReplyChange(bot.id, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onReplySend(bot)
                    }}
                  />
                  <p className="text-xs text-white/20 mt-1 font-mono">
                    {bot.resumable
                      ? '⌘/Ctrl+Enter para enviar · Continúa la misma sesión'
                      : '⌘/Ctrl+Enter para enviar · Inicia una nueva tarea con contexto'}
                  </p>
                </div>
                <button
                  onClick={() => onReplySend(bot)}
                  disabled={replying[bot.id] || !(replyText[bot.id] ?? '').trim()}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-30 flex-shrink-0"
                  style={{ backgroundColor: '#c8f135', color: '#0a0a0a' }}
                >
                  {replying[bot.id] ? '…' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {kids.map(kid => (
        <BotCard key={kid.id} bot={kid} depth={depth + 1}
          openId={openId} logs={logs} loadingLogs={loadingLogs}
          logsEndRef={logsEndRef} children={children}
          replyText={replyText} replying={replying}
          onToggle={onToggle} onStop={onStop} onClose={onClose}
          onReplyChange={onReplyChange} onReplySend={onReplySend}
        />
      ))}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DevbotPage() {
  const DEFAULT_URL = 'http://localhost:3333'

  const [serverUrl,   setServerUrl]   = useState(DEFAULT_URL)
  const [editingUrl,  setEditingUrl]  = useState(false)
  const [urlInput,    setUrlInput]    = useState('')
  const [connected,   setConnected]   = useState(false)
  const [copied,      setCopied]      = useState(false)
  const [retrying,    setRetrying]    = useState(false)

  const [bots,        setBots]        = useState<Bot[]>([])
  const [projects,    setProjects]    = useState<Project[]>([])
  const [config,      setConfig]      = useState<Config>({})
  const [showClosed,  setShowClosed]  = useState(false)

  // Selected bot / logs
  const [openId,      setOpenId]      = useState<string | null>(null)
  const [logs,        setLogs]        = useState<Record<string, string[]>>({})
  const [loadingLogs, setLoadingLogs] = useState<Record<string, boolean>>({})
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Reply
  const [replyText,   setReplyText]   = useState<Record<string, string>>({})
  const [replying,    setReplying]    = useState<Record<string, boolean>>({})

  // New task modal
  const [showModal,   setShowModal]   = useState(false)
  const [modalProj,   setModalProj]   = useState('')
  const [modalNew,    setModalNew]    = useState('')
  const [modalTask,   setModalTask]   = useState('')
  const [launching,   setLaunching]   = useState(false)
  const [modalErr,    setModalErr]    = useState('')

  // Profile modal
  const [showProfile, setShowProfile] = useState(false)
  const [profNombre,  setProfNombre]  = useState('')
  const [profTel,     setProfTel]     = useState('')
  const [savingProf,  setSavingProf]  = useState(false)

  // Timer tick for elapsed
  const [, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const wsRef    = useRef<WebSocket | null>(null)
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const urlRef   = useRef(DEFAULT_URL)

  // ── API helpers ──────────────────────────────────────────────────────────────

  const api = useCallback((path: string, opts?: RequestInit) =>
    fetch(`${urlRef.current}${path}`, opts), [])

  const fetchBots = useCallback(async () => {
    try {
      const res = await api('/api/bots')
      if (!res.ok) return
      setBots(await res.json())
    } catch { /* offline */ }
  }, [api])

  const fetchProjects = useCallback(async () => {
    try {
      const res = await api('/api/projects')
      if (!res.ok) return
      setProjects(await res.json())
    } catch { /* offline */ }
  }, [api])

  const fetchConfig = useCallback(async () => {
    try {
      const res = await api('/api/config')
      if (!res.ok) return
      setConfig(await res.json())
    } catch { /* offline */ }
  }, [api])

  const fetchLogs = useCallback(async (id: string) => {
    setLoadingLogs(p => ({ ...p, [id]: true }))
    try {
      const res = await api(`/api/bots/${id}/logs`)
      if (!res.ok) return
      const data = await res.json()
      setLogs(p => ({ ...p, [id]: data.logs ?? [] }))
    } finally {
      setLoadingLogs(p => ({ ...p, [id]: false }))
    }
  }, [api])

  // ── WebSocket ────────────────────────────────────────────────────────────────

  const connect = useCallback((url: string) => {
    urlRef.current = url
    if (wsRef.current) { wsRef.current.onclose = null; wsRef.current.close() }
    wsRef.current = null
    setConnected(false)

    const ws = new WebSocket(url.replace(/^http/, 'ws'))
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
      fetchBots(); fetchProjects(); fetchConfig()
    }

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        const { botId, type, data } = msg

        if (['log', 'done', 'error', 'deploy'].includes(type)) {
          setLogs(prev => ({ ...prev, [botId]: [...(prev[botId] ?? []), data] }))
        }

        if (type === 'done') {
          setBots(prev => prev.map(b =>
            b.id !== botId ? b
              : { ...b, status: 'completado', phase: 'completado', endTime: new Date().toISOString() }
          ))
        }
        if (type === 'error') {
          setBots(prev => prev.map(b =>
            b.id !== botId ? b
              : { ...b, status: 'error', phase: 'error', endTime: new Date().toISOString() }
          ))
        }
        if (type === 'log' && msg.phase) {
          setBots(prev => prev.map(b =>
            b.id !== botId ? b : { ...b, phase: msg.phase }
          ))
        }
        // After a bot finishes, refresh to get updated sessionId
        if (type === 'done' || type === 'error') fetchBots()
        if (type === 'started') fetchBots()
      } catch { /* ignore */ }
    }

    ws.onclose = () => {
      setConnected(false)
      wsRef.current = null
      if (retryRef.current) clearTimeout(retryRef.current)
      retryRef.current = setTimeout(() => connect(urlRef.current), 5000)
    }

    ws.onerror = () => setConnected(false)
  }, [fetchBots, fetchProjects, fetchConfig])

  useEffect(() => {
    const saved = localStorage.getItem('devbot-server-url')
    const url = saved ?? DEFAULT_URL
    setServerUrl(url)
    urlRef.current = url
    connect(url)
    return () => {
      if (retryRef.current) clearTimeout(retryRef.current)
      wsRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (openId) logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs, openId])

  // ── Actions ──────────────────────────────────────────────────────────────────

  function saveUrl() {
    const u = urlInput.trim().replace(/\/$/, '')
    if (!u) return
    setServerUrl(u)
    localStorage.setItem('devbot-server-url', u)
    setEditingUrl(false)
    connect(u)
  }

  function toggleBot(id: string) {
    if (openId === id) { setOpenId(null); return }
    setOpenId(id)
    if (!logs[id]) fetchLogs(id)
  }

  async function stopBot(id: string) {
    await api(`/api/bots/${id}/stop`, { method: 'POST' })
    setBots(prev => prev.map(b => b.id !== id ? b : { ...b, status: 'detenido' }))
  }

  async function closeBot(id: string) {
    await api(`/api/bots/${id}/close`, { method: 'POST' })
    setBots(prev => prev.map(b => b.id !== id ? b : { ...b, closed: true }))
  }

  async function sendReply(bot: Bot) {
    const msg = (replyText[bot.id] ?? '').trim()
    if (!msg) return

    setReplying(p => ({ ...p, [bot.id]: true }))
    try {
      if (bot.resumable) {
        // Resume the Claude session
        await api(`/api/bots/${bot.id}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg }),
        })
      } else {
        // No session — start new bot in same project with context
        const contextTask = `Contexto: la tarea anterior en este proyecto fue:\n"${bot.task}"\n\n${msg}`
        await api('/api/bots/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectPath: bot.projectPath, task: contextTask }),
        })
      }
      setReplyText(p => ({ ...p, [bot.id]: '' }))
      fetchBots()
    } finally {
      setReplying(p => ({ ...p, [bot.id]: false }))
    }
  }

  async function launchBot() {
    setModalErr('')
    const task = modalTask.trim()
    if (!task) { setModalErr('Escribí la tarea.'); return }
    setLaunching(true)
    try {
      if (modalProj === '__new__') {
        const name = modalNew.trim()
        if (!name) { setModalErr('Escribí el nombre del proyecto.'); setLaunching(false); return }
        const cr = await api('/api/projects/create', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        })
        if (!cr.ok) { setModalErr('No se pudo crear el proyecto.'); setLaunching(false); return }
        const created = await cr.json()
        await api('/api/bots/start', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectPath: created.path, task }),
        })
      } else {
        const proj = projects.find(p => p.name === modalProj)
        if (!proj) { setModalErr('Seleccioná un proyecto.'); setLaunching(false); return }
        await api('/api/bots/start', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectPath: proj.path, task }),
        })
      }
      setShowModal(false); setModalTask(''); setModalProj(''); setModalNew('')
      fetchBots()
    } catch { setModalErr('No se pudo conectar al servidor.') }
    finally { setLaunching(false) }
  }

  async function saveProfile() {
    setSavingProf(true)
    try {
      const res = await api('/api/config', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: profNombre, telefono: profTel }),
      })
      if (res.ok) { setConfig({ nombre: profNombre, telefono: profTel }); setShowProfile(false) }
    } finally { setSavingProf(false) }
  }

  // ── Derived ──────────────────────────────────────────────────────────────────

  // Build thread map: id → children
  const children: Record<string, Bot[]> = {}
  for (const b of bots) {
    if (b.parentBotId) {
      if (!children[b.parentBotId]) children[b.parentBotId] = []
      children[b.parentBotId].push(b)
    }
  }
  // Top-level bots (no parent), sorted newest first
  const topBots = [...bots]
    .filter(b => !b.parentBotId && (showClosed || !b.closed))
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

  const activeBots = bots.filter(b => b.status === 'corriendo' || b.status === 'iniciando')

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Header */}
      <header className="border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm">← Labs</Link>
        <h1 className="font-bold text-base flex-1">
          Devbots
          {activeBots.length > 0 && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#c8f13520] text-[#c8f135]">
              {activeBots.length} activo{activeBots.length > 1 ? 's' : ''}
            </span>
          )}
        </h1>

        {/* Connection URL */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: connected ? '#22c55e' : '#ef4444' }} />
          {editingUrl ? (
            <div className="flex gap-1.5 items-center">
              <input
                className="bg-white/5 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none w-48 font-mono"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveUrl()}
                autoFocus placeholder="http://localhost:3333"
              />
              <button onClick={saveUrl} className="text-xs text-[#c8f135] hover:opacity-80">OK</button>
              <button onClick={() => setEditingUrl(false)} className="text-xs text-white/40 hover:text-white">✕</button>
            </div>
          ) : (
            <button onClick={() => { setUrlInput(serverUrl); setEditingUrl(true) }}
              className="text-xs text-white/30 hover:text-white transition-colors font-mono hidden sm:block">
              {serverUrl.replace('http://', '')}
            </button>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowClosed(p => !p)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors"
          >
            {showClosed ? 'Ocultar archivados' : 'Archivados'}
          </button>
          <button
            onClick={() => {
              setProfNombre(config.nombre ?? '')
              setProfTel(config.telefono ?? '')
              setShowProfile(true)
            }}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors"
          >
            {config.nombre ?? 'Perfil'}
          </button>
        </div>
      </header>

      {/* Offline panel */}
      {!connected && (
        <div className="max-w-2xl mx-auto px-4 mt-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <h2 className="font-bold">Servidor no encontrado</h2>
            </div>
            <p className="text-white/50 text-sm mb-4">
              El devbot no está corriendo en{' '}
              <code className="font-mono text-white/70">{serverUrl}</code>. Inicialo:
            </p>
            <div className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-white/70 flex items-center justify-between gap-4 mb-4">
              <span className="truncate">
                cd C:\Users\Ema\Documents\projects\devbot-orchestrator &amp;&amp; node server.js
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('cd C:\\Users\\Ema\\Documents\\projects\\devbot-orchestrator && node server.js')
                  setCopied(true); setTimeout(() => setCopied(false), 2000)
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors flex-shrink-0"
              >
                {copied ? '✓' : 'Copiar'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setRetrying(true)
                  if (retryRef.current) clearTimeout(retryRef.current)
                  connect(serverUrl)
                  setTimeout(() => setRetrying(false), 2000)
                }}
                className="text-sm px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                {retrying ? 'Reintentando…' : 'Reintentar'}
              </button>
              <span className="text-xs text-white/25">Reintento automático cada 5 s</span>
            </div>
          </div>
        </div>
      )}

      {/* Bot list */}
      {connected && (
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-3">
          {topBots.length === 0 ? (
            <p className="text-center text-white/30 py-16 text-sm">
              Ningún bot activo. Presioná <strong>+</strong> para lanzar una tarea.
            </p>
          ) : (
            topBots.map(bot => (
              <BotCard key={bot.id} bot={bot}
                openId={openId} logs={logs} loadingLogs={loadingLogs}
                logsEndRef={logsEndRef} children={children}
                replyText={replyText} replying={replying}
                onToggle={toggleBot} onStop={stopBot} onClose={closeBot}
                onReplyChange={(id, val) => setReplyText(p => ({ ...p, [id]: val }))}
                onReplySend={sendReply}
              />
            ))
          )}
        </main>
      )}

      {/* FAB */}
      {connected && (
        <button
          onClick={() => { setShowModal(true); setModalErr('') }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-2xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95 z-10"
          style={{ backgroundColor: '#c8f135', color: '#0a0a0a' }}
          aria-label="Nueva tarea"
        >
          +
        </button>
      )}

      {/* Modal nueva tarea */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          role="dialog" aria-modal="true"
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-[#111] rounded-2xl border border-white/10 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">Nueva tarea</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 mb-1 block">Proyecto</label>
                <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                  value={modalProj} onChange={e => setModalProj(e.target.value)}>
                  <option value="">— Seleccioná —</option>
                  {projects.map(p => <option key={p.path} value={p.name}>{p.name}</option>)}
                  <option value="__new__">+ Nuevo proyecto</option>
                </select>
              </div>
              {modalProj === '__new__' && (
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Nombre del proyecto</label>
                  <input className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 font-mono"
                    placeholder="mi-proyecto" value={modalNew} onChange={e => setModalNew(e.target.value)} />
                </div>
              )}
              <div>
                <label className="text-xs text-white/40 mb-1 block">Tarea</label>
                <textarea className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 resize-none"
                  rows={5} placeholder="Describí la tarea en lenguaje natural."
                  value={modalTask} onChange={e => setModalTask(e.target.value)} />
              </div>
              {modalErr && <p className="text-xs text-[#ef4444]">{modalErr}</p>}
              <button onClick={launchBot} disabled={launching}
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                style={{ backgroundColor: '#c8f135', color: '#0a0a0a' }}>
                {launching ? 'Lanzando…' : 'Lanzar bot'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal perfil */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          role="dialog" aria-modal="true"
          onClick={e => e.target === e.currentTarget && setShowProfile(false)}>
          <div className="bg-[#111] rounded-2xl border border-white/10 w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">Perfil</h2>
              <button onClick={() => setShowProfile(false)} className="text-white/40 hover:text-white text-2xl leading-none">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 mb-1 block">Nombre</label>
                <input className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                  placeholder="Tu nombre" value={profNombre} onChange={e => setProfNombre(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">Teléfono WhatsApp (notificaciones)</label>
                <input className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/30 font-mono"
                  placeholder="5491112345678" value={profTel} onChange={e => setProfTel(e.target.value)} />
                <p className="text-xs text-white/25 mt-1">Para notificar cuando un bot termina o falla.</p>
              </div>
              <button onClick={saveProfile} disabled={savingProf}
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                style={{ backgroundColor: '#c8f135', color: '#0a0a0a' }}>
                {savingProf ? 'Guardando…' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
