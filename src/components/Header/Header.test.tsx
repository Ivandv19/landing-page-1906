import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
	it("renders the logo correctly", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>,
		);

		const logo = screen.getByText(/Flux/i);
		expect(logo).toBeInTheDocument();
	});
});
