// Tipos
import type { ContactFormData, ContactResponse } from "@/components/Contacto/types";

// Envía el formulario de contacto a la API y retorna la respuesta
export async function sendContact(data: ContactFormData): Promise<ContactResponse> {
	// 1. Envía los datos del formulario al endpoint
	const response = await fetch("/api/contact", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	// 2. Parsea la respuesta JSON
	const result: ContactResponse = await response.json();

	// 3. Si hay error del servidor, lanza excepción con el mensaje
	if (!response.ok || !result.success) {
		throw new Error(result.error || "Error al enviar el mensaje");
	}

	// 4. Retorna la respuesta exitosa
	return result;
}
