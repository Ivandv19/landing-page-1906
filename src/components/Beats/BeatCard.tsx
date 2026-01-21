import { type FC } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { ResponsiveImage } from "../common/ResponsiveImage";
import type { Beat } from "../../data/beats";

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
	const { t } = useLanguage();

	return (
		<div className="min-w-[280px] md:min-w-[320px] snap-center group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
			<div className="relative aspect-square overflow-hidden bg-slate-200 dark:bg-slate-700">
				<ResponsiveImage
					src={beat.image.split("/").pop() || ""}
					alt={beat.title}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					sizes={{ mobile: 280, tablet: 320, desktop: 400 }}
				/>
				<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
				<button
					onClick={() => onPlay(beat)}
					disabled={isLoading}
					className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-500 disabled:opacity-50 ${
						isPlaying
							? "opacity-100 scale-100"
							: "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
					}`}
				>
					{isLoading ? (
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
					) : isPlaying ? (
						<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
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
	);
};
