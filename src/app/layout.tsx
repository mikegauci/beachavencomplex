import type { Metadata, Viewport } from "next";
import Header from "@/components/header";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.beachavencomplex.com"),
  title: {
    default: "Beachaven | Overlooking the blue waters of St. Paul's Bay",
    template: "%s | Beachaven",
  },
  description:
    "Beachaven was established in 1977 and has been running ever since. Indian and Mediterranean restaurants, night club and lido overlooking Xemxija Bay, Malta.",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
