import { describe, it, expect } from "vitest";
import { validateScore } from "../src/validateScore.js";

describe("validateScore", () => {
  it("should validate a correct score", () => {
    const result = validateScore(75);
    expect(result.valid).toBe(true);
    expect(result.score).toBe(75);
    expect(result.passed).toBe(true);
    expect(result.grade).toBe("C");
  });

  it("should return error for non-number score", () => {
    const result = validateScore("abc");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Score muss eine Zahl sein");
  });

  it("should apply strict mode", () => {
    const result = validateScore(75.5, { strictMode: true });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Score muss eine ganze Zahl sein");
  });

  it("should apply bonus points correctly", () => {
    const result = validateScore(85, { bonusCategories: ["math", "science"] });
    expect(result.score).toBe(89);
    expect(result.grade).toBe("B");
  });

  it("should fail if score is below passing threshold", () => {
    const result = validateScore(55);
    expect(result.passed).toBe(false);
    expect(result.grade).toBe("F");
  });
});
