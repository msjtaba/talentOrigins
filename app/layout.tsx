import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import DotField from '@/components/ui/DotField';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display-fallback',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body-fallback',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased scroll-smooth`}
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
