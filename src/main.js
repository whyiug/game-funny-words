import "./styles.css";

import { bootstrapApp } from "./app.js";
import { createBrowserGame } from "./game/runtime.js";
import { startPoseTracking } from "./game/tracking.js";

const elements = bootstrapApp();
const game = createBrowserGame(elements);

let trackerHandle = null;

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
    game.showCameraError("Camera access failed. Please allow camera permission and refresh.");
    console.error(error);
  }
});
