import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

// Suite de pruebas para el esquema de validación del formulario de contacto
describe("contactSchema (Validación Zod de Contacto)", () => {
	const validData = {
		name: "John Doe",
		email: "john@example.com",
		message: "Hola, me gustaría comprar una licencia exclusiva para un beat.",
		turnstileToken: "cf-turnstile-dummy-token",
	};

	it("valida exitosamente los datos de contacto cuando son correctos", () => {
		// 1. Ejecuta el parseo con datos válidos
		const result = contactSchema.safeParse(validData);

		// 2. Verifica que sea exitoso y conserve la estructura
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual(validData);
		}
	});

	it("falla cuando el nombre es muy corto o está vacío", () => {
		// 1. Ejecuta la validación con un nombre de 1 solo caracter
		const result = contactSchema.safeParse({
			...validData,
			name: "J",
		});

		// 2. Verifica el rechazo y el mensaje de error correspondiente
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe("Nombre muy corto");
		}
	});

	it("falla cuando el nombre supera el límite máximo (> 100 caracteres)", () => {
		// 1. Ejecuta la validación con nombre de 101 caracteres
		const result = contactSchema.safeParse({
			...validData,
			name: "A".repeat(101),
		});

		// 2. Verifica que rechace por longitud excesiva
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe("Nombre muy largo");
		}
	});

	it("falla cuando el formato de correo electrónico es inválido", () => {
		// 1. Ejecuta la validación con un email sin formato válido
		const result = contactSchema.safeParse({
			...validData,
			email: "invalid-email-address",
		});

		// 2. Verifica que se capture el error de formato de email
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe("Email inválido");
		}
	});

	it("falla cuando el mensaje es menor a 10 caracteres", () => {
		// 1. Ejecuta la validación con un mensaje demasiado breve
		const result = contactSchema.safeParse({
			...validData,
			message: "Hola",
		});

		// 2. Verifica el mensaje de error de longitud mínima
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe("Mensaje muy corto");
		}
	});

	it("falla cuando el mensaje supera los 1000 caracteres permitidos", () => {
		// 1. Ejecuta la validación con un mensaje de 1001 caracteres
		const result = contactSchema.safeParse({
			...validData,
			message: "A".repeat(1001),
		});

		// 2. Verifica el rechazo por mensaje excesivamente largo
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe("Mensaje muy largo");
		}
	});

	it("falla cuando el token de Cloudflare Turnstile está vacío", () => {
		// 1. Ejecuta la validación sin el token anti-bot
		const result = contactSchema.safeParse({
			...validData,
			turnstileToken: "",
		});

		// 2. Verifica que se exija la verificación de captcha
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				"Verificación de humano requerida",
			);
		}
	});
});
