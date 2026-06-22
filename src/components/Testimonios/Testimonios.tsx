// Iconos
import { Star } from "lucide-react";
// Store
import { useT } from "@/store/appStore";
// Hooks
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Reseñas de clientes
const reviews = [
	{
		id: 1,
		content:
			"La calidad de audio es brutal. Compré la licencia WAV y la mezcla quedó limpísima en Spotify. 100% recomendado para artistas serios.",
		author: "Carlos 'Flow' Ruiz",
		role: "Artista Urbano",
		rating: 5,
		avatar: "https://assets.fluxbeats.mgdc.site/cdn-cgi/image/width=100,height=100,fit=cover,format=auto/carlos.jpg",
	},
	{
		id: 2,
		content:
			"Llevaba meses buscando beats de Lofi que no sonaran genéricos. Fluxbeats tiene ese sonido 'orgánico' que le faltaba a mis streams de Twitch.",
		author: "Sofía Streamz",
		role: "Content Creator",
		rating: 4,
		avatar: "https://assets.fluxbeats.mgdc.site/cdn-cgi/image/width=100,height=100,fit=cover,format=auto/sofia.jpg",
	},
	{
		id: 3,
		content:
			"El proceso de compra fue súper rápido. Descargué los stems al instante y el contrato venía clarísimo. ¡Volveré a comprar seguro!",
		author: "Prod. Javi",
		role: "Ingeniero de Mezcla",
		rating: 4,
		avatar: "https://assets.fluxbeats.mgdc.site/cdn-cgi/image/width=100,height=100,fit=cover,format=auto/javi.jpg",
	},
];

// Sección de testimonios con reseñas de clientes
const Testimonios = () => {
	const t = useT();
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.05);

	return (
		<section
			id="testimonios"
			className="bg-page-bg py-24 sm:py-32 border-t border-border/50 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Encabezado */}
				<div ref={headerRef as React.RefObject<HTMLDivElement>} className={`mx-auto max-w-2xl text-center animate-on-scroll ${headerVisible ? "visible" : ""}`}>
					<h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
						{t.reviews.header}
					</h2>
					<p className="mt-2 text-lg leading-8 text-text-muted">
						{t.reviews.subtitle}
					</p>
				</div>

				{/* Grid de tarjetas de reseñas */}
				<div ref={gridRef as React.RefObject<HTMLDivElement>} className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 animate-on-scroll ${gridVisible ? "visible" : ""}`}>
					{reviews.map((review) => (
						<div
							key={review.id}
							className="flex flex-col justify-between rounded-lg border border-border bg-surface-card p-8 shadow-md transition-all hover:shadow-lg hover:border-accent/50"
						>
							<div>
								{/* Estrellas de calificación */}
								<div className="flex gap-x-1 text-yellow-500 mb-4">
									{[0, 1, 2, 3, 4].map((i) => (
										<Star key={i} size={20} fill="currentColor" />
									))}
								</div>

								{/* Contenido de la reseña */}
								<p className="text-sm leading-6 text-text-muted italic">
									"{review.content}"
								</p>
							</div>

							{/* Autor de la reseña */}
							<div className="mt-6 flex items-center gap-x-4 border-t border-border pt-4">
								<img
									className="h-10 w-10 rounded-full bg-surface-card object-cover ring-2 ring-page-bg"
									src={review.avatar}
									alt={`Avatar de ${review.author}`}
								/>
								<div>
									<h3 className="text-sm font-semibold leading-6 text-text-main">
										{review.author}
									</h3>
									<p className="text-xs leading-5 text-text-muted">
										{review.role}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonios;
