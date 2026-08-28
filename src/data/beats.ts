import { ASSETS_BASE } from "@/config/assets";

export interface Beat {
	id: number;
	title: string;
	bpm: number;
	key: string;
	price: number;
	image: string;
	audioUrl: string;
}

export const beats: Beat[] = [
	{
		id: 1,
		title: "winter",
		bpm: 78,
		key: "E",
		price: 14.99,
		image: "winter.png",
		audioUrl: `${ASSETS_BASE}/winter.mp3`,
	},
	{
		id: 2,
		title: "Seraph",
		bpm: 90,
		key: "C#m",
		price: 14.99,
		image: "seraph.png",
		audioUrl: `${ASSETS_BASE}/lil-seraph.mp3`,
	},
	{
		id: 3,
		title: "Moon",
		bpm: 89,
		key: "G#m",
		price: 14.99,
		image: "moon.png",
		audioUrl: `${ASSETS_BASE}/moon.mp3`,
	},
	{
		id: 4,
		title: "7Nights",
		bpm: 85,
		key: "C#m",
		price: 14.99,
		image: "7nights.png",
		audioUrl: `${ASSETS_BASE}/7nights.mp3`,
	},
	{
		id: 5,
		title: "Shibuya",
		bpm: 95,
		key: "Bbm",
		price: 14.99,
		image: "shibuya.png",
		audioUrl: `${ASSETS_BASE}/shibuya-nights.mp3`,
	},
];
