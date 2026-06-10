// Turnstile - Verifica el token de Cloudflare Turnstile
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Verifica que el token de Turnstile sea válido
export async function verifyTurnstile(
	token: string,
	secretKey: string,
): Promise<boolean> {
	// 1. Construye el body con el secret y el token
	const body = new URLSearchParams({
		secret: secretKey,
		response: token,
	});

	try {
		// 2. Envía la solicitud de verificación a Cloudflare
		const res = await fetch(VERIFY_URL, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: body.toString(),
		});
		// 3. Parsea la respuesta y retorna si el token es válido
		const data = await res.json() as { success: boolean };
		return data.success;
	} catch {
		// 4. En caso de error de red, retorna false
		return false;
	}
}
