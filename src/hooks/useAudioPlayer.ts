import { useCallback, useEffect, useRef, useState } from "react";
import type { Beat } from "../data/beats";

export const useAudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [volume, setVolume] = useState(0.7); // 70% por defecto
	const [progress, setProgress] = useState(0); // 0-100
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const togglePlayPause = useCallback(
		(beat: Beat | null) => {
			if (!beat) return;
			const audio = audioRef.current;
			if (!audio) return;

			// Si es el mismo beat, solo pausar/reproducir
			if (currentBeat?.id === beat.id) {
				if (isPlaying) {
					audio.pause();
					setIsPlaying(false);
				} else {
					audio.play();
					setIsPlaying(true);
				}
			} else {
				// Nuevo beat, cargar y reproducir
				setIsLoading(true);
				audio.src = beat.audioUrl;
				audio.volume = volume;
				audio
					.play()
					.then(() => {
						setIsPlaying(true);
						setCurrentBeat(beat);
					})
					.catch((err) => {
						console.error("Error al reproducir audio:", err);
					})
					.finally(() => {
						setIsLoading(false);
					});
			}
		},
		[currentBeat, isPlaying, volume]
	);

	const stop = useCallback(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
		setIsPlaying(false);
		setCurrentBeat(null);
		setProgress(0);
		setCurrentTime(0);
	}, []);

	const handleVolumeChange = useCallback((newVolume: number) => {
		const audio = audioRef.current;
		if (audio) {
			audio.volume = newVolume;
		}
		setVolume(newVolume);
	}, []);

	const handleSeek = useCallback((newProgress: number) => {
		const audio = audioRef.current;
		if (audio && duration) {
			const newTime = (newProgress / 100) * duration;
			audio.currentTime = newTime;
			setProgress(newProgress);
		}
	}, [duration]);

	// Actualizar progreso y tiempo
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateProgress = () => {
			setCurrentTime(audio.currentTime);
			setDuration(audio.duration || 0);
			if (audio.duration) {
				setProgress((audio.currentTime / audio.duration) * 100);
			}
		};

		const handleEnded = () => {
			setIsPlaying(false);
			setProgress(0);
			setCurrentTime(0);
		};

		audio.addEventListener("timeupdate", updateProgress);
		audio.addEventListener("loadedmetadata", updateProgress);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateProgress);
			audio.removeEventListener("loadedmetadata", updateProgress);
			audio.removeEventListener("ended", handleEnded);
		};
	}, []);

	// Cleanup al desmontar
	useEffect(() => {
		return () => {
			const audio = audioRef.current;
			if (audio) {
				audio.pause();
				audio.src = "";
			}
		};
	}, []);

	return {
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
	};
};
