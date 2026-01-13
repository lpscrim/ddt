'use client';

import { useState, useEffect } from 'react';
import NavIcon from '../UI/Nav/NavIcon';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInverted(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const isLight = onHero && inverted;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed text-xl top-0 left-0 right-0 z-50 px-6 transition-colors duration-500 ${isLight ? 'text-background' : 'text-foreground'} ${onHero ? '' : 'backdrop-blur-[0px]'}`}>
      <div className={`mx-auto py-4`}>
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="hover:text-foreground transition-colors cursor-crosshair"
          >
            <span className="tracking-wide title font-bold">DAYDREAMTEAM</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('work')} className="title hover:text-foreground transition-colors cursor-crosshair">
              WORK
            </button>
            <button onClick={() => scrollToSection('about')} className="title hover:text-foreground transition-colors cursor-crosshair">
              ABOUT
            </button>
            <button onClick={() => scrollToSection('contact')} className="title hover:text-foreground transition-colors cursor-crosshair">
              CONTACT
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hover:text-foreground transition-colors cursor-crosshair -mr-4.75 "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <NavIcon color={isLight ? 'background' : 'foreground'} open={isMenuOpen} hoverColor='foreground' />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-6 pb-2 text-xl">
            <button onClick={() => scrollToSection('work')} className="title pop-up opacity-0 text-left hover:text-foreground transition-colors cursor-crosshair">
              WORK
            </button>
            <button onClick={() => scrollToSection('about')} className="title pop-up-2 opacity-0 text-left hover:text-foreground transition-colors cursor-crosshair">
              ABOUT
            </button>
            <button onClick={() => scrollToSection('contact')} className="title pop-up-3 opacity-0 text-left hover:text-foreground transition-colors cursor-crosshair">
              CONTACT
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
