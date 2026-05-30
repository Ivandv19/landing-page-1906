import type { FC } from "react";
import { Play, Pause, LoaderCircle, X, Volume1, Volume2, VolumeX } from "lucide-react";
import type { Beat } from "@/data/beats";
import { formatTime } from "@/utils/time";

interface MiniPlayerProps {
	currentBeat: Beat | null;
	isPlaying: boolean;
	isLoading: boolean;
	volume: number;
	progress: number;
	currentTime: number;
	duration: number;
	onToggle: () => void;
	onClose: () => void;
	onVolumeChange: (volume: number) => void;
	onSeek: (progress: number) => void;
}

const VolumeIcon = ({ volume }: { volume: number }) => {
	if (volume === 0) return <VolumeX size={20} />;
	if (volume < 0.5) return <Volume1 size={20} />;
	return <Volume2 size={20} />;
};

export const MiniPlayer: FC<MiniPlayerProps> = ({
	currentBeat,
	isPlaying,
	isLoading,
	volume,
	progress,
	currentTime,
	duration,
	onToggle,
	onClose,
	onVolumeChange,
	onSeek,
}) => {
	if (!currentBeat) return null;

	return (
		<div className="fixed bottom-0 left-0 w-full z-[100] bg-surface-card border-t border-border shadow-2xl transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
				<div className="mb-3">
					<input
						type="range"
						min="0"
						max="100"
						value={progress}
						onChange={(e) => onSeek(Number(e.target.value))}
						className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-accent-hover"
						style={{
							background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${progress}%, rgb(226, 232, 240) ${progress}%, rgb(226, 232, 240) 100%)`,
						}}
					/>
					<div className="flex justify-between text-xs text-text-muted mt-1">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4 min-w-0 flex-1">
						<button
							type="button"
							onClick={onToggle}
							disabled={isLoading}
							className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
							aria-label={isPlaying ? "Pausar" : "Reproducir"}
						>
							{isLoading ? (
								<LoaderCircle size={20} className="animate-spin" />
							) : isPlaying ? (
								<Pause size={20} fill="currentColor" />
							) : (
								<Play size={20} fill="currentColor" className="ml-0.5" />
							)}
						</button>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-semibold text-text-main truncate">
								{currentBeat.title}
							</p>
							<p className="text-xs text-text-muted">
								{currentBeat.bpm} BPM | {currentBeat.key}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4 shrink-0">
						<div className="hidden md:flex items-center gap-2">
							<VolumeIcon volume={volume} />
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={volume}
								onChange={(e) => onVolumeChange(Number(e.target.value))}
								className="w-20 h-1 bg-border rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-accent-hover"
							/>
						</div>

						<button
							type="button"
							onClick={onClose}
							className="text-text-muted hover:text-text-main p-2 rounded-full transition-colors"
							aria-label="Cerrar reproductor"
						>
							<X size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
