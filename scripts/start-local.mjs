import { existsSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, resolve } from "node:path";

function findServerEntry(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name === "index.js") {
      return join(dir, entry.name);
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const nestedEntry = findServerEntry(join(dir, entry.name));
    if (nestedEntry) return nestedEntry;
  }

  return null;
}

const serverRoot = resolve("build/server");

if (!existsSync(serverRoot)) {
  console.error("[start-local] Missing build/server. Run `npm run build` first.");
  process.exit(1);
}

const serverEntry = findServerEntry(serverRoot);

if (!serverEntry) {
  console.error("[start-local] Could not locate the server entry inside build/server.");
  process.exit(1);
}

const serveBin = resolve("node_modules/@react-router/serve/bin.js");
const child = spawn(process.execPath, [serveBin, serverEntry], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
