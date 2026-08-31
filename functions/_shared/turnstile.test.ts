import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

// Suite de pruebas para la verificación anti-spam de Cloudflare Turnstile
describe("verifyTurnstile (Validación de Captcha Cloudflare)", () => {
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	it("retorna true cuando la verificación de Cloudflare Turnstile es exitosa", async () => {
		// 1. Simula respuesta exitosa de la API de Turnstile
		globalThis.fetch = vi.fn().mockResolvedValue({
			json: async () => ({ success: true }),
		} as Response);

		// 2. Ejecuta la validación del token
		const result = await verifyTurnstile("valid-token", "secret-key-123");

		// 3. Verifica el resultado positivo y los parámetros enviados al endpoint
		expect(result).toBe(true);
		expect(globalThis.fetch).toHaveBeenCalledWith(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: "secret=secret-key-123&response=valid-token",
			}),
		);
	});

	it("retorna false cuando Cloudflare Turnstile rechaza el token", async () => {
		// 1. Simula fallo en la verificación del token
		globalThis.fetch = vi.fn().mockResolvedValue({
			json: async () => ({ success: false }),
		} as Response);

		// 2. Ejecuta la función
		const result = await verifyTurnstile("invalid-token", "secret-key-123");

		// 3. Verifica que retorne false
		expect(result).toBe(false);
	});

	it("retorna false de forma controlada ante errores de red en la llamada HTTP", async () => {
		// 1. Simula excepción de conexión de red
		globalThis.fetch = vi
			.fn()
			.mockRejectedValue(new Error("Network connection error"));

		// 2. Ejecuta la verificación
		const result = await verifyTurnstile("some-token", "secret-key-123");

		// 3. Verifica que capture el error y retorne false
		expect(result).toBe(false);
	});
});
