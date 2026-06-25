import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(__dirname, "..");
export const SOURCES_DIR = path.join(ROOT, "data/schedule-sources");
export const CACHE_ROOT = path.join(ROOT, "data/schedule-cache");
export const OUTPUT_DIR = path.join(ROOT, "data/imported-schedules");
export const STATE_PATH = path.join(ROOT, "data/schedule-import-state.json");

export const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

export function normalizeUrl(raw) {
  let url = raw.trim();
  if (!url.startsWith("http")) {
    url = `https://${url.replace(/^\/\//, "")}`;
  }
  if (!url.startsWith("https://www.")) {
    url = url.replace("https://", "https://www.");
  }
  return url;
}

export function parseCsv(filePath) {
  const lines = fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const urls = [];
  for (const line of lines.slice(1)) {
    const comma = line.indexOf(",");
    if (comma === -1) continue;
    const monthLabel = line.slice(0, comma).trim();
    const rawUrl = line.slice(comma + 1).trim();
    if (!/^https?:\/\//i.test(rawUrl)) continue;
    urls.push({ monthLabel, url: normalizeUrl(rawUrl) });
  }
  return urls;
}

export function cacheFileName(url) {
  const offset = url.match(/offset=(\d+)/i)?.[1];
  const match = url.match(/-([a-z]{3}\d{4})(?:\.html|\?|$)/i);
  if (match) {
    return offset ? `${match[1]}-offset-${offset}.txt` : `${match[1]}.txt`;
  }
  const base = url.match(/visiting[^?]+/)?.[0] ?? "page";
  return `${base.replace(/[^\w-]/g, "")}-offset-${offset ?? "0"}.txt`;
}

export function cachePathForUrl(cacheDir, url) {
  return path.join(cacheDir, cacheFileName(url));
}

export function readCachedPage(cacheDir, url) {
  const cachePath = cachePathForUrl(cacheDir, url);
  if (!fs.existsSync(cachePath)) return null;
  return fs.readFileSync(cachePath, "utf8");
}

export function writeCachedPage(cacheDir, url, content) {
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(cachePathForUrl(cacheDir, url), content);
}

export function discoverPageUrls(firstHtml, baseUrl) {
  const urls = new Set([baseUrl]);
  for (const m of firstHtml.matchAll(/pageit\('([^']+)'\)/g)) {
    const rel = m[1];
    if (rel.includes("offset=")) {
      urls.add(
        rel.startsWith("http")
          ? rel
          : `https://www.cruisetimetables.com/${rel.replace(/^\//, "")}`,
      );
    }
  }
  return [...urls];
}

export function allUrlsForPort(slug) {
  const csvPath = path.join(SOURCES_DIR, `${slug}.csv`);
  if (!fs.existsSync(csvPath)) return null;

  const cacheDir = path.join(CACHE_ROOT, slug);
  const monthUrls = parseCsv(csvPath);
  const allUrls = [];

  for (const { monthLabel, url } of monthUrls) {
    allUrls.push({ monthLabel, url, kind: "month" });
    const cached = readCachedPage(cacheDir, url);
    if (cached) {
      for (const extraUrl of discoverPageUrls(cached, url)) {
        if (extraUrl !== url) {
          allUrls.push({ monthLabel, url: extraUrl, kind: "offset" });
        }
      }
    }
  }

  return { csvPath, cacheDir, monthUrls, allUrls };
}

export function getUncachedUrls(slug) {
  const portData = allUrlsForPort(slug);
  if (!portData) return null;

  const { cacheDir, allUrls } = portData;
  return allUrls.filter(({ url }) => !readCachedPage(cacheDir, url));
}

export function isPortFullyCached(slug) {
  const uncached = getUncachedUrls(slug);
  return uncached !== null && uncached.length === 0;
}

export async function fetchHtml(url, { on429 } = {}) {
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (res.status === 429) {
    if (on429) on429(url);
    const err = new Error(`HTTP 429 for ${url}`);
    err.status = 429;
    throw err;
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} for ${url}`);
    err.status = res.status;
    throw err;
  }
  return res.text();
}

export function loadImportState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { lastRun: null, blockedUntil: null, ports: {} };
  }
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}

export function saveImportState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
