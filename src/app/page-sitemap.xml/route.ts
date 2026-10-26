import { getSitemapEntries } from "@/lib/seo";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );

export function GET() {
  const entries = getSitemapEntries()
    .map(
      (entry) =>
        `<url><loc>${escapeXml(entry.url)}</loc>${entry.images?.map((image) => `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`).join("") ?? ""}</url>`,
    )
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
