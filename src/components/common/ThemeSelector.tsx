// Iconos
import { Moon, Sun } from "lucide-react";
// Store
import { useStore } from "@/store/appStore";

// Botón que alterna entre tema claro y oscuro
const ThemeSelector = () => {
	const theme = useStore((s) => s.theme);
	const toggleTheme = useStore((s) => s.toggleTheme);

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="rounded-full p-2 text-text-muted transition-colors hover:text-accent dark:hover:text-accent"
			aria-label="Toggle theme"
		>
			{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
};

export default ThemeSelector;
