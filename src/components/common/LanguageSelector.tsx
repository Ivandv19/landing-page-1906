import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";	

const LanguageSelector = () => {
	const { language, setLanguage } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Cerrar dropdown al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const languages = [
		{ code: "es", label: "Español", flag: "🇪🇸" },
		{ code: "en", label: "English", flag: "🇺🇸" },
	];

	const currentLang = languages.find((lang) => lang.code === language) || languages[0];

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
				aria-label="Cambiar idioma"
			>
				<span className="text-lg">{currentLang.flag}</span>
				<span>{currentLang.code.toUpperCase()}</span>
				<svg
					className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-slate-800 dark:ring-slate-700 z-50">
					<div className="py-1" role="menu">
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => {
									setLanguage(lang.code as "es" | "en");
									setIsOpen(false);
								}}
								className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
									language === lang.code
										? "bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-300"
										: "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
								}`}
								role="menuitem"
							>
								<span className="text-xl">{lang.flag}</span>
								<span>{lang.label}</span>
								{language === lang.code && (
									<svg
										className="ml-auto w-4 h-4 text-blue-600 dark:text-blue-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default LanguageSelector;
