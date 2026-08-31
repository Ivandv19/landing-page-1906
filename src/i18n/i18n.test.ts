import { describe, expect, it } from "vitest";
import { en } from "./en";
import { es } from "./es";

// Suite de pruebas para la paridad e integridad de traducciones i18n
describe("i18n (Paridad de Diccionarios de Idiomas)", () => {
	function getKeysRecursive(
		obj: Record<string, unknown>,
		prefix = "",
	): string[] {
		let keys: string[] = [];
		for (const key of Object.keys(obj)) {
			const fullKey = prefix ? `${prefix}.${key}` : key;
			const val = obj[key];
			if (typeof val === "object" && val !== null && !Array.isArray(val)) {
				keys = keys.concat(
					getKeysRecursive(val as Record<string, unknown>, fullKey),
				);
			} else {
				keys.push(fullKey);
			}
		}
		return keys;
	}

	it("mantiene paridad exacta de claves entre el diccionario en español (es) y en inglés (en)", () => {
		// 1. Extrae todas las claves anidadas de ambos diccionarios
		const esKeys = getKeysRecursive(es as Record<string, unknown>).sort();
		const enKeys = getKeysRecursive(en as Record<string, unknown>).sort();

		// 2. Verifica que ambos diccionarios compartan la misma estructura y claves
		expect(enKeys).toEqual(esKeys);
	});

	it("no contiene cadenas de traducción vacías en el diccionario en español", () => {
		// 1. Itera sobre cada clave de español
		const esKeys = getKeysRecursive(es as Record<string, unknown>);
		for (const key of esKeys) {
			const value = key
				.split(".")
				.reduce<unknown>(
					(acc, curr) => (acc as Record<string, unknown>)?.[curr],
					es as unknown as Record<string, unknown>,
				);
			// 2. Verifica que ningún texto esté en blanco
			expect(
				typeof value === "string" ? value.trim().length : 1,
			).toBeGreaterThan(0);
		}
	});

	it("no contiene cadenas de traducción vacías en el diccionario en inglés", () => {
		// 1. Itera sobre cada clave de inglés
		const enKeys = getKeysRecursive(en as Record<string, unknown>);
		for (const key of enKeys) {
			const value = key
				.split(".")
				.reduce<unknown>(
					(acc, curr) => (acc as Record<string, unknown>)?.[curr],
					en as unknown as Record<string, unknown>,
				);
			// 2. Verifica que ningún texto esté en blanco
			expect(
				typeof value === "string" ? value.trim().length : 1,
			).toBeGreaterThan(0);
		}
	});
});
