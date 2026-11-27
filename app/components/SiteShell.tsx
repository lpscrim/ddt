'use client';

import { usePathname } from "next/navigation";

import { Footer } from "./Sections/Footer";
import { Header } from "./Sections/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Header />
      {children}
      {!isHome && <Footer />}
    </>
  );
}
