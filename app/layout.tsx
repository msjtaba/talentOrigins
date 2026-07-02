import type { Metadata } from 'next';
import './globals.css';
import DotField from '@/components/ui/DotField';

export const metadata: Metadata = {
  title: 'Talent Origins — Recruiting & Staffing Partner',
  description: 'Building Careers. Strengthening Teams. Talent Origins connects premier non-IT industry leaders with vetted professional talent across Healthcare, Manufacturing, Logistics, and Construction.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full bg-background-primary text-text-primary relative flex flex-col overflow-x-hidden selection:bg-accent-primary/30 selection:text-text-primary">
        {/* Global interactive dot matrix background */}
        <DotField />
        
        {/* Main content layer */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}

