import { describe, expect, test } from "vitest";

import {
  parseDictionaryFile,
  parseDictionaryText,
} from "../src/game/dictionary-import.js";

describe("parseDictionaryText", () => {
  test("parses txt with one word per line", () => {
    const result = parseDictionaryText("apple\nbanana\n\ncat\n", {
      type: "text/plain",
      name: "words.txt",
    });

    expect(result.words).toEqual(["apple", "banana", "cat"]);
  });

  test("parses csv using the first column and ignores a header row", () => {
    const result = parseDictionaryText("word,meaning\napple,苹果\nbanana,香蕉\n", {
      type: "text/csv",
      name: "words.csv",
    });

    expect(result.words).toEqual(["apple", "banana"]);
  });

  test("deduplicates words case-insensitively", () => {
    const result = parseDictionaryText("Apple\napple\nAPPLE\nBanana\n", {
      type: "text/plain",
      name: "words.txt",
    });

    expect(result.words).toEqual(["Apple", "Banana"]);
  });

  test("limits the word count to 300", () => {
    const text = Array.from({ length: 305 }, (_, index) => `word-${index + 1}`).join("\n");
    const result = parseDictionaryText(text, {
      type: "text/plain",
      name: "words.txt",
    });

    expect(result.words).toHaveLength(300);
  });

  test("throws for unsupported file types", () => {
    expect(() =>
      parseDictionaryText("{}", {
        type: "application/json",
        name: "words.json",
      }),
    ).toThrow("Unsupported dictionary format");
  });
});

describe("parseDictionaryFile", () => {
  test("derives a friendly dictionary name from the file name", async () => {
    const file = new File(["apple\nbanana"], "my-class.txt", {
      type: "text/plain",
    });

    const result = await parseDictionaryFile(file);

    expect(result.name).toBe("my-class");
    expect(result.words).toEqual(["apple", "banana"]);
  });
});
