// ==============================================================================
// Tipos e Interfaces del Backend Serverless (Cloudflare Pages Functions)
// ==============================================================================

/**
 * Variables de entorno inyectadas por Cloudflare Pages Functions
 */
export interface Env {
	RESEND_API_KEY: string;
	RESEND_FROM_EMAIL: string;
	CONTACT_EMAIL: string;
	TURNSTILE_SECRET_KEY: string;
}

/**
 * Datos del formulario de contacto validados
 */
export interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

/**
 * Entrada completa recibida en la petición HTTP POST /api/contact
 */
export interface ContactRequestBody extends ContactPayload {
	turnstileToken: string;
}

/**
 * Estructura estándar de respuesta JSON de la API
 */
export interface ApiResponse<T = unknown> {
	success: boolean;
	message?: string;
	error?: string;
	data?: T;
}

/**
 * Contrato (Interfaz) para el servicio de Rate Limiting
 */
export interface IRateLimiter {
	isAllowed(ip: string): boolean;
	reset(): void;
}

/**
 * Contrato (Interfaz) para el servicio de verificación de Turnstile
 */
export interface ITurnstileValidator {
	verify(token: string, secretKey: string): Promise<boolean>;
}

/**
 * Contrato (Interfaz) para el servicio de envío de correos electrónicos
 */
export interface IEmailService {
	send(data: ContactPayload, env: Env): Promise<boolean>;
}
