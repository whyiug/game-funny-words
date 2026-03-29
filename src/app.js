export function bootstrapApp(root = document.getElementById("app")) {
  if (!root) {
    throw new Error("Missing #app root element");
  }

  root.innerHTML = `
    <div id="game-container">
      <canvas id="gameCanvas"></canvas>

      <div id="cam-window">
        <canvas id="preview-canvas"></canvas>
      </div>

      <div id="ui-layer">
        <div class="score-pill">
          <span class="score-icon">🌟</span>
          <div class="s-txt" id="score-disp">0</div>
        </div>
      </div>

      <div id="card-popup">
        <div class="card-top" id="card-bg"><div id="c-emoji">🍎</div></div>
        <div class="card-content">
          <h2 id="c-word">apple</h2>
          <div id="c-phone">/ˈæpəl/</div>
          <div id="c-zh">苹果</div>
          <div id="c-zh-pron">ping guo</div>
          <span id="c-cat">食物</span>
        </div>
      </div>

      <div id="lobby">
        <div class="title-group">
          <h1 class="game-logo">鼻尖碰碰词</h1>
          <div class="subtitle">欢乐英语识字乐园</div>
        </div>

        <div class="hero-display">🚁</div>

        <div class="tutorial-row">
          <div class="step-card">
            <span class="s-icon">📷</span>
            <span class="s-text">摄像头<br />控制</span>
          </div>
          <div class="step-card">
            <span class="s-icon">👦</span>
            <span class="s-text">移动<br />头部</span>
          </div>
          <div class="step-card">
            <span class="s-icon">🎈</span>
            <span class="s-text">碰撞<br />单词</span>
          </div>
        </div>

        <div class="dictionary-panel">
          <label class="dictionary-label" for="dictionary-select">词库选择</label>
          <select id="dictionary-select" class="dictionary-select"></select>

          <div class="dictionary-actions">
            <label class="dictionary-upload-btn" for="dictionary-upload">上传 TXT/CSV</label>
            <input id="dictionary-upload" type="file" accept=".txt,.csv,text/plain,text/csv" />
            <button id="dictionary-clear" class="dictionary-clear" type="button">清空我的词库</button>
          </div>

          <div id="dictionary-status" class="dictionary-status">
            先选择一个词库，再开始游戏。
          </div>
        </div>

        <button class="btn-start" id="play-button" type="button">开始游戏</button>

        <div class="privacy-note">🔒 安全体验 • 不保存视频</div>
      </div>
    </div>
  `;

  return {
    root,
    gameCanvas: root.querySelector("#gameCanvas"),
    previewCanvas: root.querySelector("#preview-canvas"),
    scoreDisplay: root.querySelector("#score-disp"),
    cardPopup: root.querySelector("#card-popup"),
    cardEmoji: root.querySelector("#c-emoji"),
    cardWord: root.querySelector("#c-word"),
    cardPhone: root.querySelector("#c-phone"),
    cardChinese: root.querySelector("#c-zh"),
    cardChinesePron: root.querySelector("#c-zh-pron"),
    cardCategory: root.querySelector("#c-cat"),
    cardBackground: root.querySelector("#card-bg"),
    lobby: root.querySelector("#lobby"),
    dictionarySelect: root.querySelector("#dictionary-select"),
    dictionaryUpload: root.querySelector("#dictionary-upload"),
    dictionaryStatus: root.querySelector("#dictionary-status"),
    dictionaryClear: root.querySelector("#dictionary-clear"),
    playButton: root.querySelector("#play-button"),
  };
}
