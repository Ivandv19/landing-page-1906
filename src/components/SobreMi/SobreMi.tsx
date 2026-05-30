import { useT } from "@/store/appStore";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SobreMi = () => {
	const t = useT();
	const { ref, isVisible } = useScrollAnimation();

	const stats = [
		{ label: t.about.stats.years, value: "3+" },
		{ label: t.about.stats.catalog, value: "50+" },
		{ label: t.about.stats.clients, value: "10+" },
		{ label: t.about.stats.quality, value: "24-bit" },
	];

	return (
		<section
			id="sobre-mi"
			className="overflow-hidden bg-page-bg py-24 sm:py-32 border-t border-border/50 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div ref={ref as React.RefObject<HTMLDivElement>} className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center animate-on-scroll ${isVisible ? "visible" : ""}`}>
					<div className="lg:pr-8">
						<div className="lg:max-w-lg">
							<h2 className="text-base font-semibold leading-7 text-accent">
								{t.about.title}
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
								{t.about.headline}
							</p>
							<p className="mt-6 text-lg leading-8 text-text-muted">
								{t.about.p1}
							</p>
							<p className="mt-4 text-base leading-7 text-text-muted">
								{t.about.p2}
							</p>
							<p className="mt-4 text-base leading-7 text-text-muted">
								{t.about.p3}
							</p>

							<dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-10 sm:grid-cols-2">
								{stats.map((stat) => (
									<div
										key={stat.label}
										className="rounded-lg border border-border bg-surface-card p-4 shadow-md"
									>
										<dt className="text-sm font-medium leading-6 text-text-muted">
											{stat.label}
										</dt>
										<dd className="mt-2 text-3xl font-bold tracking-tight text-text-main">
											{stat.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>

					<div className="relative lg:mt-0">
						<ResponsiveImage
							src="about-me-studio.jpg"
							alt="Prod Flux Studio Setup"
							className="w-full h-auto rounded-xl bg-surface-card shadow-xl ring-1 ring-border/40 object-cover"
							sizes={{ mobile: 600, tablet: 900, desktop: 1200 }}
							width={1000}
							height={1000}
						/>

						<div className="absolute bottom-6 left-6 right-6 rounded-lg bg-surface-card/95 backdrop-blur-sm p-4 border border-border shadow-sm hidden md:block">
							<p className="text-sm font-medium text-text-main italic text-center">
								{t.about.quote}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SobreMi;
