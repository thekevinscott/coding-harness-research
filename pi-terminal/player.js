// Replays real, unmodified Pi TUI sessions recorded with asciinema.
// No live agent, no server: five .cast files (trunk + 3 branches + fallback)
// captured once from an actual pi process talking to a scripted mock model.
//
// "i" (input) events in the casts are the recorder's own keystrokes; they are
// skipped during playback (their timestamps still drive the delay chain, so
// timing stays exact), because branch selection re-echoes new keystrokes
// itself and does not need to replay the ones used to record the branch.

const CAST_FILES = {
  trunk: "casts/trunk.cast",
  1: "casts/branch-1.cast",
  2: "casts/branch-2.cast",
  3: "casts/branch-3.cast",
  fallback: "casts/branch-fallback.cast",
};

async function loadCast(path) {
  const text = await fetch(path).then((r) => r.text());
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const header = JSON.parse(lines[0]);
  const events = lines.slice(1).map((l) => JSON.parse(l));
  return { header, events };
}

function playCast(term, events, index, cb) {
  if (index >= events.length) {
    if (cb) cb();
    return;
  }
  const [t, kind, data] = events[index];
  if (kind === "o") term.write(data);
  if (index + 1 >= events.length) {
    if (cb) cb();
    return;
  }
  const delayMs = Math.max(0, (events[index + 1][0] - t) * 1000);
  setTimeout(() => playCast(term, events, index + 1, cb), delayMs);
}

function classify(text) {
  const key = text.trim().toLowerCase();
  if (key === "1" || key === "a") return "1";
  if (key === "2" || key === "b") return "2";
  if (key === "3" || key === "c") return "3";
  return "fallback";
}

async function main() {
  const casts = {};
  for (const [name, path] of Object.entries(CAST_FILES)) {
    casts[name] = await loadCast(path);
  }

  const term = new Terminal({
    cols: casts.trunk.header.width,
    rows: casts.trunk.header.height,
    fontFamily: '"DejaVu Sans Mono", Menlo, Consolas, monospace',
    fontSize: 14,
    theme: { background: "#000000" },
    cursorBlink: false,
    disableStdin: false,
    scrollback: 2000,
  });
  term.open(document.getElementById("terminal"));

  let inputEnabled = false;
  let buffer = "";

  term.onData((data) => {
    if (!inputEnabled) return;
    if (data === "\r" || data === "\n") {
      term.write("\r\n");
      submit(buffer);
      buffer = "";
    } else if (data === "\x7f" || data === "\b") {
      if (buffer.length > 0) {
        buffer = buffer.slice(0, -1);
        term.write("\b \b");
      }
    } else if (data >= " " && data <= "~") {
      buffer += data;
      term.write(data);
    }
  });

  function submit(text) {
    inputEnabled = false;
    const branch = classify(text);
    playCast(term, casts[branch].events, 0, () => {
      if (branch === "fallback") {
        buffer = "";
        inputEnabled = true;
      }
    });
  }

  playCast(term, casts.trunk.events, 0, () => {
    inputEnabled = true;
    term.focus();
  });
}

main();
