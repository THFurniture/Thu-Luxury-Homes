import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const projectsFile = path.join(projectRoot, "app", "data", "projects.ts");
const ogDir = path.join(publicDir, "og");
const tempDir = path.join(ogDir, ".tmp");
const ogWidth = 1200;
const ogHeight = 630;
const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

function getStringValue(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return match?.[1] ?? null;
}

function getNumberValue(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*(\\d+)`));
  return match ? Number(match[1]) : null;
}

function parseProjectDefinitions(source) {
  const projectBlocks = source.matchAll(/defineProject\(\{([\s\S]*?)\}\),/g);

  return Array.from(projectBlocks, (match) => {
    const block = match[1];
    const slug = getStringValue(block, "slug");
    const name = getStringValue(block, "name");
    const folder = getStringValue(block, "folder");
    const fileBase = getStringValue(block, "fileBase");
    const imageCount = getNumberValue(block, "imageCount");
    const coverIndex = getNumberValue(block, "coverIndex") ?? 1;

    if (!slug || !name || !folder || !fileBase || !imageCount) {
      throw new Error(`Unable to parse project definition:\n${block}`);
    }

    const clampedCoverIndex = Math.max(1, Math.min(coverIndex, imageCount));

    return {
      slug,
      name,
      input: path.join(
        publicDir,
        "projects-imgs",
        folder,
        `${fileBase}-${clampedCoverIndex}.avif`,
      ),
      output: path.join(ogDir, `${slug}-og.jpg`),
    };
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}

async function ensureDirectory(directory) {
  await fs.mkdir(directory, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getChromePath() {
  for (const candidate of chromeCandidates) {
    if (await fileExists(candidate)) return candidate;
  }

  return null;
}

async function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(new Error(`${command} exited with code ${code}\n${stderr || stdout}`));
    });
  });
}

async function createOgImageWithSharp(project) {
  await sharp(project.input)
    .rotate()
    .resize(ogWidth, ogHeight, {
      fit: "cover",
      position: "centre",
    })
    .jpeg({
      quality: 84,
      mozjpeg: true,
      progressive: true,
    })
    .toFile(project.output);
}

async function createOgImageWithChrome(project, chromePath) {
  const htmlPath = path.join(tempDir, `${project.slug}.html`);
  const pngPath = path.join(tempDir, `${project.slug}.png`);
  const userDataDir = path.join(tempDir, `${project.slug}-chrome-profile`);
  const imageUrl = pathToFileURL(project.input).href;
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      html,
      body {
        width: ${ogWidth}px;
        height: ${ogHeight}px;
        margin: 0;
        overflow: hidden;
        background: #111;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    </style>
  </head>
  <body>
    <img src="${imageUrl}" alt="">
  </body>
</html>`;

  await fs.writeFile(htmlPath, html, "utf8");
  await runCommand(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-gpu-compositing",
    "--disable-accelerated-2d-canvas",
    "--disable-features=UseSkiaRenderer,VizDisplayCompositor",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${userDataDir}`,
    `--window-size=${ogWidth},${ogHeight}`,
    "--force-device-scale-factor=1",
    "--virtual-time-budget=1000",
    `--screenshot=${pngPath}`,
    pathToFileURL(htmlPath).href,
  ]);

  await sharp(pngPath)
    .jpeg({
      quality: 84,
      mozjpeg: true,
      progressive: true,
    })
    .toFile(project.output);
}

async function createOgImage(project, chromePath) {
  let renderer = "sharp";

  try {
    await createOgImageWithSharp(project);
  } catch (error) {
    if (!chromePath) throw error;
    renderer = "chrome";
    await createOgImageWithChrome(project, chromePath);
  }

  const stats = await fs.stat(project.output);

  return {
    ...project,
    bytes: stats.size,
    renderer,
  };
}

async function main() {
  await ensureDirectory(ogDir);

  const source = await fs.readFile(projectsFile, "utf8");
  const projects = parseProjectDefinitions(source);
  const chromePath = await getChromePath();

  if (projects.length === 0) {
    throw new Error("No project definitions found.");
  }

  await ensureDirectory(tempDir);

  const generated = [];
  for (const project of projects) {
    generated.push(await createOgImage(project, chromePath));
  }

  await fs.rm(tempDir, { recursive: true, force: true });

  const totalBytes = generated.reduce((sum, image) => sum + image.bytes, 0);
  const sharpCount = generated.filter((image) => image.renderer === "sharp").length;
  const chromeCount = generated.filter((image) => image.renderer === "chrome").length;

  console.log(`Project OG images generated: ${generated.length}`);
  console.log(`Dimensions: ${ogWidth}x${ogHeight}`);
  console.log(`Output directory: ${path.relative(projectRoot, ogDir)}`);
  console.log(`Rendered with sharp: ${sharpCount}`);
  console.log(`Rendered with Chrome fallback: ${chromeCount}`);
  console.log(`Total size: ${formatBytes(totalBytes)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
