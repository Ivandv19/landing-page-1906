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
		image: "https://assets.mgdc.site/winter.png",
		audioUrl: "https://assets.mgdc.site/winter.mp3",
	},
	{
		id: 2,
		title: "Seraph",
		bpm: 90,
		key: "C#m",
		price: 14.99,
		image: "https://assets.mgdc.site/Seraph.png",
		audioUrl: "https://assets.mgdc.site/LilSeraph.mp3",
	},
	{
		id: 3,
		title: "Moon",
		bpm: 89,
		key: "G#m",
		price: 14.99,
		image: "https://assets.mgdc.site/Moon.png",
		audioUrl: "https://assets.mgdc.site/Moon.mp3",
	},
	{
		id: 4,
		title: "7Nights",
		bpm: 85,
		key: "C#m",
		price: 14.99,
		image: "https://assets.mgdc.site/7Nights.png",
		audioUrl: "https://assets.mgdc.site/7Nights.mp3",
	},
	{
		id: 5,
		title: "Shibuya",
		bpm: 95,
		key: "Bbm",
		price: 14.99,
		image: "https://assets.mgdc.site/Shibuya.png",
		audioUrl: "https://assets.mgdc.site/ShibuyaNights.mp3",
	},
];
