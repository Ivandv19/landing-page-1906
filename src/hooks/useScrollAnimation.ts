// React
import { useEffect, useRef, useState } from "react";

// Hook de IntersectionObserver para animaciones al hacer scroll (one-shot)
export const useScrollAnimation = (threshold = 0.1) => {
	const ref = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// 1. Crea el observer que detecta cuando el elemento entra en el viewport
		const observer = new IntersectionObserver(
			([entry]) => {
				// 2. Si está visible, lo marca y deja de observar (one-shot)
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		// 3. Limpia el observer al desmontar el componente
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, isVisible };
};
