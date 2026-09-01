import { expect, test } from "@playwright/test";

test.describe("E2E: Formulario de Contacto", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Navega a la página de inicio
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("los campos del formulario permiten la escritura y reflejan los datos ingresados", async ({
		page,
	}) => {
		const contactSection = page.locator("#contacto");
		await expect(contactSection).toBeVisible();

		// 1. Llena los campos del formulario
		const nameInput = contactSection.locator('input[name="name"]');
		const emailInput = contactSection.locator('input[name="email"]');
		const msgInput = contactSection.locator('textarea[name="message"]');

		await nameInput.fill("Productor Prueba");
		await emailInput.fill("productor@example.com");
		await msgInput.fill("Mensaje de prueba para compra de licencia ilimitada.");

		// 2. Comprueba que los valores se hayan actualizado
		await expect(nameInput).toHaveValue("Productor Prueba");
		await expect(emailInput).toHaveValue("productor@example.com");
		await expect(msgInput).toHaveValue(
			"Mensaje de prueba para compra de licencia ilimitada.",
		);
	});

	test("muestra mensaje de éxito al enviar el formulario correctamente con mock de API", async ({
		page,
	}) => {
		// 1. Intercepta la petición POST a /api/contact
		await page.route("**/api/contact", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({ success: true, message: "Mensaje enviado" }),
			});
		});

		const contactSection = page.locator("#contacto");

		// 2. Llena los campos
		await contactSection.locator('input[name="name"]').fill("Productor VIP");
		await contactSection
			.locator('input[name="email"]')
			.fill("vip@producer.com");
		await contactSection
			.locator('textarea[name="message"]')
			.fill("Me interesa una producción personalizada completa.");

		// 3. Simula la presencia de token Turnstile si el botón estuviera deshabilitado
		const submitBtn = contactSection.getByRole("button", {
			name: /enviar mensaje/i,
		});

		// Si el botón requiere token de turnstile, inyectamos el estado en el componente o forzamos submit
		if (await submitBtn.isDisabled()) {
			await page.evaluate(() => {
				const form = document.querySelector("#contacto form");
				if (form) {
					form.dispatchEvent(
						new Event("submit", { bubbles: true, cancelable: true }),
					);
				}
			});
		} else {
			await submitBtn.click();
		}

		// 4. Comprueba la confirmación visual de envío
		await expect(
			contactSection.getByText(/mensaje enviado|gracias por contactar/i),
		).toBeVisible();
	});
});
