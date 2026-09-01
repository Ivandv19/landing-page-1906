import { Resend } from "resend";
import { buildContactEmail } from "../../src/email/contact-template";
import type { ContactPayload, Env, IEmailService } from "../_shared/types";

/**
 * Servicio para el envío de correos electrónicos transaccionales usando Resend.
 */
export class EmailService implements IEmailService {
	/**
	 * Envía un correo de notificación de contacto al destinatario configurado.
	 */
	public async send(data: ContactPayload, env: Env): Promise<boolean> {
		// 1. Valida que las variables de entorno necesarias existan
		if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.CONTACT_EMAIL) {
			console.error("[EmailService] Faltan variables de entorno para Resend.");
			return false;
		}

		try {
			// 2. Inicializa el cliente de Resend
			const resend = new Resend(env.RESEND_API_KEY);

			// 3. Genera la plantilla HTML del mensaje
			const html = buildContactEmail(data.name, data.email, data.message);

			// 4. Envía el correo mediante la API de Resend
			const { error } = await resend.emails.send({
				from: env.RESEND_FROM_EMAIL,
				to: env.CONTACT_EMAIL,
				replyTo: data.email,
				subject: `Nuevo mensaje de contacto: ${data.name}`,
				html,
			});

			if (error) {
				console.error("[EmailService] Error retornado por Resend:", error);
				return false;
			}

			return true;
		} catch (err) {
			console.error("[EmailService] Excepción al enviar correo:", err);
			return false;
		}
	}
}

// Instancia singleton por defecto
export const emailService = new EmailService();
