import { useLanguage } from "../../context/LanguageContext";
import { ResponsiveImage } from "../common/ResponsiveImage";

const SobreMi = () => {
	const { t } = useLanguage();

	const stats = [
		{ label: t.about.stats.years, value: "3+" },
		{ label: t.about.stats.catalog, value: "50+" },
		{ label: t.about.stats.clients, value: "10+" },
		{ label: t.about.stats.quality, value: "24-bit" },
	];

	return (
		<section
			id="sobre-mi"
			className="overflow-hidden bg-slate-50 py-24 sm:py-32 dark:bg-slate-900 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
					{/* COLUMNA IZQUIERDA: Texto y Estadísticas */}
					<div className="lg:pr-8">
						<div className="lg:max-w-lg">
							<h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
								{t.about.title}
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
								{t.about.headline}
							</p>
							<p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
								{t.about.p1}
							</p>
							<p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
								{t.about.p2}
							</p>
							<p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
								{t.about.p3}
							</p>

							{/* STATS DE LA COMPAÑÍA (Grid) */}
							<dl className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-10 sm:grid-cols-2 dark:border-slate-800">
								{stats.map((stat) => (
									<div
										key={stat.label}
										className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700"
									>
										<dt className="text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
											{stat.label}
										</dt>
										<dd className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
											{stat.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>

					{/* COLUMNA DERECHA: Imagen y Decoración */}
					<div className="relative lg:mt-0">
						{/* Decoración/Sombra detrás de la imagen (Blur) */}
						<div className="absolute top-4 left-4 -right-4 -bottom-4 rounded-xl bg-blue-100/60 blur-sm -z-10 hidden sm:block dark:bg-blue-900/30" />

						{/* Imagen Principal */}
						<ResponsiveImage
							src="about-me-studio.jpg"
							alt="Prod Flux Studio Setup"
							className="w-full h-auto rounded-xl bg-slate-900 shadow-xl ring-1 ring-slate-400/10 object-cover"
							sizes={{ mobile: 600, tablet: 900, desktop: 1200 }}
							width={1000}
							height={1000}
						/>

						{/* Frase Flotante (Efecto Frosted Glass) */}
						<div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/95 backdrop-blur-sm p-4 border border-slate-200 shadow-sm hidden md:block dark:bg-slate-800/95 dark:border-slate-700">
							<p className="text-sm font-medium text-slate-800 italic text-center dark:text-slate-200">
								{t.about.quote}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SobreMi;
