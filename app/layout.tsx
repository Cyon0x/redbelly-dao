import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Redbelly DAO — Governance for a compliant RWA Layer 1",
    template: "%s · Redbelly DAO",
  },
  description:
    "The governance, developer, and institutional hub for Redbelly Network. Vote on proposals, track the treasury, claim contributor tasks, and build on a compliant Layer 1 for real-world asset tokenisation.",
  keywords: [
    "Redbelly",
    "Redbelly DAO",
    "RBNT",
    "RWA tokenisation",
    "blockchain governance",
    "Layer 1",
    "DeFi",
  ],
  authors: [{ name: "Redbelly Community" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Redbelly DAO — Governance for a compliant RWA Layer 1",
    description:
      "Vote on proposals, track the treasury, claim tasks, and build on Redbelly Network.",
    siteName: "Redbelly DAO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redbelly DAO",
    description:
      "Governance, developer, and institutional hub for Redbelly Network.",
    creator: "@RedbellyDAO",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14202b" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Redbelly DAO",
  url: siteUrl,
  description:
    "Community-led governance for Redbelly Network, a compliant Layer 1 for real-world asset tokenisation.",
  sameAs: [
    "https://x.com/RedbellyDAO",
    "https://x.com/RedbellyNetwork",
    "https://discord.gg/redbelly",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CommandMenu />
        </Providers>
      </body>
    </html>
  );
}
