import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAudioPlayer } from "./useAudioPlayer";
import type { Beat } from "../data/beats";

// Mock beat data
const mockBeat: Beat = {
    id: "1",
    title: "Test Beat",
    bpm: 120,
    key: "C Minor",
    price: 29.99,
    audioUrl: "test-audio.mp3",
    coverUrl: "test-cover.jpg",
    tags: ["trap", "dark"]
};

const mockBeat2: Beat = {
    id: "2",
    title: "Test Beat 2",
    bpm: 140,
    key: "D Major",
    price: 39.99,
    audioUrl: "test-audio-2.mp3",
    coverUrl: "",
    tags: []
};

describe("useAudioPlayer Hook", () => {
    let audioMock: HTMLAudioElement;

    beforeEach(() => {
        vi.restoreAllMocks();
        // Crear un mock manual del elemento Audio
        audioMock = document.createElement("audio");
        audioMock.play = vi.fn().mockResolvedValue(undefined);
        audioMock.pause = vi.fn();
        // Necesitamos mockear la propiedad src y volume para que se puedan leer/escribir
        Object.defineProperty(audioMock, "src", {
            writable: true,
            value: "",
        });
        Object.defineProperty(audioMock, "volume", {
            writable: true,
            value: 0.7,
        });
    });

    it("initializes with default state", () => {
        const { result } = renderHook(() => useAudioPlayer());

        expect(result.current.currentBeat).toBeNull();
        expect(result.current.isPlaying).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.volume).toBe(0.7);
        expect(result.current.progress).toBe(0);
        expect(result.current.currentTime).toBe(0);
        expect(result.current.duration).toBe(0);
    });

    it("toggles play/pause for a new beat", async () => {
        const { result } = renderHook(() => useAudioPlayer());

        // Simular que el ref se adjunta al elemento
        // @ts-ignore - forzamos la asignación para el test
        result.current.audioRef.current = audioMock;

        // Play a new beat
        await act(async () => {
            result.current.togglePlayPause(mockBeat);
        });

        // Should be playing and set as current beat
        expect(result.current.isPlaying).toBe(true);
        expect(result.current.currentBeat).toEqual(mockBeat);
        expect(result.current.audioRef.current?.src).toContain("test-audio.mp3");
        expect(audioMock.play).toHaveBeenCalled();
    });

    it("toggles play/pause for the same beat", async () => {
        const { result } = renderHook(() => useAudioPlayer());
        // @ts-ignore
        result.current.audioRef.current = audioMock;

        // Play first
        await act(async () => {
            result.current.togglePlayPause(mockBeat);
        });
        expect(result.current.isPlaying).toBe(true);

        // Pause
        act(() => {
            result.current.togglePlayPause(mockBeat);
        });
        expect(result.current.isPlaying).toBe(false);
        expect(audioMock.pause).toHaveBeenCalled();

        // Play again
        act(() => {
            result.current.togglePlayPause(mockBeat);
        });
        expect(result.current.isPlaying).toBe(true);
        expect(audioMock.play).toHaveBeenCalledTimes(2);
    });

    it("switches to a different beat", async () => {
        const { result } = renderHook(() => useAudioPlayer());
        // @ts-ignore
        result.current.audioRef.current = audioMock;

        // Play first beat
        await act(async () => {
            result.current.togglePlayPause(mockBeat);
        });
        expect(result.current.currentBeat?.id).toBe("1");

        // Play second beat
        await act(async () => {
            result.current.togglePlayPause(mockBeat2);
        });
        expect(result.current.currentBeat?.id).toBe("2");
        expect(result.current.isPlaying).toBe(true);
        expect(result.current.audioRef.current?.src).toContain("test-audio-2.mp3");
    });

    it("stops playback correctly", async () => {
        const { result } = renderHook(() => useAudioPlayer());
        // @ts-ignore
        result.current.audioRef.current = audioMock;

        // Play
        await act(async () => {
            result.current.togglePlayPause(mockBeat);
        });
        expect(result.current.isPlaying).toBe(true);

        // Stop
        act(() => {
            result.current.stop();
        });

        expect(result.current.isPlaying).toBe(false);
        expect(result.current.currentBeat).toBeNull();
        expect(result.current.progress).toBe(0);
        expect(result.current.currentTime).toBe(0);
        expect(audioMock.pause).toHaveBeenCalled();
    });

    it("updates volume", () => {
        const { result } = renderHook(() => useAudioPlayer());
        // @ts-ignore
        result.current.audioRef.current = audioMock;

        act(() => {
            result.current.handleVolumeChange(0.5);
        });

        expect(result.current.volume).toBe(0.5);
        expect(result.current.audioRef.current?.volume).toBe(0.5);
    });
});
