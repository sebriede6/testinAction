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

  it("should return error for negative score", () => {
    const result = validateScore(-10);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Score muss zwischen 0 und 100 liegen");
  });

  it("should handle score above 100", () => {
    const result = validateScore(105);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Score muss zwischen 0 und 100 liegen");
  });

  it("should handle bonus points exceeding maximum", () => {
    const result = validateScore(95, { bonusCategories: ["math", "science", "art"] });
    expect(result.score).toBe(100); 
    expect(result.grade).toBe("A");
  });

  
  it("should return error for undefined score", () => {
    const result = validateScore(undefined);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Score ist erforderlich");
  });

  it("should return error for null score", () => {
    const result = validateScore(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Score ist erforderlich");
  });

  it("should handle non-integer score in non-strict mode", () => {
    const result = validateScore(75.5);
    expect(result.valid).toBe(true);
    expect(result.score).toBe(75.5);
    expect(result.passed).toBe(true);
    expect(result.grade).toBe("C");
  });

  // Additional tests to cover grade assignment
  it("should assign grade A for score 95", () => {
    const result = validateScore(95);
    expect(result.grade).toBe("A");
  });

  it("should assign grade B for score 85", () => {
    const result = validateScore(85);
    expect(result.grade).toBe("B");
  });

  it("should assign grade C for score 75", () => {
    const result = validateScore(75);
    expect(result.grade).toBe("C");
  });

  it("should assign grade D for score 65", () => {
    const result = validateScore(65);
    expect(result.grade).toBe("D");
  });

  it("should assign grade F for score 55", () => {
    const result = validateScore(55);
    expect(result.grade).toBe("F");
  });

  
  it("should assign grade A for score 90", () => {
    const result = validateScore(90);
    expect(result.grade).toBe("A");
  });

  it("should assign grade B for score 80", () => {
    const result = validateScore(80);
    expect(result.grade).toBe("B");
  });

  it("should assign grade C for score 70", () => {
    const result = validateScore(70);
    expect(result.grade).toBe("C");
  });

  it("should assign grade D for score 60", () => {
    const result = validateScore(60);
    expect(result.grade).toBe("D");
  });
});