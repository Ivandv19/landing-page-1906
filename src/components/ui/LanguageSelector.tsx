// React

// Iconos
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// Store
import { useStore } from "@/store/appStore";

// Props del selector de idioma
interface LanguageSelectorProps {
	align?: "left" | "right";
}

// Selector desplegable de idioma con detección de clic fuera
const LanguageSelector = ({ align = "right" }: LanguageSelectorProps) => {
	const language = useStore((s) => s.language);
	const setLanguage = useStore((s) => s.setLanguage);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => setIsOpen(!isOpen);

	// Cierra el menú al hacer clic fuera
	useEffect(() => {
		// 1. Escucha clics fuera del menú
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// 2. Limpia el evento al cerrar o desmontar
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			{/* Botón del selector */}
			<button
				type="button"
				onClick={toggleMenu}
				className="rounded-full p-2 text-text-muted transition-colors hover:text-accent dark:hover:text-accent"
				aria-label="Change language"
				aria-expanded={isOpen}
			>
				<Globe size={20} />
				<span className="sr-only">{language}</span>
			</button>

			{/* Menú desplegable */}
			<div
				className={`absolute top-full mt-2 w-32 bg-surface-card/95 backdrop-blur-sm border border-border rounded-xl shadow-lg p-1 transition-all duration-200 z-50 transform ${
					align === "right"
						? "right-0 origin-top-right"
						: "left-0 origin-top-left"
				} ${
					isOpen
						? "opacity-100 visible translate-y-2"
						: "opacity-0 invisible translate-y-0"
				}`}
			>
				{/* Opción español */}
				<button
					type="button"
					onClick={() => {
						setLanguage("es");
						setIsOpen(false);
					}}
					className={`
						w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
						${
							language === "es"
								? "bg-accent/10 text-accent"
								: "text-text-muted hover:bg-surface-card dark:hover:bg-surface-card hover:text-text-main"
						}
					`}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full bg-accent transition-opacity ${language === "es" ? "opacity-100" : "opacity-0"}`}
					></span>
					Espa&#241;ol
				</button>
				{/* Opción inglés */}
				<button
					type="button"
					onClick={() => {
						setLanguage("en");
						setIsOpen(false);
					}}
					className={`
						w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
						${
							language === "en"
								? "bg-accent/10 text-accent"
								: "text-text-muted hover:bg-surface-card dark:hover:bg-surface-card hover:text-text-main"
						}
					`}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full bg-accent transition-opacity ${language === "en" ? "opacity-100" : "opacity-0"}`}
					></span>
					English
				</button>
			</div>
		</div>
	);
};

export default LanguageSelector;
