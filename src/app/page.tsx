'use client'; // Needs to be client to receive updates

import { useConfig } from '@/context/ConfigContext';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';

export default function Home() {
  const config = useConfig(); // <--- Reads from Live Context

  return (
    <main>
      {/* Pass the LIVE data to your existing Hero component */}
      {/* If config updates, this re-renders, and Hero gets new props instantly */}
      <Hero data={config.sections.hero} />
      
      <Features data={config.sections.features} />
      <Testimonials data={config.sections.testimonials} />
      <FAQ data={config.sections.faq} />
    </main>
  );
}