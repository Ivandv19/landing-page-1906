export interface ContactFormData {
	name: string;
	email: string;
	message: string;
	turnstileToken: string;
}

export interface ContactResponse {
	success: boolean;
	message?: string;
	error?: string;
	details?: any;
}
