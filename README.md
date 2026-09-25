# Scripted coding-agent harness demos

Open-source coding-agent harnesses running in the browser with a fixed, scripted session and no model or backend. Each one runs the same task, pauses at one decision point with three options, and plays the branch you pick.

- `codex-terminal/` - the real [openai/codex](https://github.com/openai/codex) CLI (Apache-2.0), recorded against a scripted model and replayed in xterm.js. Type 1, 2 or 3 at the prompt.
- `pi-terminal/` - the real Pi CLI from [badlogic/pi-mono](https://github.com/badlogic/pi-mono) (MIT), same method.
- `pi-web/` - [agegr/pi-web](https://github.com/agegr/pi-web) (MIT) with a scripted mock backend. Reply A, B or C in the composer.
- `claude-code-webui/` - [sugyan/claude-code-webui](https://github.com/sugyan/claude-code-webui) (MIT) with its demo engine ungated.
- `openhands/` - [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) (MIT) mock build with a timed event driver. Reply A, B or C in the composer.

Each folder is built output, modified from upstream. Upstream licenses apply.
