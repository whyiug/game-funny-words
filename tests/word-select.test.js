import { describe, expect, test } from "vitest";

import { WORD_DB } from "../src/game/word-db.js";
import { getRandomWord } from "../src/game/word-select.js";

describe("getRandomWord", () => {
  test("returns a word with category metadata", () => {
    const word = getRandomWord();

    expect(typeof word.t).toBe("string");
    expect(typeof word.e).toBe("string");
    expect(typeof word.p).toBe("string");
    expect(typeof word.catColor).toBe("string");
    expect(typeof word.catLabel).toBe("string");
  });

  test("returns metadata that exists in the source database", () => {
    const categories = Object.values(WORD_DB);
    const labels = new Set(categories.map((category) => category.label));
    const colors = new Set(categories.map((category) => category.color));
    const word = getRandomWord();

    expect(labels.has(word.catLabel)).toBe(true);
    expect(colors.has(word.catColor)).toBe(true);
  });
});
