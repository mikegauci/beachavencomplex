import type { Metadata, Viewport } from "next";
import Header from "@/components/header";
import StructuredData from "@/components/structured-data";
import { getSiteStructuredData, pageSeo, siteUrl } from "@/lib/seo";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageSeo.home.title,
    template: "%s | Beachaven",
  },
  description: pageSeo.home.description,
  icons: { icon: "/images/bh-favicon.jpg" },
};
export const viewport: Viewport = { themeColor: "#173e3b" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <StructuredData data={getSiteStructuredData()} />
        <Header />
        {children}
      </body>
    </html>
  );
}
