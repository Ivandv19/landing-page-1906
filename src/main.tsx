// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Estilos
import "./App.css";
// Componentes
import App from "./App.tsx";

// Punto de entrada de la aplicación
// biome-ignore lint/style/noNonNullAssertion: root element always exists
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
