import { projectNoseToCanvas } from "./math.js";

const MEDIAPIPE_POSE_SRC = "https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js";
const MEDIAPIPE_CAMERA_SRC = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.src = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    document.head.appendChild(script);
  });
}

export function mapPoseResultToPlayer({ poseLandmarks, width, height, scale = 1.6 }) {
  if (!poseLandmarks || !poseLandmarks.length) {
    return {
      headDetected: false,
      noseX: width / 2,
      noseY: height / 2,
      landmark: null,
    };
  }

  const landmark = poseLandmarks[0];
  const point = projectNoseToCanvas({
    noseX: landmark.x,
    noseY: landmark.y,
    width,
    height,
    scale,
  });

  return {
    headDetected: true,
    noseX: point.x,
    noseY: point.y,
    landmark,
  };
}

export async function startPoseTracking({ width, height, onResult }) {
  await loadScript(MEDIAPIPE_POSE_SRC);
  await loadScript(MEDIAPIPE_CAMERA_SRC);

  if (typeof window.Pose !== "function" || typeof window.Camera !== "function") {
    throw new Error("MediaPipe runtime is unavailable");
  }

  const pose = new window.Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
  });

  pose.onResults((res) => {
    onResult({
      image: res.image,
      ...mapPoseResultToPlayer({
        poseLandmarks: res.poseLandmarks,
        width,
        height,
      }),
    });
  });

  const video = document.createElement("video");
  const camera = new window.Camera(video, {
    onFrame: async () => {
      await pose.send({ image: video });
    },
    width: 640,
    height: 480,
  });

  await camera.start();

  return {
    stop() {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    },
  };
}
