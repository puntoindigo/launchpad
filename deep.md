# launchpad — detalle técnico

## Stack
- Next.js (App Router, `'use client'` donde se necesita)
- Tailwind CSS — paleta oscura #0a0a0a, acentos por proyecto
- TypeScript

## Devbot integration
`app/devbot/page.tsx` conecta vía WebSocket a un servidor Node.js externo (default `localhost:3333`).
La URL se guarda en `localStorage('devbot-server-url')` y es editable en el header.

### API del servidor devbot (puerto 3333)
- `GET /api/bots` → lista de bots
- `GET /api/projects` → proyectos disponibles
- `GET /api/config` → config del usuario
- `PUT /api/config` → guardar perfil
- `GET /api/bots/:id/logs` → logs de un bot
- `POST /api/bots/start` → lanzar bot `{ projectPath, task, parentBotId? }`
- `POST /api/bots/:id/stop` → detener
- `POST /api/bots/:id/close` → archivar
- `POST /api/bots/:id/reopen` → desarchivar
- `POST /api/bots/:id/reply` → reply a sesión reanudable `{ message }`
- `POST /api/projects/create` → crear proyecto `{ name }`

WebSocket: mensajes `{ botId, type, data, phase? }` donde type ∈ log | done | error | deploy | started

### URL param ?project=
`/devbot?project=<slug>` pre-filtra por proyecto al cargar.
El slug debe coincidir con el basename del `projectPath` del servidor.
El estado `selectedProject` se sincroniza al URL con `history.replaceState`.

## basePath
`next.config.ts` tiene `basePath: '/launchpad'`.
Los `Link` de Next.js lo aplican automáticamente.

## Log parsing (devbot)
Formato de línea: `[ISO] [eventType] data`
- Si data empieza con `{` → Claude stream-json (system/assistant/user/result)
- Si data empieza con `[stderr]` → warning amarillo
- Resto → log genérico

## activeProjects ↔ devbot mapping
El slug del proyecto en `activeProjects.ts` debe coincidir con el basename
del path en el servidor devbot para que el deep-link `?project=<slug>` funcione.
