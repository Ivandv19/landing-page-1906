import { type FC, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { beats } from "../../data/beats";
import { MiniPlayer } from "./MiniPlayer";
import { BeatCard } from "./BeatCard";

/**
 * BeatsSection Component
 *
 * Muestra el catálogo de beats disponibles en un carrusel desplazable.
 * Funcionalidades:
 * - Listado horizontal de beats (scroll con botones y teclado).
 * - Integración con `useAudioPlayer` para manejar la reproducción global.
 * - Renderiza `MiniPlayer` persistente cuando hay un beat activo.
 * - Animación de entrada al hacer scroll.
 */
const BeatsSection: FC = () => {
	const { t } = useLanguage();
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const scrollRef = useRef<HTMLDivElement>(null);
	const {
		audioRef,
		currentBeat,
		isPlaying,
		isLoading,
		volume,
		progress,
		currentTime,
		duration,
		togglePlayPause,
		stop,
		handleVolumeChange,
		handleSeek,
	} = useAudioPlayer();

	const scroll = (direction: "left" | "right") => {
		const { current } = scrollRef;
		if (current) {
			const scrollAmount = direction === "left" ? -320 : 320;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return; // No interferir con inputs
			}

			if (e.key === "ArrowLeft") scroll("left");
			if (e.key === "ArrowRight") scroll("right");
			if (e.key === " " && currentBeat) {
				e.preventDefault();
				togglePlayPause(currentBeat);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [currentBeat, togglePlayPause]);

	return (
		<>
			<section
				id="beats"
				className="bg-white py-24 sm:py-32 dark:bg-slate-900 transition-colors duration-300"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div
						ref={headerRef as React.RefObject<HTMLDivElement>}
						className={`flex items-center justify-between mb-12 animate-on-scroll ${headerVisible ? "visible" : ""}`}
					>
						<div>
							<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
								{t.beats.title}
							</h2>
							<p className="mt-2 text-lg leading-8 text-slate-600 dark:text-slate-400">
								{t.beats.subtitle}
							</p>
						</div>
						<div className="flex gap-4">
							<button
								onClick={() => scroll("left")}
								className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-blue-400"
								aria-label="Anterior"
							>
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								onClick={() => scroll("right")}
								className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-blue-400"
								aria-label="Siguiente"
							>
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
					</div>

					<div
						ref={scrollRef}
						className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-2"
						style={{ scrollbarWidth: "none" }}
					>
						{beats.map((beat) => (
							<BeatCard
								key={beat.id}
								beat={beat}
								isPlaying={currentBeat?.id === beat.id && isPlaying}
								isLoading={isLoading && currentBeat?.id === beat.id}
								onPlay={togglePlayPause}
							/>
						))}
					</div>
				</div>
			</section>

			<audio ref={audioRef} />

			<MiniPlayer
				currentBeat={currentBeat}
				isPlaying={isPlaying}
				isLoading={isLoading}
				volume={volume}
				progress={progress}
				currentTime={currentTime}
				duration={duration}
				onToggle={() => togglePlayPause(currentBeat)}
				onClose={stop}
				onVolumeChange={handleVolumeChange}
				onSeek={handleSeek}
			/>
		</>
	);
};

export default BeatsSection;
