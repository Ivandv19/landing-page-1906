import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BeatsSection from "./Beats";
import { LanguageProvider } from "../../context/LanguageContext";
import { ThemeProvider } from "../../context/ThemeContext";

describe("BeatsSection Component", () => {
    it("renders the beats section title", () => {
        render(
            <LanguageProvider>
                <ThemeProvider>
                    <BeatsSection />
                </ThemeProvider>
            </LanguageProvider>
        );

        // Verificamos el título de la sección de beats
        // t.beats.title en es.ts: "Catálogo Reciente"
        expect(screen.getByText(/Catálogo Reciente/i)).toBeInTheDocument();
    });
});
