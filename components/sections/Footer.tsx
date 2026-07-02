'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-background-elevated border-t border-accent-muted/10 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <a
              href="#hero"
              onClick={handleScrollToTop}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-8 h-8 overflow-hidden">
                <Image
                  src="/talent-origins-logo.png"
                  alt="Talent Origins"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-base tracking-wide text-text-primary">
                TALENT ORIGINS
              </span>
            </a>
            <p className="font-body text-xs text-text-muted max-w-xs leading-relaxed">
              Staffing & Recruiting: Engineering the Future Workforce
            </p>
          </div>

          {/* Navigation links quick access */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#hero" onClick={handleScrollToTop} className="font-body text-xs text-text-muted hover:text-accent-light transition-colors">
              Home
            </a>
            <a href="#employers" onClick={(e) => { e.preventDefault(); document.querySelector('#employers')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-body text-xs text-text-muted hover:text-accent-light transition-colors">
              For Employers
            </a>
            <a href="#candidates" onClick={(e) => { e.preventDefault(); document.querySelector('#candidates')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-body text-xs text-text-muted hover:text-accent-light transition-colors">
              For Candidates
            </a>
            <a href="#industries" onClick={(e) => { e.preventDefault(); document.querySelector('#industries')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-body text-xs text-text-muted hover:text-accent-light transition-colors">
              Industries
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-body text-xs text-text-muted hover:text-accent-light transition-colors">
              Contact Us
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-accent-muted/20 hover:border-accent-primary bg-background-primary hover:bg-accent-primary/10 text-text-muted hover:text-accent-light transition-all duration-300 flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-accent-muted/20 hover:border-accent-primary bg-background-primary hover:bg-accent-primary/10 text-text-muted hover:text-accent-light transition-all duration-300 flex items-center justify-center"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-accent-muted/20 hover:border-accent-primary bg-background-primary hover:bg-accent-primary/10 text-text-muted hover:text-accent-light transition-all duration-300 flex items-center justify-center"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent-muted/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-body text-xs text-text-muted">
            &copy; 2026 Talent Origins. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="font-body text-[11px] text-text-muted hover:text-accent-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-[11px] text-text-muted hover:text-accent-light transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
