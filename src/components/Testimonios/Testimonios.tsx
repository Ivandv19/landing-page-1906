// Datos de prueba (Social Proof)
const reviews = [
	{
		id: 1,
		content:
			"La calidad de audio es brutal. Compré la licencia WAV y la mezcla quedó limpísima en Spotify. 100% recomendado para artistas serios.",
		author: "Carlos 'Flow' Ruiz",
		role: "Artista Urbano",
		rating: 5,
		avatar: "https://assets.mgdc.site/cdn-cgi/image/width=100,height=100,fit=cover,format=auto/carlos.jpg",
	},
	{
		id: 2,
		content:
			"Llevaba meses buscando beats de Lofi que no sonaran genéricos. Fluxbeats tiene ese sonido 'orgánico' que le faltaba a mis streams de Twitch.",
		author: "Sofía Streamz",
		role: "Content Creator",
		rating: 4,
		avatar: "https://assets.mgdc.site/cdn-cgi/image/width=100,height=100,fit=cover,format=auto/sofia.jpg",
	},
	{
		id: 3,
		content:
			"El proceso de compra fue súper rápido. Descargué los stems al instante y el contrato venía clarísimo. ¡Volveré a comprar seguro!",
		author: "Prod. Javi",
		role: "Ingeniero de Mezcla",
		rating: 4,
		avatar: "https://assets.mgdc.site/cdn-cgi/image/width=100,height=100,fit=cover,format=auto/javi.jpg",
	},
];

import { useLanguage } from "../../context/LanguageContext";
import { Avatar } from "../common/ResponsiveImage";

const Testimonios = () => {
	const { t } = useLanguage();
	return (
		<section
			id="testimonios"
			className="bg-white py-24 sm:py-32 border-t border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* ENCABEZADO DE LA SECCIÓN */}
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
						{t.reviews.header}
					</h2>
					<p className="mt-2 text-lg leading-8 text-slate-600 dark:text-slate-400">
						{t.reviews.subtitle}
					</p>
				</div>

				{/* GRID DE TARJETAS DE TESTIMONIOS */}
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{reviews.map((review) => (
						<div
							key={review.id}
							className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500"
						>
							{/* ESTRELLAS Y TEXTO */}
							<div>
								{/* Visualización de Estrellas (5 estáticas) */}
								<div className="flex gap-x-1 text-yellow-500 mb-4">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className="h-5 w-5 flex-none"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
												clipRule="evenodd"
											/>
										</svg>
									))}
								</div>

								{/* La Cita del Testimonio */}
								<p className="text-sm leading-6 text-slate-700 italic dark:text-slate-300">
									"{review.content}"
								</p>
							</div>

							{/* INFORMACIÓN DEL AUTOR */}
							<div className="mt-6 flex items-center gap-x-4 border-t border-slate-100 pt-4 dark:border-slate-700">
								<img
									className="h-10 w-10 rounded-full bg-slate-50 object-cover ring-2 ring-white dark:bg-slate-700 dark:ring-slate-600"
									src={review.avatar}
									alt={`Avatar de ${review.author}`}
								/>
								<div>
									<h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-white">
										{review.author}
									</h3>
									<p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
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
