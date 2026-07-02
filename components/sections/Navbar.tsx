'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Employers', href: '#employers' },
  { label: 'Candidates', href: '#candidates' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 bg-[#0d0d14]/80 backdrop-blur-md border-b border-[#3b3f54] transition-all duration-300 ${
          scrolled || isOpen ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex justify-between items-center h-12">
          {/* Logo area */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-8 h-8 overflow-hidden">
              <Image
                src="/talent-origins-logo.png"
                alt="Talent Origins"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display font-bold text-xl text-[#8fa3ff] tracking-tight">
              Talent Origins
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center font-body text-base">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-[#b0b0c5] hover:text-[#8fa3ff] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="bg-[#566ff0] text-[#a5b4fc] px-6 py-2 rounded-lg font-bold hover:opacity-80 transition-opacity"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#e2e2f0] hover:text-[#8fa3ff] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0d0d14]/98 backdrop-blur-lg flex flex-col justify-center items-center gap-8 transition-transform duration-500 md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="font-display text-2xl font-semibold text-[#e2e2f0] hover:text-[#8fa3ff] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="mt-4 px-8 py-3 bg-[#566ff0] text-[#a5b4fc] font-body font-semibold rounded-md transition-colors text-sm shadow-md"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
