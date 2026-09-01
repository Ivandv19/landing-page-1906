import type { Context } from "hono";
import { emailService as defaultEmailService } from "../_services/EmailService";
import { rateLimiter as defaultRateLimiter } from "../_services/RateLimiter";
import { turnstileValidator as defaultTurnstileValidator } from "../_services/TurnstileValidator";
import type {
	ApiResponse,
	ContactRequestBody,
	Env,
	IEmailService,
	IRateLimiter,
	ITurnstileValidator,
} from "../_shared/types";

export interface ContactControllerDependencies {
	rateLimiter?: IRateLimiter;
	turnstileValidator?: ITurnstileValidator;
	emailService?: IEmailService;
}

/**
 * Controlador para el endpoint de contacto (POST /api/contact).
 * Orquesta la validación, rate limit, captcha y envío de correo.
 */
export const createContactHandler = (
	deps: ContactControllerDependencies = {},
) => {
	const limiter = deps.rateLimiter || defaultRateLimiter;
	const turnstile = deps.turnstileValidator || defaultTurnstileValidator;
	const email = deps.emailService || defaultEmailService;

	return async (c: Context<{ Bindings: Env }>) => {
		// 1. Obtiene la dirección IP del cliente
		const ip =
			c.req.header("cf-connecting-ip") ||
			c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
			"unknown";

		// 2. Control de tráfico por IP (Rate Limiter)
		if (!limiter.isAllowed(ip)) {
			return c.json<ApiResponse>(
				{
					success: false,
					error: "Demasiadas solicitudes. Intenta de nuevo más tarde.",
				},
				429,
			);
		}

		// 3. Extrae los datos validados del cuerpo de la solicitud
		const {
			name,
			email: userEmail,
			message,
			turnstileToken,
		} = c.req.valid("json" as never) as ContactRequestBody;

		// 4. Verificación de seguridad anti-spam con Cloudflare Turnstile
		const isTurnstileValid = await turnstile.verify(
			turnstileToken,
			c.env.TURNSTILE_SECRET_KEY,
		);

		if (!isTurnstileValid) {
			return c.json<ApiResponse>(
				{
					success: false,
					error:
						"La verificación de seguridad falló. Por favor, inténtalo de nuevo.",
				},
				400,
			);
		}

		// 5. Envío del correo electrónico
		const isSent = await email.send({ name, email: userEmail, message }, c.env);

		if (!isSent) {
			return c.json<ApiResponse>(
				{
					success: false,
					error: "Error al enviar el mensaje. Intenta de nuevo más tarde.",
				},
				500,
			);
		}

		// 6. Respuesta exitosa uniforme
		return c.json<ApiResponse>(
			{
				success: true,
				message: "Mensaje enviado correctamente",
			},
			200,
		);
	};
};

export const handleContact = createContactHandler();
