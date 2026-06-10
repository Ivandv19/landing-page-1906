// Rate limiter en memoria para evitar abuso de endpoints
const rateLimit = new Map<string, { windowStart: number; count: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

// Verifica si la IP no ha excedido el límite de solicitudes
export function checkRateLimit(ip: string): boolean {
	// 1. Obtiene el timestamp actual
	const now = Date.now();
	// 2. Busca el registro de la IP en el mapa
	const record = rateLimit.get(ip);
	// 3. Si no existe o expiró la ventana, crea uno nuevo y permite
	if (!record || now - record.windowStart > WINDOW_MS) {
		rateLimit.set(ip, { windowStart: now, count: 1 });
		return true;
	}
	// 4. Si excedió el límite, rechaza la solicitud
	if (record.count >= MAX_REQUESTS) return false;
	// 5. Incrementa el contador y permite el acceso
	record.count++;
	return true;
}
