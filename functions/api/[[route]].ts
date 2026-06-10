// Hono
import { Hono } from "hono";
// Cloudflare Pages
import { handle } from "hono/cloudflare-pages";
// Validación
import { zValidator } from "@hono/zod-validator";
// Compartidos
import { checkRateLimit } from "../_shared/rateLimit";
import { verifyTurnstile } from "../_shared/turnstile";
import { sendContactEmail } from "../_shared/email";
import { contactSchema } from "../_shared/contactSchema";

// Variables de entorno del worker
type Env = {
	RESEND_API_KEY: string;
	RESEND_FROM_EMAIL: string;
	CONTACT_EMAIL: string;
	TURNSTILE_SECRET_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

// POST /api/contact - Envía un mensaje de contacto con verificación Turnstile
app.post("/api/contact", zValidator("json", contactSchema), async (c) => {
	// 1. Obtiene la IP del cliente para rate limiting
	const ip = c.req.header("cf-connecting-ip")
		|| c.req.header("x-forwarded-for")?.split(",")[0]?.trim()
		|| "unknown";

	// 2. Verifica que no haya excedido el límite de solicitudes
	if (!checkRateLimit(ip)) {
		return c.json(
			{ success: false, error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
			429,
		);
	}

	// 3. Extrae y valida los datos del body
	const { name, email, message, turnstileToken } = c.req.valid("json");

	// 4. Verifica el token de Turnstile con Cloudflare
	const turnstileOk = await verifyTurnstile(turnstileToken, c.env.TURNSTILE_SECRET_KEY);
	if (!turnstileOk) {
		return c.json(
			{ success: false, error: "La verificación de seguridad falló. Por favor, inténtalo de nuevo." },
			400,
		);
	}

	// 5. Envía el email usando Resend
	const emailSent = await sendContactEmail({ name, email, message }, c.env);
	if (!emailSent) {
		return c.json(
			{ success: false, error: "Error al enviar el mensaje. Intenta de nuevo más tarde." },
			500,
		);
	}

	// 6. Responde con éxito
	return c.json({
		success: true,
		message: "Mensaje enviado correctamente",
	});
});

// GET /api/health - Health check del worker
app.get("/api/health", (c) => c.json({ status: "ok" }));

// Exporta el manejador para Cloudflare Pages Functions
export const onRequest = handle(app);
