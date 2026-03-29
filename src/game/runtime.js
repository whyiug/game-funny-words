import { isCollected } from "./math.js";
import { speakWord } from "./speech.js";
import { getRandomWord } from "./word-select.js";

export function createGameState() {
  return {
    active: false,
    score: 0,
    items: [],
    frame: 0,
    headDetected: false,
  };
}

export function createPlayerState() {
  return {
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    r: 42,
    angle: 0,
    noseX: 0,
    noseY: 0,
  };
}

export function stepGame({
  state,
  player,
  width,
  height,
  random = Math.random,
  getRandomWord: selectWord = getRandomWord,
  onCollect,
}) {
  if (!state.active) {
    return state;
  }

  state.frame += 1;

  player.x += (player.tx - player.x) * 0.18;
  player.y += (player.ty - player.y) * 0.18;
  player.angle += ((player.tx - player.x) * 0.004 - player.angle) * 0.15;

  if (state.frame % 90 === 0) {
    state.items.push({
      x: random() * (width - 100) + 50,
      y: -80,
      data: selectWord(random),
      size: 36,
      offset: random() * 100,
    });
  }

  for (let index = state.items.length - 1; index >= 0; index -= 1) {
    const item = state.items[index];
    item.y += 3;
    item.x += Math.sin((state.frame + item.offset) * 0.08) * 1.5;

    if (
      !item.collected &&
      isCollected({
        noseX: player.noseX,
        noseY: player.noseY,
        itemX: item.x,
        itemY: item.y,
        itemSize: item.size,
      })
    ) {
      item.collected = true;
      state.score += 1;
      if (onCollect) {
        onCollect(item);
      }
    }

    if (item.y > height + 100 || item.collected) {
      state.items.splice(index, 1);
    }
  }

  return state;
}

