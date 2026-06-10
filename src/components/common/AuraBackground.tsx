// React
import type { FC } from "react";

// Fondo decorativo con círculos de blur y textura de ruido
const AuraBackground: FC = () => {
	return (
		<div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none select-none">
			{/* Fondo base */}
			<div className="absolute inset-0 bg-page-bg transition-colors duration-700" />

			{/* Círculos decorativos con blur */}
			<div className="absolute inset-0 opacity-20 dark:opacity-30">
				<div
					className="absolute top-[5%] -left-[10%] w-[80vw] h-[80vw] rounded-full bg-accent-muted/40 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"
				/>

				<div
					className="absolute top-[20%] -right-[15%] w-[70vw] h-[70vw] rounded-full bg-accent/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
				/>

				<div
					className="absolute top-[40%] -left-[20%] w-[90vw] h-[90vw] rounded-full bg-accent/20 blur-[140px] mix-blend-multiply dark:mix-blend-screen"
				/>

				<div
					className="absolute top-[60%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/30 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
				/>

				<div
					className="absolute top-[85%] left-1/2 -translate-x-1/2 w-screen h-[80vw] rounded-full bg-accent/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen"
				/>
			</div>

			{/* Textura de ruido SVG */}
			<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
		</div>
	);
};

export default AuraBackground;
