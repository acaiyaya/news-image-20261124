# Codex spec v2 — news-image-20261124: complete decks + render fallback (build run 2 of 3)

## Context
Version 1 is built and renders well (entry.png, 1024×1024, 363,002 bytes). Two defects to fix:
1. CONTENT.md still says "40 stories" in three places, but the true count is 42 (1 lead + 3 secondary + 38 grid). front.html and README.md already say 42.
2. Many of the 38 grid decks are visibly truncated mid-sentence (they end abruptly with no full stop). A judge can see the cut-off text. Every grid deck must be a COMPLETE sentence that fits on one line.

## Tasks
1. Fix CONTENT.md: change the title line's "40 stories" to "42 stories"; change the footer-strip line's "40 stories" to "42 stories"; change the story-count line to "## STORY COUNT: 1 lead + 3 secondary + 38 grid = 42 stories." Also fix the grid-section header "## GRID — 36 more stories" to "## GRID — 38 more stories". Do not change any headline or story fact.
2. Rewrite grid decks: in front.html, replace each of the 38 grid decks (both the visible `<span>` text and the `title` attribute) with a complete, self-contained sentence that fits on ONE line at the current deck size and ends with a full stop. Shorten by rewording, never by cutting a sentence off mid-thought. Keep every fact from CONTENT.md's deck; only compress wording. Headlines stay verbatim. The lead, secondary stories, masthead and footer stay exactly as they are.
3. Reuse your .prepare.mjs measurement approach (recreate it if deleted): iterate until zero grid decks overflow and zero headlines are clipped. Keep the deck font size as it is; if a deck still does not fit, shorten its wording further.
4. Add a render fallback to render.mjs: if `page.screenshot()` throws or times out, fall back to `page.pdf({width: '1024px', height: '1024px', printBackground: true, pageRanges: '1'})` and convert the PDF to entry.png with `pdftoppm -r 96 -png -singlefile` (write the PDF to a temp file, convert, move into place, clean up). Keep the direct screenshot as the first attempt. Do not change main.ts.
5. Re-render with `node render.mjs` and verify: entry.png is 1024×1024, ≤ 1 MiB, and re-run `node main.ts` twice into two different MAKEFUN_OUTPUT_DIR values and byte-compare (`cmp`) — must be identical. Report the size, the two-run result, and the final overflow count (must be zero).

## Constraints
- Work only inside /home/hatch/workspace/news-image-20261124. Do not modify anything else.
- Do not fetch anything from the network. Do not use the kit, the make.fun CLI, git, or GitHub.
- Keep every command's output short (never dump long font lists or whole files to stdout).
- Write every file with your own file tools. When done, report: entry.png size, dimensions, two-run byte-identity result, overflow count, and list any deck wording you changed.
