import { describe, expect, it } from "vitest";
import { formatTime } from "./time";

// Suite de pruebas para la función utilitaria de formato de tiempo (mm:ss)
describe("formatTime (Formato de Tiempo de Audio)", () => {
	it("formatea 0 segundos correctamente como '0:00'", () => {
		expect(formatTime(0)).toBe("0:00");
	});

	it("formatea duraciones menores a un minuto con relleno de ceros", () => {
		expect(formatTime(45)).toBe("0:45");
		expect(formatTime(9)).toBe("0:09");
	});

	it("formatea exactamente un minuto (60s) como '1:00'", () => {
		expect(formatTime(60)).toBe("1:00");
	});

	it("formatea minutos y segundos con duraciones mayores a un minuto", () => {
		expect(formatTime(65)).toBe("1:05");
		expect(formatTime(125)).toBe("2:05");
	});

	it("maneja de forma segura valores nulos, indefinidos o NaN retornando '0:00'", () => {
		expect(formatTime(null as never)).toBe("0:00");
		expect(formatTime(undefined as never)).toBe("0:00");
		expect(formatTime(NaN)).toBe("0:00");
	});
});
