import { load } from "cheerio";
import { readFileSync, writeFileSync } from "node:fs";
const slugs = [
  "home",
  "about-us",
  "events",
  "reservations",
  "club",
  "star-of-india",
  "lido",
  "contact-us",
];
const normalize = (s) => s.replace(/\s+/g, " ").trim();
const data = {};
for (const slug of slugs) {
  const $ = load(readFileSync(`source-content/${slug}.html`, "utf8"));
  $("[data-cfemail]").each((_, e) => {
    const h = $(e).attr("data-cfemail");
    const key = parseInt(h.slice(0, 2), 16);
    const email = h
      .slice(2)
      .match(/../g)
      .map((x) => String.fromCharCode(parseInt(x, 16) ^ key))
      .join("");
    ($(e).is("a") ? $(e) : $(e).closest("a"))
      .attr("href", "mailto:" + email)
      .text(email);
  });
  const root = slug === "home" ? $(".entry") : $(".slideContent");
  const cleanHTML = (e) => {
    const n = $(e).clone();
    n.find("*")
      .addBack()
      .each((_, el) => {
        for (const name of Object.keys(el.attribs || {})) {
          if (!["href", "target", "rel"].includes(name)) $(el).removeAttr(name);
        }
      });
    n.find("a").each((_, a) => {
      const href = $(a).attr("href") || "";
      if (
        href.startsWith("https://www.beachavencomplex.com/") &&
        !href.includes("wp-content")
      )
        $(a).attr(
          "href",
          href
            .replace("https://www.beachavencomplex.com", "")
            .replace("/index.php", ""),
        );
      if ($(a).attr("target") === "_blank")
        $(a).attr("rel", "noopener noreferrer");
    });
    return n.html()?.trim() || "";
  };
  const paragraphs = root
    .find(".wpb_text_column p")
    .filter((_, e) => !$(e).closest(".footer-widget,.bka_footer-custom").length)
    .map((_, e) => ({ text: normalize($(e).text()), html: cleanHTML(e) }))
    .get()
    .filter((e) => e.text);
  const headings = root
    .find("h1,h2,h3,h4")
    .filter((_, e) => !$(e).closest(".footer-widget").length)
    .map((_, e) => normalize($(e).text()))
    .get();
  const images = root
    .find("img")
    .map((_, e) => $(e).attr("src"))
    .get()
    .filter((u) => u.includes("/uploads/"))
    .map((u) => "/images/" + u.split("/").pop());
  const links = root
    .find("a[href]")
    .filter((_, e) => !$(e).closest(".footer-widget,.bka_footer-custom").length)
    .map((_, e) => ({ text: normalize($(e).text()), href: $(e).attr("href") }))
    .get();
  const footer = $(".footer-widget");
  data[slug] = {
    title: $("title").text(),
    headings,
    paragraphs,
    images: [...new Set(images)],
    links,
    footer: footer
      .find("p")
      .map((_, e) => normalize($(e).text()))
      .get(),
    map: footer.find("iframe").attr("src"),
    copyright: root.find(".bka_footer-custom p").text().trim(),
  };
}
writeFileSync("src/lib/content.json", JSON.stringify(data, null, 2) + "\n");
console.log(
  Object.fromEntries(
    Object.entries(data).map(([s, d]) => [
      s,
      {
        headings: d.headings,
        paragraphs: d.paragraphs.length,
        images: d.images.length,
      },
    ]),
  ),
);
