import config from '@/data/config.json';
// Import your section components (we'll assume you created them)
import HeroSection from './components/sections/Hero';
import FeaturesSection from './components/sections/Features';
import TestimonialsSection from './components/sections/Testimonials';
import FAQSection from './components/sections/FAQ';

// Map string names to actual React Components
const SECTION_COMPONENTS: Record<string, any> = {
  hero: HeroSection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
};

export default function Home() {
  return (
    <main>
      {/* Loop through the "structure" array and render the matching component */}
      {config.layout.structure.map((sectionName, index) => {
        const Component = SECTION_COMPONENTS[sectionName];
        
        // Safety check: Does the component exist?
        if (!Component) return null;

        // Pass the specific data for this section
        const sectionData = config.sections[sectionName as keyof typeof config.sections];

        return (
          <Component 
            key={`${sectionName}-${index}`} 
            data={sectionData} 
          />
        );
      })}
    </main>
  );
}