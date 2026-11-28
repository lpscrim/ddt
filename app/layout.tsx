import type { Metadata, Viewport } from "next";

import "./globals.css";

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
  "Daydreamteam",
];



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daydreamteam",
    template: "%s | Daydreamteam",
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
  publisher: "Daydreamteam",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Daydreamteam",
    title: "Daydreamteam",
    description:
      "Portfolio website of Lewis Scrimgeour, showcasing photography and visual art projects.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daydreamteam",
    description:
      "Portfolio website of Lewis Scrimgeour, showcasing photography and visual art projects.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className="antialiased h-svh bg-background text-foreground w-full"
      >
        {children}
      </body>
    </html>
  );
}
