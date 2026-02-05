'use client';

import { useConfig } from '@/context/ConfigContext';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Blog from './components/sections/Blog';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';

// 1. Map string names to actual Components
//TODO: drive this from config.json layout.order

const SECTION_COMPONENTS: Record<string, React.ComponentType<any> | undefined> = {
  header: Header, 
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  blog: Blog,
  faq: FAQ,
  // cta: CTA,
  footer: Footer,
};

export default function Home() {
  const config = useConfig();
  const safeConfig = config as any;

  // ---------------------------------------------------------
  // 1. SAFETY CHECK: STOP THE CRASH
  // ---------------------------------------------------------
  // If config is null, or if 'sections' hasn't loaded yet, stop here.
  if (!safeConfig || !safeConfig.sections) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  // 2. Fallback if layout order is missing
  const sectionOrder = safeConfig.layout?.order || Object.keys(safeConfig.sections);

  return (
    <main>
      {sectionOrder.map((sectionKey: string) => {
        // A. Find the component
        const Component = SECTION_COMPONENTS[sectionKey];
        
        // B. Find the data (Safe now because we checked config.sections above)
        // We cast to 'any' here to avoid TypeScript being too strict about dynamic keys
        const sectionData = safeConfig.sections[sectionKey];

        // Safety Check: If component or data is missing, skip it
        if (!Component || !sectionData) return null;

        return (
          <Component 
            key={sectionKey} 
            data={sectionData} 
          />
        );
      })}
    </main>
  );
}