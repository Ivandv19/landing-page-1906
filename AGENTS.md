# AGENTS.md — Guía para Agentes en Fluxbeats

Guía operativa y técnica para agentes de Inteligencia Artificial que colaboren en el desarrollo, mantenimiento y optimización del proyecto **Fluxbeats**.

---

## 1. Visión General del Proyecto

**Fluxbeats** es una plataforma web y landing comercial diseñada para la exhibición, reproducción y venta de licencias de instrumentales musicales (Beats).

* **Propósito:** Ofrecer a productores y artistas un catálogo interactivo con reproductor de audio continuo, tabla comparativa de licencias comerciales y un formulario de contacto seguro protegido contra spam para la negociación y compra de pistas.
* **Dominio en Producción:** [https://fluxbeats.mgdc.site](https://fluxbeats.mgdc.site)
* **CDN de Assets (Cloudflare R2):** `https://fluxbeats-assets.mgdc.site`

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión / Detalle |
| :--- | :--- | :--- |
| **Runtime & Gestor** | **Bun** | `v1.3.14` (`bun.lock`) |
| **Lenguaje** | **TypeScript** | `~6.0.3` (Modo estricto con `tsconfig.app.json`) |
| **Frontend** | **React 19** | `react ^19.2.6`, `react-dom ^19.2.6` |
| **Enrutador** | **React Router 7** | `react-router-dom ^7.16.0` |
| **Estilos** | **Tailwind CSS 4** | `@tailwindcss/vite ^4.3.0` |
| **Estado Global** | **Zustand 5** | `zustand ^5.0.14` (Slices modulares de audio y UI) |
| **Audio** | **react-use-audio-player** | `react-use-audio-player ^4.0.2` |
| **Backend / Edge** | **Hono** en Cloudflare Pages Functions | `hono ^4.12.23`, `@hono/zod-validator ^0.8.0` |
| **Validación & Anti-Spam** | **Zod 4** + **Cloudflare Turnstile** | `zod ^4.4.3`, `@marsidev/react-turnstile ^1.5.2` |
| **Servicio de Email** | **Resend** | `resend ^6.12.4` |
| **Linter & Formatter** | **Biome** | `@biomejs/biome ^2.4.16` |
| **Testing** | **Vitest** + **Testing Library** | `vitest ^4.1.7`, `@testing-library/react ^16.3.2` |
| **Despliegue & Edge** | **Cloudflare Pages** | `wrangler ^4.95.0` (`wrangler.jsonc`) |

---

## 3. Estructura del Código

```
fluxbeats/
├── functions/                     → Backend Serverless (Pages Functions)
│   ├── _shared/                   → Módulos compartidos del backend
│   │   ├── contactSchema.ts       → Esquema de validación Zod del formulario
│   │   ├── email.ts               → Cliente de envío de correos con Resend
│   │   ├── rateLimit.ts           → Rate limiting en memoria por IP
│   │   └── turnstile.ts           → Validación del token anti-spam de Turnstile
│   └── api/
│       └── [[route]].ts           → Controlador Hono (POST /api/contact)
│
├── src/                           → Frontend React 19 SPA
│   ├── assets/                    → Recursos multimedia locales
│   ├── components/                → Componentes modulares por sección
│   │   ├── Beats/                 → Catálogo de pistas, reproductor y mini player
│   │   ├── Contacto/              → Formulario de contacto con Turnstile
│   │   ├── Header/                → Navegación, selector de tema e idioma
│   │   ├── Hero/                  → Sección principal con CTA
│   │   ├── Licencias/             → Comparativa de licencias y precios
│   │   ├── SobreMi/               → Biografía y trayectoria del productor
│   │   ├── Testimonios/           → Reseñas de artistas y clientes
│   │   ├── Footer/                → Enlaces legales y redes
│   │   └── common/                → Botones, modales y selectores compartidos
│   ├── config/                    → Configuración centralizada
│   ├── data/
│   │   └── beats.ts               → Catálogo de pistas con URLs de audio en R2
│   ├── email/                     → Plantillas de correo transaccional
│   ├── hooks/                     → Custom hooks (reproducción, inView, responsive)
│   ├── i18n/                      → Diccionarios de traducción (ES / EN)
│   ├── pages/                     → Vistas principales y páginas legales
│   ├── store/                     → Store Zustand compuesto (`appStore.ts`)
│   │   └── slices/                → `audioSlice.ts` y `uiSlice.ts`
│   ├── test/                      → Utilidades y configuración de Vitest (`setup.ts`)
│   ├── utils/                     → Utilidades de formato (tiempo, moneda, fecha)
│   ├── App.tsx                    → Layout principal y providers
│   └── main.tsx                   → Punto de entrada React 19
│
├── public/                        → Assets estáticos públicos
│   └── _headers                   → Seguridad HTTP (CSP, HSTS) y caching
│
└── wrangler.jsonc                 → Configuración de Cloudflare Pages
```

---

## 4. Comandos de Desarrollo y Tooling

Todos los comandos se ejecutan con **Bun**:

```bash
# Desarrollo local (Frontend Vite)
bun run dev

# Desarrollo Fullstack (Build + Wrangler Pages Functions en puerto 4321)
bun run dev:full

# Compilación TypeScript y Vite
bun run build

# Verificación y formateo de código con Biome
bun run check
bun run lint
bun run format

# Ejecución de Pruebas Automatizadas (Vitest)
bun run test run
bun run test:ui

# Previsualización del build local
bun run preview
```

---

## 5. Convenciones de Desarrollo para Agentes

### 5.1 Estilo de Código y Comentarios
* **Lenguaje de comentarios:** Escribir comentarios y documentación en **español**, claros y directos.
* **Sin tecnicismos redundantes:** Describir la función real del código sin mencionar etiquetas teóricas innecesarias ==
* **Tipado TypeScript estricto:** Evitar el uso de `any`; definir interfaces y tipos explícitos para todas las propiedades, estados y respuestas de API.
* **Alias de rutas:** Utilizar el alias `@/` configurado para imports limpios desde `src/`.

### 5.2 Arquitectura de Audio y Estado Global
* **Reproductor Continuo:** La reproducción de beats se controla de forma centralizada en `src/store/slices/audioSlice.ts` para evitar solapamientos de pistas.
* **Persistencia de Preferencias:** El idioma seleccionado y el tema (dark/light) se gestionan en `src/store/slices/uiSlice.ts` con persistencia en `localStorage`.

### 5.3 Backend Serverless y Seguridad
* **Validación en Capas:** Todas las peticiones POST a `/api/contact` deben pasar por:
  1. `rateLimit.ts`: Límite de peticiones por IP en memoria.
  2. `turnstile.ts`: Validación contra la API de Cloudflare Turnstile con `TURNSTILE_SECRET_KEY`.
  3. `contactSchema.ts`: Validación de longitud, formato de email y caracteres con Zod.
  4. `email.ts`: Envío seguro vía Resend API sin exponer credenciales en el cliente.

### 5.4 Flujo de Git y Despliegues
* **No realizar commits ni pushes sin aprobación explícita del usuario.**
* **Flujo de ramas:** Trabajar en ramas de feature o `develop` y mergear hacia `main` mediante fast-forward.
* **Mensajes de commit:** Seguir el estándar de *Conventional Commits* en minúsculas y español (ej. `feat: ...`, `fix: ...`, `refactor: ...`, `test: ...`).
