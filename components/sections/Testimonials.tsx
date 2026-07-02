'use client';

import React from 'react';
import { Star } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'COO, Global Freight Solutions',
    text: 'Talent Origins transformed our logistics division. Their understanding of the supply chain sector is unparalleled.',
  },
  {
    name: 'David Carter',
    role: 'Senior Site Manager',
    text: 'As a candidate, I felt actually heard. They didn\'t just push a job on me; they aligned with my 5-year vision.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'HR Director, Nexus Retail',
    text: 'The vetting process is intense, but that\'s why the results are so consistent. Highly recommended.',
  },
  {
    name: 'James Thornton',
    role: 'Managing Partner, TF Partners',
    text: 'Precise, professional, and efficient. They saved us months of searching for our head of finance.',
  },
];

export default function Testimonials() {
  // Duplicate array for infinite scroll rail effect
  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 overflow-hidden relative z-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-text-primary">
          Trusted by Leaders &amp; <span className="text-[#80d8aa]">Talent</span>
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full flex overflow-x-hidden py-4">
        {/* Left & Right gradient shading overlay for premium fade look */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0f1412] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0f1412] to-transparent z-20 pointer-events-none" />

        {/* Scrolling Rail */}
        <div className="flex gap-6 w-max animate-infinite-scroll hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {doubledTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[350px] md:w-[400px] flex-shrink-0"
            >
              <BorderGlow
                edgeSensitivity={25}
                borderRadius={12}
                backgroundColor="#111814"
                className="p-8 border border-accent-muted/10 h-full flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="text-[#80d8aa] flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="font-body text-base text-text-muted italic leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#80d8aa]">
                    {item.name}
                  </h4>
                  <span className="font-body text-xs text-[#88938b] uppercase tracking-wider">
                    {item.role}
                  </span>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
