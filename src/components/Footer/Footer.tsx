import React from 'react';

// Componente pequeño auxiliar para los íconos sociales (DRY)
const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* GRID PRINCIPAL: 4 Columnas */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* COLUMNA 1: Marca y Redes Sociales */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              <span className="text-blue-600">Flux</span>beats
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Creando atmósferas únicas. Beats de Lofi y Chillhop de alta calidad para creadores de contenido, artistas y streamers.
            </p>

            {/* Íconos de Redes Sociales */}
            <div className="flex space-x-4 pt-2">
              <SocialIcon href="https://github.com/tu-usuario" label="GitHub">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </SocialIcon>

              <SocialIcon href="#" label="YouTube">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </SocialIcon>

              <SocialIcon href="#" label="Instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </SocialIcon>
            </div>
          </div>

          {/* COLUMNA 2: Enlaces de Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Navegación
            </h3>
            <ul className="space-y-3">
              {['Inicio', 'Beats', 'Servicios', 'Sobre Mi'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: Enlaces Legales */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                'Licencias de Uso',
                'Términos y Condiciones',
                'Política de Privacidad',
                'Política de Reembolso',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 4: Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              Mantente al día
            </h3>
            <p className="mb-4 text-sm text-slate-500">
              Suscríbete para recibir nuevos beats y ofertas exclusivas.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="button"
                className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* BARRA INFERIOR: Copyright */}
        <div className="mt-12 border-t border-slate-100 pt-8">
          <p className="text-center text-xs text-slate-400">
            &copy; {currentYear} Fluxbeats. Todos los derechos reservados. Hecho con ❤️ y café.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;