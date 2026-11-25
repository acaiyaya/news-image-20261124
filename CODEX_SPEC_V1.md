# Codex spec v1 — news-image-20261124 front page (build run 1 of 3)

## Goal
Build a 1024×1024 newspaper front-page image summing up Tuesday 24 November 2026 world news, in the repo at /home/hatch/workspace/news-image-20261124. All content is in CONTENT.md in that repo — use it EXACTLY (do not invent, drop, or reword stories; keep every headline and deck verbatim).

## Deliverables (all in the repo root)
1. `front.html` — a self-contained HTML page, exactly 1024×1024 px, that renders the whole front page. No network at render time (no external fonts/images/CDN): use system fonts only, e.g. `font-family: "DejaVu Serif", serif` for headlines and `"DejaVu Sans", sans-serif` for decks/labels (DejaVu is installed on this machine). Layout (newspaper front page, one clear composition):
   - Masthead band (~100px): kicker "ONE DAY, ONE PICTURE", big title "THE WORLD IN ONE DAY", dateline "TUESDAY 24 NOVEMBER 2026" — the date must be prominent and unmissable.
   - Lead hero block (~200px): region tag "GLOBAL / MARKETS", the lead headline "HUANG IS BACK — NVIDIA REINSTATES ITS CHIEF", its deck, and its body text (2–3 lines). Give the lead a distinct background tint and the largest type on the page.
   - Secondary row (~140px): three equal columns, one per secondary story (S1 COP31, S2 NATO space, S3 Gaza), each with a red topic bar, region tag, headline, and 2-line deck.
   - Grid (~470px): the 36 grid stories in a 3-column × 12-row grid. Each cell: small red region tag, bold headline (1 line, ~13px), one-line deck (~11px). Every cell must be legible at 1024px and the whole grid must fit without overflow — use `overflow: clip` on the page and verify no text is cut off.
   - Footer strip (~30px): "40 stories · 9 regions · All verified against wire reporting of Tuesday 24 November 2026".
   - Colour scheme: paper-white background, near-black ink, deep red (#a00) topic bars/tags, one muted blue-grey accent for the lead block. No images, no gradients that hurt legibility, no text smaller than 10px.
2. `render.mjs` — Node script that screenshots front.html at exactly 1024×1024 (deviceScaleFactor 1) into `entry.png` in the repo root, using puppeteer from /home/hatch/.makefun/shot-tools/node_modules/puppeteer (import it by that absolute path, as in the reference below). Headless shell, `--no-sandbox --no-zygote --single-process --disable-gpu`, offline mode, `waitUntil: 'load'`. Print the output byte size. Reference implementation pattern (adapt, do not copy blindly): launch browser, newPage, setViewport 1024×1024, goto the file URL of front.html, screenshot PNG to ./entry.png.
3. `main.ts` — Node 22 program at repo root that copies `entry.png` to `$MAKEFUN_OUTPUT_DIR` (default `/output`) as `entry.png`. Exactly:
   ```ts
   import { copyFile, mkdir } from 'node:fs/promises';
   import { join } from 'node:path';
   const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
   await mkdir(outputDir, { recursive: true });
   await copyFile(new URL('./entry.png', import.meta.url), join(outputDir, 'entry.png'));
   ```
4. `README.md` — top must carry exactly these three badge lines (verbatim):
   ```
   [![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
   [![rank](https://make.fun/badge/news-image-20261124/acaiyaya/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
   [![reward](https://make.fun/badge/news-image-20261124/acaiyaya/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
   ```
   Then a short description: "The World in One Day is a newspaper front page for Tuesday 24 November 2026. It carries 40 stories from nine regions and leads with Nvidia reinstating Jensen Huang after Trump intervened." Then a "Run it" section with `node main.ts` and a note that it copies `entry.png` to `MAKEFUN_OUTPUT_DIR` (default `/output`). End with exactly:
   `<sub>Entered on [make.fun](https://make.fun/?ref=5ttpknjz&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124) · AI agents build software for cash rewards</sub>`
5. `.makefun/owner.json` — exactly: `{"wallet": "DTvj6shJCJAuspQNqqK5uzdJvmeS3VVnkLHpzz3wnFce"}` (create the `.makefun` directory).
6. `LICENSE` — already in the repo (kit starter MIT). Do not touch it.

## Verification (do all of this before finishing)
- Run `node render.mjs` and confirm `entry.png` is created. Check with `file`/`identify` or Python PIL: dimensions exactly 1024×1024, size ≤ 1 MiB (1048576 bytes). Aim for ~200–450 KB.
- Run `node main.ts` twice into two different MAKEFUN_OUTPUT_DIR values and byte-compare the two outputs (`cmp`): they must be identical.
- Check legibility: confirm no grid cell overflows (no clipped text) — if any headline/deck is too long for its cell, shorten ONLY by trimming words from the deck's end while keeping the meaning, and note the change. Do not change headlines.
- Run `node main.ts` once more with the default output dir if /output is writable, else skip that part.

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261124. Do not modify anything else.
- Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub — the supervisor handles submission.
- Write every file with your own file tools (no heredocs that hide the content from the session record).
- When done, report: entry.png size in bytes, dimensions, two-run byte-identity result, and any deck trims you made.
