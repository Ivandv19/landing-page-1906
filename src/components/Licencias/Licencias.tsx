import { useLanguage } from "../../context/LanguageContext";

const Licencias = () => {
	const { t } = useLanguage();

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
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
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
				<div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
					{licenses.map((tier) => (
						<div
							key={tier.name}
							className={`relative flex flex-col justify-between rounded-lg p-8 ring-1 transition-all ${
								tier.popular
									? "bg-white shadow-md ring-2 ring-blue-600 scale-100 lg:scale-105 z-10 dark:bg-slate-800 dark:ring-blue-500" // Estilos para la tarjeta destacada
									: "bg-white ring-slate-200 shadow-sm hover:ring-slate-300 dark:bg-slate-800 dark:ring-slate-700 dark:hover:ring-slate-600" // Estilos para las tarjetas estándar
							}`}
						>
							{/* ETIQUETA "MÁS VENDIDO" */}
							{tier.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white shadow-sm">
									Más Vendido
								</div>
							)}

							{/* CONTENIDO SUPERIOR: Título, Precio y Descripción */}
							<div>
								<div className="flex items-center justify-between gap-x-4">
									<h3
										className={`text-lg font-semibold leading-8 ${tier.popular ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white"}`}
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
												className={`h-6 w-5 flex-none ${tier.popular ? "text-blue-600" : "text-slate-400"}`}
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
								className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
									tier.popular
										? "bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400" // Botón primario
										: "text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300 bg-blue-50/50 dark:text-blue-400 dark:ring-blue-500/30 dark:bg-blue-900/20 dark:hover:ring-blue-400" // Botón secundario
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
