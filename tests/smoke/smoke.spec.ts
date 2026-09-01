import { expect, test } from "@playwright/test";

test.describe("Smoke Tests (Build de Producción / Dist)", () => {
	test("la página de inicio carga exitosamente con HTTP 200 y layout completo", async ({
		page,
	}) => {
		// 1. Navega a la raíz de la aplicación
		const response = await page.goto("/");

		// 2. Comprueba código de respuesta HTTP 200
		expect(response?.status()).toBe(200);

		// 3. Comprueba el título del documento
		await expect(page).toHaveTitle(/Fluxbeats/i);

		// 4. Comprueba que el Header de navegación y el Footer estén visibles
		await expect(page.locator("header nav")).toBeVisible();
		await expect(page.locator("footer")).toBeVisible();

		// 5. Comprueba que las secciones principales estén presentes en el DOM
		await expect(page.locator("#beats")).toBeAttached();
		await expect(page.locator("#licencias")).toBeAttached();
		await expect(page.locator("#testimonios")).toBeAttached();
		await expect(page.locator("#sobre-mi")).toBeAttached();
		await expect(page.locator("#contacto")).toBeAttached();
	});

	test("las rutas legales (/privacy y /terms) cargan correctamente", async ({
		page,
	}) => {
		// 1. Navega a la página de privacidad
		const resPrivacy = await page.goto("/privacy");
		expect(resPrivacy?.status()).toBe(200);
		await expect(page.locator("body")).toBeVisible();

		// 2. Navega a la página de términos
		const resTerms = await page.goto("/terms");
		expect(resTerms?.status()).toBe(200);
		await expect(page.locator("body")).toBeVisible();
	});

	test("el endpoint de salud /api/health responde con estado OK", async ({
		request,
	}) => {
		// 1. Consulta directamente el endpoint de Functions
		const response = await request.get("/api/health");

		// 2. Comprueba código de respuesta HTTP 200
		expect(response.status()).toBe(200);

		// 3. Comprueba el contenido JSON
		const json = await response.json();
		expect(json).toEqual({ status: "ok" });
	});

	test("la página navega sin arrojar excepciones críticas en consola", async ({
		page,
	}) => {
		const errors: string[] = [];
		page.on("pageerror", (error) => errors.push(error.message));

		// 1. Navega por la página principal
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
		await expect(page.locator("header nav")).toBeVisible();

		// 2. Comprueba que no existan excepciones no capturadas
		expect(errors).toHaveLength(0);
	});
});
