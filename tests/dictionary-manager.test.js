import { beforeEach, describe, expect, test } from "vitest";

import { createDictionaryManager } from "../src/game/dictionary-manager.js";

function createStorage() {
  const data = new Map();

  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
  };
}

describe("createDictionaryManager", () => {
  let storage;

  beforeEach(() => {
    storage = createStorage();
  });

  test("lists four built-in age-band dictionaries", () => {
    const manager = createDictionaryManager({ storage });
    const dictionaries = manager.listDictionaries();

    expect(dictionaries.map((item) => item.id)).toEqual([
      "kindergarten",
      "primary-lower",
      "primary-middle",
      "primary-upper",
    ]);
  });

  test("ships at least 200 built-in words for each age band", () => {
    const manager = createDictionaryManager({ storage });
    const dictionaries = manager.listDictionaries();

    dictionaries.forEach((dictionary) => {
      expect(dictionary.items.length).toBeGreaterThanOrEqual(200);
    });
  });

  test("defaults to kindergarten as the active dictionary", () => {
    const manager = createDictionaryManager({ storage });

    expect(manager.getActiveDictionary().id).toBe("kindergarten");
  });

  test("saves and restores a custom dictionary", () => {
    const manager = createDictionaryManager({ storage });

    manager.saveCustomDictionary({
      name: "My Words",
      words: ["apple", "banana"],
    });

    expect(manager.listDictionaries().map((item) => item.id)).toContain("custom");
    expect(manager.getActiveDictionary().id).toBe("custom");

    const restored = createDictionaryManager({ storage });
    expect(restored.getActiveDictionary().id).toBe("custom");
    expect(restored.getActiveDictionary().items).toHaveLength(2);
  });

  test("clearing the custom dictionary falls back to kindergarten", () => {
    const manager = createDictionaryManager({ storage });

    manager.saveCustomDictionary({
      name: "My Words",
      words: ["apple", "banana"],
    });
    manager.clearCustomDictionary();

    expect(manager.listDictionaries().map((item) => item.id)).not.toContain("custom");
    expect(manager.getActiveDictionary().id).toBe("kindergarten");
  });
});
