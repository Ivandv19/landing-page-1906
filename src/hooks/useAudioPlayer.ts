import { useCallback, useEffect, useRef, useState } from "react";
import type { Beat } from "../data/beats";

export const useAudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
		[currentBeat, isPlaying]
	);

	const stop = useCallback(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
		setIsPlaying(false);
		setCurrentBeat(null);
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
		togglePlayPause,
		stop,
	};
};
