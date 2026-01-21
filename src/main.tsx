import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LanguageProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</LanguageProvider>
	</StrictMode>,
);
