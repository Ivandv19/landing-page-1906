import { create } from "zustand";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";
import type { Beat } from "@/data/beats";

type Theme = "light" | "dark";
type Language = "es" | "en";

let audioEl: HTMLAudioElement | null = null;

interface AppSlice {
	theme: Theme;
	language: Language;
	toggleTheme: () => void;
	setLanguage: (lang: Language) => void;
}

interface AudioSlice {
	currentBeat: Beat | null;
	isPlaying: boolean;
	isLoading: boolean;
	volume: number;
	progress: number;
	currentTime: number;
	duration: number;
	initAudio: () => void;
	play: (beat: Beat) => void;
	toggle: () => void;
	stop: () => void;
	setVolume: (v: number) => void;
	seek: (p: number) => void;
}

type AppStore = AppSlice & AudioSlice;

function applyTheme(theme: Theme) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", theme === "dark");
	localStorage.setItem("theme", theme);
}

function initTheme(): Theme {
	if (typeof window === "undefined") return "light";
	const saved = localStorage.getItem("theme") as Theme;
	if (saved) return saved;
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
	return "light";
}

function initLanguage(): Language {
	if (typeof window === "undefined") return "es";
	const saved = localStorage.getItem("language") as Language;
	if (saved === "en" || saved === "es") return saved;
	const browserLang = navigator.language.split("-")[0];
	return browserLang === "en" ? "en" : "es";
}

export const useStore = create<AppStore>()((set, get) => ({
	theme: initTheme(),
	language: initLanguage(),

	toggleTheme: () => {
		const next = get().theme === "light" ? "dark" : "light";
		applyTheme(next);
		set({ theme: next });
	},

	setLanguage: (language) => {
		localStorage.setItem("language", language);
		set({ language });
	},

	currentBeat: null,
	isPlaying: false,
	isLoading: false,
	volume: 0.7,
	progress: 0,
	currentTime: 0,
	duration: 0,

	initAudio: () => {
		const el = document.getElementById("global-audio") as HTMLAudioElement;
		if (!el) return;
		audioEl = el;
		el.volume = get().volume;

		const onTimeUpdate = () => {
			set({
				currentTime: el.currentTime,
				duration: el.duration || 0,
				progress: el.duration ? (el.currentTime / el.duration) * 100 : 0,
			});
		};

		const onLoadedMetadata = () => {
			set({ duration: el.duration || 0 });
		};

		const onEnded = () => {
			set({ isPlaying: false, progress: 0, currentTime: 0 });
		};

		el.addEventListener("timeupdate", onTimeUpdate);
		el.addEventListener("loadedmetadata", onLoadedMetadata);
		el.addEventListener("ended", onEnded);
	},

	play: (beat) => {
		if (!audioEl) return;
		const { currentBeat, isPlaying } = get();

		if (currentBeat?.id === beat.id && isPlaying) {
			audioEl.pause();
			set({ isPlaying: false });
			return;
		}

		if (currentBeat?.id === beat.id) {
			audioEl.play();
			set({ isPlaying: true });
			return;
		}

		set({ isLoading: true });
		audioEl.src = beat.audioUrl;
		audioEl
			.play()
			.then(() => set({ isPlaying: true, currentBeat: beat }))
			.catch(console.error)
			.finally(() => set({ isLoading: false }));
	},

	toggle: () => {
		if (!audioEl || !get().currentBeat) return;
		if (get().isPlaying) {
			audioEl.pause();
			set({ isPlaying: false });
		} else {
			audioEl.play();
			set({ isPlaying: true });
		}
	},

	stop: () => {
		if (!audioEl) return;
		audioEl.pause();
		audioEl.currentTime = 0;
		set({ isPlaying: false, currentBeat: null, progress: 0, currentTime: 0 });
	},

	setVolume: (volume) => {
		if (audioEl) audioEl.volume = volume;
		set({ volume });
	},

	seek: (progress) => {
		if (!audioEl || !get().duration) return;
		const newTime = (progress / 100) * get().duration;
		audioEl.currentTime = newTime;
		set({ progress });
	},
}));

if (typeof window !== "undefined") {
	const saved = localStorage.getItem("theme") as Theme;
	if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
		document.documentElement.classList.add("dark");
	}
}

export function useT() {
	const language = useStore((s) => s.language);
	return language === "en" ? en : es;
}
