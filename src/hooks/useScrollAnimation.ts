import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export const useScrollAnimation = (threshold = 0.1) => {
	const ref = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const { language } = useLanguage();

	useEffect(() => {
		// Reset animation when language changes
		setIsVisible(false);
		
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold, language]); // Re-run when language changes

	return { ref, isVisible };
};
