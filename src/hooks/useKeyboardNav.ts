// React
import { useEffect } from "react";

// Hook para navegación por teclado con flechas y espacio
export function useKeyboardNav(
	onArrowLeft: () => void,
	onArrowRight: () => void,
	onSpace?: () => void,
) {
	useEffect(() => {
		// 1. Maneja teclas presionadas
		const handleKeyPress = (e: KeyboardEvent) => {
			// 2. Ignora si el foco está en un input o textarea
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			// 3. Ejecuta según la tecla presionada
			if (e.key === "ArrowLeft") onArrowLeft();
			if (e.key === "ArrowRight") onArrowRight();
			if (e.key === " " && onSpace) {
				e.preventDefault();
				onSpace();
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		// 4. Limpia el listener al desmontar
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [onArrowLeft, onArrowRight, onSpace]);
}
