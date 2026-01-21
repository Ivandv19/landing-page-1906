import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
	const { language, setLanguage } = useLanguage();

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={() => setLanguage("es")}
				className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
					language === "es"
						? "bg-blue-100 text-blue-700 font-bold ring-1 ring-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-700"
						: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
				}`}
				aria-label="Cambiar a Español"
			>
				<span className="text-lg">🇪🇸</span>
				<span className="text-xs">ES</span>
			</button>
			<div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
			<button
				onClick={() => setLanguage("en")}
				className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
					language === "en"
						? "bg-blue-100 text-blue-700 font-bold ring-1 ring-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-700"
						: "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
				}`}
				aria-label="Switch to English"
			>
				<span className="text-lg">🇺🇸</span>
				<span className="text-xs">EN</span>
			</button>
		</div>
	);
};

export default LanguageSelector;
