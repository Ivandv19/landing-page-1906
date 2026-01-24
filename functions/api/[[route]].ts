import { Hono } from "hono";
import { cors } from "hono/cors";
import { Resend } from "resend";
import { z } from "zod";

// Schema de validación
const contactSchema = z.object({
	name: z.string().min(2, "Nombre muy corto").max(100, "Nombre muy largo"),
	email: z.string().email("Email inválido"),
	message: z.string().min(10, "Mensaje muy corto").max(1000, "Mensaje muy largo"),
});

type Env = {
	RESEND_API_KEY: string;
	CONTACT_EMAIL: string;
	TURNSTILE_SECRET_KEY: string;
};

type PagesFunction<Env = unknown> = (context: {
	request: Request;
	env: Env;
	params: Record<string, string>;
	waitUntil: (promise: Promise<unknown>) => void;
	next: () => Promise<Response>;
	data: Record<string, unknown>;
}) => Response | Promise<Response>;

const app = new Hono<{ Bindings: Env }>();

// CORS para permitir requests desde tu dominio
app.use(
	"/api/*",
	cors({
		origin: ["http://localhost:5173", "https://landing-page.mgdc.site", "https://mgdc.site"],
		credentials: true,
	})
);

// Endpoint de contacto
app.post("/api/contact", async (c) => {
	try {
		console.log("Contact endpoint hit");
		
		// Parsear y validar datos
		const body = await c.req.json();
		
		const result = contactSchema.extend({
			turnstileToken: z.string().min(1, "Verificación de humano requerida"),
		}).safeParse(body);

		if (!result.success) {
			console.log("Validation failed:", result.error);
			return c.json(
				{
					success: false,
					error: "Datos inválidos",
					details: result.error.issues,
				},
				400
			);
		}

		const { name, email, message, turnstileToken } = result.data;

		// Verificar Turnstile
		const secretKey = c.env.TURNSTILE_SECRET_KEY;
		const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
		
		const verifyResponse = await fetch(verifyUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`,
		});

		const verifyData: any = await verifyResponse.json();
		
		if (!verifyData.success) {
			console.error("Turnstile verification failed:", verifyData);
			return c.json(
				{
					success: false,
					error: "La verificación de seguridad falló. Por favor, inténtalo de nuevo.",
				},
				400
			);
		}

		// Verificar que las env vars existan
		if (!c.env.RESEND_API_KEY) {
			console.error("RESEND_API_KEY not found");
			return c.json(
				{
					success: false,
					error: "Configuración del servidor incompleta",
				},
				500
			);
		}

		// Inicializar Resend
		const resend = new Resend(c.env.RESEND_API_KEY);

		// Enviar email
		const { data, error } = await resend.emails.send({
			from: "Contacto FluxBeats <onboarding@resend.dev>",
			to: "ivangtx19@gmail.com",
			replyTo: email,
			subject: `Nuevo mensaje de ${name}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
							body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
							.content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
							.field { margin-bottom: 20px; }
							.label { font-weight: bold; color: #4b5563; margin-bottom: 5px; }
							.value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #667eea; }
							.footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h2 style="margin: 0;">🎵 Nuevo Mensaje de Contacto</h2>
							</div>
							<div class="content">
								<div class="field">
									<div class="label">👤 Nombre:</div>
									<div class="value">${name}</div>
								</div>
								<div class="field">
									<div class="label">📧 Email:</div>
									<div class="value"><a href="mailto:${email}">${email}</a></div>
								</div>
								<div class="field">
									<div class="label">💬 Mensaje:</div>
									<div class="value">${message.replace(/\n/g, "<br>")}</div>
								</div>
								<div class="footer">
									<p>Enviado desde FluxBeats Landing Page (Verificado por Cloudflare Turnstile)</p>
								</div>
							</div>
						</div>
					</body>
				</html>
			`,
		});

		if (error) {
			console.error("Resend error:", error);
			return c.json(
				{
					success: false,
					error: "Error al enviar el mensaje",
					details: error,
				},
				500
			);
		}

		return c.json({
			success: true,
			message: "Mensaje enviado correctamente",
			id: data?.id,
		});
	} catch (error) {
		console.error("Server error:", error);
		return c.json(
			{
				success: false,
				error: "Error interno del servidor",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			500
		);
	}
});

// Health check
app.get("/api/health", (c) => {
	return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Export para Cloudflare Pages Functions
export const onRequest: PagesFunction<Env> = async (context) => {
	return app.fetch(context.request, context.env, context as any);
};
