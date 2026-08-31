// React
import type { FC } from "react";

// Config
import { ASSETS_BASE } from "@/config/assets";

// Props del componente de imagen responsive
interface ResponsiveImageProps {
	src: string;
	alt: string;
	className?: string;
	sizes?: {
		mobile?: number;
		tablet?: number;
		desktop?: number;
	};
	width?: number;
	height?: number;
}

/**
 * Componente de imagen optimizado que consume assets desde Cloudflare R2
 * con compresión y entrega automática mediante Cloudflare Edge CDN.
 */
export const ResponsiveImage: FC<ResponsiveImageProps> = ({
	src,
	alt,
	className = "",
	width,
	height,
}) => {
	const cleanSrc = src.startsWith("http") ? src : `${ASSETS_BASE}/${src}`;

	return (
		<img
			src={cleanSrc}
			alt={alt}
			className={className}
			width={width}
			height={height}
			loading="lazy"
		/>
	);
};
