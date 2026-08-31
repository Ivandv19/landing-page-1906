import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Beat } from "@/data/beats";
import { type AudioSlice, createAudioSlice } from "./audioSlice";

// Fixture mock para pruebas de audio
const mockBeat: Beat = {
	id: 1,
	title: "Test Beat",
	bpm: 140,
	key: "C Minor",
	price: 29.99,
	audioUrl: "https://example.com/beat1.mp3",
	image: "/images/beat1.jpg",
};

const mockBeat2: Beat = {
	id: 2,
	title: "Second Beat",
	bpm: 120,
	key: "A Minor",
	price: 39.99,
	audioUrl: "https://example.com/beat2.mp3",
	image: "/images/beat2.jpg",
};

// Suite de pruebas unitarias para el slice de audio de Zustand
describe("audioSlice (Estado Global de Audio)", () => {
	let state: AudioSlice;
	let mockAudioEl: HTMLAudioElement;

	const set = (
		updater: ((s: AudioSlice) => Partial<AudioSlice>) | Partial<AudioSlice>,
	) => {
		if (typeof updater === "function") {
			const updated = updater(state);
			state = { ...state, ...updated };
		} else {
			state = { ...state, ...updater };
		}
	};

	beforeEach(() => {
		document.body.innerHTML = '<audio id="global-audio"></audio>';
		mockAudioEl = document.getElementById("global-audio") as HTMLAudioElement;

		mockAudioEl.play = vi.fn().mockResolvedValue(undefined);
		mockAudioEl.pause = vi.fn();

		state = createAudioSlice(set);
	});

	it("inicializa con los valores predeterminados de reproducción y volumen", () => {
		// 1. Verifica estado inicial vacío
		expect(state.currentBeat).toBeNull();
		expect(state.isPlaying).toBe(false);
		expect(state.isLoading).toBe(false);
		expect(state.volume).toBe(0.7);
		expect(state.progress).toBe(0);
		expect(state.currentTime).toBe(0);
		expect(state.duration).toBe(0);
	});

	it("inicializa el elemento de audio y responde correctamente a los eventos de medios", () => {
		// 1. Inicializa listeners de audio
		state.initAudio();
		expect(mockAudioEl.volume).toBe(0.7);

		// 2. Simula evento timeupdate (progreso de reproducción)
		Object.defineProperty(mockAudioEl, "currentTime", {
			value: 30,
			writable: true,
		});
		Object.defineProperty(mockAudioEl, "duration", {
			value: 120,
			writable: true,
		});
		mockAudioEl.dispatchEvent(new Event("timeupdate"));

		expect(state.currentTime).toBe(30);
		expect(state.duration).toBe(120);
		expect(state.progress).toBe(25);

		// 3. Simula evento loadedmetadata
		Object.defineProperty(mockAudioEl, "duration", {
			value: 180,
			writable: true,
		});
		mockAudioEl.dispatchEvent(new Event("loadedmetadata"));
		expect(state.duration).toBe(180);

		// 4. Simula evento ended (finalización de pista)
		state.isPlaying = true;
		state.progress = 100;
		state.currentTime = 180;
		mockAudioEl.dispatchEvent(new Event("ended"));

		expect(state.isPlaying).toBe(false);
		expect(state.progress).toBe(0);
		expect(state.currentTime).toBe(0);
	});

	it("reproduce una nueva pista y actualiza el src del elemento de audio", async () => {
		// 1. Inicia audio y ejecuta reproducción
		state.initAudio();
		state.play(mockBeat);

		// 2. Verifica asignación de src y llamada a play()
		expect(mockAudioEl.src).toBe(mockBeat.audioUrl);
		expect(mockAudioEl.play).toHaveBeenCalledTimes(1);

		await new Promise((r) => setTimeout(r, 0));

		// 3. Verifica estado activo
		expect(state.isPlaying).toBe(true);
		expect(state.currentBeat).toEqual(mockBeat);
		expect(state.isLoading).toBe(false);
	});

	it("pausa la reproducción si se invoca play() sobre la pista que ya está sonando", () => {
		// 1. Configura pista activa en reproducción
		state.initAudio();
		state.currentBeat = mockBeat;
		state.isPlaying = true;

		// 2. Invoca play sobre la misma pista
		state.play(mockBeat);

		// 3. Verifica que se pause
		expect(mockAudioEl.pause).toHaveBeenCalledTimes(1);
		expect(state.isPlaying).toBe(false);
	});

	it("reanuda la reproducción si se invoca play() sobre la pista pausada", () => {
		// 1. Configura pista activa pausada
		state.initAudio();
		state.currentBeat = mockBeat;
		state.isPlaying = false;

		// 2. Invoca play
		state.play(mockBeat);

		// 3. Verifica que se reanude
		expect(mockAudioEl.play).toHaveBeenCalledTimes(1);
		expect(state.isPlaying).toBe(true);
	});

	it("cambia a una pista diferente y actualiza el src sin solapamiento de audio", async () => {
		// 1. Configura primer beat sonando
		state.initAudio();
		state.currentBeat = mockBeat;
		state.isPlaying = true;

		// 2. Cambia al segundo beat
		state.play(mockBeat2);

		// 3. Verifica reemplazo de src y reproducción del nuevo beat
		expect(mockAudioEl.src).toBe(mockBeat2.audioUrl);
		expect(mockAudioEl.play).toHaveBeenCalled();

		await new Promise((r) => setTimeout(r, 0));

		expect(state.currentBeat).toEqual(mockBeat2);
		expect(state.isPlaying).toBe(true);
	});

	it("alterna entre reproducción y pausa mediante toggle()", () => {
		// 1. Sin beat seleccionado, no realiza ninguna acción
		state.initAudio();
		state.toggle();
		expect(mockAudioEl.play).not.toHaveBeenCalled();
		expect(mockAudioEl.pause).not.toHaveBeenCalled();

		// 2. Con beat en reproducción, toggle pausa la pista
		state.currentBeat = mockBeat;
		state.isPlaying = true;
		state.toggle();

		expect(mockAudioEl.pause).toHaveBeenCalledTimes(1);
		expect(state.isPlaying).toBe(false);

		// 3. Con beat pausado, toggle reanuda la pista
		state.toggle();
		expect(mockAudioEl.play).toHaveBeenCalledTimes(1);
		expect(state.isPlaying).toBe(true);
	});

	it("detiene la reproducción y reinicia los contadores con stop()", () => {
		// 1. Configura estado de reproducción activo
		state.initAudio();
		state.currentBeat = mockBeat;
		state.isPlaying = true;
		state.currentTime = 50;
		state.progress = 40;

		// 2. Invoca stop
		state.stop();

		// 3. Verifica reseteo total
		expect(mockAudioEl.pause).toHaveBeenCalledTimes(1);
		expect(mockAudioEl.currentTime).toBe(0);
		expect(state.isPlaying).toBe(false);
		expect(state.currentBeat).toBeNull();
		expect(state.currentTime).toBe(0);
		expect(state.progress).toBe(0);
	});

	it("establece el volumen correctamente en el elemento de audio y en el store", () => {
		// 1. Configura nuevo nivel de volumen
		state.initAudio();
		state.setVolume(0.4);

		// 2. Verifica sincronización
		expect(mockAudioEl.volume).toBe(0.4);
		expect(state.volume).toBe(0.4);
	});

	it("desplaza la posición de reproducción (seek) en función de la duración total", () => {
		// 1. Configura duración de 200 segundos
		state.initAudio();
		state.duration = 200;

		// 2. Realiza seek al 50%
		state.seek(50);

		// 3. Verifica posición calculada (100s) y progreso
		expect(mockAudioEl.currentTime).toBe(100);
		expect(state.progress).toBe(50);
	});
});
