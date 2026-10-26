import content from "./content.json";
export const pages = content;
export type PageSlug = keyof typeof pages;
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about-us/", label: "About Us" },
  { href: "/lido/", label: "Lido" },
  { href: "/club/", label: "Club" },
  { href: "/star-of-india/", label: "Star of India" },
  { href: "/events/", label: "Events" },
  { href: "/contact-us/", label: "Contact Us" },
];
export const whatsapp = "https://wa.link/54redm";
export const facebook = "https://www.facebook.com/beachhavenmalta/";
export const instagram = "https://www.instagram.com/beachavenmalta/";
export const menu = "/menus/StarOfIndia_Food.pdf";
export const imagePath = (name: string) => "/images/" + name;
