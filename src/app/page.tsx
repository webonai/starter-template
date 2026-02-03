'use client';

import { useConfig } from '@/context/ConfigContext';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';

// 1. Map string names to actual Components
const SECTION_COMPONENTS: Record<string, React.FC<{ data: any }>> = {
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  faq: FAQ,
  // cta: CTA, // Uncomment when you build CTA
};

export default function Home() {
  const config = useConfig();

  // 2. Fallback if layout is missing (prevents crash)
  const sectionOrder = config.layout?.order || ['hero', 'features', 'testimonials', 'faq'];

  return (
    <main>
      {sectionOrder.map((sectionKey) => {
        // A. Find the component (e.g., "hero" -> Hero Component)
        const Component = SECTION_COMPONENTS[sectionKey];
        
        // B. Find the data (e.g., config.sections.hero)
        const sectionData = config.sections[sectionKey as keyof typeof config.sections];

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