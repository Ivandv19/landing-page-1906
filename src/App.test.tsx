import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

// Suite de pruebas de humo y renderizado raíz de la aplicación
describe("App (Componente Raíz de la Aplicación)", () => {
	it("renderiza la aplicación completa sin errores en el DOM", () => {
		// 1. Renderiza el componente principal App
		const { container } = render(<App />);

		// 2. Verifica que el contenedor se monte correctamente
		expect(container).toBeTruthy();
	});
});
