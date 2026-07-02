'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from '../ui/BorderGlow';
import { Search, ShieldCheck, Handshake, Rocket, LucideIcon } from 'lucide-react';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  id: number;
  label: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    id: 1,
    label: 'Step 1',
    title: 'Sourcing',
    desc: 'We utilize advanced AI-driven platforms and a deep personal network to identify talent that isn\'t just looking for a job, but seeking a career leap.',
    icon: Search,
  },
  {
    id: 2,
    label: 'Step 2',
    title: 'Vetting',
    desc: 'Our rigorous multi-stage assessment ensures every candidate matches your technical requirements and corporate culture perfectly.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    label: 'Step 3',
    title: 'Alignment',
    desc: 'We facilitate seamless negotiations and ensure long-term goals of both employer and talent are in perfect synchronization.',
    icon: Handshake,
  },
  {
    id: 4,
    label: 'Step 4',
    title: 'Onboarding',
    desc: 'Our support doesn\'t end at the contract signing. We assist with the transition to guarantee the new hire hits the ground running.',
    icon: Rocket,
  },
];

export default function RecruitmentEngine() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const triggers = STEPS.map((step) => {
      return ScrollTrigger.create({
        trigger: `#step-row-${step.id}`,
        // Highlight step card when its top/center is in the viewport center
        start: 'top center+=120',
        end: 'bottom center-=120',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveStep(step.id);
          }
        },
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden z-10"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-text-primary">
            The Difference Is in the <span className="text-[#80d8aa]">Process.</span>
          </h2>
          <p className="text-text-muted font-body text-lg">
            Strategic Hiring Ecosystem
          </p>
        </div>

        {/* Vertical alternating list of boxes */}
        <div className="relative space-y-32">
          {/* Vertical timeline line in the center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-accent-muted/30 hidden md:block z-0" />

          {STEPS.map((step) => {
            const isEven = step.id % 2 === 0;
            const isActive = activeStep === step.id;

            return (
              <div
                key={step.id}
                id={`step-row-${step.id}`}
                className={`flex flex-col md:flex-row items-center gap-12 group relative z-10 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Card Container */}
                <div className="w-full md:w-1/2" id={`step-card-${step.id}`}>
                  <PipelineCard step={step} isActive={isActive} />
                </div>

                {/* Central Timeline Dot */}
                <div
                  className={`hidden md:block w-4 h-4 rounded-full relative z-20 transition-all duration-500 ${
                    isActive ? 'bg-[#80d8aa]' : 'bg-[#0c3d2a]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-[#80d8aa] animate-ping rounded-full opacity-50" />
                  )}
                </div>

                {/* Spacer for symmetric layout */}
                <div className="w-full md:w-1/2 hidden md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface PipelineCardProps {
  step: Step;
  isActive: boolean;
}

function PipelineCard({ step, isActive }: PipelineCardProps) {
  const Icon = step.icon;
  return (
    <BorderGlow
      edgeSensitivity={30}
      borderRadius={8}
      glowRadius={32}
      glowIntensity={isActive ? 1.0 : 0.4}
      animated={isActive}
      backgroundColor="#111814"
      className={`p-10 border transition-all duration-500 h-full flex flex-col justify-center ${
        isActive
          ? 'border-accent-primary/80 shadow-[0_0_15px_rgba(6,113,75,0.15)] translate-y-[-2px]'
          : 'border-[#3f4942]/20 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-[10px] tracking-wider font-semibold text-accent-light uppercase">
          {step.label}
        </span>
        {isActive && (
          <span className="w-2 h-2 rounded-full bg-[#80d8aa] animate-pulse" />
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded flex items-center justify-center transition-all ${
            isActive
              ? 'bg-[#06714b] text-[#98f2c2]'
              : 'bg-[#181d1a] text-[#88938b] border border-[#3f4942]/40'
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3
          className={`font-display text-2xl font-bold transition-all ${
            isActive ? 'text-[#80d8aa]' : 'text-text-primary'
          }`}
        >
          {step.title}
        </h3>
      </div>

      <p className="font-body text-base text-text-muted leading-relaxed">
        {step.desc}
      </p>
    </BorderGlow>
  );
}
