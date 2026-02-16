import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
    cleanup();
});

// Mock de HTMLMediaElement (Audio/Video) para jsdom
Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
    configurable: true,
    value: vi.fn(),
});

Object.defineProperty(window.HTMLMediaElement.prototype, "load", {
    configurable: true,
    value: vi.fn(),
});

// Mock de IntersectionObserver para animaciones de scroll
class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
});
// Mock de localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        },
        removeItem: (key: string) => {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

// Mock de navigator.language
Object.defineProperty(window.navigator, "language", {
    value: "es-ES",
    configurable: true,
});

// Mock de matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock de Turnstile (Cloudflare) para evitar errores de renderizado en jsdom
vi.mock("@marsidev/react-turnstile", () => ({
    Turnstile: () => null,
}));
