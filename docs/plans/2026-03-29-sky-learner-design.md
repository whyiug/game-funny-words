# Sky Learner Local Recreation Design

**Goal**

Build a local, self-contained recreation of `https://reach-words.vercel.app/` that preserves the original game's UI, layout, motion, camera-driven nose control, falling-word gameplay, score display, word-card popup, and speech feedback as closely as practical in a maintainable local project.

**Scope**

- Recreate the startup lobby with matching typography, color palette, spacing, tutorial cards, CTA button, privacy note, and hero icon treatment.
- Recreate the gameplay scene with full-screen canvas background, parallax clouds/particles, score HUD, bottom-right camera preview, falling word bubbles, player drone/avatar, nose-position indicator, popup card, and speech playback.
- Use an in-app word database rather than a backend API, matching the reference behavior.
- Use browser speech synthesis with graceful fallback when unavailable.
- Use MediaPipe Pose in the browser to track the nose landmark from the webcam feed.

**Non-Goals**

- No new game modes, settings, level system, timer, failure state, authentication, persistence, or backend.
- No redesign. The target is visual and behavioral fidelity, not interpretation.

**Recommended Approach**

Use `Vite + Vanilla JS` rather than a raw single HTML file or a React app.

Why:

- It preserves direct control over CSS and canvas rendering, which matters for pixel-level fidelity.
- It keeps the implementation close to the original site architecture.
- It adds a clean dev/build workflow and easier dependency management without forcing component abstractions that are not useful for this game.

**Architecture**

- `index.html` provides the game shell and static DOM nodes for the lobby, HUD, camera preview, and popup card.
- `src/styles.css` owns the page styling, matching the reference palette and layout.
- `src/main.js` bootstraps the app, wires the DOM to the game runtime, and starts the lobby background animation.
- `src/game/` contains small focused modules:
  - word data
  - random word selection
  - pure game logic helpers
  - speech abstraction
  - MediaPipe nose tracking integration
  - rendering and runtime loop
- Pure logic that can be tested without a browser lives outside DOM-heavy modules.

**UI Fidelity Strategy**

- Preserve the same visual structure and copy:
  - `Sky Learner`
  - `Magic AR Adventure`
  - `Camera Control`
  - `Move Head`
  - `Catch Words`
  - `PLAY NOW`
  - `Safe & Secure • No Video Stored`
- Preserve the same rounded font feel by using the same Google Fonts families seen in the reference.
- Match the same color system, rounded card radii, shadow softness, HUD placement, and camera preview styling.
- Match animation timing closely for:
  - floating title
  - pulsing hero
  - CTA shine
  - popup scale-in
  - particle/cloud drift
  - head-indicator pulse
  - player interpolation

**Gameplay Model**

- The game starts from the lobby and only activates when the user clicks `PLAY NOW`.
- The webcam is requested on start.
- MediaPipe Pose provides the nose landmark.
- The nose position is mirrored and projected into canvas space.
- The player avatar interpolates toward the target point rather than snapping directly.
- Word bubbles spawn from the top at a fixed cadence and fall with light horizontal sway.
- Collision uses a child-friendly generous radius based on the bubble size.
- On collection:
  - score increments
  - popup card fills with emoji, word, phonetic text, and category
  - popup is shown briefly then dismissed
  - speech synthesis pronounces the word when available

**Error Handling**

- If speech synthesis is unavailable, continue silently.
- If pose landmarks are unavailable for a frame, hide the head indicator and fall back to center targeting.
- If camera access fails, show a clear overlay message so the page does not appear broken.

**Testing Strategy**

Use TDD for pure logic and compatibility wrappers.

Automated tests:

- random word selection returns a valid enriched word
- nose-to-canvas projection clamps inside bounds
- collision detection behaves correctly near the threshold
- speech wrapper no-ops cleanly when synthesis is unavailable

Manual verification:

- lobby visuals match the reference
- gameplay layout matches the reference
- camera preview mirrors correctly
- score increments when the nose touches bubbles
- popup styling and timing match the reference feel
- speech plays in supported browsers

**Known Fidelity Limits**

- Browser speech voices vary by platform, so pronunciation voice quality will differ from machine to machine.
- MediaPipe runtime behavior may vary slightly across devices and camera quality.
- Minor rendering differences can exist because different browsers rasterize fonts and canvas edges differently.

**Deliverable**

A runnable local project that starts with `npm install` and `npm run dev`, visually and behaviorally recreates the original site as closely as practical while remaining maintainable.
