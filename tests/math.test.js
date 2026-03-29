import { describe, expect, test } from "vitest";

import { clamp, isCollected, projectNoseToCanvas } from "../src/game/math.js";

describe("math helpers", () => {
  test("clamp keeps values inside the provided range", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(4, 0, 10)).toBe(4);
    expect(clamp(12, 0, 10)).toBe(10);
  });

  test("projectNoseToCanvas mirrors and clamps coordinates", () => {
    const point = projectNoseToCanvas({
      noseX: 0.1,
      noseY: 0.9,
      width: 1000,
      height: 800,
      scale: 1.6,
    });

    expect(point.x).toBeGreaterThanOrEqual(0);
    expect(point.x).toBeLessThanOrEqual(1000);
    expect(point.y).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeLessThanOrEqual(800);
    expect(point.x).toBeGreaterThan(500);
  });

  test("isCollected uses a generous collision radius", () => {
    expect(
      isCollected({
        noseX: 100,
        noseY: 100,
        itemX: 130,
        itemY: 100,
        itemSize: 36,
        padding: 25,
      }),
    ).toBe(true);

    expect(
      isCollected({
        noseX: 100,
        noseY: 100,
        itemX: 200,
        itemY: 100,
        itemSize: 36,
        padding: 25,
      }),
    ).toBe(false);
  });
});
