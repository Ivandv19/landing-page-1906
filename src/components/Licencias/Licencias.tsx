import { useLanguage } from "../../context/LanguageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/**
 * Licencias Component
 *
 * Sección de precios y planes (Pricing Table).
 * - Muestra 3 niveles de licencias (Básica, Premium, Ilimitada).
 * - Destaca la opción "Más popular".
 * - Lista de características por plan con iconos de check.
 * - Animación de entrada.
 */
const Licencias = () => {
	const { t } = useLanguage();
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.05);

	// Datos de las licencias traducidos
	const licenses = [
		{
			name: t.licenses.options.basic.name,
			price: 4.99,
			description: t.licenses.options.basic.desc,
			features: [
				"Archivo MP3 de alta calidad",
				"50,000 Streams en Spotify/Apple",
				"Videos de YouTube monetizados",
				"Sin Tag de voz (Untagged)",
				"Distribución limitada",
			],
			cta: t.licenses.options.basic.cta,
			popular: false,
		},
		{
			name: t.licenses.options.premium.name,
			price: 14.99,
			description: t.licenses.options.premium.desc,
			features: [
				"Archivo WAV + MP3",
				"500,000 Streams en Spotify/Apple",
				"Videos de YouTube ilimitados",
				"Radio Rotación",
				"Sin Tag de voz (Untagged)",
				"Contrato PDF incluido",
			],
			cta: t.licenses.options.premium.cta,
			popular: true,
		},
		{
			name: t.licenses.options.unlimited.name,
			price: 49.99,
			description: t.licenses.options.unlimited.desc,
			features: [
				"Stems (Pistas separadas)",
				"Archivos WAV + MP3",
				"Streams ILIMITADOS",
				"Monetización ILIMITADA",
				"Proyectos comerciales",
				"Sin Tag de voz (Untagged)",
			],
			cta: t.licenses.options.unlimited.cta,
			popular: false,
		},
	];

	return (
		<section
			id="licencias"
			className="bg-slate-50 py-24 sm:py-32 dark:bg-slate-950 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* ENCABEZADO DE LA SECCIÓN */}
				<div ref={headerRef as React.RefObject<HTMLDivElement>} className={`mx-auto max-w-4xl text-center animate-on-scroll ${headerVisible ? 'visible' : ''}`}>
					<h2 className="text-base font-semibold leading-7 text-primary dark:text-primary">
						{t.licenses.header}
					</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
						{t.licenses.title}
					</p>
				</div>
				<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600 dark:text-slate-300">
					{t.licenses.subtitle}
				</p>

				{/* GRID DE TARJETAS */}
				<div ref={gridRef as React.RefObject<HTMLDivElement>} className={`isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 animate-on-scroll ${gridVisible ? 'visible' : ''}`}>
					{licenses.map((tier) => (
						<div
							key={tier.name}
							className={`relative flex flex-col justify-between rounded-lg p-8 ring-1 transition-all ${tier.popular
									? "bg-white shadow-xl ring-2 ring-primary scale-100 lg:scale-105 z-10 dark:bg-slate-800 dark:ring-primary shadow-primary/10"
									: "bg-white ring-slate-200 shadow-md hover:ring-slate-300 hover:shadow-lg dark:bg-slate-800 dark:ring-slate-700 dark:hover:ring-slate-600"
								}`}
						>
							{/* ETIQUETA "MÁS VENDIDO" */}
							{tier.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white shadow-sm">
									Más Vendido
								</div>
							)}

							{/* CONTENIDO SUPERIOR: Título, Precio y Descripción */}
							<div>
								<div className="flex items-center justify-between gap-x-4">
									<h3
										className={`text-lg font-semibold leading-8 ${tier.popular ? "text-primary dark:text-primary" : "text-slate-900 dark:text-white"}`}
									>
										{tier.name}
									</h3>
								</div>
								<p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
									{tier.description}
								</p>
								<p className="mt-6 flex items-baseline gap-x-1">
									<span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
										${tier.price}
									</span>
									<span className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400">
										/beat
									</span>
								</p>

								{/* LISTA DE CARACTERÍSTICAS */}
								<ul
									role="list"
									className="mt-8 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
								>
									{tier.features.map((feature) => (
										<li key={feature} className="flex gap-x-3">
											{/* Icono Check */}
											<svg
												className={`h-6 w-5 flex-none ${tier.popular ? "text-primary" : "text-slate-400"}`}
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
													clipRule="evenodd"
												/>
											</svg>
											{feature}
										</li>
									))}
								</ul>
							</div>

							{/* BOTÓN DE ACCIÓN */}
							<a
								href="#"
								className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${tier.popular
										? "bg-primary text-white shadow-sm hover:bg-primary-hover focus-visible:outline-primary dark:bg-primary dark:hover:bg-primary-hover" // Botón primario
										: "text-primary ring-1 ring-inset ring-primary-light hover:ring-primary bg-primary-light/30 dark:text-primary dark:ring-primary/30 dark:bg-primary/10 dark:hover:ring-primary" // Botón secundario
									}`}
							>
								{tier.cta}
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Licencias;
