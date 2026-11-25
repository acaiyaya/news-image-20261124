# Codex spec v4 — news-image-20261124: promote variant B to the entry (build run 4 of 4)

## Context
Variant B (front-alt.html / entry-alt.png, 1024×1024, 385,724 bytes, with the MARKETS — TUESDAY CLOSE strip) is the winner: same 42 stories and legibility as version 2, plus verified closing figures that reinforce the lead. Promote it to be the entry. Do NOT change any story, headline, deck, or figure.

## Tasks
1. Copy front-alt.html over front.html and entry-alt.png over entry.png (use `cp`; do not retype any content).
2. Re-render from the promoted front.html with `node render.mjs` (screenshot first, PDF fallback if needed, as render.mjs already implements). The freshly rendered entry.png is the entry from here on.
3. Verify the promoted entry: entry.png is 1024×1024, ≤ 1 MiB; run `node main.ts` twice into two different MAKEFUN_OUTPUT_DIR values and byte-compare (`cmp`) — must be identical. Report the final size in bytes, the two-run result, and whether the re-rendered entry.png is byte-identical to the entry-alt.png you copied (if not, report both sizes — the re-rendered file still stands).
4. Do NOT delete any files in this run. Do not touch CONTENT.md, README.md, main.ts, or LICENSE.

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261124. Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub.
- Keep every command's output short (never dump long font lists or whole files to stdout).
- When done, report: final entry.png size, dimensions, two-run byte-identity result, and re-render byte-identity vs entry-alt.png.
