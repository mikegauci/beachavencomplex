import Image from "next/image";
import HeroVideo from "./hero-video";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { whatsapp } from "@/lib/site";
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={priority ? "100vw" : "(max-width: 760px) 100vw, 60vw"}
        preload={priority}
        className="photo-image"
      />
    </div>
  );
}
export function Text({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
export function Button({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <Link
      href={href}
      className={`button ${light ? "button-light" : ""}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Hero({
  title,
  image,
  eyebrow,
  subtitle,
  home = false,
  video,
}: {
  title: React.ReactNode;
  image: string;
  eyebrow: string;
  subtitle?: string;
  home?: boolean;
  video?: string;
}) {
  return (
    <section
      className={`hero ${home ? "hero-home" : ""}`}
      aria-label={home ? "Welcome to Beachaven" : undefined}
    >
      <Photo
        src={image}
        alt="Beachaven overlooking Xemxija Bay, Malta"
        priority
      />
      {home && video && <HeroVideo src={video} poster={image} />}
      <div className="hero-shade" />
      <div className="hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
      <div className="hero-bottom">
        <span>{home ? "Lido · Dining · Club" : "Beachaven · Malta"}</span>
        <a href="#discover" aria-label="Discover more, scroll to page content">
          Discover more <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
export function BookingActions() {
  return (
    <div className="booking-actions">
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        <MessageCircle size={18} /> WhatsApp <ArrowUpRight size={16} />
      </a>
      <a href="tel:+35621573682" className="button button-outline">
        <Phone size={17} /> +356 21573682
      </a>
    </div>
  );
}
