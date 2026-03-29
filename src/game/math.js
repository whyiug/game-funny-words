export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function projectNoseToCanvas({
  noseX,
  noseY,
  width,
  height,
  scale = 1.6,
}) {
  const x = width / 2 + (1 - noseX - 0.5) * width * scale;
  const y = height / 2 + (noseY - 0.5) * height * scale;

  return {
    x: clamp(x, 0, width),
    y: clamp(y, 0, height),
  };
}

export function isCollected({
  noseX,
  noseY,
  itemX,
  itemY,
  itemSize,
  padding = 25,
}) {
  const distance = Math.hypot(noseX - itemX, noseY - itemY);
  return distance < itemSize + padding;
}
