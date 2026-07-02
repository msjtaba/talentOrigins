Project Blueprints & Developer Implementation Plan
This document acts as the primary engineering guide and step-by-step implementation plan for building the Talent Origins Corporate Website exactly as specified in PRD v1.5.
1. Project Architecture & Directory Structure
We will use Next.js 14+ with the App Router, TypeScript, and Tailwind CSS. The folder structure below incorporates the react-bits third-party components via shadcn CLI conventions as requested.

├── app/
│   ├── layout.tsx                 # Global layout with DotField background integration
│   ├── page.tsx                   # Main single-scroll container page
│   ├── globals.css                # Tailwind directives & global style tokens
│   └── api/
│       ├── contact/
│       │   ├── employer/
│       │   │   └── route.ts       # POST handling for employer lead capture
│       │   └── candidate/
│       │       └── route.ts       # POST handling for candidate apps + file streams
│
├── components/
│   ├── ui/                        # Low-level UI structural building blocks
│   │   ├── BorderGlow.tsx         # Brand-mapped card hover container (react-bits)
│   │   └── DotField.tsx           # Global background element (react-bits)
│   │
│   ├── sections/                  # Single-page visual sections
│   │   ├── Navbar.tsx             # Fixed top header + mobile menu overlay
│   │   ├── Hero.tsx               # Entry section with staged text reveal
│   │   ├── TrustBar.tsx           # Numeric rolling counter strip
│   │   ├── RecruitmentEngine.tsx  # Pinned zig-zag pipeline animation (GSAP)
│   │   ├── ForEmployers.tsx       # Employer benefits section
│   │   ├── ForCandidates.tsx      # Candidate benefits section
│   │   ├── Industries.tsx         # Grid & Network Visualization wrapper
│   │   ├── Testimonials.tsx       # Auto-scrolling slider rail
│   │   ├── ContactUs.tsx          # Conversational form container
│   │   └── Footer.tsx             # Closing brand elements & legal copy
│   │
│   └── network/                   # Network Visualization variations (Section 10.9)
│       ├── NetworkFull.tsx        # High-fidelity desktop Canvas loop
│       ├── NetworkReduced.tsx     # Low-fidelity performance-optimized tablet Canvas
│       └── NetworkStatic.tsx      # High-performance mobile fallback SVG
│
├── hooks/
│   └── useMediaQuery.ts           # Screen dimension detector for responsive handling
│
├── public/
│   └── talent-origins-logo.png    # Pre-provided dark-native asset

2. Global Styling & Tailwinds Configuration
Add the verified corporate color palette and font family mappings straight into your tailwind.config.js:
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0F',
          elevated: '#12121A',
        },
        accent: {
          primary: '#5770F3',
          light: '#7B8FF7',
          muted: '#2A3580',
        },
        text: {
          primary: '#F0F0F5',
          muted: '#8888AA',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

3. Core Component Integrations (react-bits)
3.1 Global DotField Strategy
To implement Section 8.8.1 seamlessly without creating performance bottlenecks, wrap the root page content inside a relative layout. The DotField stays active, but its event loop is altered on mobile layout detectors.
// components/ui/DotField.tsx
'use client';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  bulgeStrength = 67,
  glowRadius = 160,
  gradientFrom = "rgba(87, 112, 243, 0.35)",
  gradientTo = "rgba(123, 143, 247, 0.20)"
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // Implementation loop matches react-bits specification
    // IF isMobile is true -> skip pointer listeners and only draw one single static canvas frame

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

4. Feature Development Lifecycle & Sprints
Sprint 1: Infrastructure & Data Ingestion Pipeline
•	Environment Verification: Build the .env.local testing matrix tracking RESEND_API_KEY and RECRUITER_EMAIL.
•	API Endpoints: Implement endpoint handlers processing inputs using standard Next.js route streaming utilities.
// app/api/contact/candidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const jobTypePreference = formData.get('jobTypePreference') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string || 'Not provided';
    const coverNote = formData.get('coverNote') as string;
    const file = formData.get('resume') as File;

    if (!file || file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Invalid file attachment" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await resend.emails.send({
      from: 'noreply@talentorigins.com',
      to: process.env.RECRUITER_EMAIL!,
      subject: `[New Candidate Application] ${fullName} — ${jobTypePreference}`,
      text: `Name: ${fullName}\nEmail: ${email}\nJob Type: ${jobTypePreference}\nLinkedIn: ${linkedinUrl}\n\nCover Note:\n${coverNote}`,
      attachments: [{ filename: file.name, content: buffer }]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

Sprint 2: UI Structure & Layout Delivery
•	Continuous Scroll Hub: Build the parent layout in app/page.tsx. Use standard browser scroll rules mapping navigation hooks to section identifiers (#hero, #employers, etc.).
•	Responsive Layouts: Establish conditional structural switches matching Section 10 rules. Statically invert column flows on viewports dropping under 1024px.
Sprint 3: Fine Animation Layering
•	Recruitment Engine (GSAP): Pin the workspace matrix via GSAP ScrollTrigger. Morph the vector coordinate connector pipes smoothly alongside progress metrics. Swap visually to clean linear down-stack tracking blocks for mobile layouts.
•	Conversational Conversion Matrix: Wire up client side triggers using Framer Motion wrappers inside the #contact section container:
// components/sections/ContactUs.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactUs() {
  const [flowState, setFlowState] = useState<'prompt' | 'candidate' | 'employer'>('prompt');

  return (
    <section id="contact" className="relative min-h-screen bg-background-primary py-20 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="font-display text-4xl text-text-primary mb-8">Contact Us</h2>
        
        <div className="bg-background-elevated border border-accent-muted p-6 rounded-lg">
          <p className="text-text-primary mb-4 font-body">Are you a Candidate or an Employer?</p>
          
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setFlowState('candidate')}
              className={`px-4 py-2 rounded text-sm ${flowState === 'candidate' ? 'bg-accent-primary text-text-primary' : 'border border-accent-primary text-accent-light'}`}
            >
              Candidate
            </button>
            <button 
              onClick={() => setFlowState('employer')}
              className={`px-4 py-2 rounded text-sm ${flowState === 'employer' ? 'bg-accent-primary text-text-primary' : 'border border-accent-primary text-accent-light'}`}
            >
              Employer
            </button>
          </div>

          <AnimatePresence mode="wait">
            {flowState === 'candidate' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {/* Embedded form layout */}
              </motion.div>
            )}
            {flowState === 'employer' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                {/* Embedded form layout */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

5. Deployment Verification Protocols
Before delivering staging builds to Vercel production hosting channels, execute this diagnostic pre-flight list:
	1.	Confirm .env.local is explicitly omitted from standard version tracking index points via production project root .gitignore.
	2.	Evaluate mobile breakpoint interfaces using local device simulation tools down to an explicit width barrier of 375px. Ensure all text fields remain dynamic and do not display horizontal layout shifting.
	3.	Validate layout behaviors when users choose accessibility patterns such as OS-level reduced motion (prefers-reduced-motion: reduce). Ensure CSS components step back to immediate transitions.