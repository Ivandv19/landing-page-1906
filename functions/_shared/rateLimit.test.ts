import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit } from "./rateLimit";

// Suite de pruebas para el servicio de limitación de tasa (Rate Limiting en memoria)
describe("rateLimit (Control de Peticiones por IP)", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("permite peticiones hasta el límite máximo (10) para una misma IP", () => {
		const ip = "192.168.1.100";

		// 1. Consume las 10 peticiones permitidas
		for (let i = 0; i < 10; i++) {
			expect(checkRateLimit(ip)).toBe(true);
		}

		// 2. Verifica que la petición número 11 sea rechazada
		expect(checkRateLimit(ip)).toBe(false);
	});

	it("restablece el contador de peticiones al expirar la ventana de tiempo (60 segundos)", () => {
		const ip = "192.168.1.101";

		// 1. Agota el límite de peticiones
		for (let i = 0; i < 10; i++) {
			expect(checkRateLimit(ip)).toBe(true);
		}
		expect(checkRateLimit(ip)).toBe(false);

		// 2. Avanza el tiempo artificial 61 segundos
		vi.advanceTimersByTime(61_000);

		// 3. Verifica que la ventana se haya limpiado y permita nuevas solicitudes
		expect(checkRateLimit(ip)).toBe(true);
	});

	it("aísla de forma independiente los contadores entre diferentes direcciones IP", () => {
		const ip1 = "10.0.0.1";
		const ip2 = "10.0.0.2";

		// 1. Agota la cuota para la primera IP
		for (let i = 0; i < 10; i++) {
			expect(checkRateLimit(ip1)).toBe(true);
		}
		expect(checkRateLimit(ip1)).toBe(false);

		// 2. Verifica que la segunda IP conserve su cuota completa intacta
		expect(checkRateLimit(ip2)).toBe(true);
	});
});
