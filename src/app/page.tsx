'use client';

import { useConfig } from '@/context/ConfigContext';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Blog from './components/sections/Blog';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';
import CTA from './components/sections/CTA';
import Blocks from './components/sections/Blocks';

const SECTION_COMPONENTS: Record<string, React.ComponentType<any> | undefined> = {
  header: Header, 
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  blog: Blog,
  cta: CTA,
  faq: FAQ,
  footer: Footer,
  blocks: Blocks,
};

type ComposedSectionItem = {
  id?: string;
  key?: string;
  type?: string;
  source?: string;
  enabled?: boolean;
  data?: Record<string, unknown>;
};

export default function Home() {
  const config = useConfig();
  const safeConfig = config as any;

  if (!safeConfig) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  const sectionsMap = (safeConfig.sections && !Array.isArray(safeConfig.sections))
    ? safeConfig.sections
    : {};
  const composedSections = Array.isArray(safeConfig.layout?.sections)
    ? (safeConfig.layout.sections as ComposedSectionItem[])
    : [];
  const hiddenSections = new Set(safeConfig.layout?.hiddenSections || []);

  const renderComposedSections = () => {
    return composedSections.map((item, index) => {
      if (!item || item.enabled === false) return null;

      const componentKey = item.type || item.key;
      if (!componentKey || hiddenSections.has(componentKey)) return null;

      const Component = SECTION_COMPONENTS[componentKey];
      if (!Component) return null;

      const sourceKey = item.source || item.key || componentKey;
      const sectionData = item.data ?? sectionsMap[sourceKey];
      if (!sectionData) return null;

      const instanceKey = item.id || `${componentKey}-${sourceKey}-${index}`;
      const dataPath = item.data ? `layout.sections.${index}.data` : `sections.${sourceKey}`;
      return <Component key={instanceKey} data={sectionData} dataPath={dataPath} />;
    });
  };

  const renderLegacySections = () => {
    const sectionOrder = safeConfig.layout?.order || Object.keys(sectionsMap);

    return sectionOrder.map((sectionKey: string) => {
      if (hiddenSections.has(sectionKey)) return null;

      const Component = SECTION_COMPONENTS[sectionKey];
      const sectionData = sectionsMap[sectionKey];
      if (!Component || !sectionData) return null;

      return <Component key={sectionKey} data={sectionData} dataPath={`sections.${sectionKey}`} />;
    });
  };

  return (
    <main>
      {composedSections.length > 0 ? renderComposedSections() : renderLegacySections()}
    </main>
  );
}
