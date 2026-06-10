// Email - Envío de correos mediante Resend
import { Resend } from "resend";
import { buildContactEmail } from "../../src/email/contact-template";

// Interfaz con los datos necesarios para enviar un email de contacto
export interface ContactEmailData {
	name: string;
	email: string;
	message: string;
}

// Variables de entorno requeridas
export interface EmailEnv {
	RESEND_API_KEY: string;
	RESEND_FROM_EMAIL: string;
	CONTACT_EMAIL: string;
}

// Envía un mensaje de contacto por email usando Resend
export async function sendContactEmail(
	data: ContactEmailData,
	env: EmailEnv,
): Promise<boolean> {
	try {
		// 1. Inicializa Resend con la API key del entorno
		const resend = new Resend(env.RESEND_API_KEY);
		// 2. Envía el email con los datos del formulario y la plantilla HTML
		const { error } = await resend.emails.send({
			from: env.RESEND_FROM_EMAIL,
			to: env.CONTACT_EMAIL,
			replyTo: data.email,
			subject: `Nuevo mensaje de ${data.name}`,
			html: buildContactEmail(data.name, data.email, data.message),
		});
		// 3. Si hay error, lo registra y retorna false
		if (error) {
			console.error("[Email] Error sending:", error);
			return false;
		}
		// 4. Si todo salió bien, retorna true
		return true;
	} catch (err) {
		// 5. Captura excepciones inesperadas de red o API
		console.error("[Email] Exception:", err);
		return false;
	}
}
