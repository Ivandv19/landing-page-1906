import { useState, type FormEvent } from "react";
import { Mail, Clock, Share2, LoaderCircle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useT } from "@/store/appStore";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { ContactFormData, ContactResponse } from "./types";

const Contacto = () => {
	const t = useT();
	const { ref, isVisible } = useScrollAnimation();
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		message: "",
		turnstileToken: "",
	});
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data: ContactResponse = await response.json();

			if (!response.ok || !data.success) {
				throw new Error(data.error || "Error al enviar el mensaje");
			}

			setStatus("success");
			setFormData({ name: "", email: "", message: "", turnstileToken: "" });

			setTimeout(() => setStatus("idle"), 5000);
		} catch (error) {
			setStatus("error");
			setErrorMessage(
				error instanceof Error ? error.message : "Error al enviar el mensaje"
			);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<section
			id="contacto"
			className="bg-page-bg py-24 sm:py-32 border-t border-border/50 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div ref={ref as React.RefObject<HTMLDivElement>} className={`grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2 animate-on-scroll ${isVisible ? "visible" : ""}`}>
					<div className="flex flex-col justify-center">
						<h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
							{t.contact.title}
						</h2>
						<p className="mt-4 text-lg leading-8 text-text-muted">
							{t.contact.subtitle}
						</p>

						<div className="mt-8 space-y-6">
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted text-accent ring-1 ring-accent/30 dark:bg-accent/10 dark:text-accent-hover dark:ring-accent/20">
									<Mail size={24} />
								</div>
								<div className="text-base text-text-muted">
									<span className="block font-semibold text-text-main">
										{t.contact.email}
									</span>
									<span>contacto@fluxbeats.com</span>
								</div>
							</div>

							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted text-accent ring-1 ring-accent/30 dark:bg-accent/10 dark:text-accent-hover dark:ring-accent/20">
									<Clock size={24} />
								</div>
								<div className="text-base text-text-muted">
									<span className="block font-semibold text-text-main">
										{t.contact.response}
									</span>
									{t.contact.responseTime}
								</div>
							</div>

							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted text-accent ring-1 ring-accent/30 dark:bg-accent/10 dark:text-accent-hover dark:ring-accent/20">
									<Share2 size={24} />
								</div>
								<div>
									<span className="block font-semibold text-text-main text-base">
										{t.contact.follow}
									</span>
									<div className="flex gap-4 mt-1">
										<button type="button" className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1">
											Instagram
										</button>
										<span className="opacity-30">|</span>
										<button type="button" className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1">
											YouTube
										</button>
										<span className="opacity-30">|</span>
										<button type="button" className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1">
											Airbit
										</button>
										<span className="opacity-30">|</span>
										<button type="button" className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1">
											BeatStars
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className="rounded-xl border border-border bg-surface-card p-6 shadow-xl sm:p-8"
					>
						{status === "success" && (
							<div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-900/50">
								<div className="flex">
									<svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
									</svg>
									<p className="ml-3 text-sm font-medium text-green-800 dark:text-green-300">
										Mensaje enviado correctamente! Te responderemos pronto.
									</p>
								</div>
							</div>
						)}

						{status === "error" && (
							<div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50">
								<div className="flex">
									<svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
									</svg>
									<p className="ml-3 text-sm font-medium text-red-800 dark:text-red-300">
										{errorMessage}
									</p>
								</div>
							</div>
						)}

						<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
							<div className="sm:col-span-2">
								<label htmlFor="name" className="block text-sm font-semibold leading-6 text-text-main">
									{t.contact.form.name}
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="name"
										id="name"
										required
										minLength={2}
										maxLength={100}
										value={formData.name}
										onChange={handleChange}
										disabled={status === "loading"}
										autoComplete="name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-text-main shadow-sm ring-1 ring-inset ring-border placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-page-bg dark:ring-border"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label htmlFor="email" className="block text-sm font-semibold leading-6 text-text-main">
									Email
								</label>
								<div className="mt-2.5">
									<input
										type="email"
										name="email"
										id="email"
										required
										value={formData.email}
										onChange={handleChange}
										disabled={status === "loading"}
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-text-main shadow-sm ring-1 ring-inset ring-border placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-page-bg dark:ring-border"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label htmlFor="message" className="block text-sm font-semibold leading-6 text-text-main">
									Mensaje
								</label>
								<div className="mt-2.5">
									<textarea
										name="message"
										id="message"
										required
										minLength={10}
										maxLength={1000}
										rows={4}
										value={formData.message}
										onChange={handleChange}
										disabled={status === "loading"}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-text-main shadow-sm ring-1 ring-inset ring-border placeholder:text-text-muted focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6 resize-none disabled:opacity-50 disabled:cursor-not-allowed dark:bg-page-bg dark:ring-border"
									/>
								</div>
							</div>
						</div>

						<div className="mt-6 flex justify-center sm:justify-start">
							<Turnstile
								siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
								onSuccess={(token) => {
									setFormData((prev) => ({ ...prev, turnstileToken: token }));
								}}
								onExpire={() => {
									setFormData((prev) => ({ ...prev, turnstileToken: "" }));
								}}
							/>
						</div>

						<div className="mt-8 flex justify-end">
							<button
								type="submit"
								disabled={status === "loading" || !formData.turnstileToken}
								className="rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{status === "loading" ? (
									<span className="flex items-center justify-center gap-2">
										<LoaderCircle size={16} className="animate-spin" />
										Enviando...
									</span>
								) : (
									"Enviar Mensaje"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contacto;
