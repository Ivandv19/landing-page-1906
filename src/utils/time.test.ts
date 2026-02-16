import { describe, it, expect } from "vitest";
import { formatTime } from "./time";

describe("formatTime", () => {
    it("formats 0 seconds correctly", () => {
        expect(formatTime(0)).toBe("0:00");
    });

    it("formats seconds less than a minute correctly", () => {
        expect(formatTime(45)).toBe("0:45");
        expect(formatTime(9)).toBe("0:09");
    });

    it("formats exactly one minute correctly", () => {
        expect(formatTime(60)).toBe("1:00");
    });

    it("formats minutes and seconds correctly", () => {
        expect(formatTime(65)).toBe("1:05");
        expect(formatTime(125)).toBe("2:05");
    });

    it("handles explicit null, undefined or NaN gracefully", () => {
        expect(formatTime(null as any)).toBe("0:00");
        expect(formatTime(undefined as any)).toBe("0:00");
        expect(formatTime(NaN)).toBe("0:00");
    });
});
