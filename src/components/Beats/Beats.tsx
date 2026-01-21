import { type FC, useRef, useState, useEffect, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { beats, type Beat } from "../../data/beats";

// Definimos las props para el MiniPlayer
interface MiniPlayerProps {
	currentBeat: Beat | null;
	isPlaying: boolean;
	isLoading: boolean;
	onToggle: () => void;
	onClose: () => void;
}

const MiniPlayer: FC<MiniPlayerProps> = ({
	currentBeat,
	isPlaying,
	isLoading,
	onToggle,
	onClose,
}) => {
	if (!currentBeat) return null;

	return (
		<div className="fixed bottom-0 left-0 w-full z-[100] bg-white border-t border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
				<div className="flex items-center gap-4 min-w-0">
					<button
						onClick={onToggle}
						disabled={isLoading}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
						aria-label={isPlaying ? "Pausar" : "Reproducir"}
					>
						{isLoading ? (
							<svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						) : isPlaying ? (
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
							</svg>
						) : (
							<svg
								className="h-5 w-5 ml-0.5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M8 5v14l11-7z" />
							</svg>
						)}
					</button>
					<div className="min-w-0">
						<p className="text-sm font-semibold text-slate-900 truncate dark:text-white">
							{currentBeat.title}
						</p>
						<p className="text-xs text-slate-500 dark:text-slate-400">
							{currentBeat.bpm} BPM | {currentBeat.key}
						</p>
					</div>
				</div>

				<button
					onClick={onClose}
					className="text-slate-500 hover:text-slate-700 p-2 rounded-full transition-colors dark:text-slate-400 dark:hover:text-slate-200"
					aria-label="Cerrar reproductor"
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

const BeatsSection: FC = () => {
	const { t } = useLanguage();
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
	const scrollRef = useRef<HTMLDivElement>(null);
	const { audioRef, currentBeat, isPlaying, isLoading, togglePlayPause, stop } = useAudioPlayer();
	const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

	const scroll = (direction: "left" | "right") => {
		const { current } = scrollRef;
		if (current) {
			const scrollAmount = direction === "left" ? -320 : 320;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	const handleImageError = (beatId: number) => {
		setImageErrors((prev) => new Set(prev).add(beatId));
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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

	// Memoizar beat cards para evitar re-renders innecesarios
	const beatCards = useMemo(
		() =>
			beats.map((beat) => (
				<div
					key={beat.id}
					className="min-w-[280px] md:min-w-[320px] snap-center group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow border border-slate-200 dark:bg-slate-800 dark:border-slate-700"
				>
					<div className="relative aspect-square overflow-hidden bg-slate-200 dark:bg-slate-700">
						<img
							src={beat.image}
							alt={beat.title}
							onError={() => handleImageError(beat.id)}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
						<button
							onClick={() => togglePlayPause(beat)}
							disabled={isLoading}
							className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-500 disabled:opacity-50 ${
								currentBeat?.id === beat.id && isPlaying
									? "opacity-100 scale-100"
									: "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
							}`}
						>
							{isLoading && currentBeat?.id === beat.id ? (
								<svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
							) : currentBeat?.id === beat.id && isPlaying ? (
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
								</svg>
							) : (
								<svg
									className="h-6 w-6 ml-1"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M8 5v14l11-7z" />
								</svg>
							)}
						</button>
					</div>
					<div className="flex flex-1 flex-col justify-between p-5">
						<div>
							<h3 className="text-lg font-bold text-slate-900 dark:text-white">
								{beat.title}
							</h3>
							<div className="mt-2 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
								<span className="flex items-center gap-1">
									<svg
										className="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<circle cx="12" cy="12" r="10" />
										<polyline points="12 6 12 12 16 14" />
									</svg>
									{beat.bpm} BPM
								</span>
								<span className="text-slate-300">|</span>
								<span>{beat.key}</span>
							</div>
						</div>
						<div className="mt-6 flex items-center justify-between">
							<span className="text-lg font-bold text-blue-600 dark:text-blue-400">
								${beat.price}
							</span>
							<button className="rounded-md border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700 dark:hover:text-blue-400">
								{t.beats.buy}
							</button>
						</div>
					</div>
				</div>
			)),
		[currentBeat, isPlaying, isLoading, togglePlayPause, t.beats.buy]
	);

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
						{beatCards}
					</div>
				</div>
			</section>

			<audio ref={audioRef} />

			<MiniPlayer
				currentBeat={currentBeat}
				isPlaying={isPlaying}
				isLoading={isLoading}
				onToggle={() => togglePlayPause(currentBeat)}
				onClose={stop}
			/>
		</>
	);
};

export default BeatsSection;
