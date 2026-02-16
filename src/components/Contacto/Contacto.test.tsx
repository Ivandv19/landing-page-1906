import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Contacto from "./Contacto";
import { LanguageProvider } from "../../context/LanguageContext";
import { ThemeProvider } from "../../context/ThemeContext";

describe("Contacto Component", () => {
    it("renders the contact section title", () => {
        render(
            <LanguageProvider>
                <ThemeProvider>
                    <Contacto />
                </ThemeProvider>
            </LanguageProvider>
        );

        // Verificamos el título de contacto
        // t.contact.title en es.ts: "Hablemos de tu proyecto"
        expect(screen.getByText(/Hablemos de tu proyecto/i)).toBeInTheDocument();
    });
});
