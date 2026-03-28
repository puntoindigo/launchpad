# launchpad — estado

## Estructura
```
app/
  page.tsx          → Home: proyectos en curso + ideas potenciales
  devbot/page.tsx   → UI del orquestador de devbots (conecta a localhost:3333)
  [slug]/page.tsx   → Landing pública por app (usa lib/apps.ts)
  v2/[slug]/page.tsx → Landings v2 (usa lib/apps-v2.ts)
  playground/       → Herramientas internas (flyers, etc.)
  tecnico/          → Vista técnica
lib/
  apps.ts           → 6 micro-SaaS potenciales
  apps-v2.ts        → Versión v2 de landings
  activeProjects.ts → 7 proyectos en curso con status/URL
  tools.ts          → Herramientas internas
```

## Proyectos activos (activeProjects.ts)
| Slug | Estado | URL |
|---|---|---|
| devbot | local | /devbot |
| remitero | live | https://remitero.vercel.app |
| vorum | live | https://vorum.puntoindigo.com |
| auris | live | https://auris.puntoindigo.com |
| recibos | live | https://v0-recibos.vercel.app |
| id | wip | — |
| playground | wip | /playground/flyers |

## Deploy
- Vercel: https://launchpad-daeiman0.vercel.app
- basePath: /launchpad → objetivo puntoindigo.com/launchpad
- Rama: master
