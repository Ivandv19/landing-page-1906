import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contacto from "./Contacto";

// Suite de pruebas para la sección de Contacto
describe("Contacto (Sección de Contacto)", () => {
	it("renderiza el título principal de la sección de contacto", () => {
		// 1. Renderiza el componente de Contacto
		render(<Contacto />);

		// 2. Verifica la presencia del título
		expect(screen.getByText(/Hablemos de tu proyecto/i)).toBeInTheDocument();
	});
});
