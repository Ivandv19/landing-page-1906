import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

// Suite de pruebas para la sección Hero principal
describe("Hero (Portada Principal)", () => {
	it("renderiza el título principal, el subtítulo y los botones de llamada a la acción (CTA)", () => {
		// 1. Renderiza el componente Hero
		render(<Hero />);

		// 2. Verifica el título principal y subtítulo
		expect(screen.getByText(/Beats que fluyen/i)).toBeInTheDocument();
		expect(screen.getByText(/Sonidos para Creadores/i)).toBeInTheDocument();

		// 3. Verifica los botones de navegación hacia el catálogo y licencias
		const ctaExplorar = screen.getByRole("link", {
			name: /Explorar Beats/i,
		});
		const ctaLicencias = screen.getByRole("link", {
			name: /Explorar Licencias/i,
		});

		expect(ctaExplorar).toHaveAttribute("href", "#beats");
		expect(ctaLicencias).toHaveAttribute("href", "#licencias");
	});
});
