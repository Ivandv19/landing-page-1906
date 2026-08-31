import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "./Header";

// Suite de pruebas para el componente Header y barra de navegación
describe("Header (Barra de Navegación Superior)", () => {
	it("renderiza el logo de la marca Fluxbeats", () => {
		// 1. Renderiza el Header dentro de un MemoryRouter
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		// 2. Verifica la presencia del logo
		const logo = screen.getByText(/Flux/i);
		expect(logo).toBeInTheDocument();
	});

	it("renderiza los enlaces de navegación principales", () => {
		// 1. Renderiza el Header
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		// 2. Verifica los enlaces a las secciones de la landing
		expect(
			screen.getAllByRole("link", { name: "Beats" })[0],
		).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: "Licencias" })[0],
		).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: "Sobre Mí" })[0],
		).toBeInTheDocument();
		expect(
			screen.getAllByRole("link", { name: "Contacto" })[0],
		).toBeInTheDocument();
	});
});
