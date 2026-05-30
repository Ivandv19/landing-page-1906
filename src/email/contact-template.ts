function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export function buildContactEmail(name: string, email: string, message: string): string {
	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

	return `
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
						<h2 style="margin: 0;">Nuevo Mensaje de Contacto</h2>
					</div>
					<div class="content">
						<div class="field">
							<div class="label">Nombre:</div>
							<div class="value">${safeName}</div>
						</div>
						<div class="field">
							<div class="label">Email:</div>
							<div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
						</div>
						<div class="field">
							<div class="label">Mensaje:</div>
							<div class="value">${safeMessage}</div>
						</div>
						<div class="footer">
							<p>Enviado desde FluxBeats Landing Page (Verificado por Cloudflare Turnstile)</p>
						</div>
					</div>
				</div>
			</body>
		</html>
	`.trim();
}
