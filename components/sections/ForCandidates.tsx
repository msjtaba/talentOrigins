'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function ForCandidates() {
  const triggerFlow = () => {
    window.dispatchEvent(new CustomEvent('select-contact-flow', { detail: 'candidate' }));
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="candidates" className="py-24 overflow-hidden relative z-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 relative group">
          <div className="absolute -inset-4 bg-[#8fa3ff]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="aspect-video relative rounded-xl border border-[#2a3580] bg-background-elevated/70 backdrop-blur-md overflow-hidden">
            <Image
              src="/candidate-bg.png"
              alt="Talent Origins For Candidates"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-8">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
            For <span className="text-[#8fa3ff]">Candidates</span>
          </h2>
          <p className="font-body text-lg text-text-muted leading-relaxed">
            Don't just find a job—discover your next career milestone. We provide exclusive access to roles in industry-leading firms that aren't advertised on public job boards.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-[#8fa3ff]">
              <CheckCircle className="w-5 h-5 text-[#8fa3ff]" />
              <span className="text-text-primary font-body">Career Path Consultation</span>
            </li>
            <li className="flex items-center gap-3 text-[#8fa3ff]">
              <CheckCircle className="w-5 h-5 text-[#8fa3ff]" />
              <span className="text-text-primary font-body">Resume &amp; Interview Coaching</span>
            </li>
            <li className="flex items-center gap-3 text-[#8fa3ff]">
              <CheckCircle className="w-5 h-5 text-[#8fa3ff]" />
              <span className="text-text-primary font-body">Direct Access to Decision Makers</span>
            </li>
          </ul>
          <button
            onClick={triggerFlow}
            className="inline-block bg-[#8fa3ff] text-[#0c123d] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all font-body cursor-pointer"
          >
            Submit Resume
          </button>
        </div>
      </div>
    </section>
  );
}
