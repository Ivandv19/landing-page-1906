import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeSelector from "@/components/common/ThemeSelector";
import LanguageSelector from "@/components/common/LanguageSelector";
import { useT } from "@/store/appStore";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const t = useT();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ label: t.header.home, href: "#inicio" },
		{ label: t.header.beats, href: "#beats" },
		{ label: t.header.licenses, href: "#licencias" },
		{ label: t.header.reviews, href: "#testimonios" },
		{ label: t.header.about, href: "#sobre-mi" },
		{ label: t.header.contact, href: "#contacto" },
	];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<>
			<header
				className={`fixed top-0 z-50 w-full transition-all duration-300 bg-page-bg/80 backdrop-blur-md ${isScrolled
					? "border-b border-border shadow-sm"
					: "border-b border-transparent shadow-none"
					}`}
			>
				<nav className="mx-auto max-w-7xl flex h-16 w-full items-center gap-4 px-4 sm:px-6 lg:px-8">
					<div className="shrink-0 cursor-pointer">
						<h1 className="text-2xl font-bold tracking-tight text-text-main">
							<span className="text-accent">Flux</span>
							beats
						</h1>
					</div>

					<div className="hidden md:flex flex-1 justify-center">
						<div className="flex items-center gap-8">
							{navItems.map((item) => (
								<a
									key={item.href}
									href={item.href}
									className="text-sm font-medium text-text-muted transition-colors hover:text-accent hover:underline hover:decoration-2 hover:underline-offset-4"
								>
									{item.label}
								</a>
							))}
						</div>
					</div>

					<div className="flex-1 md:hidden" />

					<div className="flex items-center gap-2 shrink-0">
						<div className="hidden md:flex items-center gap-0">
							<LanguageSelector />
							<ThemeSelector />
						</div>

						<button
							type="button"
							onClick={toggleMenu}
							className="text-text-muted hover:text-accent md:hidden p-2"
							aria-label="Abrir men\u00fa"
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</nav>
			</header>

			<div
				className={`fixed top-16 left-0 z-40 w-full h-[calc(100vh-4rem)] bg-page-bg transform transition-all duration-300 ease-in-out md:hidden overflow-y-auto ${isMenuOpen
					? "translate-y-0 opacity-100"
					: "-translate-y-full opacity-0 pointer-events-none"
					}`}
			>
				<div className="p-4 border-b border-border">
					<ul className="flex flex-col space-y-2">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									onClick={closeMenu}
									className="block p-2 text-base font-medium text-text-muted transition-colors hover:bg-surface-card hover:text-accent rounded-md"
								>
									{item.label}
								</a>
							</li>
						))}

						<li className="border-t border-border my-2" />

						<li className="flex items-center justify-between px-2 pt-2">
							<LanguageSelector align="left" />
							<ThemeSelector />
						</li>
					</ul>
				</div>
			</div>

			{isMenuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 z-30 md:hidden bg-page-bg/50 backdrop-blur-sm dark:bg-black/50"
					aria-hidden="true"
				/>
			)}
		</>
	);
};

export default Header;
