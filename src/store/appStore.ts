// Zustand
import { create } from "zustand";
// Traducciones
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";
// Slices
import { createUISlice } from "./slices/uiSlice";
import { createAudioSlice } from "./slices/audioSlice";
import type { UISlice } from "./slices/uiSlice";
import type { AudioSlice } from "./slices/audioSlice";

type AppStore = UISlice & AudioSlice;

// Crea el store global combinando los slices de UI y Audio
export const useStore = create<AppStore>()((set) => ({
	...createUISlice(set),
	...createAudioSlice(set),
}));

// Inicializa el tema oscuro al cargar si el usuario lo tenía activo
if (typeof window !== "undefined") {
	const saved = localStorage.getItem("theme");
	if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
		document.documentElement.classList.add("dark");
	}
}

// Hook para obtener las traducciones según el idioma actual
export function useT() {
	const language = useStore((s) => s.language);
	return language === "en" ? en : es;
}
