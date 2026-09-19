import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Dravyaguna World", template: "%s | Dravyaguna World" },
  description: "Plant-focused Dravyaguna learning and reference platform for BAMS students.",\n  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

const nav = [["Plants","/plants"],["Learn","/learn"],["About","/about"],["Feedback","/feedback"]] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="nav-shell"><Link className="brand" href="/">Dravyaguna World</Link><nav aria-label="Primary">{nav.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div></header><div id="main-content">{children}</div><footer className="site-footer"><div className="nav-shell"><strong>Dravyaguna World</strong><span>Plant-only learning & reference for Dravyaguna.</span><span>Content is labeled by verification status and source provenance.</span></div></footer></body></html>;
}