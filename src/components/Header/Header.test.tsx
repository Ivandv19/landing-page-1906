import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { LanguageProvider } from "../../context/LanguageContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", () => {
    it("renders the logo correctly", () => {
        render(
            <MemoryRouter>
                <LanguageProvider>
                    <ThemeProvider>
                        <Header />
                    </ThemeProvider>
                </LanguageProvider>
            </MemoryRouter>
        );

        const logo = screen.getByText(/Flux/i);
        expect(logo).toBeInTheDocument();
    });
});
