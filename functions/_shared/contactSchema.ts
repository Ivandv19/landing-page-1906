// Zod - Schema de validación del formulario de contacto
import { z } from "zod";

// Schema de validación del formulario de contacto
export const contactSchema = z.object({
	name: z.string().min(2, "Nombre muy corto").max(100, "Nombre muy largo"),
	email: z.string().email("Email inválido"),
	message: z.string().min(10, "Mensaje muy corto").max(1000, "Mensaje muy largo"),
	turnstileToken: z.string().min(1, "Verificación de humano requerida"),
});

// Tipo inferido del schema para usar en handlers y tests
export type ContactInput = z.infer<typeof contactSchema>;