function createBackgroundSystem() {
  return {
    clouds: [],
    particles: [],
    init(width, height) {
      if (this.clouds.length || this.particles.length) {
        return;
      }

      for (let index = 0; index < 6; index += 1) {
        this.clouds.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 60 + Math.random() * 80,
          speed: 0.2,
          opacity: 0.2,
        });
      }

      for (let index = 0; index < 8; index += 1) {
        this.clouds.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 30 + Math.random() * 40,
          speed: 0.7,
          opacity: 0.5,
        });
      }

      for (let index = 0; index < 30; index += 1) {
        this.particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.6,
        });
      }
    },
    draw(ctx, width, height) {
      ctx.fillStyle = "white";

      this.particles.forEach((particle) => {
        particle.y -= particle.speedY;
        particle.x -= 0.1;

        if (particle.x < 0) particle.x = width;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      this.clouds.forEach((cloud) => {
        cloud.x -= cloud.speed;
        if (cloud.x < -cloud.r * 2) {
          cloud.x = width + cloud.r * 2;
        }

        ctx.globalAlpha = cloud.opacity;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.r * 0.7, cloud.y + cloud.r * 0.5, cloud.r * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x - cloud.r * 0.7, cloud.y + cloud.r * 0.5, cloud.r * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    },
  };
}

function drawPlayer(ctx, player, frame) {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle * 0.5);

  const flame = 20 + Math.sin(frame * 0.2) * 8;
  ctx.fillStyle = "rgba(255, 160, 0, 0.8)";
  ctx.beginPath();
  ctx.moveTo(-10, player.r);
  ctx.lineTo(0, player.r + flame);
  ctx.lineTo(10, player.r);
  ctx.fill();

  const gradient = ctx.createLinearGradient(-player.r, -player.r, player.r, player.r);
  gradient.addColorStop(0, "#4FC3F7");
  gradient.addColorStop(1, "#0288D1");

  ctx.beginPath();
  ctx.arc(0, 0, player.r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.stroke();

  const eyeOffsetX = (player.tx - player.x) * 0.04;
  const eyeOffsetY = (player.ty - player.y) * 0.04;

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-12 + eyeOffsetX, -5 + eyeOffsetY, 8, 0, Math.PI * 2);
  ctx.arc(12 + eyeOffsetX, -5 + eyeOffsetY, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(-12 + eyeOffsetX, -5 + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.arc(12 + eyeOffsetX, -5 + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBubble(ctx, item) {
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.beginPath();
  ctx.arc(0, 0, item.size, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = item.data.catColor;
  ctx.stroke();
  ctx.font = "32px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(item.data.e, 0, 3);
  ctx.restore();
}

function drawHeadIndicator(ctx, x, y, frame) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(frame * 0.3) * 0.3 + 0.7;
  ctx.globalAlpha = 0.3 * pulse;
  ctx.fillStyle = "#FF6F00";
  ctx.beginPath();
  ctx.arc(0, 0, 25 * pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-3, -3, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function ensureErrorBanner(container) {
  let banner = container.querySelector("#camera-error");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "camera-error";
    banner.className = "camera-error";
    container.appendChild(banner);
  }
  return banner;
}

function setCardField(element, value) {
  if (!element) {
    return;
  }

  if (value) {
    element.textContent = value;
    element.hidden = false;
  } else {
    element.textContent = "";
    element.hidden = true;
  }
}

export function createBrowserGame(elements) {
  const state = createGameState();
  const player = createPlayerState();
  const bg = createBackgroundSystem();
  const canvas = elements.gameCanvas;
  const ctx = canvas.getContext("2d");
  const previewCanvas = elements.previewCanvas;
  const previewContext = previewCanvas.getContext("2d");
  const popup = elements.cardPopup;
  const scoreDisplay = elements.scoreDisplay;
  const errorBanner = ensureErrorBanner(elements.root);
  let activeDictionary = null;

  let popupTimer = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    previewCanvas.width = 320;
    previewCanvas.height = 240;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    player.x = centerX;
    player.y = centerY;
    player.tx = centerX;
    player.ty = centerY;
    player.noseX = centerX;
    player.noseY = centerY;

    bg.init(canvas.width, canvas.height);
  }

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw(ctx, canvas.width, canvas.height);
    state.items.forEach((item) => drawBubble(ctx, item));
    drawPlayer(ctx, player, state.frame);

    if (state.headDetected) {
      drawHeadIndicator(ctx, player.noseX, player.noseY, state.frame);
    }
  }

  function drawBackgroundOnly() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw(ctx, canvas.width, canvas.height);
  }

  function renderBackgroundLoop() {
    if (!state.active) {
      drawBackgroundOnly();
      window.requestAnimationFrame(renderBackgroundLoop);
    }
  }

  function renderGameLoop() {
    if (!state.active) {
      return;
    }

    stepGame({
      state,
      player,
      width: canvas.width,
      height: canvas.height,
      getRandomWord: (random) => getRandomWord(random, activeDictionary),
      onCollect: (item) => {
        scoreDisplay.textContent = String(state.score);
        elements.cardEmoji.textContent = item.data.e;
        elements.cardWord.textContent = item.data.t;
        setCardField(elements.cardPhone, item.data.p);
        setCardField(elements.cardChinese, item.data.zh);
        setCardField(elements.cardChinesePron, item.data.zhPron);
        elements.cardCategory.textContent = item.data.catLabel;
        elements.cardBackground.style.background = item.data.catColor;
        popup.classList.add("show");

        if (popupTimer) {
          window.clearTimeout(popupTimer);
        }
        popupTimer = window.setTimeout(() => popup.classList.remove("show"), 2000);

        speakWord(item.data.t, window);
      },
    });

    drawScene();
    window.requestAnimationFrame(renderGameLoop);
  }

  function start() {
    errorBanner.textContent = "";
    state.active = true;
    scoreDisplay.textContent = "0";
    state.score = 0;
    state.items = [];
    state.frame = 0;
    elements.lobby.style.opacity = "0";
    window.setTimeout(() => {
      elements.lobby.style.display = "none";
    }, 600);
    renderGameLoop();
  }

  function handleTracking(result) {
    state.headDetected = result.headDetected;
    player.noseX = result.noseX;
    player.noseY = result.noseY;
    player.tx = result.noseX;
    player.ty = result.noseY;
  }

  function drawPreview(image, landmark) {
    previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    if (image) {
      previewContext.drawImage(image, 0, 0, previewCanvas.width, previewCanvas.height);
    }

    if (landmark) {
      previewContext.fillStyle = "#FF6F00";
      previewContext.beginPath();
      previewContext.arc(landmark.x * previewCanvas.width, landmark.y * previewCanvas.height, 8, 0, Math.PI * 2);
      previewContext.fill();
    }
  }

  function showCameraError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.add("show");
  }

  window.addEventListener("resize", resize);
  resize();
  renderBackgroundLoop();

  return {
    state,
    player,
    start,
    resize,
    setDictionary(dictionary) {
      activeDictionary = dictionary;
    },
    drawPreview,
    handleTracking,
    showCameraError,
  };
}
