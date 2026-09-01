import { beforeEach, describe, expect, it, vi } from "vitest";
import { RateLimiter } from "./RateLimiter";

describe("RateLimiter (Servicio de Control de Peticiones)", () => {
	let limiter: RateLimiter;

	beforeEach(() => {
		// 1. Inicializa una instancia limpia con límite de 3 peticiones por minuto
		limiter = new RateLimiter(3, 60_000);
		vi.useRealTimers();
	});

	it("permite peticiones dentro del límite establecido para una misma IP", () => {
		// 1. Ejecuta solicitudes consecutivas dentro del límite
		expect(limiter.isAllowed("192.168.1.1")).toBe(true);
		expect(limiter.isAllowed("192.168.1.1")).toBe(true);
		expect(limiter.isAllowed("192.168.1.1")).toBe(true);
	});

	it("bloquea peticiones cuando se excede el límite máximo de solicitudes", () => {
		// 1. Consume los 3 intentos permitidos
		limiter.isAllowed("10.0.0.1");
		limiter.isAllowed("10.0.0.1");
		limiter.isAllowed("10.0.0.1");

		// 2. Verifica que la cuarta petición sea rechazada
		expect(limiter.isAllowed("10.0.0.1")).toBe(false);
	});

	it("maneja límites independientes para diferentes direcciones IP", () => {
		// 1. Agota el límite de la primera IP
		limiter.isAllowed("1.1.1.1");
		limiter.isAllowed("1.1.1.1");
		limiter.isAllowed("1.1.1.1");
		expect(limiter.isAllowed("1.1.1.1")).toBe(false);

		// 2. Verifica que una segunda IP diferente sí tenga acceso
		expect(limiter.isAllowed("2.2.2.2")).toBe(true);
	});

	it("restablece el contador una vez transcurrida la ventana de tiempo", () => {
		vi.useFakeTimers();

		// 1. Consume los intentos en tiempo inicial
		limiter.isAllowed("172.16.0.1");
		limiter.isAllowed("172.16.0.1");
		limiter.isAllowed("172.16.0.1");
		expect(limiter.isAllowed("172.16.0.1")).toBe(false);

		// 2. Avanza el reloj 61 segundos
		vi.advanceTimersByTime(61_000);

		// 3. Verifica que se permita una nueva petición
		expect(limiter.isAllowed("172.16.0.1")).toBe(true);

		vi.useRealTimers();
	});
});
