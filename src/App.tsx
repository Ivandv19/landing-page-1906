import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Home from "@/pages/Home/Home";
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
// import AuraBackground from "@/components/common/AuraBackground";
import { useStore } from "@/store/appStore";

function App() {
	const initAudio = useStore((s) => s.initAudio);

	useEffect(() => {
		initAudio();
	}, [initAudio]);

	return (
		<BrowserRouter>
			<div className="relative min-h-screen w-full font-sans bg-page-bg text-text-main transition-colors duration-300">
				<Header />

				<main className="relative">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/privacy" element={<Privacy />} />
					</Routes>
				</main>

				<Footer />

				{/* biome-ignore lint/a11y/useMediaCaption: global audio element controlled by store */}
			<audio id="global-audio" />
			</div>
		</BrowserRouter>
	);
}

export default App;
