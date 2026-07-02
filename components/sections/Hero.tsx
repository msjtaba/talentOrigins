'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function Hero() {
  const triggerFlow = (flow: 'candidate' | 'employer') => {
    window.dispatchEvent(new CustomEvent('select-contact-flow', { detail: flow }));
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Talent Origins Hero Background"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14] via-[#0d0d14]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-[64px] font-bold text-text-primary leading-[1.1] max-w-xl"
            >
              BUILDING CAREERS.<br />
              <span className="text-[#8fa3ff]">STRENGTHENING TEAMS.</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="font-body text-lg text-text-muted max-w-lg leading-relaxed"
            >
              Creating meaningful connections between employers and candidates that drive long-term success through a precision-engineered recruitment process.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-row gap-4 items-center"
            >
              <button
                onClick={() => triggerFlow('employer')}
                className="bg-[#8fa3ff] text-[#0c123d] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#c7d2fe] transition-all flex items-center gap-2 cursor-pointer"
              >
                Hire Talent <TrendingUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => triggerFlow('candidate')}
                className="border border-[#8fa3ff] text-[#8fa3ff] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#8fa3ff]/10 transition-all cursor-pointer"
              >
                Submit Resume
              </button>
            </motion.div>
          </div>
          
          <div className="relative h-[500px] hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-[#8fa3ff]/20 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
