# Beachaven Complex

A modern Mediterranean coastal redesign of [beachavencomplex.com](https://www.beachavencomplex.com), built with Next.js 16 App Router, React, and TypeScript.

## Development

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

Deploy with a standard Next.js host, such as Vercel, or a Node.js server. No environment variables, database, or booking backend are required. DNS and the existing live website have not been changed.

## Pages

The original paths are preserved: `/`, `/about-us/`, `/events/`, `/reservations/`, `/club/`, `/star-of-india/`, `/lido/`, and `/contact-us/`.

## Content and assets

Original content was captured on 26 October 2026. `src/lib/content.json` contains the original page copy and links. Paragraphs are rendered directly from that file; original spelling, dated event listings, menu announcements, and historical statistics are intentionally retained. The footer shows only the current year, as requested. Extra interface labels support navigation and media controls.

Original photography, three brand marks, both promotional videos, and the Star of India menu PDF are stored locally in `public/`. Fonts are self-hosted, with their licenses in `public/fonts/licenses/`. Google Maps and the original external Facebook and WhatsApp links remain in use. Reservations and contact use phone, email, and WhatsApp; there are no forms.

Historical photos and venue galleries open in keyboard-accessible dialogs. The homepage video starts seven seconds into the original footage and fades in from black over 1.5 seconds. It plays silently in the hero, with a pause control and reduced-motion support. The club video is available inline with native playback controls on the Club page. Previous event descriptions expand from their headings.

Captured source pages are kept in `source-content/original-pages.tar.gz` for reference. To regenerate the content snapshot:

```bash
tar -xzf source-content/original-pages.tar.gz -C source-content
node scripts/extract-content.mjs
```

## Verification

With the development or production server running:

```bash
npm run typecheck
npm run verify:content
npm run verify:seo
```

The content verification checks every original paragraph and heading against the served pages, internal destinations, canonical URLs, menu download, email links, image alt text, and the 404 response. Set `SITE_URL` to check another local server.

## Search metadata and structured data

`src/lib/seo.ts` is the shared source for each page's title, description, canonical URL, social preview, sitemap entry, and structured data. Production URLs consistently use `https://www.beachavencomplex.com` with trailing slashes on page URLs.

- `/page-sitemap.xml` lists all eight canonical pages and their representative images.
- `/sitemap.xml` remains available with the same canonical entries.
- `/robots.txt` permits public crawling and advertises `/page-sitemap.xml`.
- Every page includes unique server-rendered metadata, Open Graph and Twitter preview fields, and a JSON-LD page graph.
- Shared structured data describes Beachaven as a LocalBusiness and its WebSite. Inner pages include breadcrumbs; Star of India adds Restaurant data and the menu URL, Club adds NightClub data, and Lido adds Place data.

Business details come from the site content. Historical event listings are not represented as upcoming events. No ratings, prices, restaurant opening hours, or event dates are invented. Sitemap entries omit modification dates rather than claiming a new content update on every build.

`npm run verify:seo` checks the HTML served to crawlers, metadata uniqueness and consistency, JSON-LD references, canonical sitemap coverage, and robots.txt. Set `SITE_URL` to verify another running server.
