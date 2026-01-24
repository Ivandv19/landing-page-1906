import { useState, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLanguage } from "../../context/LanguageContext";
import type { ContactFormData, ContactResponse } from "./types";

const Contacto = () => {
	const { t } = useLanguage();
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

			// Reset success message after 5 seconds
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
			className="bg-white py-24 sm:py-32 border-t border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-2">
					{/* COLUMNA IZQUIERDA: Información de Contacto */}
					<div className="flex flex-col justify-center">
						<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
							{t.contact.title}
						</h2>
						<p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
							{t.contact.subtitle}
						</p>

						<div className="mt-8 space-y-6">
							{/* Email de Contacto */}
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/50">
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
										/>
									</svg>
								</div>
								<div className="text-base text-slate-600">
									<span className="block font-semibold text-slate-900 dark:text-white">
										{t.contact.email}
									</span>
									<span className="dark:text-slate-400">
										contacto@fluxbeats.com
									</span>
								</div>
							</div>

							{/* Tiempo de Respuesta */}
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/50">
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div className="text-base text-slate-600 dark:text-slate-400">
									<span className="block font-semibold text-slate-900 dark:text-white">
										{t.contact.response}
									</span>
									{t.contact.responseTime}
								</div>
							</div>

							{/* Redes Sociales */}
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/50">
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
										/>
									</svg>
								</div>
								<div>
									<span className="block font-semibold text-slate-900 text-base dark:text-white">
										{t.contact.follow}
									</span>
									<div className="flex gap-4 mt-1">
										<a
											href="#"
											className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 dark:text-slate-400 dark:hover:text-blue-400"
										>
											Instagram
										</a>
										<span className="text-slate-300 dark:text-slate-600">|</span>
										<a
											href="#"
											className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 dark:text-slate-400 dark:hover:text-blue-400"
										>
											YouTube
										</a>
										<span className="text-slate-300 dark:text-slate-600">|</span>
										<a
											href="#"
											className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 dark:text-slate-400 dark:hover:text-blue-400"
										>
											Airbit
										</a>
										<span className="text-slate-300 dark:text-slate-600">|</span>
										<a
											href="#"
											className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 dark:text-slate-400 dark:hover:text-blue-400"
										>
											BeatStars
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* COLUMNA DERECHA: Formulario de Contacto */}
					<form
						onSubmit={handleSubmit}
						className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:bg-slate-800 dark:border-slate-700"
					>
						{/* Success Message */}
						{status === "success" && (
							<div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-900/50">
								<div className="flex">
									<svg
										className="h-5 w-5 text-green-600 dark:text-green-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="ml-3 text-sm font-medium text-green-800 dark:text-green-300">
										¡Mensaje enviado correctamente! Te responderemos pronto.
									</p>
								</div>
							</div>
						)}

						{/* Error Message */}
						{status === "error" && (
							<div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50">
								<div className="flex">
									<svg
										className="h-5 w-5 text-red-600 dark:text-red-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="ml-3 text-sm font-medium text-red-800 dark:text-red-300">
										{errorMessage}
									</p>
								</div>
							</div>
						)}

						<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
							{/* Name */}
							<div className="sm:col-span-2">
								<label
									htmlFor="name"
									className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white"
								>
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
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:text-white dark:ring-slate-600 dark:placeholder:text-slate-500 dark:focus:ring-blue-500"
									/>
								</div>
							</div>

							{/* Email */}
							<div className="sm:col-span-2">
								<label
									htmlFor="email"
									className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white"
								>
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
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:text-white dark:ring-slate-600 dark:placeholder:text-slate-500 dark:focus:ring-blue-500"
									/>
								</div>
							</div>

							{/* Message */}
							<div className="sm:col-span-2">
								<label
									htmlFor="message"
									className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white"
								>
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
										className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:text-white dark:ring-slate-600 dark:placeholder:text-slate-500 dark:focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>

						{/* Cloudflare Turnstile */}
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
								className="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-500"
							>
								{status === "loading" ? (
									<span className="flex items-center justify-center gap-2">
										<svg
											className="animate-spin h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											/>
										</svg>
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
