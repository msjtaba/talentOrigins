import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import RecruitmentEngine from '@/components/sections/RecruitmentEngine';
import ForEmployers from '@/components/sections/ForEmployers';
import ForCandidates from '@/components/sections/ForCandidates';
import Industries from '@/components/sections/Industries';
import Testimonials from '@/components/sections/Testimonials';
import ContactUs from '@/components/sections/ContactUs';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      {/* Header Sticky Navigation */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* Entry Landing Hero */}
        <Hero />

        {/* Dynamic Metric Count Strip */}
        <TrustBar />

        {/* Why Us + Scroll-Pinned GSAP Pipeline */}
        <RecruitmentEngine />

        {/* Employer Focus Section */}
        <ForEmployers />

        {/* Candidate Focus Section */}
        <ForCandidates />

        {/* Industry Verticals Grid + Responsive Network Viz */}
        <Industries />

        {/* Infinite Scrolling Social Testimonials Rail */}
        <Testimonials />

        {/* Conversational Contact Forms */}
        <ContactUs />
      </main>

      {/* Footer Branding & Legal Info */}
      <Footer />
    </>
  );
}
