import type { FC } from "react";
import { Play, Pause, LoaderCircle } from "lucide-react";
import { useT } from "@/store/appStore";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import type { Beat } from "@/data/beats";

interface BeatCardProps {
	beat: Beat;
	isPlaying: boolean;
	isLoading: boolean;
	onPlay: (beat: Beat) => void;
}

export const BeatCard: FC<BeatCardProps> = ({
	beat,
	isPlaying,
	isLoading,
	onPlay,
}) => {
	const t = useT();

	return (
		<div className="min-w-[280px] md:min-w-[320px] snap-center group relative flex flex-col overflow-hidden rounded-lg bg-surface-card shadow-md transition-all hover:shadow-xl border border-border">
			<div className="relative aspect-square overflow-hidden bg-border/50">
				<ResponsiveImage
					src={beat.image.split("/").pop() || ""}
					alt={beat.title}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					sizes={{ mobile: 280, tablet: 320, desktop: 400 }}
				/>
				<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
				<button
					type="button"
					onClick={() => onPlay(beat)}
					disabled={isLoading}
					aria-label={isPlaying ? "Pause" : "Play"}
					className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-accent-hover disabled:opacity-50 ${isPlaying
							? "opacity-100 scale-100"
							: "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
						}`}
				>
					{isLoading ? (
						<LoaderCircle size={24} className="animate-spin" />
					) : isPlaying ? (
						<Pause size={24} fill="currentColor" />
					) : (
						<Play size={24} fill="currentColor" className="ml-1" />
					)}
				</button>
			</div>
			<div className="flex flex-1 flex-col justify-between p-5">
				<div>
					<h3 className="text-lg font-bold text-text-main">
						{beat.title}
					</h3>
					<div className="mt-2 flex items-center gap-3 text-sm text-text-muted">
						<span className="flex items-center gap-1">
							<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
								<circle cx="12" cy="12" r="10" />
								<polyline points="12 6 12 12 16 14" />
							</svg>
							{beat.bpm} BPM
						</span>
						<span className="opacity-40">|</span>
						<span>{beat.key}</span>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-between">
					<span className="text-lg font-bold text-accent dark:text-accent-hover">
						${beat.price}
					</span>
					<button type="button" className="rounded-md border border-border px-4 py-1.5 text-sm font-semibold text-text-main transition-colors hover:border-accent hover:bg-accent-muted hover:text-accent dark:hover:bg-accent/10">
						{t.beats.buy}
					</button>
				</div>
			</div>
		</div>
	);
};
