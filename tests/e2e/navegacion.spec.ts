import { expect, test } from "@playwright/test";

test.describe("E2E: Navegación y Enlaces de Secciones", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Navega a la página de inicio
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("los enlaces de navegación del Header dirigen a sus respectivas secciones", async ({
		page,
	}) => {
		// 1. Clic en enlace Beats
		await page.locator('header a[href="#beats"]:visible').click();
		await expect(page).toHaveURL(/#beats/);
		await expect(page.locator("#beats")).toBeInViewport();

		// 2. Clic en enlace Licencias
		await page.locator('header a[href="#licencias"]:visible').click();
		await expect(page).toHaveURL(/#licencias/);
		await expect(page.locator("#licencias")).toBeInViewport();

		// 3. Clic en enlace Sobre Mí
		await page.locator('header a[href="#sobre-mi"]:visible').click();
		await expect(page).toHaveURL(/#sobre-mi/);
		await expect(page.locator("#sobre-mi")).toBeInViewport();

		// 4. Clic en enlace Contacto
		await page.locator('header a[href="#contacto"]:visible').click();
		await expect(page).toHaveURL(/#contacto/);
		await expect(page.locator("#contacto")).toBeInViewport();
	});
});
