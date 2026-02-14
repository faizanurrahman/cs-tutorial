#!/usr/bin/env node

/**
 * Dumps the content of all project files (except ignored paths) into a single text file.
 * Usage: node scripts/dump-codebase.js [output-file]
 * Default output: codebase-dump.txt
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = process.argv[2] || path.join(ROOT, "codebase-dump.txt");

// Directory names to skip (matches anywhere in the tree)
const SKIP_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  ".cursor",
  ".vscode",
  ".idea",
  "dist",
  ".angular",
  "srs",
  "coverage",
  ".nyc_output",
  "tmp",
  "temp",
  ".cache",
  "scripts",
  "public",
  ".github",
]);

// Path prefixes to exclude (relative to ROOT) - dir OR file under this path is skipped
const SKIP_PATH_PREFIXES = [
  "node_modules",
  ".git",
  "dist",
  "srs",
  "scripts",
  "public",
  "coverage",
  "docs",
];

// Exact file names to skip (basename only)
const SKIP_FILE_NAMES = new Set([
  "package.json",
  "package-lock.json",
  "angular.json",
  "tsconfig.json",
  "tsconfig.app.json",
  "tsconfig.spec.json",
  "vite.config.ts",
  // "tailwind.config.js",
  // "postcss.config.js",
  ".env",
  ".env.local",
  ".gitignore",
  ".cursorignore",
  ".prettierrc",
  ".eslintrc",
  "codebase-dump.txt",
  "netlify.toml",
  "vercel.json",
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "index.html", // usually at root, include if needed
]);

// File extensions to include (if non-empty, only these are included)
const INCLUDE_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".html",
  ".css",
  ".scss",
  ".md",
]);

// Extensions to always skip (binary, generated)
const SKIP_EXT = new Set([
  ".map",
  ".min.js",
  ".min.css",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".ico",
  ".svg",
  ".webp",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".pdf",
  ".zip",
  ".gz",
  ".br",
]);

// Suffixes to skip (e.g. foo.spec.ts, bar.test.js)
const SKIP_SUFFIXES = [".spec.", ".test."];

function isHidden(name) {
  return name.startsWith(".");
}

function pathMatchesPrefix(relativePath, prefixes) {
  const normalized = relativePath.replace(/\\/g, "/");
  return prefixes.some(
    (p) => normalized === p || normalized.startsWith(p + "/"),
  );
}

function shouldSkipDir(dirName, relativePath) {
  if (isHidden(dirName)) return true;
  if (SKIP_DIR_NAMES.has(dirName)) return true;
  if (pathMatchesPrefix(relativePath, SKIP_PATH_PREFIXES)) return true;
  return false;
}

function shouldSkipFile(fileName, relativePath) {
  if (SKIP_FILE_NAMES.has(fileName)) return true;

  const ext = path.extname(fileName);
  if (SKIP_EXT.has(ext)) return true;

  if (INCLUDE_EXT.size > 0 && !INCLUDE_EXT.has(ext)) return true;

  if (SKIP_SUFFIXES.some((s) => fileName.includes(s))) return true;

  if (pathMatchesPrefix(relativePath, SKIP_PATH_PREFIXES)) return true;

  return false;
}

function walkDir(dir, files = [], dirRelativePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name, relativePath)) {
        walkDir(fullPath, files, relativePath);
      }
    } else if (entry.isFile()) {
      if (!shouldSkipFile(entry.name, relativePath)) {
        files.push(relativePath);
      }
    }
  }
  return files;
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return `[Error reading ${filePath}]\n`;
  }
}

function main() {
  const files = walkDir(ROOT);
  const lines = [];
  lines.push(`# Codebase Dump - ${new Date().toISOString()}\n`);
  lines.push(`# Root: ${ROOT}\n`);
  lines.push(`# Files: ${files.length}\n\n`);

  for (const relPath of files) {
    const fullPath = path.join(ROOT, relPath);
    const content = readFileSafe(fullPath);
    const header = `\n${"=".repeat(80)}\nFILE: ${relPath}\n${"=".repeat(80)}\n`;
    lines.push(header);
    lines.push(content);
    if (!content.endsWith("\n")) lines.push("");
  }

  fs.writeFileSync(OUTPUT, lines.join(""), "utf8");
  console.log(`Dumped ${files.length} files to ${OUTPUT}`);
}

main();
