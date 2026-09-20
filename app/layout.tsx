import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";
import OfflineStatus from "./OfflineStatus";
import GlobalSearchTrigger from "./GlobalSearchTrigger";

const productionUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: { default: "Dravyaguna World", template: "%s | Dravyaguna World" },
  description: "Plant-focused Dravyaguna learning and reference platform for BAMS students.",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(productionUrl),
};

const nav = [
  ["Plants", "/plants"],
  ["Saved", "/bookmarks"],
  ["Revision", "/revision"],
  ["Notes", "/notes"],
  ["History", "/history"],
  ["Learn", "/learn"],
  ["About", "/about"],
  ["Feedback", "/feedback"],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="nav-shell">
            <Link className="brand" href="/" aria-label="Dravyaguna World home">Dravyaguna World</Link>
            <GlobalSearchTrigger />
            <nav aria-label="Primary navigation">
              {nav.map(([label, href]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <ServiceWorkerRegistration />
        <OfflineStatus />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="nav-shell">
            <strong>Dravyaguna World</strong>
            <span>Plant-only learning & reference for Dravyaguna.</span>
            <span>Content is labeled by verification status and source provenance.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
