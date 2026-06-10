// React
import type { FC } from "react";

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

// Tamaños por defecto para cada breakpoint
const DEFAULT_SIZES = {
	mobile: 280,
	tablet: 400,
	desktop: 600,
};

/**
 * Componente de imagen optimizado que utiliza Cloudflare Image Resizing.
 * Genera atributos srcSet y sizes automáticamente para responsive loading.
 */
export const ResponsiveImage: FC<ResponsiveImageProps> = ({
	src,
	alt,
	className = "",
	sizes = DEFAULT_SIZES,
	width,
	height,
}) => {
	const baseUrl = "https://assets.mgdc.site";
	const { mobile, tablet, desktop } = { ...DEFAULT_SIZES, ...sizes };

	// 1. Genera URLs optimizadas para cada tamaño de pantalla
	const mobileUrl = `${baseUrl}/cdn-cgi/image/width=${mobile},format=auto/${src}`;
	const tabletUrl = `${baseUrl}/cdn-cgi/image/width=${tablet},format=auto/${src}`;
	const desktopUrl = `${baseUrl}/cdn-cgi/image/width=${desktop},format=auto/${src}`;

	return (
		<img
			src={desktopUrl}
			srcSet={`${mobileUrl} ${mobile}w, ${tabletUrl} ${tablet}w, ${desktopUrl} ${desktop}w`}
			sizes={`(max-width: 640px) ${mobile}px, (max-width: 1024px) ${tablet}px, ${desktop}px`}
			alt={alt}
			className={className}
			width={width}
			height={height}
			loading="lazy"
		/>
	);
};
