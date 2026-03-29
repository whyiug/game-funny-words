import { describe, expect, test } from "vitest";

import { mapPoseResultToPlayer } from "../src/game/tracking.js";

describe("tracking adapter", () => {
  test("falls back to the center when no landmarks are present", () => {
    const result = mapPoseResultToPlayer({
      poseLandmarks: null,
      width: 1000,
      height: 800,
    });

    expect(result.headDetected).toBe(false);
    expect(result.noseX).toBe(500);
    expect(result.noseY).toBe(400);
  });

  test("projects the mirrored nose position into canvas coordinates", () => {
    const result = mapPoseResultToPlayer({
      poseLandmarks: [{ x: 0.1, y: 0.9 }],
      width: 1000,
      height: 800,
    });

    expect(result.headDetected).toBe(true);
    expect(result.noseX).toBeGreaterThan(500);
    expect(result.noseX).toBeLessThanOrEqual(1000);
    expect(result.noseY).toBeGreaterThanOrEqual(0);
    expect(result.noseY).toBeLessThanOrEqual(800);
  });
});
