// Plays back real, pre-recorded Codex CLI terminal sessions (asciicast v2)
// through xterm.js. The trunk plays once; at the fork the viewer's own
// keystrokes are echoed live into Codex's own composer row, and Enter
// dispatches to whichever branch recording matches (1/A, 2/B, 3/C), or
// leaves the composer as it was.

const CASTS = {
  trunk: "casts/trunk.cast",
  A: "casts/branch-A.cast",
  B: "casts/branch-B.cast",
  C: "casts/branch-C.cast",
};

const CHOICE_MAP = {
  "1": "A", "a": "A",
  "2": "B", "b": "B",
  "3": "C", "c": "C",
};

// Row/column of Codex's own composer prompt, taken from the trunk recording
// itself: "\x1b[29;1H...\x1b[1m›...\x1b[29;3H...Ask Codex to do anything".
const COMPOSER_ROW = 29;
const PLACEHOLDER = "Ask Codex to do anything";

let term = null;
let pendingTimers = [];
let inputBuffer = "";
let awaitingChoice = false;

async function loadCast(path) {
  const text = await fetch(path).then((r) => {
    if (!r.ok) throw new Error(`failed to load ${path}: ${r.status}`);
    return r.text();
  });
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const header = JSON.parse(lines[0]);
  const events = lines.slice(1).map((l) => JSON.parse(l));
  return { header, events };
}

function clearTimers() {
  pendingTimers.forEach((id) => clearTimeout(id));
  pendingTimers = [];
}

function playEvents(events, onDone) {
  clearTimers();
  events.forEach(([time, kind, data]) => {
    if (kind !== "o") return;
    const id = setTimeout(() => term.write(data), time * 1000);
    pendingTimers.push(id);
  });
  const lastTime = events.length ? events[events.length - 1][0] : 0;
  const doneId = setTimeout(onDone, lastTime * 1000 + 150);
  pendingTimers.push(doneId);
}

function restorePlaceholder() {
  term.write(
    `\x1b[${COMPOSER_ROW};1H\x1b[2K\x1b[1m›\x1b[22m \x1b[2m${PLACEHOLDER}\x1b[22m\x1b[${COMPOSER_ROW};3H`
  );
}

function redrawComposer(text) {
  term.write(`\x1b[${COMPOSER_ROW};1H\x1b[2K\x1b[1m›\x1b[22m ${text}`);
}

// Exposed only for headless verification (no visible UI depends on this):
// there is no page-level status text, so a browser driver needs some way to
// know when the trunk has actually finished and the composer is live.
function setAwaitingChoice(value) {
  awaitingChoice = value;
  window.__awaitingChoice = value;
}

function handleKey(ev) {
  if (!awaitingChoice) return;
  const e = ev.domEvent;

  if (e.key === "Enter") {
    const choice = CHOICE_MAP[inputBuffer.trim().toLowerCase()];
    inputBuffer = "";
    if (!choice) {
      restorePlaceholder();
      return;
    }
    setAwaitingChoice(false);
    term.reset();
    loadCast(CASTS[choice]).then(({ events }) => {
      playEvents(events, () => {});
    });
    return;
  }

  if (e.key === "Backspace") {
    if (inputBuffer.length === 0) return;
    inputBuffer = inputBuffer.slice(0, -1);
  } else if (!e.ctrlKey && !e.altKey && !e.metaKey && ev.key.length === 1) {
    inputBuffer += ev.key;
  } else {
    return;
  }

  if (inputBuffer.length === 0) {
    restorePlaceholder();
  } else {
    redrawComposer(inputBuffer);
  }
}

async function main() {
  const { header, events } = await loadCast(CASTS.trunk);

  term = new Terminal({
    cols: header.width,
    rows: header.height,
    fontSize: 14,
    fontFamily: "Menlo, Consolas, monospace",
    convertEol: false,
    cursorBlink: true,
    disableStdin: false,
    theme: { background: "#000000" },
  });
  term.open(document.getElementById("terminal"));
  term.onKey(handleKey);

  playEvents(events, () => {
    setAwaitingChoice(true);
  });
}

main().catch((err) => {
  console.error(err);
});
