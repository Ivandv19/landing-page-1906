// Tipos de tema e idioma
type Theme = "light" | "dark";
type Language = "es" | "en";

// Estado y acciones del slice de UI
export interface UISlice {
	theme: Theme;
	language: Language;
	toggleTheme: () => void;
	setLanguage: (lang: Language) => void;
}

// Aplica el tema al DOM y lo persiste en localStorage
function applyTheme(theme: Theme) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", theme === "dark");
	localStorage.setItem("theme", theme);
}

// Inicializa el tema desde localStorage o preferencia del sistema
function initTheme(): Theme {
	if (typeof window === "undefined") return "light";
	const saved = localStorage.getItem("theme") as Theme;
	if (saved) return saved;
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
	return "light";
}

// Inicializa el idioma desde localStorage o preferencia del navegador
function initLanguage(): Language {
	if (typeof window === "undefined") return "es";
	const saved = localStorage.getItem("language") as Language;
	if (saved === "en" || saved === "es") return saved;
	const browserLang = navigator.language.split("-")[0];
	return browserLang === "en" ? "en" : "es";
}

// Crea el slice de UI con estado inicial y acciones
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUISlice = (set: any): UISlice => ({
	theme: initTheme(),
	language: initLanguage(),

	toggleTheme: () => {
		set((state: UISlice) => {
			// 1. Calcula el siguiente tema (inverso al actual)
			const next = state.theme === "light" ? "dark" : "light";
			// 2. Lo aplica al DOM y lo persiste en localStorage
			applyTheme(next);
			return { theme: next };
		});
	},

	setLanguage: (language) => {
		// 1. Persiste el idioma seleccionado
		localStorage.setItem("language", language);
		// 2. Actualiza el estado global
		set((state: UISlice) => ({ ...state, language }));
	},
});
