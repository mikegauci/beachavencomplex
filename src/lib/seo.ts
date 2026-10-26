import type { Metadata, MetadataRoute } from "next";
import { facebook, instagram, menu, type PageSlug } from "./site";

export const siteUrl = "https://www.beachavencomplex.com";
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

export const pageSeo: Record<
  PageSlug,
  {
    name: string;
    title: string;
    description: string;
    image: string;
  }
> = {
  home: {
    name: "Home",
    title: "Beachaven Malta | Lido, Dining & Club in Xemxija Bay",
    description:
      "Discover Beachaven in Xemxija Bay, Malta. Enjoy our seaside lido, Star of India restaurant, nightclub and berthing facilities. Family run since 1977.",
    image: "/images/IMG_1480-edit.jpg",
  },
  "about-us": {
    name: "About Us",
    title: "About Beachaven | Our History in Xemxija, Malta",
    description:
      "Originally opened as Fondatore in 1964 and renamed to Beachaven in 1974. It has been under the same management since 1977.",
    image: "/images/IMG_1479-edit.jpg",
  },
  events: {
    name: "Events",
    title: "Events & Private Parties | Beachaven Club, Malta",
    description:
      "Explore live jazz, music nights and past events at Beachaven Club in Xemxija, Malta. Contact us about private parties and venue hire.",
    image: "/images/events-bg.jpg",
  },
  reservations: {
    name: "Reservations",
    title: "Reservations | Book at Beachaven, Xemxija Bay",
    description:
      "Reserve tables, lounge areas and sunbeds at Beachaven in Malta. Message +356 99047464 on WhatsApp or call +356 21573682, including weekends.",
    image: "/images/IMG_1480-edit.jpg",
  },
  club: {
    name: "Club",
    title: "Beachaven Club | Nightclub & Private Events in Malta",
    description:
      "Club fully equipped with sound and light system. We host private events, staff parties, birthday parties with various food and beverage packages available.",
    image: "/images/beachaven-club-img-1.jpg",
  },
  "star-of-india": {
    name: "Star of India",
    title: "Star of India | Indian Restaurant in Xemxija, Malta",
    description:
      "The Star of India is an authentic Indian restaurant overlooking the panoramic views of Xemxija Bay, serving traditional Indian food.",
    image: "/images/star-of-india-img-1.jpg",
  },
  lido: {
    name: "Lido",
    title: "Beachaven Lido | Sunbeds & Seaside Dining in Malta",
    description:
      "Relax at Beachaven Lido in Xemxija Bay, Malta. Enjoy seaside dining, cocktails, sunbed hire and berthing facilities. No membership required.",
    image: "/images/10373477_649447868483184_6833432410003239086_n.jpg",
  },
  "contact-us": {
    name: "Contact Us",
    title: "Contact Beachaven | Xemxija, St Paul's Bay, Malta",
    description:
      "Find Beachaven on Telghet ix-Xemxija, San Pawl il-Baħar, Malta. Call +356 21573682, WhatsApp +356 99047464 or email info@beachavencomplex.com.",
    image: "/images/contact-us-bg.jpg",
  },
};

export const pagePath = (slug: PageSlug) =>
  slug === "home" ? "/" : `/${slug}/`;

export function getPageMetadata(slug: PageSlug): Metadata {
  const page = pageSeo[slug];
  const url = absoluteUrl(pagePath(slug));
  const image = { url: absoluteUrl(page.image), alt: page.title };
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "Beachaven",
      url,
      title: page.title,
      description: page.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  return (Object.keys(pageSeo) as PageSlug[]).map((slug) => ({
    url: absoluteUrl(pagePath(slug)),
    changeFrequency: "monthly",
    priority: slug === "home" ? 1 : 0.8,
    images: [absoluteUrl(pageSeo[slug].image)],
  }));
}

const address = {
  "@type": "PostalAddress",
  streetAddress: "Telghet ix-Xemxija",
  addressLocality: "San Pawl il-Baħar",
  addressCountry: "MT",
};
const businessId = absoluteUrl("/#beachaven");
const websiteId = absoluteUrl("/#website");

export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: "Beachaven",
        url: absoluteUrl("/"),
        description: pageSeo.home.description,
        image: absoluteUrl(pageSeo.home.image),
        logo: absoluteUrl("/images/bh-logo-white-medium.png"),
        telephone: "+35621573682",
        email: "info@beachavencomplex.com",
        address,
        sameAs: [facebook, instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Beachaven",
        url: absoluteUrl("/"),
        inLanguage: "en",
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function getPageStructuredData(slug: PageSlug) {
  const page = pageSeo[slug];
  const url = absoluteUrl(pagePath(slug));
  const business = { "@id": businessId };
  const entityId =
    slug === "star-of-india"
      ? `${url}#restaurant`
      : slug === "club"
        ? `${url}#nightclub`
        : slug === "lido"
          ? `${url}#lido`
          : businessId;
  const pageType =
    slug === "about-us"
      ? "AboutPage"
      : slug === "contact-us"
        ? "ContactPage"
        : slug === "events"
          ? "CollectionPage"
          : "WebPage";
  const graph: Record<string, unknown>[] = [
    {
      "@type": pageType,
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: business,
      mainEntity: { "@id": entityId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: absoluteUrl(page.image),
      },
      ...(slug !== "home"
        ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
        : {}),
    },
  ];

  if (slug !== "home")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        { "@type": "ListItem", position: 2, name: page.name, item: url },
      ],
    });

  if (["star-of-india", "club", "lido"].includes(slug))
    graph.push({
      "@type":
        slug === "star-of-india"
          ? "Restaurant"
          : slug === "club"
            ? "NightClub"
            : "Place",
      "@id": entityId,
      name:
        slug === "star-of-india" ? "Star of India" : `Beachaven ${page.name}`,
      url,
      description: page.description,
      image: absoluteUrl(page.image),
      telephone: "+35621573682",
      address,
      containedInPlace: business,
      ...(slug === "star-of-india"
        ? {
            servesCuisine: "Indian",
            hasMenu: absoluteUrl(menu),
            acceptsReservations: absoluteUrl("/reservations/"),
          }
        : {}),
    });
  // Historical listings have incomplete dates, so they are not marked as upcoming Events.
  return { "@context": "https://schema.org", "@graph": graph };
}
