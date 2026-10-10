import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/custom-cursor";
import AmbientGlow from "@/components/ambient-glow";
import Navbar from "@/components/navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ── SEO & Share Metadata ────────────────────────────────────────────────────
// metadataBase falls back to localhost during dev so Next.js doesn't warn
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hokage — Cinematic Video Editor & Narrative Storyteller",
    template: "%s | Hokage Editorial",
  },
  description:
    "High-retention storytelling, cinematic gaming epics, and video editing for ambitious creators. 44,579+ views delivered across 50+ commissioned videos. Response within 24 hours.",
  keywords: [
    "Video Editor",
    "Minecraft Cinematic Editor",
    "YouTube Video Editor",
    "High Retention Editor",
    "Gaming Video Editor",
    "Narrative Storytelling",
    "Creative Director",
    "YouTube Shorts Editor",
    "Cinematic Editor for Hire",
  ],
  authors: [{ name: "Hokage", url: "https://hokage-editorial.com" }],
  creator: "Hokage",
  publisher: "Hokage Editorial Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: "https://hokage-editorial.com",
    title: "Hokage — Cinematic Video Editor & Narrative Storyteller",
    description:
      "Turning raw footage into stories that captivate. 44,579+ views delivered across 50+ commissioned cuts and YouTube Shorts.",
    siteName: "Hokage Editorial",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hokage Editorial — Cinematic Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hokage — Cinematic Video Editor",
    description: "High-retention cinematic edits and YouTube Shorts for ambitious creators.",
    images: ["/og-image.jpg"],
    creator: "@hokageeditorial",
  },
  alternates: {
    canonical: "https://hokage-editorial.com",
  },
};

// ── Viewport (separate export per Next.js 14 spec) ──────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0C",
};

// ── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="bg-base text-sand antialiased selection:bg-gold selection:text-base">
        {/* 35mm film noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Viewport film framing lines */}
        <div className="film-frame-border" aria-hidden="true" />

        {/* Atmospheric mouse glow */}
        <AmbientGlow />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Smooth scroll engine */}
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
