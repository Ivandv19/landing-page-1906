import type { FC } from "react";

/**
 * AuraBackground Component
 *
 * Fondo ambiental animado con efectos de "aura" y desenfoque (blur).
 * - Crea una atmósfera visual dinámica detrás del contenido.
 * - Usa posicionamiento absoluto y `pointer-events-none` para no interferir.
 * - Adaptable a modo oscuro (ajusta opacidad y blending).
 */
const AuraBackground: FC = () => {
	return (
		<div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none select-none">
			{/* Color Base Atmosférico */}
			<div className="absolute inset-0 bg-white dark:bg-slate-950 transition-colors duration-700" />

			{/* Aura Path (Distributed vertically) */}
			<div className="absolute inset-0 opacity-20 dark:opacity-30">

				{/* Section 1: Hero (Top Left) */}
				<div
					className="absolute top-[5%] -left-[10%] w-[80vw] h-[80vw] rounded-full bg-primary-light/40 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"
				/>

				{/* Section 2: Beats (Middle Right) */}
				<div
					className="absolute top-[20%] -right-[15%] w-[70vw] h-[70vw] rounded-full bg-accent/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
				/>

				{/* Section 3: Licencias (Middle Left) */}
				<div
					className="absolute top-[40%] -left-[20%] w-[90vw] h-[90vw] rounded-full bg-primary-hover/20 blur-[140px] mix-blend-multiply dark:mix-blend-screen"
				/>

				{/* Section 4: Testimonios (Middle Right) */}
				<div
					className="absolute top-[60%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/20 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
				/>

				{/* Section 5: Sobre Mí / Contacto (Bottom Center) */}
				<div
					className="absolute top-[85%] left-1/2 -translate-x-1/2 w-screen h-[80vw] rounded-full bg-accent/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen"
				/>

			</div>

			{/* Textura de ruido global */}
			<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
		</div>
	);
};

export default AuraBackground;
