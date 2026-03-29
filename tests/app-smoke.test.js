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

  test("renders localized chinese landing copy", () => {
    document.body.innerHTML = '<div id="app"></div>';

    bootstrapApp();

    expect(document.querySelector(".title-group .title-plate")).not.toBeNull();
    expect(document.querySelector(".title-group .title-glow")).not.toBeNull();
    expect(document.querySelector(".game-logo")?.textContent).toContain("鼻尖碰碰词");
    expect(document.querySelector(".subtitle")?.textContent).toContain("欢乐英语识字乐园");
    expect(document.getElementById("play-button")?.textContent).toContain("开始游戏");
    expect(document.querySelector(".dictionary-label")?.textContent).toContain("词库选择");
  }, 10000);
});
