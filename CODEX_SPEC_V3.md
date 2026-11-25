# Codex spec v3 — news-image-20261124: layout variant B with markets strip (build run 3 of 3)

## Context
Version 2 (entry.png, 1024×1024, 374,062 bytes) is good: complete one-line decks, zero overflow. Build ONE alternative layout (variant B) as separate files so version 2 stays untouched for comparison. Do NOT modify entry.png, front.html, or render.mjs in this run.

## Tasks
1. Copy front.html to front-alt.html and render.mjs to render-alt.mjs (render-alt.mjs must write entry-alt.png instead of entry.png; keep the same screenshot-first + PDF-fallback logic). Copy .prepare.mjs to .prepare-alt.mjs if you need measurement, pointed at front-alt.html.
2. In front-alt.html, add ONE new element and adjust spacing to fit it: a thin "MARKETS — TUESDAY CLOSE" strip directly under the lead hero block (above the secondary row), showing these verified Tuesday 24 November 2026 closing figures (from the day's market reporting — use exactly these values):
   - S&P 500 7,237.17 +4.73%
   - Nasdaq 24,089.56 +6.51%
   - Nikkei 225 58,644.63 +3.91%
   - KOSPI +6% (Seoul rebounded more than 6%)
   - FTSE 100 10,480.82 +1.30%
   - Brent crude $86.70 −2.99%
   - Gold $3,620.40 −0.85%
   Present them as a single horizontal strip of small labelled figures (index name bold, value, green/red change). Reclaim the vertical space by tightening the masthead (~8px), the lead block (~10px) and the grid row gaps slightly — do NOT shrink grid deck type below its current size and do NOT cut any story. The footer must still read "42 stories · 9 regions · All verified against wire reporting of Tuesday 24 November 2026".
3. Reuse the deck-measurement approach: zero overflowing grid decks, zero clipped headlines.
4. Render with `node render-alt.mjs` and verify: entry-alt.png is 1024×1024, ≤ 1 MiB. Run `node main.ts` is NOT needed for the variant (main.ts still copies entry.png).
5. Report: entry-alt.png size in bytes, dimensions, overflow count, and an honest one-paragraph comparison of variant B vs version 2 (which reads better at a glance, whether the markets strip earns its space).

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261124. Do not modify entry.png, front.html, render.mjs, main.ts, CONTENT.md, or README.md. Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub.
- Keep every command's output short (never dump long font lists or whole files to stdout).
- Write every file with your own file tools. When done, report the size, dimensions, overflow count, and the comparison paragraph.
