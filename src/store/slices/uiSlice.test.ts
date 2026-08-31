import { beforeEach, describe, expect, it } from "vitest";
import { createUISlice, type UISlice } from "./uiSlice";

// Suite de pruebas para el slice de interfaz de usuario (Tema e Idioma)
describe("uiSlice (Estado Global de UI)", () => {
	let state: UISlice;

	const set = (
		updater: ((s: UISlice) => Partial<UISlice>) | Partial<UISlice>,
	) => {
		if (typeof updater === "function") {
			const updated = updater(state);
			state = { ...state, ...updated };
		} else {
			state = { ...state, ...updater };
		}
	};

	beforeEach(() => {
		localStorage.clear();
		document.documentElement.className = "";
		state = createUISlice(set);
	});

	it("inicializa con tema claro (light) e idioma español (es) por defecto cuando localStorage está vacío", () => {
		// 1. Verifica los valores por defecto del sistema
		expect(state.theme).toBe("light");
		expect(state.language).toBe("es");
	});

	it("inicializa con las preferencias recuperadas de localStorage", () => {
		// 1. Prepara valores guardados previamente
		localStorage.setItem("theme", "dark");
		localStorage.setItem("language", "en");

		// 2. Crea nueva instancia del slice
		const customState = createUISlice(set);

		// 3. Verifica que se carguen las preferencias guardadas
		expect(customState.theme).toBe("dark");
		expect(customState.language).toBe("en");
	});

	it("alterna el tema entre claro y oscuro actualizando el DOM y localStorage", () => {
		// 1. Cambia a tema oscuro
		state.toggleTheme();

		expect(state.theme).toBe("dark");
		expect(localStorage.getItem("theme")).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);

		// 2. Cambia de regreso a tema claro
		state.toggleTheme();

		expect(state.theme).toBe("light");
		expect(localStorage.getItem("theme")).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("cambia el idioma activo y persiste la selección en localStorage", () => {
		// 1. Cambia idioma a inglés
		state.setLanguage("en");

		expect(state.language).toBe("en");
		expect(localStorage.getItem("language")).toBe("en");

		// 2. Cambia idioma de regreso a español
		state.setLanguage("es");

		expect(state.language).toBe("es");
		expect(localStorage.getItem("language")).toBe("es");
	});
});
