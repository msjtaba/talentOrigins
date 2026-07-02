'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function ForEmployers() {
  const triggerFlow = () => {
    window.dispatchEvent(new CustomEvent('select-contact-flow', { detail: 'employer' }));
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="employers" className="py-24 bg-[#171821] overflow-hidden relative z-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
            For <span className="text-[#8fa3ff]">Employers</span>
          </h2>
          <p className="font-body text-lg text-text-muted leading-relaxed">
            Access a curated pipeline of professionals across construction, logistics, finance, and more. Our data-driven approach minimizes hiring risk and maximizes ROI by focusing on long-term retention.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-[#8fa3ff]">
              <CheckCircle className="w-5 h-5 text-[#8fa3ff]" />
              <span className="text-text-primary font-body">Targeted Headhunting</span>
            </li>
            <li className="flex items-center gap-3 text-[#8fa3ff]">
              <CheckCircle className="w-5 h-5 text-[#8fa3ff]" />
              <span className="text-text-primary font-body">Comprehensive Reference Verification</span>
            </li>
            <li className="flex items-center gap-3 text-[#8fa3ff]">
              <CheckCircle className="w-5 h-5 text-[#8fa3ff]" />
              <span className="text-text-primary font-body">Replacement Guarantees</span>
            </li>
          </ul>
          <button
            onClick={triggerFlow}
            className="inline-block bg-[#8fa3ff] text-[#0c123d] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all font-body cursor-pointer"
          >
            Hire Talent
          </button>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#8fa3ff]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="aspect-video relative rounded-xl border border-[#2a3580] bg-background-elevated/70 backdrop-blur-md overflow-hidden">
            <Image
              src="/employer-bg.png"
              alt="Talent Origins For Employers"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
