import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { zValidator } from "@hono/zod-validator";
import { Resend } from "resend";
import { z } from "zod";
import { buildContactEmail } from "../../src/email/contact-template";

const contactSchema = z.object({
	name: z.string().min(2, "Nombre muy corto").max(100, "Nombre muy largo"),
	email: z.string().email("Email inválido"),
	message: z.string().min(10, "Mensaje muy corto").max(1000, "Mensaje muy largo"),
	turnstileToken: z.string().min(1, "Verificación de humano requerida"),
});

type Env = {
	RESEND_API_KEY: string;
	RESEND_FROM_EMAIL: string;
	CONTACT_EMAIL: string;
	TURNSTILE_SECRET_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

app.post("/api/contact", zValidator("json", contactSchema), async (c) => {
	const { name, email, message, turnstileToken } = c.req.valid("json");

	const secretKey = c.env.TURNSTILE_SECRET_KEY;
	const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

	const verifyResponse = await fetch(verifyUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstileToken)}`,
	});

	const verifyData = await verifyResponse.json() as { success: boolean; [key: string]: unknown };

	if (!verifyData.success) {
		return c.json(
			{
				success: false,
				error: "La verificación de seguridad falló. Por favor, inténtalo de nuevo.",
			},
			400
		);
	}

	const resend = new Resend(c.env.RESEND_API_KEY);

	const { data, error } = await resend.emails.send({
		from: c.env.RESEND_FROM_EMAIL,
		to: c.env.CONTACT_EMAIL,
		replyTo: email,
		subject: `Nuevo mensaje de ${name}`,
		html: buildContactEmail(name, email, message),
	});

	if (error) {
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
});

app.get("/api/health", (c) => {
	return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export const onRequest = handle(app);
