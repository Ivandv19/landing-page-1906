import { useLanguage } from "../../context/LanguageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/**
 * Hero Component
 *
 * Sección principal de aterrizaje (Above the fold).
 * Características:
 * - Fondo con efectos atmosféricos (blur) y gradientes animados.
 * - Título y subtítulo traducibles.
 * - Call to Actions (CTAs) principales para explorar beats o licencias.
 * - Animación de entrada al hacer scroll.
 */
const Hero = () => {
	const { t } = useLanguage();
	const { ref, isVisible } = useScrollAnimation();

	return (
		<div id="inicio" className="relative isolate bg-white px-6 pt-14 lg:px-8 overflow-hidden dark:bg-slate-900 transition-colors duration-300 min-h-screen flex items-center justify-center">
			{/* --- Fondo Atmosférico Superior (Efecto Blur) --- */}
			<div
				className="absolute -top-40 left-[calc(50%-10rem)] -z-10 h-160 w-160 transform-gpu blur-3xl sm:left-[calc(50%-20rem)]"
				aria-hidden="true"
			>
				<div
					className="h-full w-full bg-linear-to-tr from-primary-light to-accent opacity-30 rounded-full animate-pulse-slow"
					style={{ animationDuration: "10s" }} // Animación de pulso lenta
				/>
			</div>

			{/* --- Contenido Principal (Centrado) --- */}
			<div ref={ref as React.RefObject<HTMLDivElement>} className={`mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
						{t.hero.title}
					</h1>

					<p className="mt-6 text-xl font-medium text-slate-600 dark:text-slate-300">
						{t.hero.subtitle}
					</p>

					<div className="mt-10 flex items-center justify-center gap-x-6">
						{/* CTA 1: Explorar Beats */}
						<a
							href="#beats"
							className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
						>
							{t.hero.cta1}
						</a>
						{/* CTA 2: Explorar Licencias */}
						<a
							href="#licencias"
							className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-primary transition-colors dark:text-white dark:hover:text-primary"
						>
							{t.hero.cta2} <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</div>

			{/* --- Fondo Atmosférico Inferior (Efecto Blur) --- */}
			<div
				className="absolute top-[calc(100%-20rem)] left-[calc(50%+3rem)] -z-10 h-160 w-160 transform-gpu blur-3xl sm:left-[calc(50%+10rem)]"
				aria-hidden="true"
			>
				<div className="h-full w-full bg-linear-to-tr from-primary-light to-accent opacity-30 rounded-full" />
			</div>
		</div>
	);
};

export default Hero;
