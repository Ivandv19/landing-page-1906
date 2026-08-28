import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("Hero Component", () => {
	it("renders the hero content correctly", () => {
		render(<Hero />);

		expect(screen.getByText(/Beats que fluyen/i)).toBeInTheDocument();
	});
});
