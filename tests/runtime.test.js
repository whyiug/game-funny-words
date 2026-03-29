import { describe, expect, test } from "vitest";

import { createGameState, createPlayerState, stepGame } from "../src/game/runtime.js";

describe("runtime helpers", () => {
  test("advances the frame and spawns a word every 90 frames", () => {
    const state = createGameState();
    const player = createPlayerState();

    state.active = true;
    state.frame = 89;

    stepGame({
      state,
      player,
      width: 1000,
      height: 800,
      getRandomWord: () => ({
        t: "Apple",
        e: "🍎",
        p: "/ˈæpəl/",
        catColor: "#fff",
        catLabel: "Fruit",
      }),
      random: () => 0.5,
    });

    expect(state.frame).toBe(90);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].y).toBe(-77);
  });

  test("collects an overlapping item and increments score", () => {
    const state = createGameState();
    const player = createPlayerState();

    state.active = true;
    state.items.push({
      x: 100,
      y: 100,
      size: 36,
      offset: 0,
      data: {
        t: "Apple",
        e: "🍎",
        p: "/ˈæpəl/",
        catColor: "#fff",
        catLabel: "Fruit",
      },
    });
    player.noseX = 100;
    player.noseY = 100;

    const events = [];
    stepGame({
      state,
      player,
      width: 1000,
      height: 800,
      getRandomWord: () => null,
      onCollect: (item) => events.push(item.data.t),
    });

    expect(state.score).toBe(1);
    expect(state.items).toHaveLength(0);
    expect(events).toEqual(["Apple"]);
  });
});
