"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import NavIcon from "../UI/Nav/NavIcon";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const conditionalScrollTo = (hash: string) => {
    if (pathname === "/") {
      if (hash === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/" + hash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-999 px-6">
      <div className="relative mx-auto pt-2 pb-1 z-10">
        <div className="flex items-center justify-between">
          <button className="relative cursor-crosshair" onClick={() => { conditionalScrollTo(""); setIsMenuOpen(false); }}>
            <span className="tracking-wide title font-normal text-foreground left-0 top-0">
              DAYDREAMTEAM
            </span>
          </button>

          <nav className="hidden md:flex gap-8">
            <Link href="/work" className="relative title text-base cursor-crosshair text-foreground hover:text-muted-foreground transition-colors duration-300">
              WORK
            </Link>
            <button className="relative title text-base cursor-crosshair text-foreground hover:text-muted-foreground transition-colors duration-300" onClick={() => conditionalScrollTo("#about")}>
              ABOUT
            </button>
            <button className="relative title text-base cursor-crosshair text-foreground hover:text-muted-foreground transition-colors duration-300" onClick={() => conditionalScrollTo("#contact")}>
              CONTACT
            </button>
          </nav>

          <button
            className="md:hidden cursor-crosshair -mr-4.75 -mt-4 -mb-3.75"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <NavIcon color="foreground" open={isMenuOpen} hoverColor="foreground" />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 text-lg pt-4">
            <Link
              href="/work"
              onClick={() => setIsMenuOpen(false)}
              className="title pop-up opacity-0 text-left transition-colors text-foreground hover:text-muted-foreground"
            >
              WORK
            </Link>
            <button
              className="title pop-up-2 opacity-0 text-left transition-colors cursor-crosshair text-foreground hover:text-muted-foreground"
              onClick={() => { conditionalScrollTo("#about"); setIsMenuOpen(false); }}
            >
              ABOUT
            </button>
            <button
              className="title pop-up opacity-0 text-left transition-colors cursor-crosshair text-foreground hover:text-muted-foreground"
              onClick={() => { conditionalScrollTo("#contact"); setIsMenuOpen(false); }}
            >
              CONTACT
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
