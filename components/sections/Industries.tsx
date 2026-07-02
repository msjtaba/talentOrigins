'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import BorderGlow from '../ui/BorderGlow';
import NetworkFull from '../network/NetworkFull';
import NetworkReduced from '../network/NetworkReduced';
import NetworkStatic from '../network/NetworkStatic';
import {
  HeartPulse,
  Factory,
  ShoppingBag,
  UtensilsCrossed,
  Coins,
  HardHat,
  Truck,
  Package,
} from 'lucide-react';

const VERTICALS = [
  { name: 'Healthcare', icon: HeartPulse, desc: 'Nursing, allied health, and medical administration staffing.' },
  { name: 'Manufacturing', icon: Factory, desc: 'Machinists, operators, assembly technicians, and floor managers.' },
  { name: 'Retail & Sales', icon: ShoppingBag, desc: 'Store managers, team leads, and high-performance sales teams.' },
  { name: 'Hospitality', icon: UtensilsCrossed, desc: 'Culinary roles, event coordinators, and guest relations leads.' },
  { name: 'Finance & Accounting', icon: Coins, desc: 'Bookkeepers, account managers, analysts, and payroll officers.' },
  { name: 'Construction', icon: HardHat, desc: 'Electricians, carpenters, plumbers, and project supervisors.' },
  { name: 'Logistics', icon: Truck, desc: 'Distribution center personnel, transport, and inventory managers.' },
  { name: 'Supply Chain', icon: Package, desc: 'Inventory controllers, procurement specialists, and supply chain coordinators.' },
];

export default function Industries() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  const renderNetworkVisualizer = () => {
    if (isMobile) return <NetworkStatic />;
    if (isTablet) return <NetworkReduced />;
    return <NetworkFull />;
  };

  return (
    <section id="industries" className="py-20 sm:py-28 bg-background-primary relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-muted bg-background-elevated/40 backdrop-blur-md mb-6">
            <span className="font-body text-xs font-semibold text-accent-light tracking-wider uppercase">
              Specialized Sectors
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Industries We Serve
          </h2>
          <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            Delivering recruitment solutions across diverse non-IT verticals, connecting pre-vetted professionals with leading employers.
          </p>
        </div>

        {/* Two Column Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Grid of 8 Verticals (7 cols on desktop) */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VERTICALS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx}>
                    <BorderGlow
                      edgeSensitivity={20}
                      borderRadius={8}
                      backgroundColor="#111814"
                      className="p-6 border border-accent-muted/10 h-full flex flex-col items-center text-center justify-start hover:border-accent-primary/30 transition-all duration-300 hover:-translate-y-1 transform"
                    >
                      <div className="flex flex-col items-center gap-3 mb-2">
                        <div className="p-3 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-light">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-text-primary">
                          {item.name}
                        </h3>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </BorderGlow>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Network Visualizer (5 cols on desktop) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-radial-gradient(circle, rgba(6,113,75,0.05) 0%, transparent 70%) pointer-events-none" />
            <div className="w-full max-w-[450px]">
              {renderNetworkVisualizer()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
