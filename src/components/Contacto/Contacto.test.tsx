import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Contacto from "./Contacto";

describe("Contacto Component", () => {
	it("renders the contact section title", () => {
		render(<Contacto />);

		expect(screen.getByText(/Hablemos de tu proyecto/i)).toBeInTheDocument();
	});
});
