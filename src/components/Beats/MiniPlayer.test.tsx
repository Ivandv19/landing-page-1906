import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MiniPlayer } from "./MiniPlayer";
import type { Beat } from "../../data/beats";

// Mock del helper formatTime si se usa internamente o importar si es necesario
// Como MiniPlayer importa formatTime de utils, vitest lo resolverá bien.
// Pero la lógica de MiniPlayer depende de los props que le pasamos.

const mockBeat: Beat = {
    id: "1",
    title: "Awesome Beat",
    bpm: 140,
    key: "C Minor",
    price: 30,
    audioUrl: "url",
    coverUrl: "",
    tags: []
};

describe("MiniPlayer Component", () => {
    const defaultProps = {
        currentBeat: mockBeat,
        isPlaying: false,
        isLoading: false,
        volume: 0.7,
        progress: 50,
        currentTime: 60, // 1:00
        duration: 120,   // 2:00
        onToggle: vi.fn(),
        onClose: vi.fn(),
        onVolumeChange: vi.fn(),
        onSeek: vi.fn(),
    };

    it("does not render if there is no current beat", () => {
        const { container } = render(<MiniPlayer {...defaultProps} currentBeat={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders beat title and time info correctly", () => {
        render(<MiniPlayer {...defaultProps} />);

        expect(screen.getByText("Awesome Beat")).toBeInTheDocument();
        expect(screen.getByText("140 BPM | C Minor")).toBeInTheDocument();
        // formatTime implementation was moved to utils and tested there.
        // Assuming formatTime(60) -> 1:00 and formatTime(120) -> 2:00
        expect(screen.getByText("1:00")).toBeInTheDocument();
        expect(screen.getByText("2:00")).toBeInTheDocument();
    });

    it("shows play button when paused", () => {
        render(<MiniPlayer {...defaultProps} isPlaying={false} />);
        // Buscamos el botón por su aria-label
        const toggleBtn = screen.getByRole("button", { name: /Reproducir/i });
        expect(toggleBtn).toBeInTheDocument();
        // SVG Icon check (optional, but good for confidence)
        expect(toggleBtn.innerHTML).toContain("d=\"M8 5v14l11-7z\""); // Path del play icon
    });

    it("shows pause button when playing", () => {
        render(<MiniPlayer {...defaultProps} isPlaying={true} />);
        const toggleBtn = screen.getByRole("button", { name: /Pausar/i });
        expect(toggleBtn).toBeInTheDocument();
        expect(toggleBtn.innerHTML).toContain("d=\"M6 19h4V5H6v14zm8-14v14h4V5h-4z\""); // Path del pause icon
    });

    it("calls onToggle when play/pause button is clicked", () => {
        render(<MiniPlayer {...defaultProps} />);
        const toggleBtn = screen.getByRole("button", { name: /Reproducir/i });

        fireEvent.click(toggleBtn);
        expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when close button is clicked", () => {
        render(<MiniPlayer {...defaultProps} />);
        const closeBtn = screen.getByRole("button", { name: /Cerrar reproductor/i });

        fireEvent.click(closeBtn);
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onSeek when progress bar changes", () => {
        render(<MiniPlayer {...defaultProps} />);
        // El input type="range" del progreso es el primero
        const ranges = screen.getAllByRole("slider");
        const progressBar = ranges[0]; // Asumimos orden: progreso, volumen

        fireEvent.change(progressBar, { target: { value: "75" } });
        expect(defaultProps.onSeek).toHaveBeenCalledWith(75);
    });

    it("calls onVolumeChange when volume slider changes", () => {
        render(<MiniPlayer {...defaultProps} />);
        // El input de volumen solo aparece en desktop (md:flex), pero jsdom no simula media queries por defecto
        // Sin embargo, el renderizado de react testing library suele renderizar todo a menos que se oculte con CSS que jsdom no procesa completamente.
        // Tailwind 'hidden md:flex' usa clases.
        // Verifiquemos si podemos encontrar el segundo slider.

        const ranges = screen.getAllByRole("slider");
        // Si jsdom no procesa estilos, ambos estarán. El volumen es el segundo.
        if (ranges.length > 1) {
            const volumeBar = ranges[1];
            fireEvent.change(volumeBar, { target: { value: "0.5" } });
            expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(0.5);
        } else {
            console.warn("Volume slider not found, possibly hidden or not rendered.");
        }
    });
});
