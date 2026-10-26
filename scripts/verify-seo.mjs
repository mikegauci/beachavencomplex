import assert from "node:assert/strict";
import { load } from "cheerio";

const base = process.env.SITE_URL || "http://localhost:3000";
const origin = "https://www.beachavencomplex.com";
const paths = [
  "/",
  "/about-us/",
  "/events/",
  "/reservations/",
  "/club/",
  "/star-of-india/",
  "/lido/",
  "/contact-us/",
];
const titles = new Set();
const descriptions = new Set();

for (const path of paths) {
  const response = await fetch(base + path, {
    headers: { "User-Agent": "Googlebot" },
  });
  assert.equal(response.status, 200, `${path} must be crawlable`);
  const $ = load(await response.text());
  assert.equal(
    $("head title").length,
    1,
    `${path} needs one server-rendered title`,
  );
  assert.equal(
    $('head meta[name="description"]').length,
    1,
    `${path} needs one server-rendered description`,
  );
  assert.equal(
    $('link[rel="canonical"]').length,
    1,
    `${path} needs one canonical`,
  );
  const title = $("head title").text();
  const description = $('head meta[name="description"]').attr("content");
  assert(
    title.length >= 20 && title.length <= 65,
    `${path} title length: ${title.length}`,
  );
  assert(
    description.length >= 70 && description.length <= 165,
    `${path} description length: ${description.length}`,
  );
  assert(!titles.has(title), `${path} has a duplicate title`);
  assert(!descriptions.has(description), `${path} has a duplicate description`);
  titles.add(title);
  descriptions.add(description);
  assert.equal($('link[rel="canonical"]').attr("href"), origin + path);
  for (const prefix of ["og", "twitter"]) {
    const attr = prefix === "og" ? "property" : "name";
    assert.equal($(`meta[${attr}="${prefix}:title"]`).attr("content"), title);
    assert.equal(
      $(`meta[${attr}="${prefix}:description"]`).attr("content"),
      description,
    );
    const image = $(`meta[${attr}="${prefix}:image"]`).attr("content");
    assert(
      image?.startsWith(origin + "/images/"),
      `${path} needs an absolute social image`,
    );
  }
  assert.equal($('meta[property="og:url"]').attr("content"), origin + path);
  assert.equal(
    $('meta[name="twitter:card"]').attr("content"),
    "summary_large_image",
  );
  assert(!($('meta[name="robots"]').attr("content") || "").includes("noindex"));

  const graph = $('script[type="application/ld+json"]')
    .toArray()
    .flatMap((element) => {
      const data = JSON.parse($(element).text());
      assert.equal(data["@context"], "https://schema.org");
      return data["@graph"];
    });
  const types = graph.map((node) => node["@type"]);
  assert(
    types.includes("LocalBusiness") && types.includes("WebSite"),
    `${path} missing business or website data`,
  );
  const business = graph.find((node) => node["@type"] === "LocalBusiness");
  assert.equal(business.address.addressCountry, "MT");
  assert.equal(business.telephone, "+35621573682");
  assert(business.sameAs.includes("https://www.instagram.com/beachavenmalta/"));
  const webpage = graph.find(
    (node) => node["@id"] === origin + path + "#webpage",
  );
  assert.equal(webpage.name, title);
  assert.equal(webpage.description, description);
  const ids = new Set(graph.map((node) => node["@id"]));
  function checkReferences(value) {
    if (!value || typeof value !== "object") return;
    if (Object.keys(value).length === 1 && value["@id"])
      assert(
        ids.has(value["@id"]),
        `Unresolved structured-data reference: ${value["@id"]}`,
      );
    Object.values(value).forEach(checkReferences);
  }
  graph.forEach(checkReferences);
  if (path !== "/") {
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    assert.deepEqual(
      breadcrumb.itemListElement.map((item) => item.position),
      [1, 2],
    );
    assert.equal(breadcrumb.itemListElement[1].item, origin + path);
  }
  if (path === "/star-of-india/") {
    const restaurant = graph.find((node) => node["@type"] === "Restaurant");
    assert.equal(restaurant.servesCuisine, "Indian");
    assert.equal(restaurant.hasMenu, origin + "/menus/StarOfIndia_Food.pdf");
  }
  if (path === "/club/") assert(types.includes("NightClub"));
  if (path === "/lido/") assert(types.includes("Place"));
  assert(
    !types.includes("Event"),
    "Historical events must not be marked as upcoming events",
  );
  assert(
    !graph.some((node) => node.aggregateRating),
    "Do not invent review scores",
  );
  console.log(
    `${path} — ${title.length}-character title; ${description.length}-character description; valid JSON-LD graph`,
  );
}

for (const path of ["/page-sitemap.xml", "/sitemap.xml"]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, `${path} must exist`);
  assert(
    /(?:application|text)\/xml/.test(response.headers.get("content-type")),
  );
  const xml = load(await response.text(), { xmlMode: true });
  assert.equal(
    xml("urlset").attr("xmlns"),
    "http://www.sitemaps.org/schemas/sitemap/0.9",
  );
  const urls = xml("url > loc")
    .toArray()
    .map((element) => xml(element).text());
  assert.deepEqual(
    urls.sort(),
    paths.map((path) => origin + path).sort(),
    `${path} must contain exactly the eight canonical pages`,
  );
  console.log(`${path} — eight canonical URLs`);
}
const robots = await fetch(base + "/robots.txt");
assert.equal(robots.status, 200);
const rules = await robots.text();
assert.match(rules, /User-Agent: \*/i);
assert.match(rules, /^Allow: \/$/m);
assert(rules.includes(`Sitemap: ${origin}/page-sitemap.xml`));
console.log(
  "Passed: metadata, social previews, canonical URLs, structured data, both XML sitemaps, and robots.txt.",
);
