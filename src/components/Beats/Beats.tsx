// React

// Iconos
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useCallback, useRef } from "react";
// Datos
import { beats } from "@/data/beats";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
// Store
import { useStore, useT } from "@/store/appStore";
import { BeatCard } from "./BeatCard";
// Componentes
import { MiniPlayer } from "./MiniPlayer";

// Sección de beats con desplazamiento horizontal y navegación por teclado
const BeatsSection: FC = () => {
	const t = useT();
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentBeat = useStore((s) => s.currentBeat);
	const isPlaying = useStore((s) => s.isPlaying);
	const isLoading = useStore((s) => s.isLoading);
	const volume = useStore((s) => s.volume);
	const progress = useStore((s) => s.progress);
	const currentTime = useStore((s) => s.currentTime);
	const duration = useStore((s) => s.duration);
	const play = useStore((s) => s.play);
	const stop = useStore((s) => s.stop);
	const setVolume = useStore((s) => s.setVolume);
	const seek = useStore((s) => s.seek);

	// Desplaza el contenedor horizontalmente
	const scroll = useCallback((direction: "left" | "right") => {
		const { current } = scrollRef;
		if (current) {
			const scrollAmount = direction === "left" ? -320 : 320;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	// Navegación por teclado: flechas y espacio
	useKeyboardNav(
		() => scroll("left"),
		() => scroll("right"),
		currentBeat ? () => play(currentBeat) : undefined,
	);

	return (
		<>
			<section
				id="beats"
				className="bg-page-bg py-24 sm:py-32 border-t border-border/50"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Encabezado de la sección */}
					<div className="flex items-center justify-between mb-12 scroll-reveal">
						<div>
							<h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
								{t.beats.title}
							</h2>
							<p className="mt-2 text-lg leading-8 text-text-muted">
								{t.beats.subtitle}
							</p>
						</div>
						{/* Botones de navegación */}
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => scroll("left")}
								className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-card transition-all hover:border-accent hover:text-accent active:scale-95"
								aria-label="Anterior"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								type="button"
								onClick={() => scroll("right")}
								className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-card transition-all hover:border-accent hover:text-accent active:scale-95"
								aria-label="Siguiente"
							>
								<ChevronRight size={20} />
							</button>
						</div>
					</div>

					{/* Lista horizontal de beats */}
					<div
						ref={scrollRef}
						className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-2"
					>
						{beats.map((beat) => (
							<BeatCard
								key={beat.id}
								beat={beat}
								isPlaying={currentBeat?.id === beat.id && isPlaying}
								isLoading={isLoading && currentBeat?.id === beat.id}
								onPlay={play}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Reproductor mini inferior */}
			<MiniPlayer
				currentBeat={currentBeat}
				isPlaying={isPlaying}
				isLoading={isLoading}
				volume={volume}
				progress={progress}
				currentTime={currentTime}
				duration={duration}
				onToggle={() => {
					if (currentBeat) play(currentBeat);
				}}
				onClose={stop}
				onVolumeChange={setVolume}
				onSeek={seek}
			/>
		</>
	);
};

export default BeatsSection;
