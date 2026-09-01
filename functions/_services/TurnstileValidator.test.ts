import { beforeEach, describe, expect, it, vi } from "vitest";
import { TurnstileValidator } from "./TurnstileValidator";

describe("TurnstileValidator (Servicio de Verificación Anti-Spam)", () => {
	let validator: TurnstileValidator;

	beforeEach(() => {
		validator = new TurnstileValidator();
		vi.restoreAllMocks();
	});

	it("retorna true cuando Cloudflare confirma que el token es válido", async () => {
		// 1. Simula respuesta exitosa de la API de Turnstile
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({ success: true }),
			}),
		);

		// 2. Ejecuta la validación
		const result = await validator.verify("valid-token", "valid-secret");

		// 3. Verifica el resultado positivo
		expect(result).toBe(true);
	});

	it("retorna false cuando Cloudflare indica que el token es inválido o expiró", async () => {
		// 1. Simula respuesta de token inválido
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({
					success: false,
					"error-codes": ["invalid-input-response"],
				}),
			}),
		);

		// 2. Ejecuta la validación
		const result = await validator.verify("invalid-token", "valid-secret");

		// 3. Verifica el rechazo
		expect(result).toBe(false);
	});

	it("retorna false inmediatamente si no se provee token o clave secreta", async () => {
		const fetchSpy = vi.fn();
		vi.stubGlobal("fetch", fetchSpy);

		// 1. Ejecuta con parámetros vacíos
		const resWithoutToken = await validator.verify("", "secret");
		const resWithoutSecret = await validator.verify("token", "");

		// 2. Comprueba que no se haya realizado petición de red
		expect(resWithoutToken).toBe(false);
		expect(resWithoutSecret).toBe(false);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("maneja errores de red o excepciones retornando false de forma segura", async () => {
		// 1. Simula caída de red al invocar fetch
		vi.stubGlobal(
			"fetch",
			vi.fn().mockRejectedValue(new Error("Fallo de conexión")),
		);

		// 2. Ejecuta la validación
		const result = await validator.verify("token", "secret");

		// 3. Comprueba que capture el error y retorne false
		expect(result).toBe(false);
	});
});
