// Store
import { useT } from "@/store/appStore";
// Hooks
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Sección hero principal con animación de entrada
const Hero = () => {
	const t = useT();
	const { ref, isVisible } = useScrollAnimation();

	return (
		<div id="inicio" className="relative isolate bg-page-bg px-6 pt-14 lg:px-8 overflow-hidden min-h-screen flex items-center justify-center">
			{/* Fondo decorativo con blur */}
			<div
				className="absolute -top-40 left-[calc(50%-10rem)] -z-10 h-160 w-160 transform-gpu blur-3xl sm:left-[calc(50%-20rem)]"
				aria-hidden="true"
			>
				<div
					className="h-full w-full bg-linear-to-tr from-accent-muted to-accent/30 opacity-30 rounded-full animate-pulse-slow"
					style={{ animationDuration: "10s" }}
				/>
			</div>

			{/* Contenido principal */}
			<div ref={ref as React.RefObject<HTMLDivElement>} className={`mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 animate-on-scroll ${isVisible ? "visible" : ""}`}>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-text-main sm:text-6xl">
						{t.hero.title}
					</h1>

					<p className="mt-6 text-xl font-medium text-text-muted">
						{t.hero.subtitle}
					</p>

					{/* Botones de acción */}
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<a
							href="#beats"
							className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all"
						>
							{t.hero.cta1}
						</a>
						<a
							href="#licencias"
							className="text-sm font-semibold leading-6 text-text-main flex items-center gap-1 hover:text-accent transition-colors"
						>
							{t.hero.cta2} <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>

			{/* Fondo decorativo inferior */}
			<div
				className="absolute top-[calc(100%-20rem)] left-[calc(50%+3rem)] -z-10 h-160 w-160 transform-gpu blur-3xl sm:left-[calc(50%+10rem)]"
				aria-hidden="true"
			>
				<div className="h-full w-full bg-linear-to-tr from-accent-muted to-accent/30 opacity-30 rounded-full" />
			</div>
		</div>
	);
};

export default Hero;
