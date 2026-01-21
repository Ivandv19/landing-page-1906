import { type FC } from "react";
import type { Beat } from "../../data/beats";

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

// Helper para formatear tiempo
const formatTime = (seconds: number) => {
	if (!seconds || isNaN(seconds)) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
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
		<div className="fixed bottom-0 left-0 w-full z-[100] bg-white border-t border-slate-200 shadow-2xl dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
				{/* Progress Bar */}
				<div className="mb-3">
					<input
						type="range"
						min="0"
						max="100"
						value={progress}
						onChange={(e) => onSeek(Number(e.target.value))}
						className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-blue-500"
						style={{
							background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${progress}%, rgb(226, 232, 240) ${progress}%, rgb(226, 232, 240) 100%)`,
						}}
					/>
					<div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				{/* Controls */}
				<div className="flex items-center justify-between gap-4">
					{/* Left: Play button + Info */}
					<div className="flex items-center gap-4 min-w-0 flex-1">
						<button
							onClick={onToggle}
							disabled={isLoading}
							className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
						<div className="min-w-0 flex-1">
							<p className="text-sm font-semibold text-slate-900 truncate dark:text-white">
								{currentBeat.title}
							</p>
							<p className="text-xs text-slate-500 dark:text-slate-400">
								{currentBeat.bpm} BPM | {currentBeat.key}
							</p>
						</div>
					</div>

					{/* Right: Volume + Close */}
					<div className="flex items-center gap-4 shrink-0">
						{/* Volume Control */}
						<div className="hidden md:flex items-center gap-2">
							<svg
								className="h-5 w-5 text-slate-500 dark:text-slate-400"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								{volume === 0 ? (
									<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
								) : volume < 0.5 ? (
									<path d="M7 9v6h4l5 5V4l-5 5H7z" />
								) : (
									<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
								)}
							</svg>
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={volume}
								onChange={(e) => onVolumeChange(Number(e.target.value))}
								className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-blue-500"
							/>
						</div>

						{/* Close Button */}
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
			</div>
		</div>
	);
};
