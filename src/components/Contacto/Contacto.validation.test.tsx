import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contacto from "./Contacto";

// Mock de Cloudflare Turnstile interactivo para pruebas de formulario
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

// Mock de la función fetch global
const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

const renderComponent = () => {
	return render(<Contacto />);
};

// Suite de pruebas para la validación del formulario de contacto y anti-spam
describe("Contacto Form Validation (Validación del Formulario)", () => {
	const user = userEvent.setup();

	beforeEach(() => {
		vi.clearAllMocks();
		fetchMock.mockReset();
	});

	it("renderiza todos los campos del formulario y mantiene el botón de envío deshabilitado inicialmente", () => {
		// 1. Renderiza el formulario
		renderComponent();

		// 2. Verifica la presencia de los campos requeridos y el botón deshabilitado
		expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
		expect(screen.getByTestId("turnstile-mock")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Enviar Mensaje/i }),
		).toBeDisabled();
	});

	it("habilita el botón de envío únicamente después de completar la verificación de Turnstile", async () => {
		// 1. Renderiza el componente
		renderComponent();

		const submitBtn = screen.getByRole("button", { name: /Enviar Mensaje/i });
		expect(submitBtn).toBeDisabled();

		// 2. Simula verificación exitosa de Captcha
		await user.click(screen.getByTestId("turnstile-mock"));

		// 3. Verifica que el botón de envío se active
		expect(submitBtn).toBeEnabled();
	});

	it("previene el envío de la petición cuando los campos obligatorios están vacíos", async () => {
		// 1. Renderiza y activa el botón con el captcha
		renderComponent();
		await user.click(screen.getByTestId("turnstile-mock"));
		const submitBtn = screen.getByRole("button", { name: /Enviar Mensaje/i });

		// 2. Intenta enviar el formulario vacío
		await user.click(submitBtn);

		// 3. Verifica que no se dispare la llamada a la API
		expect(fetchMock).not.toHaveBeenCalled();

		const nameInput = screen.getByLabelText(/Nombre/i) as HTMLInputElement;
		expect(nameInput.checkValidity()).toBe(false);
	});

	it("previene el envío de la petición cuando el formato del email es inválido", async () => {
		// 1. Renderiza y activa el captcha
		renderComponent();
		await user.click(screen.getByTestId("turnstile-mock"));

		// 2. Rellena datos con un email no válido
		const nameInput = screen.getByLabelText(/Nombre/i);
		const emailInput = screen.getByLabelText(/Email/i);
		const messageInput = screen.getByLabelText(/Mensaje/i);
		const submitBtn = screen.getByRole("button", { name: /Enviar Mensaje/i });

		await user.type(nameInput, "Test User");
		await user.type(emailInput, "invalid-email");
		await user.type(
			messageInput,
			"Este es un mensaje válido de prueba superior a diez caracteres",
		);

		// 3. Intenta enviar
		await user.click(submitBtn);

		// 4. Verifica que no se envíe la solicitud
		expect(fetchMock).not.toHaveBeenCalled();
		const emailEl = emailInput as HTMLInputElement;
		expect(emailEl.checkValidity()).toBe(false);
	});

	it("envía exitosamente los datos a la API cuando el formulario es válido", async () => {
		// 1. Prepara respuesta exitosa de la API
		renderComponent();
		fetchMock.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ success: true }),
		});

		// 2. Completa verificación y llena campos válidos
		await user.click(screen.getByTestId("turnstile-mock"));
		await user.type(screen.getByLabelText(/Nombre/i), "Test User");
		await user.type(screen.getByLabelText(/Email/i), "test@example.com");
		await user.type(
			screen.getByLabelText(/Mensaje/i),
			"Este es un mensaje válido de prueba superior a diez caracteres.",
		);

		// 3. Envía el formulario
		await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

		// 4. Verifica llamada HTTP y mensaje visual de confirmación
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(
			"/api/contact",
			expect.objectContaining({
				method: "POST",
				body: expect.stringContaining("test@example.com"),
			}),
		);

		expect(
			await screen.findByText(/Mensaje enviado correctamente/i),
		).toBeInTheDocument();
	});

	it("muestra mensaje de error visual cuando la API del servidor responde con fallo", async () => {
		// 1. Prepara respuesta de error del backend
		renderComponent();
		fetchMock.mockResolvedValueOnce({
			ok: false,
			json: async () => ({ success: false, error: "Server Error" }),
		});

		// 2. Completa campos
		await user.click(screen.getByTestId("turnstile-mock"));
		await user.type(screen.getByLabelText(/Nombre/i), "Test User");
		await user.type(screen.getByLabelText(/Email/i), "test@example.com");
		await user.type(
			screen.getByLabelText(/Mensaje/i),
			"Este es un mensaje válido de prueba superior a diez caracteres.",
		);

		// 3. Envía el formulario
		await user.click(screen.getByRole("button", { name: /Enviar Mensaje/i }));

		// 4. Verifica que se renderice el mensaje de error del servidor
		expect(await screen.findByText(/Server Error/i)).toBeInTheDocument();
	});
});
