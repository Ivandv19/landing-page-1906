import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	type ContactEmailData,
	type EmailEnv,
	sendContactEmail,
} from "./email";

const mockSend = vi.fn();

// Mock del cliente de Resend
vi.mock("resend", () => {
	return {
		Resend: class {
			emails = {
				send: mockSend,
			};
		},
	};
});

// Suite de pruebas para el servicio de envío de correos con Resend
describe("sendContactEmail (Servicio de Envío de Correos)", () => {
	const mockData: ContactEmailData = {
		name: "Carlos Flow",
		email: "carlos@example.com",
		message: "Hola, me interesa la licencia Premium.",
	};

	const mockEnv: EmailEnv = {
		RESEND_API_KEY: "re_test_12345",
		RESEND_FROM_EMAIL: "contacto@fluxbeats.mgdc.site",
		CONTACT_EMAIL: "admin@fluxbeats.mgdc.site",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("envía el correo exitosamente mediante la API de Resend", async () => {
		// 1. Configura el mock para simular envío exitoso
		mockSend.mockResolvedValue({ data: { id: "email_123" }, error: null });

		// 2. Ejecuta el envío
		const result = await sendContactEmail(mockData, mockEnv);

		// 3. Verifica el resultado positivo y los parámetros del mensaje
		expect(result).toBe(true);
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: mockEnv.RESEND_FROM_EMAIL,
				to: mockEnv.CONTACT_EMAIL,
				replyTo: mockData.email,
				subject: "Nuevo mensaje de Carlos Flow",
			}),
		);
	});

	it("retorna false cuando Resend devuelve un objeto de error", async () => {
		// 1. Configura el mock con error de API Key inválida
		mockSend.mockResolvedValue({
			data: null,
			error: { message: "Invalid API Key", name: "validation_error" },
		});

		// 2. Ejecuta la función
		const result = await sendContactEmail(mockData, mockEnv);

		// 3. Verifica que retorne false
		expect(result).toBe(false);
	});

	it("retorna false y captura excepciones controladamente si el cliente arroja un error", async () => {
		// 1. Configura el mock para arrojar excepción de servidor caído
		mockSend.mockRejectedValue(new Error("Resend server down"));

		// 2. Ejecuta la función
		const result = await sendContactEmail(mockData, mockEnv);

		// 3. Verifica que la excepción sea atrapada y retorne false
		expect(result).toBe(false);
	});
});
