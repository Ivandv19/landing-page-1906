// Iconos
import { Check } from "lucide-react";
// Hooks
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
// Store
import { useT } from "@/store/appStore";

// Planes de licencia disponibles
const Licencias = () => {
	const t = useT();
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.05);

	// Opciones de licencia con precios y características
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
			className="bg-page-bg py-24 sm:py-32 border-t border-border/50 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Encabezado de la sección */}
				<div
					ref={headerRef as React.RefObject<HTMLDivElement>}
					className={`mx-auto max-w-4xl text-center animate-on-scroll ${headerVisible ? "visible" : ""}`}
				>
					<h2 className="text-base font-semibold leading-7 text-accent">
						{t.licenses.header}
					</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-text-main sm:text-5xl">
						{t.licenses.title}
					</p>
				</div>
				<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-text-muted">
					{t.licenses.subtitle}
				</p>

				{/* Tarjetas de licencias */}
				<div
					ref={gridRef as React.RefObject<HTMLDivElement>}
					className={`isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 animate-on-scroll ${gridVisible ? "visible" : ""}`}
				>
					{licenses.map((tier) => (
						<div
							key={tier.name}
							className={`relative flex flex-col justify-between rounded-lg p-8 ring-1 transition-all ${
								tier.popular
									? "bg-surface-card shadow-xl ring-2 ring-accent scale-100 lg:scale-105 z-10 shadow-accent/10"
									: "bg-surface-card ring-border shadow-md hover:ring-accent/50 hover:shadow-lg"
							}`}
						>
							{/* Badge de popular */}
							{tier.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white shadow-sm">
									Mas Vendido
								</div>
							)}

							<div>
								<div className="flex items-center justify-between gap-x-4">
									<h3
										className={`text-lg font-semibold leading-8 ${tier.popular ? "text-accent" : "text-text-main"}`}
									>
										{tier.name}
									</h3>
								</div>
								<p className="mt-4 text-sm leading-6 text-text-muted">
									{tier.description}
								</p>
								<p className="mt-6 flex items-baseline gap-x-1">
									<span className="text-4xl font-bold tracking-tight text-text-main">
										${tier.price}
									</span>
									<span className="text-sm font-semibold leading-6 text-text-muted">
										/beat
									</span>
								</p>

								{/* Lista de características */}
								<ul className="mt-8 space-y-3 text-sm leading-6 text-text-muted">
									{tier.features.map((feature) => (
										<li key={feature} className="flex gap-x-3">
											<Check
												size={20}
												className={`flex-none ${tier.popular ? "text-accent" : "opacity-40"}`}
											/>
											{feature}
										</li>
									))}
								</ul>
							</div>

							{/* Botón de selección */}
							<button
								type="button"
								className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
									tier.popular
										? "bg-accent text-white shadow-sm hover:bg-accent-hover focus-visible:outline-accent"
										: "text-accent ring-1 ring-inset ring-accent/30 hover:ring-accent bg-accent-muted/30 dark:ring-accent/30 dark:bg-accent/10 dark:hover:ring-accent"
								}`}
							>
								{tier.cta}
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Licencias;
