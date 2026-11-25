import * as imageFiles from "node:fs/promises";
import { join as joinOutputPath } from "node:path";
const repositoryImage = new URL("entry.png", import.meta.url);
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputImage = joinOutputPath(outputDirectory, "entry.png");
await imageFiles.mkdir(outputDirectory, { recursive: true });
await imageFiles.copyFile(repositoryImage, outputImage);
