import  { useState } from "react";

const Header = () => {
  // Estado para manejar si el menú de hamburguesa está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Array de elementos de navegación
  const navItems = [
    "Inicio",
    "Beats",
    "Licencias",
    "Testimonios",
    "Sobre Mi",
    "Contacto",
  ];

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar el menú (útil al hacer clic en un enlace)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* HEADER PRINCIPAL (Se mantiene igual) */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <div className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              <span className="text-blue-600">Flux</span>beats
            </h1>
          </div>

          {/* NAVEGACIÓN DE ESCRITORIO */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 hover:underline hover:decoration-2 hover:underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTENEDOR DERECHO */}
          <div className="flex items-center space-x-4">
            {/* Ícono GITHUB (Se mantiene igual) */}
            <a
              href="https://github.com/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full p-2 transition-colors hover:bg-slate-100"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-slate-500 group-hover:text-blue-600"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            {/* BOTÓN DE HAMBURGUESA (Se mantiene igual) */}
            <button
              onClick={toggleMenu}
              className="text-slate-600 hover:text-blue-600 md:hidden"
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                // Icono X
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              ) : (
                // Icono Hamburguesa
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ DESPLEGABLE PARA MÓVILES (Se mantiene igual) */}
      <nav
        className={`fixed top-16 left-0 z-40 w-full transform transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="shadow-lg bg-white p-4 border-b border-slate-200">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={closeMenu}
                  className="block p-2 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600 rounded-md"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/*  OVERLAY/FONDO CON BLUR MODIFICADO  */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-30 md:hidden bg-white/50 backdrop-blur-sm" 
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Header;