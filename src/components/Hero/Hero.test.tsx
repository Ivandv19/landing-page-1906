import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";
import { LanguageProvider } from "../../context/LanguageContext";
import { ThemeProvider } from "../../context/ThemeContext";

describe("Hero Component", () => {
    it("renders the hero content correctly", () => {
        render(
            <LanguageProvider>
                <ThemeProvider>
                    <Hero />
                </ThemeProvider>
            </LanguageProvider>
        );

        // Verificamos el título del Hero (usando regex para flexibilidad con traducciones)
        // t.hero.title en es.ts: "Beats que fluyen con tu contenido."
        expect(screen.getByText(/Beats que fluyen/i)).toBeInTheDocument();
    });
});
