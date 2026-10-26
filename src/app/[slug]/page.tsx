import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Anchor,
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Facebook,
  MapPin,
  Waves,
  Wifi,
} from "lucide-react";
import {
  Hero,
  Photo,
  Text,
  Button,
  TextLink,
  BookingActions,
} from "@/components/ui";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import { pages, facebook, instagram, menu, type PageSlug } from "@/lib/site";
const slugs = Object.keys(pages).filter((s) => s !== "home");
export const dynamicParams = false;
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slugs.includes(slug)) return {};
  const page = pages[slug as PageSlug];
  return {
    title: { absolute: page.title },
    description: page.paragraphs[0]?.text,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      title: page.title,
      images: [{ url: "/images/IMG_1480-edit.jpg" }],
    },
  };
}
const heroData: Record<
  string,
  { title: string; image: string; eyebrow: string; subtitle?: string }
> = {
  "about-us": {
    title: "About Us",
    image: "/images/IMG_1479-edit.jpg",
    eyebrow: "Beachaven · Since 1977",
  },
  lido: {
    title: "Lido",
    image: "/images/10373477_649447868483184_6833432410003239086_n.jpg",
    eyebrow: "Beachaven · By the water",
  },
  club: {
    title: "The Only Place to be",
    image: "/images/beachaven-club-img-1.jpg",
    eyebrow: "Beachaven Club",
    subtitle: "FULLY Equipped Night club",
  },
  "star-of-india": {
    title: "Star of India",
    image: "/images/star-of-india-hero.jpg",
    eyebrow: "Panoramic views of Xemxija Bay",
    subtitle: "Serving traditional Indian food",
  },
  events: {
    title: "Events",
    image: "/images/events-bg.jpg",
    eyebrow: "Beachaven Club",
  },
  reservations: {
    title: "Reservations",
    image: "/images/IMG_1480-edit.jpg",
    eyebrow: "Beachaven · Xemxija Bay",
  },
  "contact-us": {
    title: "Contact",
    image: "/images/contact-us-bg.jpg",
    eyebrow: "Beachaven · Malta",
  },
};
function About() {
  const p = pages["about-us"];
  return (
    <section id="discover" className="container section">
      <div className="story-grid">
        <div>
          <div className="section-label">
            <span className="small-line" />
            About Us
          </div>
          <h2>
            Where it
            <br />
            all <em>started</em>
          </h2>
        </div>
        <div className="prose">
          {p.paragraphs.map((t, i) => (
            <Text key={i} html={t.html} />
          ))}
        </div>
      </div>
      <div className="history-gallery">
        <Gallery images={p.images} label="Beachaven through the years" />
      </div>
    </section>
  );
}
function Lido() {
  const p = pages.lido;
  return (
    <>
      <section id="discover" className="container section feature">
        <Photo
          src="/images/11393107_859303867497582_9157451029021765565_n.jpg"
          alt="Boats moored beside Beachaven Lido"
        />
        <div className="feature-copy">
          <span className="eyebrow">BEACHAVEN</span>
          <h2>Lido</h2>
          <Text html={p.paragraphs[0].html} />
          <Text html={p.paragraphs[1].html} className="statement" />
          <Button href="/reservations/">Reservations</Button>
        </div>
      </section>
      <section className="lido-details">
        <div className="container lido-detail-grid">
          {[
            { icon: Clock3, items: [2] },
            { icon: Waves, items: [3, 4] },
            { icon: Wifi, items: [5] },
          ].map(({ icon: Icon, items }, i) => (
            <div key={i}>
              <Icon size={28} strokeWidth={1} />
              {items.map((n) => (
                <Text key={n} html={p.paragraphs[n].html} />
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="container section">
        <Gallery
          images={[
            "/images/10373477_649447868483184_6833432410003239086_n.jpg",
            "/images/11393107_859303867497582_9157451029021765565_n.jpg",
            "/images/13255955_10153807279943732_5070404991918894784_n.jpg",
          ]}
          label="Beachaven Lido"
        />
      </section>
    </>
  );
}
function Club() {
  const p = pages.club;
  return (
    <>
      <section id="discover" className="container section story-grid">
        <div>
          <span className="eyebrow">BEACHAVEN</span>
          <h2>Club</h2>
          <img
            className="club-mark"
            src="/images/beachaevn-disco-logo-white-1.png"
            width="140"
            height="140"
            alt="Beachaven Disco"
          />
        </div>
        <div className="prose">
          {p.paragraphs.map((t, i) => (
            <Text key={i} html={t.html} />
          ))}
        </div>
      </section>
      <section className="container gallery-section">
        <video
          className="club-video"
          controls
          playsInline
          preload="none"
          poster="/images/Screen-Shot-2017-04-07-at-20.02.05.png"
          aria-label="Beachaven Club promotional video"
        >
          <source src="/videos/beachaven-club-video.mp4" type="video/mp4" />
        </video>
        <Gallery images={p.images.slice(1)} label="Beachaven Club" />
      </section>
      <section className="events-callout">
        <div className="container">
          <span className="eyebrow">EVENTS</span>
          <h2>
            Check out our events
            <br />
            at the club <em>right here!</em>
          </h2>
          <Button href="/events/" light>
            Discover more
          </Button>
        </div>
      </section>
    </>
  );
}
function India() {
  const p = pages["star-of-india"];
  return (
    <>
      <section id="discover" className="container section india-intro">
        <div className="section-label">
          <span className="small-line" />
          Star of India
        </div>
        <h2>
          Welcome to <em>Star of India</em>
        </h2>
        <div className="prose">
          <Text html={p.paragraphs[0].html} />
        </div>
      </section>
      <section id="menu" className="feature-wrap india-menu">
        <div className="container feature">
          <Photo
            src="/images/star-of-india-img-4.jpg"
            alt="Indian cuisine at Star of India"
          />
          <div className="feature-copy">
            <span className="eyebrow">Star of India</span>
            <h2>Menu</h2>
            <Text html={p.paragraphs[1].html} />
            <Button href={menu}>Download Menu</Button>
          </div>
        </div>
      </section>
      <section className="container section">
        <Gallery images={p.images.slice(3)} label="Star of India restaurant" />
      </section>
      <section className="reservation-callout container">
        <span className="eyebrow">Star of India</span>
        <h2>MAKE ONLINE RESERVATION</h2>
        <Text html={p.paragraphs[2].html} />
        <BookingActions />
      </section>
    </>
  );
}
function Reservations() {
  const p = pages.reservations;
  return (
    <section id="discover" className="container section reservation-grid">
      <div className="reservation-visual">
        <Photo
          src="/images/IMG_1479-edit.jpg"
          alt="Tables overlooking the water at Beachaven"
        />
        <div>
          <Anchor size={29} strokeWidth={1} />
          <h2>
            Book a<br />
            <em>TABLE</em>
          </h2>
        </div>
      </div>
      <div className="reservation-copy">
        <span className="eyebrow">Reservations</span>
        <h2>Reserve by Phone</h2>
        <Text html={p.paragraphs[0].html} />
        <BookingActions />
        <div className="reservation-note">
          <Text html={p.paragraphs[1].html} />
        </div>
        <h3>Private Dining &amp; Events</h3>
        <Text html={p.paragraphs[2].html} />
        <TextLink href="/contact-us/">Contact Us</TextLink>
      </div>
    </section>
  );
}
function Contact() {
  const p = pages["contact-us"];
  return (
    <>
      <section id="discover" className="container section contact-grid">
        <div>
          <MapPin strokeWidth={1} size={29} />
          <h2>ADDRESS</h2>
          <Text html={p.paragraphs[0].html} />
        </div>
        <div>
          <Facebook strokeWidth={1} size={29} />
          <h2>FOLLOW US</h2>
          <Text html={p.paragraphs[1].html} />
          <div className="social-links">
            <a
              className="text-link"
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook <ArrowUpRight size={18} />
            </a>
            <a
              className="text-link"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div>
          <Anchor strokeWidth={1} size={29} />
          <h2>CONTACT DETAILS</h2>
          <Text html={p.paragraphs[2].html} />
          <BookingActions />
        </div>
      </section>
      <section className="contact-map container">
        <iframe
          src={p.map}
          title="Find Beachaven Complex in Xemxija, Malta"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
function Events() {
  const p = pages.events;
  const groups = [
    [0, 2],
    [2, 11],
    [11, 17],
    [17, 18],
    [18, 19],
    [19, 20],
  ];
  const titles = p.headings.filter((_, i) => [2, 4, 5, 6, 7, 8].includes(i));
  const links = p.links.filter((l) => l.text === "More info");
  return (
    <section id="discover" className="container section events-page">
      <div className="section-label">
        <span className="small-line" />
        Beachaven Club
      </div>
      <h2>
        Next <em>Event</em>
      </h2>
      <article className="featured-event">
        <Photo src={p.images[0]} alt={titles[0]} />
        <div>
          <span className="eyebrow">Beachaven Club</span>
          <h3>{titles[0]}</h3>
          {p.paragraphs
            .slice(...(groups[0] as [number, number]))
            .map((t, i) => (
              <Text key={i} html={t.html} />
            ))}
          <Button href={links[0].href}>More info</Button>
        </div>
      </article>
      <div className="archive-heading">
        <h2>
          Previous <em>Events</em>
        </h2>
        <span>Beachaven Club</span>
      </div>
      <div className="event-archive">
        {groups.slice(1).map(([start, end], i) => (
          <details key={titles[i + 1]} className="archive-event">
            <summary>
              <Photo src={p.images[i + 1]} alt={titles[i + 1]} />
              <div>
                <span className="eyebrow">Beachaven Club</span>
                <h3>{titles[i + 1]}</h3>
                <span className="event-more">
                  More info <ArrowDown size={15} />
                </span>
              </div>
            </summary>
            <div className="event-description">
              {p.paragraphs.slice(start, end).map((t, j) => (
                <Text key={j} html={t.html} />
              ))}
              <Button href={links[i + 1].href}>More info</Button>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  const h = heroData[slug];
  return (
    <>
      <main id="main" className={`page-${slug}`}>
        <Hero {...h} />
        {slug === "about-us" ? (
          <About />
        ) : slug === "lido" ? (
          <Lido />
        ) : slug === "club" ? (
          <Club />
        ) : slug === "star-of-india" ? (
          <India />
        ) : slug === "reservations" ? (
          <Reservations />
        ) : slug === "contact-us" ? (
          <Contact />
        ) : (
          <Events />
        )}
      </main>
      <Footer slug={slug as PageSlug} />
    </>
  );
}
