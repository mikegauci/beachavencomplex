import type { Metadata } from "next";
import { Anchor, ArrowUpRight, CalendarDays, Info } from "lucide-react";
import Link from "next/link";
import { Hero, Photo, Text, TextLink } from "@/components/ui";
import Footer from "@/components/footer";
import { pages } from "@/lib/site";
import { getPageMetadata, getPageStructuredData } from "@/lib/seo";
import StructuredData from "@/components/structured-data";
export const metadata: Metadata = getPageMetadata("home");
const home = pages.home;
export default function Home() {
  return (
    <>
      <StructuredData data={getPageStructuredData("home")} />
      <main id="main">
        <Hero
          home
          video="/videos/beachaven-promo-video.mp4"
          image="/images/IMG_1480-edit.jpg"
          eyebrow="Xemxija Bay, Malta · Since 1977"
          title={
            <>
              Welcome to
              <br />
              <em>Beachaven</em>
            </>
          }
        />
        <section id="discover" className="intro section container">
          <div className="section-label">
            <span className="small-line" />
            By the water, since 1977
          </div>
          <div className="intro-grid">
            <h2>
              A family run business where customers are made to feel{" "}
              <em>welcome.</em>
            </h2>
            <div>
              <Text html={home.paragraphs[0].html} />
              <TextLink href="/about-us/">READ MORE</TextLink>
            </div>
          </div>
        </section>
        <section
          className="quick-links container"
          aria-label="Explore Beachaven"
        >
          {[
            { title: "About", icon: Info, href: "/about-us/", p: 1 },
            { title: "Book", icon: CalendarDays, href: "/reservations/", p: 3 },
            { title: "Contact", icon: Anchor, href: "/contact-us/", p: 4 },
          ].map(({ title, icon: Icon, href, p }) => (
            <div className="quick-link" key={title}>
              <Icon size={22} strokeWidth={1.25} />
              <Link href={href} className="quick-title">
                {title}
                <ArrowUpRight size={20} />
              </Link>
              <Text html={home.paragraphs[p].html} />
            </div>
          ))}
        </section>
        <section className="experiences section container">
          <div className="section-label">
            <span className="small-line" />
            Beachaven
          </div>
          <div className="experience-heading">
            <h2>
              Lido. Dining. <em>Club.</em>
            </h2>
            <span>Xemxija Bay, Malta</span>
          </div>
          <div className="experience-grid">
            <Link href="/lido/" className="experience-card">
              <Photo
                src={home.images[1]}
                alt="Sunbeds on the Beachaven lido beside Xemxija Bay"
              />
              <div>
                <span>01 / By the sea</span>
                <h3>Beachaven Lido</h3>
                <ArrowUpRight />
              </div>
            </Link>
            <Link href="/star-of-india/" className="experience-card">
              <Photo
                src="/images/star-of-india-hero.jpg"
                alt="Star of India restaurant terrace"
              />
              <div>
                <span>02 / At the table</span>
                <h3>Star of India</h3>
                <ArrowUpRight />
              </div>
            </Link>
            <Link href="/club/" className="experience-card">
              <Photo
                src="/images/beachaven-club-img-1.jpg"
                alt="Beachaven nightclub"
              />
              <div>
                <span>03 / After hours</span>
                <h3>Beachaven Club</h3>
                <ArrowUpRight />
              </div>
            </Link>
          </div>
        </section>
        <section className="feature-wrap">
          <div className="feature container">
            <Photo
              src={home.images[2]}
              alt="Visitors arriving by boat at Beachaven"
            />
            <div className="feature-copy">
              <span className="eyebrow">Beachaven</span>
              <h2>Lido</h2>
              <Text html={home.paragraphs[6].html} />
              <TextLink href="/lido/">READ MORE</TextLink>
            </div>
          </div>
        </section>
        <section className="feature feature-reverse container section">
          <Photo
            src="/images/star-of-india-img-1.jpg"
            alt="Indian food served at Star of India"
          />
          <div className="feature-copy">
            <span className="eyebrow">Star of India</span>
            <h2>
              Discover all our perfect dishes, <em>crafted with love.</em>
            </h2>
            <Text html={home.paragraphs[7].html} />
            <TextLink href="/star-of-india/">Discover more</TextLink>
          </div>
        </section>
        <section className="club-band">
          <Photo src={home.images[0]} alt="A night at Beachaven Club" />
          <div className="container">
            <span className="eyebrow">Beachaven</span>
            <h2>Club</h2>
            <Text html={home.paragraphs[5].html} />
            <TextLink href="/club/">Discover more</TextLink>
          </div>
        </section>
        <section className="stats container">
          {[
            ["350+", "EVENTS HOSTED"],
            ["900+", "VESSELS VISITED"],
            ["40", "YEARS OF SERVICE"],
          ].map(([n, l]) => (
            <div key={l}>
              <span>{n}</span>
              <p>{l}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
