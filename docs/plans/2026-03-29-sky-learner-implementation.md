# Sky Learner Recreation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a local `Vite + Vanilla JS` recreation of the reference Sky Learner game with near-1:1 UI and equivalent gameplay.

**Architecture:** The app is a single-page browser game with static DOM for fixed UI and a full-screen canvas for animated gameplay. Pure logic is extracted into testable modules, while DOM wiring, rendering, MediaPipe pose tracking, and speech are integrated in runtime modules.

**Tech Stack:** Vite, Vanilla JavaScript, Vitest, MediaPipe Pose, browser Speech Synthesis API, HTML5 Canvas, CSS

---

### Task 1: Scaffold the project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/styles.css`

**Step 1: Write the failing test**

Create a placeholder smoke test in `tests/app-smoke.test.js` that imports the entry modules and expects the exported bootstrap helpers to exist.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/app-smoke.test.js`
Expected: FAIL because entry modules and exports do not exist yet.

**Step 3: Write minimal implementation**

Scaffold the Vite app files with minimal exports and CSS import wiring.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/app-smoke.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 2: Add the word database and selection helpers

**Files:**
- Create: `src/game/word-db.js`
- Create: `src/game/word-select.js`
- Test: `tests/word-select.test.js`

**Step 1: Write the failing test**

Test that `getRandomWord()` returns an object with `t`, `e`, `p`, `catColor`, and `catLabel`, and that the category metadata is valid.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/word-select.test.js`
Expected: FAIL because the modules do not exist.

**Step 3: Write minimal implementation**

Add the full in-app word database and a helper that returns a random word enriched with category metadata.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/word-select.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 3: Add pure game math helpers

**Files:**
- Create: `src/game/math.js`
- Test: `tests/math.test.js`

**Step 1: Write the failing test**

Test:

- `clamp()` clamps correctly
- nose projection stays inside canvas bounds
- collision threshold detects hits and misses as expected

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/math.test.js`
Expected: FAIL because helpers do not exist.

**Step 3: Write minimal implementation**

Implement small pure functions:

- `clamp(value, min, max)`
- `projectNoseToCanvas({ noseX, noseY, width, height, scale })`
- `isCollected({ noseX, noseY, itemX, itemY, itemSize, padding })`

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/math.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 4: Add speech wrapper with graceful fallback

**Files:**
- Create: `src/game/speech.js`
- Test: `tests/speech.test.js`

**Step 1: Write the failing test**

Test:

- when synthesis APIs are missing, the wrapper returns `false` and does not throw
- when synthesis APIs exist, the wrapper cancels current speech and speaks the requested word

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/speech.test.js`
Expected: FAIL because the wrapper does not exist.

**Step 3: Write minimal implementation**

Implement `speakWord(word, env = window)` with feature detection and safe no-op behavior.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/speech.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 5: Build the static page structure and reference-matching styles

**Files:**
- Modify: `index.html`
- Modify: `src/styles.css`
- Modify: `src/main.js`

**Step 1: Write the failing test**

Extend `tests/app-smoke.test.js` to assert that bootstrapping can find the expected DOM ids for:

- `gameCanvas`
- `preview-canvas`
- `score-disp`
- `card-popup`
- `lobby`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/app-smoke.test.js`
Expected: FAIL because the page structure is incomplete.

**Step 3: Write minimal implementation**

Add the reference-matching HTML shell and CSS styling for the lobby, HUD, popup, camera preview, and page background.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/app-smoke.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 6: Implement the renderer and runtime loop

**Files:**
- Create: `src/game/runtime.js`
- Modify: `src/main.js`
- Modify: `src/styles.css`

**Step 1: Write the failing test**

Add a runtime-level test that verifies the spawn/update helpers create falling items and increment the frame while active.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/runtime.test.js`
Expected: FAIL because runtime helpers do not exist.

**Step 3: Write minimal implementation**

Implement:

- background system init/update
- state and player models
- update loop
- draw loop
- score update hooks
- popup show/hide timing

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/runtime.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 7: Integrate MediaPipe nose tracking and start flow

**Files:**
- Create: `src/game/tracking.js`
- Modify: `src/game/runtime.js`
- Modify: `src/main.js`

**Step 1: Write the failing test**

Add a test for the tracker adapter that verifies landmark absence sets a centered fallback target and presence projects the mirrored nose position.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tracking.test.js`
Expected: FAIL because the adapter does not exist.

**Step 3: Write minimal implementation**

Implement:

- lazy tracker setup
- pose result handling
- preview canvas update
- `PLAY NOW` boot flow
- camera permission failure handling

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tracking.test.js`
Expected: PASS

**Step 5: Commit**

Skip commit if the directory is not a git repository.

### Task 8: Final polish and verification

**Files:**
- Modify: files as needed after visual diff review

**Step 1: Write the failing test**

Add any missing small regression tests discovered during manual comparison.

**Step 2: Run test to verify it fails**

Run the specific affected test.
Expected: FAIL for the uncovered behavior.

**Step 3: Write minimal implementation**

Tighten styling, timing, and fallback behavior until the app aligns closely with the reference.

**Step 4: Run test to verify it passes**

Run:

- `npm test`
- `npm run build`

Expected: all tests PASS and production build succeeds.

**Step 5: Commit**

Skip commit if the directory is not a git repository.

Plan saved to `docs/plans/2026-03-29-sky-learner-implementation.md`.

Execution note: this directory is not a git repository, so commit steps are informational only. I will continue in this session and implement the plan directly.
