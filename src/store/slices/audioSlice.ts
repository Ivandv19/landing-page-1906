// Tipos
import type { Beat } from "@/data/beats";

// Estado y acciones del slice de audio
export interface AudioSlice {
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

// Referencia al elemento de audio global compartido entre componentes
let audioEl: HTMLAudioElement | null = null;

// Crea el slice de audio con reproductor y controles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAudioSlice = (set: any): AudioSlice => ({
	currentBeat: null,
	isPlaying: false,
	isLoading: false,
	volume: 0.7,
	progress: 0,
	currentTime: 0,
	duration: 0,

	// Inicializa el elemento de audio y sus eventos
	initAudio: () => {
		const el = document.getElementById("global-audio") as HTMLAudioElement;
		if (!el) return;
		audioEl = el;
		el.volume = 0.7;

		// 1. Actualiza el tiempo y progreso durante la reproducción
		const onTimeUpdate = () => {
			set({
				currentTime: el.currentTime,
				duration: el.duration || 0,
				progress: el.duration ? (el.currentTime / el.duration) * 100 : 0,
			});
		};

		// 2. Actualiza la duración cuando se cargan los metadatos
		const onLoadedMetadata = () => {
			set({ duration: el.duration || 0 });
		};

		// 3. Resetea el estado al terminar la reproducción
		const onEnded = () => {
			set({ isPlaying: false, progress: 0, currentTime: 0 });
		};

		el.addEventListener("timeupdate", onTimeUpdate);
		el.addEventListener("loadedmetadata", onLoadedMetadata);
		el.addEventListener("ended", onEnded);
	},

	// Reproduce o pausa un beat específico
	play: (beat) => {
		if (!audioEl) return;
		set((state: AudioSlice) => {
			// 1. Si el mismo beat está sonando, lo pausa
			if (state.currentBeat?.id === beat.id && state.isPlaying) {
				audioEl!.pause();
				return { isPlaying: false };
			}

			// 2. Si es el mismo beat pero está pausado, lo reanuda
			if (state.currentBeat?.id === beat.id) {
				audioEl!.play();
				return { isPlaying: true };
			}

			// 3. Si es otro beat, carga el audio y lo reproduce
			audioEl!.src = beat.audioUrl;
			audioEl!
				.play()
				.then(() => set({ isPlaying: true, currentBeat: beat }))
				.catch(console.error)
				.finally(() => set({ isLoading: false }));

			return { isLoading: true };
		});
	},

	// Alterna entre pausa y reproducción
	toggle: () => {
		if (!audioEl) return;
		set((state: AudioSlice) => {
			if (!state.currentBeat) return state;
			// 1. Si está sonando, lo pausa
			if (state.isPlaying) {
				audioEl!.pause();
				return { isPlaying: false };
			}
			// 2. Si está pausado, lo reanuda
			audioEl!.play();
			return { isPlaying: true };
		});
	},

	// Detiene la reproducción y resetea el estado
	stop: () => {
		if (!audioEl) return;
		// 1. Pausa y resetea el tiempo del audio
		audioEl.pause();
		audioEl.currentTime = 0;
		// 2. Limpia el estado global
		set({ isPlaying: false, currentBeat: null, progress: 0, currentTime: 0 });
	},

	// Cambia el volumen del reproductor
	setVolume: (volume) => {
		if (audioEl) audioEl.volume = volume;
		set({ volume });
	},

	// Busca una posición específica en la reproducción
	seek: (progress) => {
		set((state: AudioSlice) => {
			if (!audioEl || !state.duration) return { progress };
			// 1. Calcula la nueva posición en segundos y la aplica
			audioEl.currentTime = (progress / 100) * state.duration;
			return { progress };
		});
	},
});
