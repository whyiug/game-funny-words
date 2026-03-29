import { describe, expect, test, vi } from "vitest";

import { initDictionaryControls } from "../src/game/dictionary-ui.js";

function setupDom() {
  document.body.innerHTML = `
    <select id="dictionary-select"></select>
    <input id="dictionary-upload" type="file" />
    <button id="dictionary-clear" type="button">Clear</button>
    <div id="dictionary-status"></div>
  `;

  return {
    dictionarySelect: document.getElementById("dictionary-select"),
    dictionaryUpload: document.getElementById("dictionary-upload"),
    dictionaryClear: document.getElementById("dictionary-clear"),
    dictionaryStatus: document.getElementById("dictionary-status"),
  };
}

function createManager() {
  let active = {
    id: "kindergarten",
    label: "幼儿园",
    items: [{ t: "Apple" }, { t: "Cat" }],
  };
  let custom = null;

  return {
    listDictionaries() {
      return custom
        ? [
            { id: "kindergarten", label: "幼儿园", items: [{ t: "Apple" }, { t: "Cat" }] },
            custom,
          ]
        : [{ id: "kindergarten", label: "幼儿园", items: [{ t: "Apple" }, { t: "Cat" }] }];
    },
    getActiveDictionary() {
      return active;
    },
    setActiveDictionary(id) {
      const next = this.listDictionaries().find((dictionary) => dictionary.id === id);
      active = next || active;
      return active;
    },
    saveCustomDictionary(parsed) {
      custom = {
        id: "custom",
        label: parsed.name,
        items: parsed.words.map((word) => ({ t: word })),
      };
      active = custom;
      return custom;
    },
    clearCustomDictionary() {
      custom = null;
      active = this.listDictionaries()[0];
    },
  };
}

describe("initDictionaryControls", () => {
  test("renders current dictionaries and status text", () => {
    const elements = setupDom();
    initDictionaryControls({
      elements,
      manager: createManager(),
      parseDictionaryFile: vi.fn(),
      onDictionaryChange: vi.fn(),
    });

    expect(elements.dictionarySelect.options).toHaveLength(1);
    expect(elements.dictionaryStatus.textContent).toContain("幼儿园");
    expect(elements.dictionaryStatus.textContent).toContain("2 words");
  });

  test("uploads a custom dictionary and switches to it", async () => {
    const elements = setupDom();
    const onDictionaryChange = vi.fn();
    initDictionaryControls({
      elements,
      manager: createManager(),
      parseDictionaryFile: vi.fn().mockResolvedValue({
        name: "My Words",
        words: ["tree", "water"],
      }),
      onDictionaryChange,
    });

    Object.defineProperty(elements.dictionaryUpload, "files", {
      value: [new File(["tree\nwater"], "my-words.txt", { type: "text/plain" })],
      configurable: true,
    });

    elements.dictionaryUpload.dispatchEvent(new Event("change"));
    await Promise.resolve();

    expect(elements.dictionarySelect.value).toBe("custom");
    expect(elements.dictionaryStatus.textContent).toContain("My Words");
    expect(onDictionaryChange).toHaveBeenCalled();
  });
});
