import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { handleContact } from "../_controllers/contactController";
import { contactSchema } from "../_shared/contactSchema";
import type { Env } from "../_shared/types";

// Instancia principal de Hono tipada con las variables de entorno del Worker
export const app = new Hono<{ Bindings: Env }>();

// GET /api/health - Comprobación de estado del servicio
app.get("/api/health", (c) => c.json({ status: "ok" }));

// POST /api/contact - Endpoint de contacto con validación Zod
app.post("/api/contact", zValidator("json", contactSchema), handleContact);

// Exporta el handler para Cloudflare Pages Functions
export const onRequest = handle(app);
