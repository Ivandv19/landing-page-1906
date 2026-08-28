import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BeatsSection from "./Beats";

describe("BeatsSection Component", () => {
	it("renders the beats section title", () => {
		render(<BeatsSection />);

		expect(screen.getByText(/Catálogo Reciente/i)).toBeInTheDocument();
	});
});
