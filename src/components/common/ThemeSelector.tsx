import { useTheme } from "../../context/ThemeContext";

/**
 * ThemeSelector Component
 *
 * Botón para alternar entre modo claro y oscuro.
 * - Consume `ThemeContext`.
 * - Cambia el icono (Sol/Luna) según el estado actual.
 */
const ThemeSelector = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="rounded-full p-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				// Moon icon for light mode (switch to dark)
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
				</svg>
			) : (
				// Sun icon for dark mode (switch to light)
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</svg>
			)}
		</button>
	);
};

export default ThemeSelector;
