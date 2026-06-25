#!/usr/bin/env node
/**
 * Crawl sitemap URLs and verify internal + specialist external links.
 *
 * Usage:
 *   npm run check-links
 *   BASE_URL=https://caribbeanshoreexcursion.com npm run check-links
 *   SITEMAP_FILE=out/sitemap.xml BASE_URL=https://caribbeanshoreexcursion.com npm run check-links
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DEFAULT_BASE_URL = "https://caribbeanshoreexcursion.com";
const DEFAULT_DOMAIN = "caribbeanshoreexcursion.com";
const CONCURRENCY = 8;
const FETCH_TIMEOUT_MS = 20000;

const BASE_URL = (process.env.BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
const SITEMAP_FILE = process.env.SITEMAP_FILE || path.join(ROOT, "out", "sitemap.xml");
const SITEMAP_URL = process.env.SITEMAP_URL || `${BASE_URL}/sitemap.xml`;

const SKIP_SCHEMES = /^(mailto:|tel:|javascript:|data:|#)/i;
const SKIP_PATHS = ["/cdn-cgi/l/email-protection"];

const issues = {
  sitemapFailures: [],
  brokenInternal: [],
  brokenExternal: [],
  redirects: [],
  localhostLinks: [],
  wrongDomainLinks: [],
  missingPages: [],
};

const checkedTargets = new Map();
const specialistUrls = loadSpecialistUrls();

function loadSpecialistUrls() {
  const files = [
    path.join(ROOT, "data", "ports.ts"),
    path.join(ROOT, "data", "additional-ports.ts"),
  ];
  const urls = [];

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf8");
    urls.push(
      ...[...content.matchAll(/specialistUrl:\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]),
    );
  }

  return [...new Set(urls)];
}

function withTrailingSlash(urlPath) {
  if (!urlPath || urlPath === "/") return "/";
  return urlPath.endsWith("/") ? urlPath : `${urlPath}/`;
}

function normalizeInternalPath(urlPath) {
  try {
    const parsed = new URL(urlPath, BASE_URL);
    if (parsed.origin !== new URL(BASE_URL).origin) return null;
    return withTrailingSlash(parsed.pathname);
  } catch {
    return null;
  }
}

function suggestFix(sourceUrl, linkUrl, status, location, issueType) {
  if (issueType === "localhost") {
    return `Replace localhost with ${BASE_URL}.`;
  }

  if (linkUrl.includes("localhost") || linkUrl.includes("127.0.0.1")) {
    return `Use production URL ${BASE_URL} instead of localhost.`;
  }

  const internalPath = normalizeInternalPath(linkUrl);
  if (internalPath && status === 404) {
    const withSlash = withTrailingSlash(internalPath);
    if (withSlash !== internalPath) {
      return `Site uses trailing slashes. Try ${BASE_URL}${withSlash}`;
    }
  }

  if (status >= 300 && status < 400 && location) {
    return `Redirects to ${location}. Update the link to the final URL if permanent.`;
  }

  if (issueType === "wrong-domain" && linkUrl.includes("caribbean-shore-excursions")) {
    return `Point to ${BASE_URL} instead of a staging or old project domain.`;
  }

  if (status === 404) return "Page not found. Verify route exists in app/ and sitemap.";
  if (status === 0) return "Request failed. Check network, DNS, or SSL.";
  if (status >= 500) return "Server error on target URL.";

  return null;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "caribbean-shore-excursions-link-checker/1.0",
        Accept: "text/html,application/xhtml+xml",
        ...(options.headers || {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function checkUrl(targetUrl, context = {}) {
  const key = targetUrl;
  if (checkedTargets.has(key)) return checkedTargets.get(key);

  const resultPromise = (async () => {
    try {
      let response = await fetchWithTimeout(targetUrl, {
        method: "HEAD",
        redirect: "manual",
      });

      if (response.status === 405 || response.status === 403) {
        response = await fetchWithTimeout(targetUrl, {
          method: "GET",
          redirect: "manual",
        });
      }

      const status = response.status;
      const location = response.headers.get("location");

      if (status >= 300 && status < 400 && location) {
        const resolved = new URL(location, targetUrl).href;
        return {
          ok: false,
          status,
          location: resolved,
          redirect: true,
          finalUrl: resolved,
        };
      }

      return {
        ok: status >= 200 && status < 300,
        status: status || 0,
        location,
        redirect: false,
        finalUrl: targetUrl,
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        error: error.message,
        redirect: false,
        finalUrl: targetUrl,
      };
    }
  })();

  checkedTargets.set(key, resultPromise);
  return resultPromise;
}

function extractLinks(html, pageUrl) {
  const links = new Set();
  const hrefRegex = /<a\b[^>]*\shref=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1].trim();
    if (!href || SKIP_SCHEMES.test(href)) continue;

    try {
      const resolved = new URL(href, pageUrl).href;
      if (SKIP_PATHS.some((skip) => resolved.includes(skip))) continue;
      links.add(resolved);
    } catch {
      // Ignore malformed URLs.
    }
  }

  return [...links];
}

function isInternal(url) {
  try {
    const parsed = new URL(url);
    const base = new URL(BASE_URL);
    return parsed.hostname === base.hostname;
  } catch {
    return false;
  }
}

function isLocalhost(url) {
  return /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(url);
}

function isWrongDomain(url) {
  if (!isInternal(url) && !specialistUrls.includes(url)) {
    try {
      const host = new URL(url).hostname.toLowerCase();
      if (host.includes("caribbean-shore-excursions") && host !== DEFAULT_DOMAIN) {
        return true;
      }
      if (host.endsWith(".pages.dev") || host.endsWith(".workers.dev")) {
        return true;
      }
      if (host === "localhost" || host === "127.0.0.1") return true;
    } catch {
      return false;
    }
  }

  if (isInternal(url)) {
    try {
      const host = new URL(url).hostname.toLowerCase();
      if (host !== DEFAULT_DOMAIN && !host.endsWith(`.${DEFAULT_DOMAIN}`)) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

async function mapPool(items, mapper, concurrency) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await mapper(items[current], current);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function loadSitemapUrls() {
  let xml;

  if (process.env.SITEMAP_FILE) {
    if (!fs.existsSync(SITEMAP_FILE)) {
      throw new Error(
        `Sitemap file not found at ${SITEMAP_FILE}. Run "npm run build" first or set SITEMAP_URL.`,
      );
    }
    xml = fs.readFileSync(SITEMAP_FILE, "utf8");
    console.log(`Using local sitemap: ${SITEMAP_FILE}`);
  } else if (fs.existsSync(SITEMAP_FILE) && process.env.USE_LOCAL_SITEMAP === "1") {
    xml = fs.readFileSync(SITEMAP_FILE, "utf8");
    console.log(`Using local sitemap: ${SITEMAP_FILE}`);
  } else {
    console.log(`Fetching sitemap: ${SITEMAP_URL}`);
    const response = await fetchWithTimeout(SITEMAP_URL, { method: "GET", redirect: "follow" });
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap (${response.status}): ${SITEMAP_URL}`);
    }
    xml = await response.text();
  }

  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) {
    throw new Error("No URLs found in sitemap.");
  }

  return urls;
}

function recordIssue(bucket, entry) {
  issues[bucket].push(entry);
}

function printSection(title, entries, formatter) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));

  if (entries.length === 0) {
    console.log("None");
    return;
  }

  entries.forEach((entry, index) => {
    console.log(formatter(entry, index));
    console.log("");
  });
}

async function verifyLink({ source, link, type }) {
  if (isLocalhost(link)) {
    recordIssue("localhostLinks", {
      source,
      link,
      status: "localhost",
      fix: suggestFix(source, link, 0, null, "localhost"),
      type,
    });
    return;
  }

  if (isWrongDomain(link)) {
    recordIssue("wrongDomainLinks", {
      source,
      link,
      status: "wrong-domain",
      fix: suggestFix(source, link, 0, null, "wrong-domain"),
      type,
    });
  }

  const result = await checkUrl(link, { source, type });

  if (result.redirect) {
    recordIssue("redirects", {
      source,
      link,
      status: result.status,
      location: result.location,
      fix: suggestFix(source, link, result.status, result.location, type),
      type,
    });

    const finalCheck = await checkUrl(result.location, { source, type });
    if (!finalCheck.ok) {
      const bucket = type === "external" ? "brokenExternal" : "brokenInternal";
      recordIssue(bucket, {
        source,
        link,
        status: finalCheck.status,
        location: result.location,
        fix: suggestFix(source, link, finalCheck.status, result.location, type),
        type,
      });
    }
    return;
  }

  if (!result.ok) {
    const bucket = type === "external" ? "brokenExternal" : "brokenInternal";
    recordIssue(bucket, {
      source,
      link,
      status: result.status,
      error: result.error,
      fix: suggestFix(source, link, result.status, result.location, type),
      type,
    });
  }
}

async function crawlPage(pageUrl) {
  const pageCheck = await checkUrl(pageUrl, { source: "sitemap", type: "sitemap" });

  if (pageCheck.redirect) {
    recordIssue("sitemapFailures", {
      source: "sitemap.xml",
      link: pageUrl,
      status: pageCheck.status,
      location: pageCheck.location,
      fix: suggestFix("sitemap.xml", pageUrl, pageCheck.status, pageCheck.location, "sitemap"),
      type: "sitemap",
    });
    return { pageUrl, html: null, ok: false };
  }

  if (!pageCheck.ok) {
    recordIssue("sitemapFailures", {
      source: "sitemap.xml",
      link: pageUrl,
      status: pageCheck.status,
      error: pageCheck.error,
      fix: suggestFix("sitemap.xml", pageUrl, pageCheck.status, null, "sitemap"),
      type: "sitemap",
    });
    recordIssue("missingPages", {
      source: "sitemap.xml",
      link: pageUrl,
      status: pageCheck.status,
      fix: "Sitemap lists a URL that does not return 200.",
      type: "sitemap",
    });
    return { pageUrl, html: null, ok: false };
  }

  const response = await fetchWithTimeout(pageUrl, { method: "GET", redirect: "follow" });
  const html = await response.text();
  return { pageUrl, html, ok: true };
}

async function main() {
  console.log("Caribbean Shore Excursions — Link Checker");
  console.log("=========================================");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Specialist sites to verify: ${specialistUrls.length}`);

  const sitemapUrls = await loadSitemapUrls();
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);

  const crawled = await mapPool(
    sitemapUrls,
    async (pageUrl) => {
      process.stdout.write(".");
      return crawlPage(pageUrl);
    },
    CONCURRENCY,
  );
  console.log("\nFinished crawling sitemap pages.");

  const pageLinks = new Map();

  for (const { pageUrl, html, ok } of crawled) {
    if (!ok || !html) continue;
    const links = extractLinks(html, pageUrl);
    pageLinks.set(pageUrl, links);
  }

  const internalTargets = new Set();
  const externalTargets = new Set();

  for (const [source, links] of pageLinks.entries()) {
    for (const link of links) {
      if (isInternal(link)) internalTargets.add(link);
      else externalTargets.add(link);
    }
  }

  for (const specialist of specialistUrls) {
    externalTargets.add(specialist);
  }

  const verificationJobs = [];

  for (const [source, links] of pageLinks.entries()) {
    for (const link of links) {
      verificationJobs.push({
        source,
        link,
        type: isInternal(link) ? "internal" : "external",
      });
    }
  }

  for (const specialist of specialistUrls) {
    verificationJobs.push({
      source: "data/ports.ts or data/additional-ports.ts (specialistUrl)",
      link: specialist,
      type: "external",
    });
  }

  const uniqueJobs = [];
  const seen = new Set();
  for (const job of verificationJobs) {
    const key = `${job.source}|${job.link}`;
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueJobs.push(job);
  }

  console.log(`Checking ${uniqueJobs.length} unique links...`);

  await mapPool(
    uniqueJobs,
    async (job) => {
      process.stdout.write(".");
      await verifyLink(job);
    },
    CONCURRENCY,
  );

  console.log("\n\nLINK CHECK REPORT");
  console.log("=================");

  const totalIssues =
    issues.sitemapFailures.length +
    issues.brokenInternal.length +
    issues.brokenExternal.length +
    issues.localhostLinks.length +
    issues.wrongDomainLinks.length;

  console.log(`Pages in sitemap: ${sitemapUrls.length}`);
  console.log(`Pages crawled successfully: ${crawled.filter((p) => p.ok).length}`);
  console.log(`Unique links checked: ${uniqueJobs.length}`);
  console.log(`Issues found: ${totalIssues}`);

  printSection("SITEMAP FAILURES", issues.sitemapFailures, (entry) =>
    [
      `Source: ${entry.source}`,
      `URL: ${entry.link}`,
      `Status: ${entry.status}${entry.error ? ` (${entry.error})` : ""}`,
      entry.location ? `Redirect: ${entry.location}` : null,
      entry.fix ? `Fix: ${entry.fix}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  printSection("BROKEN INTERNAL LINKS", issues.brokenInternal, (entry) =>
    [
      `Source: ${entry.source}`,
      `Link: ${entry.link}`,
      `Status: ${entry.status}${entry.error ? ` (${entry.error})` : ""}`,
      entry.fix ? `Fix: ${entry.fix}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  printSection("BROKEN EXTERNAL / SPECIALIST LINKS", issues.brokenExternal, (entry) =>
    [
      `Source: ${entry.source}`,
      `Link: ${entry.link}`,
      `Status: ${entry.status}${entry.error ? ` (${entry.error})` : ""}`,
      entry.fix ? `Fix: ${entry.fix}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  printSection("LOCALHOST LINKS", issues.localhostLinks, (entry) =>
    [
      `Source: ${entry.source}`,
      `Link: ${entry.link}`,
      `Status: ${entry.status}`,
      entry.fix ? `Fix: ${entry.fix}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  printSection("WRONG OR STAGING DOMAIN LINKS", issues.wrongDomainLinks, (entry) =>
    [
      `Source: ${entry.source}`,
      `Link: ${entry.link}`,
      `Status: ${entry.status}`,
      entry.fix ? `Fix: ${entry.fix}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  printSection("REDIRECTS (review)", issues.redirects, (entry) =>
    [
      `Source: ${entry.source}`,
      `Link: ${entry.link}`,
      `Status: ${entry.status}`,
      `Redirect: ${entry.location}`,
      entry.fix ? `Fix: ${entry.fix}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  if (totalIssues > 0) {
    console.log("\nResult: FAIL — broken or suspicious links found.");
    process.exit(1);
  }

  console.log("\nResult: PASS — no broken links detected.");
  if (issues.redirects.length > 0) {
    console.log(`Note: ${issues.redirects.length} redirect(s) listed above for review.`);
  }
}

main().catch((error) => {
  console.error(`\nLink checker failed: ${error.message}`);
  process.exit(1);
});
