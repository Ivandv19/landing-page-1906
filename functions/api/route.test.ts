import { beforeEach, describe, expect, it, vi } from "vitest";
import * as emailModule from "../_shared/email";
import * as rateLimitModule from "../_shared/rateLimit";
import * as turnstileModule from "../_shared/turnstile";
import { app } from "./[[route]]";

// Mocks de dependencias externas
vi.mock("../_shared/turnstile", () => ({
	verifyTurnstile: vi.fn(),
}));

vi.mock("../_shared/email", () => ({
	sendContactEmail: vi.fn(),
}));

vi.mock("../_shared/rateLimit", () => ({
	checkRateLimit: vi.fn(),
}));

// Suite de pruebas para las rutas HTTP de la API serverless en Hono
describe("Hono API routes (Rutas del Backend)", () => {
	const mockEnv = {
		RESEND_API_KEY: "test-resend-key",
		RESEND_FROM_EMAIL: "from@example.com",
		CONTACT_EMAIL: "contact@example.com",
		TURNSTILE_SECRET_KEY: "test-turnstile-secret",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("GET /api/health retorna estado 200 y JSON con status ok", async () => {
		// 1. Ejecuta la petición al endpoint de salud
		const res = await app.request("/api/health");

		// 2. Verifica código de estado y cuerpo JSON
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data).toEqual({ status: "ok" });
	});

	it("POST /api/contact retorna 400 cuando el cuerpo no cumple el esquema Zod", async () => {
		// 1. Permite rate limit
		vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue(true);

		// 2. Envía un cuerpo con datos inválidos (nombre muy corto, email no válido)
		const res = await app.request(
			"/api/contact",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "A",
					email: "invalid-email",
					message: "short",
					turnstileToken: "",
				}),
			},
			mockEnv,
		);

		// 3. Verifica respuesta 400 Bad Request
		expect(res.status).toBe(400);
	});

	it("POST /api/contact retorna 429 cuando se excede la tasa de peticiones", async () => {
		// 1. Simula límite de peticiones excedido
		vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue(false);

		// 2. Realiza la solicitud
		const res = await app.request(
			"/api/contact",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "Valid Name",
					email: "valid@example.com",
					message: "This is a valid message for testing.",
					turnstileToken: "valid-token",
				}),
			},
			mockEnv,
		);

		// 3. Verifica código 429 Too Many Requests y mensaje informativo
		expect(res.status).toBe(429);
		const data = await res.json();
		expect(data.error).toContain("Demasiadas solicitudes");
	});

	it("POST /api/contact retorna 400 cuando falla la verificación de Turnstile", async () => {
		// 1. Simula token de Turnstile inválido
		vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue(true);
		vi.mocked(turnstileModule.verifyTurnstile).mockResolvedValue(false);

		// 2. Realiza la solicitud
		const res = await app.request(
			"/api/contact",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "Valid Name",
					email: "valid@example.com",
					message: "This is a valid message for testing.",
					turnstileToken: "invalid-token",
				}),
			},
			mockEnv,
		);

		// 3. Verifica código 400 y mensaje de fallo de verificación
		expect(res.status).toBe(400);
		const data = await res.json();
		expect(data.error).toContain("verificación de seguridad falló");
	});

	it("POST /api/contact retorna 500 cuando el servicio de correo falla", async () => {
		// 1. Simula que el envío de correo retorna false
		vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue(true);
		vi.mocked(turnstileModule.verifyTurnstile).mockResolvedValue(true);
		vi.mocked(emailModule.sendContactEmail).mockResolvedValue(false);

		// 2. Realiza la solicitud
		const res = await app.request(
			"/api/contact",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "Valid Name",
					email: "valid@example.com",
					message: "This is a valid message for testing.",
					turnstileToken: "valid-token",
				}),
			},
			mockEnv,
		);

		// 3. Verifica código 500 Internal Server Error
		expect(res.status).toBe(500);
		const data = await res.json();
		expect(data.error).toContain("Error al enviar el mensaje");
	});

	it("POST /api/contact retorna 200 y mensaje de confirmación cuando el envío es exitoso", async () => {
		// 1. Simula flujo completo exitoso
		vi.mocked(rateLimitModule.checkRateLimit).mockReturnValue(true);
		vi.mocked(turnstileModule.verifyTurnstile).mockResolvedValue(true);
		vi.mocked(emailModule.sendContactEmail).mockResolvedValue(true);

		// 2. Realiza la solicitud
		const res = await app.request(
			"/api/contact",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: "Valid Name",
					email: "valid@example.com",
					message: "This is a valid message for testing.",
					turnstileToken: "valid-token",
				}),
			},
			mockEnv,
		);

		// 3. Verifica código 200 y respuesta exitosa
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
		expect(data.message).toBe("Mensaje enviado correctamente");
	});
});
