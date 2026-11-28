"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-999 px-6">
      <div className="relative mx-auto pt-2 pb-2 z-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="relative cursor-crosshair"
            aria-label="Go to home"
          >
            <span className="tracking-widest title text-sm font-light text-foreground/70 left-0 top-0 hover:text-foreground transition-opacity">
              DAYDREAMTEAM
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
