import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { beats } from "@/data/beats";
import BeatsSection from "./Beats";

// Suite de pruebas para la sección principal del catálogo de Beats
describe("BeatsSection (Catálogo de Instrumentales)", () => {
	it("renderiza el título de la sección y el subtítulo informativo", () => {
		// 1. Renderiza la sección de beats
		render(<BeatsSection />);

		// 2. Verifica la presencia del encabezado y subtítulo
		expect(screen.getByText(/Catálogo Reciente/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Explora nuestros últimos lanzamientos/i),
		).toBeInTheDocument();
	});

	it("renderiza todas las tarjetas de beats del catálogo", () => {
		// 1. Renderiza el catálogo
		render(<BeatsSection />);

		// 2. Verifica que cada beat esté presente en pantalla
		for (const beat of beats) {
			expect(screen.getByText(beat.title)).toBeInTheDocument();
		}
	});

	it("renderiza los botones de desplazamiento horizontal", () => {
		// 1. Renderiza la sección
		render(<BeatsSection />);

		// 2. Verifica la existencia de los controles de navegación
		expect(
			screen.getByRole("button", { name: "Anterior" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Siguiente" }),
		).toBeInTheDocument();
	});
});
