'use client';

import React, { useState, useEffect, useRef } from 'react';

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  startCount: boolean;
}

function StatItem({ target, suffix, label, startCount }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;
    let startTime: number | null = null;
    const duration = 1200; // 1.2 seconds duration as specified in PRD

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing curve (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, startCount]);

  return (
    <div className="space-y-2">
      <div className="text-[#80d8aa] font-display text-4xl font-bold">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="font-label-sm text-sm uppercase tracking-widest text-[#88938b]">
        {label}
      </div>
    </div>
  );
}

export default function TrustBar() {
  const [startCount, setStartCount] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const stats = [
    { target: 500, suffix: '+', label: 'Placements' },
    { target: 98, suffix: '%', label: 'Retention Rate' },
    { target: 15, suffix: '', label: 'Industries Served' },
    { target: 48, suffix: ' Hrs', label: 'Avg Shortlist Time' },
  ];

  return (
    <section ref={containerRef} className="py-12 bg-[#0a0f0d] border-y border-[#3f4942] relative overflow-hidden z-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <StatItem
            key={idx}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            startCount={startCount}
          />
        ))}
      </div>
    </section>
  );
}
