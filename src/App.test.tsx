import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

describe("App Smoke Test", () => {
    it("renders without crashing", () => {
        const { container } = render(
            <LanguageProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </LanguageProvider>
        );
        expect(container).toBeTruthy();
    });
});
