import type { Metadata } from "next";

import "./globals.css";
import { Header } from "./components/Sections/Header";
import { Footer } from "./components/Sections/Footer";


export const metadata: Metadata = {
  title: "DayDreamTeam - Photography & Visual Art",
  description: "Portfolio website of Lewis Scrimgeour, showcasing photography and visual art projects.",
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
      </body>
    </html>
  );
}
