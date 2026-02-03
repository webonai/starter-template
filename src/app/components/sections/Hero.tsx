import { UniversalElement } from '../ui/UniversalElement';
import { ElementConfig } from '@/types/schema';

// 1. Define the Expected Shape (Must match config.json!)
type HeroData = {
  container: ElementConfig;
  innerWrapper: ElementConfig;
  headline: ElementConfig;
  subtext: ElementConfig;
  primaryButton: ElementConfig; // Ensure this matches config!
  // secondaryLink: ElementConfig; // Only include if it exists in config
};

export default function Hero({ data }: { data: HeroData }) {
  if (!data) return null; // Safety check for the whole section

  const basePath = "sections.hero"; 

  return (
    <UniversalElement as="section" data={data.container} dataPath={`${basePath}.container`}>
      <UniversalElement as="div" data={data.innerWrapper} dataPath={`${basePath}.innerWrapper`}>
        
        <UniversalElement as="h1" data={data.headline} dataPath={`${basePath}.headline`} />
        
        <UniversalElement as="p" data={data.subtext} dataPath={`${basePath}.subtext`} />
        
        {/* Check if primaryButton exists in config before rendering */}
        {data.primaryButton && (
          <UniversalElement 
             data={data.primaryButton} 
             dataPath={`${basePath}.primaryButton`} 
          />
        )}

      </UniversalElement>
    </UniversalElement>
  );
}