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
  }, 10000);

  test("renders dictionary controls on the lobby", () => {
    document.body.innerHTML = '<div id="app"></div>';

    bootstrapApp();

    expect(document.getElementById("dictionary-select")).not.toBeNull();
    expect(document.getElementById("dictionary-upload")).not.toBeNull();
    expect(document.getElementById("dictionary-status")).not.toBeNull();
    expect(document.getElementById("dictionary-clear")).not.toBeNull();
  }, 10000);
});
