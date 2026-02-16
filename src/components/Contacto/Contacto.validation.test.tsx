import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Contacto from "./Contacto";
import { LanguageProvider } from "../../context/LanguageContext";
import { ThemeProvider } from "../../context/ThemeContext";

// Override Turnstile mock locally to allow interaction
vi.mock("@marsidev/react-turnstile", () => ({
    Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
        <button
            type="button"
            data-testid="turnstile-mock"
            onClick={() => onSuccess("fake-token")}
        >
            Verify Turnstile
        </button>
    ),
}));

// Mock fetch
const fetchMock = vi.fn();
global.fetch = fetchMock;

const renderComponent = () => {
    return render(
        <LanguageProvider>
            <ThemeProvider>
                <Contacto />
            </ThemeProvider>
        </LanguageProvider>
    );
};

describe("Contacto Form Validation", () => {
    const user = userEvent.setup();

    beforeEach(() => {
        vi.clearAllMocks();
        fetchMock.mockReset();
    });

    it("renders all form fields correctly", () => {
        renderComponent();

        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
        expect(screen.getByTestId("turnstile-mock")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Enviar Mensaje/i })).toBeDisabled(); // Disabled initially due to no token
    });

    it("enables submit button only after Turnstile verification", async () => {
        renderComponent();

        const submitBtn = screen.getByRole("button", { name: /Enviar Mensaje/i });
        expect(submitBtn).toBeDisabled();

        // Verify turnstile
        await user.click(screen.getByTestId("turnstile-mock"));

        expect(submitBtn).toBeEnabled();
    });

    it("prevents submission with empty required fields", async () => {
        renderComponent();

        // Enable button first
        await user.click(screen.getByTestId("turnstile-mock"));
        const submitBtn = screen.getByRole("button", { name: /Enviar Mensaje/i });

        // Try to submit empty form
        await user.click(submitBtn);

        // Fetch should NOT be called because HTML5 validation stops it
        // Note: jsdom doesn't fully simulate HTML5 validation blocking submit event, 
        // but userEvent.click on a submit button usually respects 'required' attribute checks if implemented.
        // However, checking if fetch was called is the safest bet.
        expect(fetchMock).not.toHaveBeenCalled();

        // Optionally check validity (manual check as UI feedback isn't easy to test in jsdom)
        const nameInput = screen.getByLabelText(/Nombre/i) as HTMLInputElement;
        expect(nameInput.checkValidity()).toBe(false);
    });

    it("prevents submission with invalid email", async () => {
        renderComponent();

        // Enable button
        await user.click(screen.getByTestId("turnstile-mock"));

        // Fill invalid email
        const nameInput = screen.getByLabelText(/Nombre/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const messageInput = screen.getByLabelText(/Mensaje/i);
        const submitBtn = screen.getByRole("button", { name: /Enviar Mensaje/i });

        await user.type(nameInput, "Test User");
        await user.type(emailInput, "invalid-email");
        await user.type(messageInput, "This is a valid message longer than 10 chars");

        // Try submit
        await user.click(submitBtn);

        // Fetch should NOT be called
        expect(fetchMock).not.toHaveBeenCalled();
        const emailEl = emailInput as HTMLInputElement;
        expect(emailEl.checkValidity()).toBe(false);
    });

    it("submits successfully with valid data", async () => {
        renderComponent();

        // Setup mock response
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        // Enable button
        await user.click(screen.getByTestId("turnstile-mock"));

        // Fill valid data
        await user.type(screen.getByLabelText(/Nombre/i), "Test User");
        await user.type(screen.getByLabelText(/Email/i), "test@example.com");
        await user.type(screen.getByLabelText(/Mensaje/i), "This is a valid message testing the form.");

        // Submit
        await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

        // Check loading state (briefly) or final success
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
            method: "POST",
            body: expect.stringContaining("test@example.com")
        }));

        // Verify success message
        expect(await screen.findByText(/Mensaje enviado correctamente/i)).toBeInTheDocument();
    });

    it("handles server API errors gracefully", async () => {
        renderComponent();

        // Setup mock error response
        fetchMock.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ success: false, error: "Server Error" }),
        });

        // Enable button
        await user.click(screen.getByTestId("turnstile-mock"));

        // Fill valid data
        await user.type(screen.getByLabelText(/Nombre/i), "Test User");
        await user.type(screen.getByLabelText(/Email/i), "test@example.com");
        await user.type(screen.getByLabelText(/Mensaje/i), "This is a valid message testing the form.");

        // Submit
        await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

        // Verify error message
        expect(await screen.findByText(/Server Error/i)).toBeInTheDocument();
    });
});
