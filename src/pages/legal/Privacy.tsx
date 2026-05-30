import type { FC } from "react";
import { Link } from "react-router-dom";

import { useT } from "@/store/appStore";

const Privacy: FC = () => {
	const t = useT();

	return (
		<div className="min-h-screen bg-page-bg pt-32 pb-16 transition-colors duration-300">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				<Link
					to="/"
					className="text-sm font-medium text-accent hover:text-accent-hover mb-8 inline-block"
				>
					&larr; {t.footer.backToHome}
				</Link>
				<h1 className="text-4xl font-bold tracking-tight text-text-main mb-8">
					{t.legalPages.privacy.title}
				</h1>
				<div className="prose prose-slate dark:prose-invert max-w-none text-text-muted space-y-6">
					<section>
						<h2 className="text-2xl font-semibold text-text-main">{t.legalPages.privacy.s1.title}</h2>
						<p>{t.legalPages.privacy.s1.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-text-main">{t.legalPages.privacy.s2.title}</h2>
						<p>{t.legalPages.privacy.s2.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-text-main">{t.legalPages.privacy.s3.title}</h2>
						<p>{t.legalPages.privacy.s3.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-text-main">{t.legalPages.privacy.s4.title}</h2>
						<p>{t.legalPages.privacy.s4.content}</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Privacy;
