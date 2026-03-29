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
          <h2 id="c-word">Apple</h2>
          <div id="c-phone">/ˈæpəl/</div>
          <span id="c-cat">FRUIT</span>
        </div>
      </div>

      <div id="lobby">
        <div class="title-group">
          <h1 class="game-logo">Sky Learner</h1>
          <div class="subtitle">Magic AR Adventure</div>
        </div>

        <div class="hero-display">🚁</div>

        <div class="tutorial-row">
          <div class="step-card">
            <span class="s-icon">📷</span>
            <span class="s-text">Camera<br />Control</span>
          </div>
          <div class="step-card">
            <span class="s-icon">👦</span>
            <span class="s-text">Move<br />Head</span>
          </div>
          <div class="step-card">
            <span class="s-icon">🎈</span>
            <span class="s-text">Catch<br />Words</span>
          </div>
        </div>

        <div class="dictionary-panel">
          <label class="dictionary-label" for="dictionary-select">Word Library</label>
          <select id="dictionary-select" class="dictionary-select"></select>

          <div class="dictionary-actions">
            <label class="dictionary-upload-btn" for="dictionary-upload">Upload TXT/CSV</label>
            <input id="dictionary-upload" type="file" accept=".txt,.csv,text/plain,text/csv" />
            <button id="dictionary-clear" class="dictionary-clear" type="button">Clear My Words</button>
          </div>

          <div id="dictionary-status" class="dictionary-status">
            Choose a word library before you play.
          </div>
        </div>

        <button class="btn-start" id="play-button" type="button">PLAY NOW</button>

        <div class="privacy-note">🔒 Safe & Secure • No Video Stored</div>
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
