import Link from "next/link";
import { ArrowUp, ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { pages, facebook, instagram, type PageSlug } from "@/lib/site";
export default function Footer({ slug = "home" }: { slug?: PageSlug }) {
  const data = pages[slug];
  const year = new Intl.DateTimeFormat("en", {
    year: "numeric",
    timeZone: "Europe/Malta",
  }).format(new Date());
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" aria-label="Beachaven home">
          <img
            className="footer-logo"
            src="/images/bh-logo-white-medium.png"
            width="150"
            height="81"
            alt="Beachaven"
          />
        </Link>
        <p>
          A family run business where
          <br />
          customers are made to feel welcome.
        </p>
      </div>
      <div className="footer-grid">
        <div>
          <h2>CONTACT US</h2>
          <a href="mailto:info@beachavencomplex.com">
            info@beachavencomplex.com
          </a>
          <p>
            <a href="tel:+35699047464">+356 99047464</a> /{" "}
            <a href="tel:+35621573682">+356 21573682</a>
          </p>
          <p>
            {slug === "star-of-india" ? "Star of India" : "Beachaven"}, Telghet
            ix-Xemxija, San Pawl il-Baħar
          </p>
        </div>
        <div className="footer-map">
          <h2>MAPS</h2>
          <iframe
            src={data.map || pages["about-us"].map}
            title="Beachaven Complex location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div>
          <h2>FOLLOW US</h2>
          <div className="social-links">
            <a
              className="social-link"
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={18} /> Facebook <ArrowUpRight size={15} />
            </a>
            <a
              className="social-link"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} /> Instagram <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="brand-family">
            <Link href="/star-of-india/" aria-label="Star of India restaurant">
              <img
                src="/images/star-of-india-logo-1-white.png"
                width="135"
                height="33"
                alt="Star of India"
              />
            </Link>
            <Link href="/club/" aria-label="Beachaven club">
              <img
                src="/images/beachaevn-disco-logo-white-1.png"
                width="65"
                height="65"
                alt="Beachaven Disco"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <span>Copyright {year} Beachaven. All rights reserved.</span>
        </div>
        <a href="#top">
          Top <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
