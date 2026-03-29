import "./styles.css";

import { bootstrapApp } from "./app.js";
import { parseDictionaryFile } from "./game/dictionary-import.js";
import { createDictionaryManager } from "./game/dictionary-manager.js";
import { initDictionaryControls } from "./game/dictionary-ui.js";
import { createBrowserGame } from "./game/runtime.js";
import { startPoseTracking } from "./game/tracking.js";

const elements = bootstrapApp();
const dictionaryManager = createDictionaryManager();
const game = createBrowserGame(elements);

let trackerHandle = null;

initDictionaryControls({
  elements,
  manager: dictionaryManager,
  parseDictionaryFile,
  onDictionaryChange: (dictionary) => {
    game.setDictionary(dictionary);
  },
});

elements.playButton.addEventListener("click", async () => {
  if (trackerHandle) {
    game.start();
    return;
  }

  try {
    trackerHandle = await startPoseTracking({
      width: window.innerWidth,
      height: window.innerHeight,
      onResult: ({ image, landmark, ...result }) => {
        game.drawPreview(image, landmark);
        game.handleTracking(result);
      },
    });

    game.start();
  } catch (error) {
    game.showCameraError("摄像头启动失败，请允许摄像头权限后刷新页面再试。");
    console.error(error);
  }
});
