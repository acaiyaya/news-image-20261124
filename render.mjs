import { execFile } from 'node:child_process';
import { mkdtemp, rename, rm, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import puppeteer from '/home/hatch/.makefun/shot-tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js';

const input = new URL('./front.html', import.meta.url);
const output = fileURLToPath(new URL('./entry.png', import.meta.url));
const run = promisify(execFile);

export async function withFrontPage(usePage) {
  const temporary = await mkdtemp(join(dirname(output), '.render-'));
  try {
    const browser = await puppeteer.launch({
      headless: 'shell',
      pipe: true,
      protocolTimeout: 10_000,
      userDataDir: join(temporary, 'profile'),
      args: ['--no-sandbox', '--no-zygote', '--single-process', '--disable-gpu', '--disable-dev-shm-usage'],
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
      await page.setOfflineMode(true);
      await page.goto(input.href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      return await usePage(page, temporary);
    } finally {
      await browser.close();
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (import.meta.main) {
  await withFrontPage(async (page, temporary) => {
    const image = join(temporary, 'entry');
    try {
      await page.screenshot({ path: `${image}.png`, type: 'png' });
    } catch (error) {
      console.warn(`Screenshot failed (${String(error).split('\n', 1)[0]}). Rendering through PDF.`);
      const pdf = join(temporary, 'front.pdf');
      await page.pdf({
        path: pdf,
        width: '1024px',
        height: '1024px',
        printBackground: true,
        pageRanges: '1',
      });
      await run('pdftoppm', ['-r', '96', '-png', '-singlefile', pdf, image]);
    }
    await rename(`${image}.png`, output);
  });
  console.log(`entry.png: ${(await stat(output)).size} bytes`);
}
