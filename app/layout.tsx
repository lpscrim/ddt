import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { Header } from "./components/Sections/Header";
import { Footer } from "./components/Sections/Footer";


function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "https://daydreamteam.co.uk";
}

const siteUrl = new URL(getSiteUrl()).origin;


const seoKeywords = [
  "photography",
  "fine art photography",
  "visual art",
  "portfolio",
  "infrared photography",
  "landscape photography",
  "black and white photography",
  "travel photography",
  "architecture photography",
  "Lewis Scrimgeour",
  "DayDreamTeam",
];



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DayDreamTeam",
    template: "%s | DayDreamTeam",
  },
  description:
    "Portfolio website of Lewis Scrimgeour, showcasing photography and visual art projects.",
  alternates: {
    canonical: "/",
  },
  keywords: seoKeywords,
  category: "Photography",
  authors: [{ name: "Lewis Scrimgeour" }],
  creator: "Lewis Scrimgeour",
  publisher: "DayDreamTeam",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DayDreamTeam",
    title: "DayDreamTeam",
    description:
      "Portfolio website of Lewis Scrimgeour, showcasing photography and visual art projects.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "DayDreamTeam",
    description:
      "Portfolio website of Lewis Scrimgeour, showcasing photography and visual art projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className="antialiased bg-background text-foreground"
      >
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
