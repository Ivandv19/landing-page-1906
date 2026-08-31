import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

// Suite de pruebas para el componente Footer
describe("Footer (Pie de Página)", () => {
	it("renderiza la marca, enlaces legales y créditos de desarrollo", () => {
		// 1. Renderiza el Footer en un enrutador
		render(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>,
		);

		// 2. Verifica la presencia de los textos y enlaces principales
		expect(screen.getByText("Flux")).toBeInTheDocument();
		expect(screen.getByText("beats")).toBeInTheDocument();
		expect(screen.getByText("Términos y Condiciones")).toBeInTheDocument();
		expect(screen.getByText("Política de Privacidad")).toBeInTheDocument();
		expect(screen.getByText("Desarrollado por")).toBeInTheDocument();
	});

	it("muestra mensaje de error cuando se ingresa un correo inválido en el newsletter", () => {
		// 1. Renderiza el componente
		render(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>,
		);

		// 2. Ingresa un email con formato incorrecto y envía el formulario
		const input = screen.getByPlaceholderText("Tu email");
		const form = input.closest("form");
		expect(form).not.toBeNull();

		if (form) {
			fireEvent.change(input, { target: { value: "abc" } });
			fireEvent.submit(form);
		}

		// 3. Verifica que se muestre el error de validación
		expect(screen.getByText("Email inválido")).toBeInTheDocument();
	});

	it("muestra mensaje de agradecimiento cuando se envía un correo válido para el newsletter", () => {
		// 1. Renderiza el componente
		render(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>,
		);

		// 2. Ingresa un email válido y envía
		const input = screen.getByPlaceholderText("Tu email");
		const form = input.closest("form");
		expect(form).not.toBeNull();

		if (form) {
			fireEvent.change(input, { target: { value: "fan@example.com" } });
			fireEvent.submit(form);
		}

		// 3. Verifica el mensaje de éxito
		expect(screen.getByText("¡Gracias por suscribirte!")).toBeInTheDocument();
	});
});
