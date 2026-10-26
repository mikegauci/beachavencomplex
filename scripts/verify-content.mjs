import { readFileSync, existsSync } from "node:fs";
import { load } from "cheerio";
const source = JSON.parse(
  readFileSync(new URL("../src/lib/content.json", import.meta.url), "utf8"),
);
const base = process.env.SITE_URL || "http://localhost:3000";
const compact = (s) => s.replace(/\s+/g, "").normalize("NFC");
let count = 0;
const errors = [];
const assets = new Set();
for (const [slug, page] of Object.entries(source)) {
  const path = slug === "home" ? "/" : `/${slug}/`;
  const response = await fetch(base + path);
  if (!response.ok) {
    errors.push(`${path}: HTTP ${response.status}`);
    continue;
  }
  const $ = load(await response.text());
  $("script,style").remove();
  const body = compact($("main").text());
  // The homepage Menu card and its announcement were explicitly removed.
  const paragraphs = page.paragraphs.filter(
    (_, index) => slug !== "home" || index !== 2,
  );
  const headings = page.headings.filter(
    (heading) => slug !== "home" || heading !== "Menu",
  );
  for (const { text } of paragraphs) {
    count++;
    if (!body.includes(compact(text)))
      errors.push(`${path}: missing or changed copy: ${text.slice(0, 110)}`);
  }
  const headingText = compact($("main").text()).toLowerCase();
  for (const heading of headings) {
    count++;
    if (!headingText.includes(compact(heading).toLowerCase()))
      errors.push(`${path}: missing heading: ${heading}`);
  }
  if ($("main h1").length !== 1)
    errors.push(`${path}: expected exactly one H1`);
  const canonical = $("link[rel=canonical]").attr("href");
  if (canonical !== `https://www.beachavencomplex.com${path}`)
    errors.push(`${path}: canonical mismatch: ${canonical}`);
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (href.includes("/cdn-cgi/"))
      errors.push(`${path}: broken protected email URL`);
    if (href.startsWith("/") && !href.startsWith("//"))
      assets.add(href.split("#")[0]);
  });
  $("img").each((_, img) => {
    const src = $(img).attr("src");
    if (!$(img).attr("alt")) errors.push(`${path}: image missing alt`);
    if (src?.startsWith("/images/")) assets.add(src);
  });
  if (!compact($("footer").text()).includes("info@beachavencomplex.com"))
    errors.push(`${path}: missing contact email`);
  console.log(
    `Verified ${path} (${paragraphs.length} retained original text blocks)`,
  );
}
for (const path of assets) {
  if (!path) continue;
  if (path.startsWith("/images/") || path.startsWith("/menus/")) {
    if (!existsSync(new URL(`../public${path}`, import.meta.url)))
      errors.push(`Missing local asset ${path}`);
  } else {
    const r = await fetch(base + path);
    if (!r.ok) errors.push(`Broken local link ${path}: ${r.status}`);
  }
}
const menu = await fetch(base + "/menus/StarOfIndia_Food.pdf");
if (!menu.ok || !menu.headers.get("content-type")?.includes("pdf"))
  errors.push("Menu PDF is not served correctly");
const missing = await fetch(base + "/page-that-does-not-exist/");
if (missing.status !== 404) errors.push("Unknown pages must return 404");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Passed: ${count} original copy and heading checks, ${assets.size} internal destinations, menu PDF, and 404 behavior.`,
);
