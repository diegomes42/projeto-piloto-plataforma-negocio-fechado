import { describe, expect, it } from "vitest";
import { actionUrgency, productionBalance, productionProgress } from "./operational";

describe("operational rules", () => {
  it("calculates production progress and remaining balance", () => {
    expect(productionProgress(310, 430)).toBe(72);
    expect(productionBalance(310, 430)).toBe(120);
    expect(productionProgress(20, 0)).toBe(0);
  });

  it("prioritizes overdue and critical actions", () => {
    const now = new Date("2026-08-27T12:00:00Z");
    expect(actionUrgency("high", new Date("2026-08-26T12:00:00Z"), now)).toBe("overdue");
    expect(actionUrgency("critical", new Date("2026-08-28T12:00:00Z"), now)).toBe("critical");
    expect(actionUrgency("medium", undefined, now)).toBe("standard");
  });
});
