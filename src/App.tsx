import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
// import AuraBackground from "./components/common/AuraBackground";

function App() {
	return (
		<BrowserRouter>
			<div className="relative min-h-screen w-full font-sans text-slate-900 dark:text-white transition-colors duration-300">
				{/* Fondo Global (Desactivado por ahora para volver al original) */}
				{/* <AuraBackground /> */}
				
				<Header />
				
				<main className="relative">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/privacy" element={<Privacy />} />
					</Routes>
				</main>
				
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
