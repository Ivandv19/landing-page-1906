import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Env } from "../_shared/types";
import { EmailService } from "./EmailService";

// Mock del SDK de Resend utilizando una clase constructora
const mockSend = vi.fn();
vi.mock("resend", () => ({
	Resend: class {
		emails = {
			send: mockSend,
		};
	},
}));

describe("EmailService (Servicio de Envío de Correos)", () => {
	let service: EmailService;
	const mockEnv: Env = {
		RESEND_API_KEY: "re_test_key",
		RESEND_FROM_EMAIL: "contacto@fluxbeats.com",
		CONTACT_EMAIL: "destino@fluxbeats.com",
		TURNSTILE_SECRET_KEY: "0x4AAAAAA",
	};

	beforeEach(() => {
		service = new EmailService();
		mockSend.mockReset();
	});

	it("envía el correo exitosamente cuando la API de Resend responde sin errores", async () => {
		// 1. Configura respuesta positiva de Resend
		mockSend.mockResolvedValueOnce({ data: { id: "email-123" }, error: null });

		// 2. Ejecuta el envío
		const result = await service.send(
			{
				name: "Carlos Flow",
				email: "carlos@flow.com",
				message: "Me interesa una licencia WAV.",
			},
			mockEnv,
		);

		// 3. Comprueba el éxito y los parámetros enviados
		expect(result).toBe(true);
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: "contacto@fluxbeats.com",
				to: "destino@fluxbeats.com",
				replyTo: "carlos@flow.com",
				subject: "Nuevo mensaje de contacto: Carlos Flow",
			}),
		);
	});

	it("retorna false cuando Resend devuelve un objeto de error", async () => {
		// 1. Simula error en la API de Resend
		mockSend.mockResolvedValueOnce({
			data: null,
			error: { message: "Invalid API key" },
		});

		// 2. Ejecuta el envío
		const result = await service.send(
			{
				name: "Usuario Error",
				email: "user@error.com",
				message: "Mensaje de prueba",
			},
			mockEnv,
		);

		// 3. Verifica que retorne false
		expect(result).toBe(false);
	});

	it("retorna false inmediatamente si faltan variables de entorno requeridas", async () => {
		// 1. Pasa entorno sin API key
		const incompleteEnv = { ...mockEnv, RESEND_API_KEY: "" };

		// 2. Ejecuta el envío
		const result = await service.send(
			{
				name: "Incompleto",
				email: "inc@test.com",
				message: "Prueba sin credenciales",
			},
			incompleteEnv,
		);

		// 3. Verifica que se aborte la operación
		expect(result).toBe(false);
		expect(mockSend).not.toHaveBeenCalled();
	});
});
