"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/site";
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const isStarOfIndia = path === "/star-of-india/" || path === "/star-of-india";
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <Link
        href="/"
        className={isStarOfIndia ? "brand brand-star-of-india" : "brand"}
        aria-label="Beachaven home"
        onClick={() => setOpen(false)}
      >
        {isStarOfIndia ? (
          <span
            className="star-of-india-logo"
            role="img"
            aria-label="Star of India"
          />
        ) : (
          <img
            src="/images/bh-logo-white-medium.png"
            width="130"
            height="70"
            alt="Beachaven"
          />
        )}
      </Link>
      <nav
        aria-label="Main navigation"
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
      >
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            aria-current={path === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/reservations/"
          className="button nav-book"
          onClick={() => setOpen(false)}
        >
          Reservations <ArrowUpRight size={16} />
        </Link>
      </nav>
      <button
        className="menu-toggle"
        ref={toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
