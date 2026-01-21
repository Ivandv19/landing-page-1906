import { createContext, useContext, useState, useEffect } from "react";
import { es } from "../i18n/es";
import { en } from "../i18n/en";

// 1. Tipos para los idiomas
type Language = "es" | "en";
type Translations = typeof es;

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: Translations;
}

// 2. Crear el Contexto
const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

// 3. Provider
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	// Estado inicial lazy: busca en localStorage o usa "es" por defecto
	const [language, setLanguageState] = useState<Language>(() => {
		const stored = localStorage.getItem("language");
		if (stored === "en" || stored === "es") return stored;
		// Detectar idioma del navegador si no hay preferencia guardada
		const browserLang = navigator.language.split("-")[0];
		return browserLang === "en" ? "en" : "es";
	});

	// Efecto para guardar en localStorage cuando cambia
	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);

	// Seleccionar el diccionario correcto
	const t = language === "en" ? en : es;

	const setLanguage = (lang: Language) => {
		setLanguageState(lang);
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
};

// 4. Custom Hook para usar el contexto
export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
