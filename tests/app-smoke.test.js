import { describe, expect, test } from "vitest";

import { bootstrapApp } from "../src/app.js";

describe("app bootstrap", () => {
  test("exports a bootstrap function", () => {
    expect(typeof bootstrapApp).toBe("function");
  });

  test("renders the reference game shell", () => {
    document.body.innerHTML = '<div id="app"></div>';

    bootstrapApp();

    expect(document.getElementById("gameCanvas")).not.toBeNull();
    expect(document.getElementById("preview-canvas")).not.toBeNull();
    expect(document.getElementById("score-disp")).not.toBeNull();
    expect(document.getElementById("card-popup")).not.toBeNull();
    expect(document.getElementById("lobby")).not.toBeNull();
  });
});
