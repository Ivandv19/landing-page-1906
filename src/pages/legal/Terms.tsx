import type { FC } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";

const Terms: FC = () => {
	const { t } = useLanguage();

	return (
		<div className="min-h-screen bg-white dark:bg-slate-900 pt-32 pb-16 transition-colors duration-300">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				<Link
					to="/"
					className="text-sm font-medium text-blue-600 hover:text-blue-500 mb-8 inline-block dark:text-blue-400"
				>
					&larr; {t.footer.backToHome}
				</Link>
				<h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
					{t.legalPages.terms.title}
				</h1>
				<div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6">
					<section>
						<h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t.legalPages.terms.s1.title}</h2>
						<p>{t.legalPages.terms.s1.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t.legalPages.terms.s2.title}</h2>
						<p>{t.legalPages.terms.s2.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t.legalPages.terms.s3.title}</h2>
						<p>{t.legalPages.terms.s3.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t.legalPages.terms.s4.title}</h2>
						<p>{t.legalPages.terms.s4.content}</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Terms;
