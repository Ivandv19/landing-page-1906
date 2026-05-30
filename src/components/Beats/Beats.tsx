import { type FC, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT, useStore } from "@/store/appStore";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { beats } from "@/data/beats";
import { MiniPlayer } from "./MiniPlayer";
import { BeatCard } from "./BeatCard";

const BeatsSection: FC = () => {
	const t = useT();
	const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
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

	const scroll = useCallback((direction: "left" | "right") => {
		const { current } = scrollRef;
		if (current) {
			const scrollAmount = direction === "left" ? -320 : 320;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			if (e.key === "ArrowLeft") scroll("left");
			if (e.key === "ArrowRight") scroll("right");
			if (e.key === " " && currentBeat) {
				e.preventDefault();
				play(currentBeat);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [currentBeat, play, scroll]);

	return (
		<>
			<section
				id="beats"
				className="bg-page-bg py-24 sm:py-32 border-t border-border/50"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div
						ref={headerRef as React.RefObject<HTMLDivElement>}
						className={`flex items-center justify-between mb-12 animate-on-scroll ${headerVisible ? "visible" : ""}`}
					>
						<div>
							<h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
								{t.beats.title}
							</h2>
							<p className="mt-2 text-lg leading-8 text-text-muted">
								{t.beats.subtitle}
							</p>
						</div>
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

			<MiniPlayer
				currentBeat={currentBeat}
				isPlaying={isPlaying}
				isLoading={isLoading}
				volume={volume}
				progress={progress}
				currentTime={currentTime}
				duration={duration}
				onToggle={() => { if (currentBeat) play(currentBeat); }}
				onClose={stop}
				onVolumeChange={setVolume}
				onSeek={seek}
			/>
		</>
	);
};

export default BeatsSection;
