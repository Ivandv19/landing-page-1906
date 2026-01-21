import { type FC } from "react";

interface ResponsiveImageProps {
	src: string; // Nombre del archivo en assets.mgdc.site (ej: "winter.png")
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

const DEFAULT_SIZES = {
	mobile: 280,
	tablet: 400,
	desktop: 600,
};

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

	// Generar URLs optimizadas para cada tamaño
	const mobileUrl = `${baseUrl}/cdn-cgi/image/width=${mobile},format=auto/${src}`;
	const tabletUrl = `${baseUrl}/cdn-cgi/image/width=${tablet},format=auto/${src}`;
	const desktopUrl = `${baseUrl}/cdn-cgi/image/width=${desktop},format=auto/${src}`;

	return (
		<img
			src={desktopUrl} // Fallback para navegadores sin srcset
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

// Para avatares (siempre pequeños)
export const Avatar: FC<Omit<ResponsiveImageProps, "sizes">> = (props) => {
	return (
		<ResponsiveImage
			{...props}
			sizes={{ mobile: 80, tablet: 100, desktop: 100 }}
		/>
	);
};
