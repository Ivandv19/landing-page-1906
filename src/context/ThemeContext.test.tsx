import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";

// Componente de prueba
const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe("ThemeContext", () => {
    const user = userEvent.setup();

    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = "";
        vi.restoreAllMocks();
    });

    it("defaults to light theme", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    it("toggles theme correctly", async () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        // Initial check
        expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

        // Click toggle
        const btn = screen.getByRole("button", { name: /Toggle Theme/i });
        await user.click(btn);

        // Check update
        expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
        expect(document.documentElement).toHaveClass("dark");
        expect(localStorage.getItem("theme")).toBe("dark");

        // Click toggle again
        await user.click(btn);

        // Check revert
        expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
        expect(document.documentElement).not.toHaveClass("dark");
        expect(localStorage.getItem("theme")).toBe("light");
    });
});
