import { useState, useEffect } from "react";
import ThemeSelector from "../common/ThemeSelector";
import LanguageSelector from "../common/LanguageSelector";
import { useLanguage } from "../../context/LanguageContext";

const Header = () => {
	// Estado para manejar si el menú de hamburguesa está abierto o cerrado
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const { t } = useLanguage();

	// Detectar scroll para cambiar estilo del header
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Array de elementos de navegación con traducciones y IDs fijos
	const navItems = [
		{ label: t.header.home, href: "#inicio" },
		{ label: t.header.beats, href: "#beats" },
		{ label: t.header.licenses, href: "#licencias" },
		{ label: t.header.reviews, href: "#testimonios" },
		{ label: t.header.about, href: "#sobre-mi" },
		{ label: t.header.contact, href: "#contacto" },
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
			{/* HEADER PRINCIPAL */}
			<header 
				className={`sticky top-0 z-50 w-full transition-all duration-300 ${
					isScrolled 
						? "border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 shadow-sm" 
						: "border-b border-transparent bg-white dark:bg-slate-900 shadow-none"
				}`}
			>
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					{/* LOGO */}
					<div className="flex-shrink-0 cursor-pointer">
						<h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
							<span className="text-primary dark:text-primary">Flux</span>
							beats
						</h1>
					</div>

					{/* NAVEGACIÓN DE ESCRITORIO */}
					<nav className="hidden md:block">
						<ul className="flex space-x-8">
							{navItems.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										onMouseEnter={() => {
											// Prefetch: scroll to section on hover to prepare
											const targetId = item.href.replace('#', '');
											const element = document.getElementById(targetId);
											if (element) {
												// Pre-calculate scroll position
												element.getBoundingClientRect();
											}
										}}
										className="text-sm font-medium text-slate-600 transition-colors hover:text-primary hover:underline hover:decoration-2 hover:underline-offset-4 dark:text-slate-300 dark:hover:text-primary"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* CONTENEDOR DERECHO */}
					<div className="flex items-center space-x-4">
						<LanguageSelector />
						<ThemeSelector />


						{/* BOTÓN DE HAMBURGUESA */}
						<button
							onClick={toggleMenu}
							className="text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary md:hidden"
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

			{/* MENÚ DESPLEGABLE PARA MÓVILES */}
			<nav
				className={`fixed top-16 left-0 z-40 w-full transform transition-all duration-300 ease-in-out md:hidden ${
					isMenuOpen
						? "translate-y-0 opacity-100"
						: "-translate-y-full opacity-0 pointer-events-none"
				}`}
			>
				<div className="shadow-lg bg-white p-4 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
					<ul className="flex flex-col space-y-2">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									onClick={closeMenu}
									className="block p-2 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary rounded-md dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary"
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</nav>

			{/*  OVERLAY/FONDO CON BLUR MODIFICADO  */}
			{/*  OVERLAY/FONDO CON BLUR DE FONDO  */}
			{isMenuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 z-30 md:hidden bg-white/50 backdrop-blur-sm dark:bg-black/50"
					aria-hidden="true"
				></div>
			)}
		</>
	);
};

export default Header;
