import { describe, expect, test, vi } from "vitest";

import { speakWord } from "../src/game/speech.js";

describe("speakWord", () => {
  test("returns false when speech synthesis is unavailable", () => {
    const result = speakWord("Apple", {});

    expect(result).toBe(false);
  });

  test("cancels current speech and speaks the requested word", () => {
    const cancel = vi.fn();
    const speak = vi.fn();
    const FakeUtterance = function FakeUtterance(text) {
      this.text = text;
    };

    const result = speakWord("Apple", {
      speechSynthesis: { cancel, speak },
      SpeechSynthesisUtterance: FakeUtterance,
    });

    expect(result).toBe(true);
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(speak).toHaveBeenCalledTimes(1);
    expect(speak.mock.calls[0][0].text).toBe("Apple");
  });
});
