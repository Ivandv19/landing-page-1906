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
				className={`fixed top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md dark:bg-slate-900/80 ${
					isScrolled 
						? "border-b border-slate-200 dark:border-slate-800 shadow-sm" 
						: "border-b border-transparent shadow-none"
				}`}
			>
				<nav className="flex h-16 w-full items-center gap-4 px-4 sm:px-6 lg:px-8">
					{/* LOGO */}
					<div className="shrink-0 cursor-pointer">
						<h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
							<span className="text-primary dark:text-primary">Flux</span>
							beats
						</h1>
					</div>

					{/* ESPACIADOR FLEXIBLE / NAV CENTRADA */}
					<div className="hidden md:flex flex-1 justify-center">
						<div className="flex items-center gap-8">
							{navItems.map((item) => (
								<a
									key={item.href}
									href={item.href}
									className="text-sm font-medium text-slate-600 transition-colors hover:text-primary hover:underline hover:decoration-2 hover:underline-offset-4 dark:text-slate-300 dark:hover:text-primary"
								>
									{item.label}
								</a>
							))}
						</div>
					</div>

					{/* ESPACIADOR PARA MÓVIL (para empujar el grupo derecho) */}
					<div className="flex-1 md:hidden"></div>

					{/* GRUPO DERECHO: SELECTORES + HAMBURGUESA */}
					<div className="flex items-center gap-2 shrink-0">
						{/* SELECTORES DE ESCRITORIO */}
						<div className="hidden md:flex items-center gap-0">
							<LanguageSelector />
							<ThemeSelector />
						</div>


						{/* BOTÓN DE HAMBURGUESA (SOLO MÓVIL) */}
						<button
							onClick={toggleMenu}
							className="text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary md:hidden p-2"
							aria-label="Abrir menú"
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? (
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
									<path d="M18 6L6 18" />
									<path d="M6 6l12 12" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
									<line x1="4" y1="12" x2="20" y2="12" />
									<line x1="4" y1="6" x2="20" y2="6" />
									<line x1="4" y1="18" x2="20" y2="18" />
								</svg>
							)}
						</button>
					</div>
				</nav>
			</header>

			{/* MENÚ DESPLEGABLE PARA MÓVILES */}
			<div
				className={`fixed top-16 left-0 z-40 w-full h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 transform transition-all duration-300 ease-in-out md:hidden overflow-y-auto ${
					isMenuOpen
						? "translate-y-0 opacity-100"
						: "-translate-y-full opacity-0 pointer-events-none"
				}`}
			>
				<div className="p-4 border-b border-slate-200 dark:border-slate-800">
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
						
						{/* SEPARADOR MÓVIL */}
						<li className="border-t border-slate-200 dark:border-slate-800 my-2"></li>

						{/* SELECTORES EN MÓVIL */}
						<li className="flex items-center justify-between px-2 pt-2">
							<LanguageSelector align="left" />
							<ThemeSelector />
						</li>
					</ul>
				</div>
			</div>

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
