import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", () => {
	it("renders the logo correctly", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);

		const logo = screen.getByText(/Flux/i);
		expect(logo).toBeInTheDocument();
	});
});
