# Fluxbeats 🎵

Landing page para venta de beats Lofi y Chillhop para creadores de contenido.

🔗 **Live:** [landing-page.mgdc.site](https://landing-page.mgdc.site/)

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite 7
- **Styling:** TailwindCSS 4
- **Backend:** Cloudflare Workers (Hono + Resend)
- **Linting:** Biome
- **Deploy:** Cloudflare Pages

## Features

- 🎧 Reproductor de audio integrado con MiniPlayer
- 🌙 Dark/Light mode
- 🌐 Internacionalización (ES/EN)
- 📱 Diseño responsive
- 🎨 Animaciones smooth al scroll
- 📧 Formulario de contacto serverless
- 🎨 Paleta de colores centralizada con tokens semánticos

## Development

```bash
# Instalar dependencias
pnpm install

# Desarrollo local
pnpm run dev

# Build producción
pnpm run build

# Lint y format
pnpm run check
```

## Project Structure

```
├── src/
│   ├── components/     # Componentes React
│   ├── context/        # Context providers
│   ├── data/           # Datos estáticos (beats)
│   ├── hooks/          # Custom hooks
│   ├── i18n/           # Traducciones
│   └── pages/          # Páginas
├── functions/          # Cloudflare Workers
│   └── api/            # API endpoints
└── public/             # Assets estáticos
```

## License

MIT
