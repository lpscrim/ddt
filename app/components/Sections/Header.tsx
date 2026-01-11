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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isLight ? 'text-background' : 'text-foreground'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="hover:opacity-70 transition-opacity"
          >
            <span className="tracking-tight">DAYDREAMTEAM</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('work')} className="hover:opacity-70 transition-opacity">
              [WORK]
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:opacity-70 transition-opacity">
              [ABOUT]
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:opacity-70 transition-opacity">
              [CONTACT]
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <NavIcon color={isLight ? 'background' : 'foreground'} open={isMenuOpen} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-6 pb-2">
            <button onClick={() => scrollToSection('work')} className="text-left hover:opacity-70 transition-opacity">
              [WORK]
            </button>
            <button onClick={() => scrollToSection('about')} className="text-left hover:opacity-70 transition-opacity">
              [ABOUT]
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left hover:opacity-70 transition-opacity">
              [CONTACT]
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
